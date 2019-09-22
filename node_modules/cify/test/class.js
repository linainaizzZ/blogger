'use strict';

var Class = require('../')

var A = new Class({
  $extends: Array,
  constructor: function () {
    this.$super.apply(this, arguments);
  },
  getName: function () {
    return 'A';
  }
});

var B = new Class({
  $extends: A,
  getName: function () {
    return this.$super.getName();
    //return 'B:' + B.test();
  },
  $static: {
    test: function () {
      return 'B';
    }
  }
});

class C extends Array {

}

var a = new A(5, 4);
var b = new B(3);
var c = new C(6);

console.log(a.length);