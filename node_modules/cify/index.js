const utils = require('ntils');

function ClassFactory(options) {
  //处理 options
  options = options || utils.create(null);
  options.$name = options.$name || 'Class';
  options.$extends = options.$extends || ClassFactory;
  options.$static = options.$static || utils.create(null);
  //处理父类 prototype
  var superPrototype = utils.isFunction(options.$extends) ?
    options.$extends.prototype : options.$extends;
  //定义新类
  var Class = function () {
    //处理 super
    if (!this.$super) {
      utils.final(this, '$super', function () {
        if (this._super_called_) return this._super_ret_;
        this._super_called_ = true;
        if (utils.isFunction(options.$extends)) {
          this._super_ret_ = options.$extends.apply(this, arguments);
          //这几行确保可继承于数组
          if (this._super_ret_) {
            var proto = utils.getPrototypeOf(this);
            utils.setPrototypeOf(proto, this._super_ret_);
          }
        } else {
          this._super_ret_ = options.$extends;
        }
        return this._super_ret_;
      });
      for (var name in superPrototype) {
        var value = superPrototype[name];
        if (utils.isFunction(value)) {
          this.$super[name] = value.bind(this);
        } else {
          this.$super[name] = value;
        }
      }
    }
    //调用构造
    if (utils.isFunction(options.constructor) &&
      options.constructor !== Object) {
      return options.constructor.apply(this, arguments);
    } else {
      //如果没有实现 constructor 则调用父类构造
      this.$super.apply(this, arguments);
    }
  };
  //处理 prototype
  Class.prototype = utils.create(superPrototype);
  utils.copy(options, Class.prototype);
  utils.final(Class.prototype, '$class', Class);
  //处理静态成员
  utils.copy(options.$static, Class);
  if (utils.isFunction(options.$extends)) {
    utils.setPrototypeOf(Class, options.$extends);
  }
  if (!options.$extends.$extend) {
    utils.copy(ClassFactory, Class);
  }
  utils.final(Class, '$super', options.$extends);
  //--
  return Class;
}

//定义扩展方法
ClassFactory.$extend = function (options) {
  options.$extends = this;
  return new ClassFactory(options);
};

ClassFactory.Class = ClassFactory;
module.exports = ClassFactory;