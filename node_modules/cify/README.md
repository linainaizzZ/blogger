
```js
var Class = require("cify").Class;

var Animal = new Class({
  constructor: function(name) {
    this.name = name;
  },
  getName: function() {
    return "Animal:" + this.name;
  }
});

var Cat = new Class({
  _extends: Animal,
  getName: function() {
    return "Cat:" + this.name;
  }
});

var animal = new Animal("Obama");
console.log(animal.getName()); //Animal:Obama

var cat = new Cat("Obama");
console.log(cat.getName()); //Cat:Obama


var MyDate = new Class(function() {
  var formatDate = function(date, format_str) {
    ...
  };
  return {
    _extends: Date,
    toFormat: function(format_str) {
      return formatDate(this, format_str);
    }
  };
});

var date = new MyDate("2046-01-01");
console.log(date.getFullYear()); //2046
console.log(date.toFormat("yyyy年MM月dd日")); //2046年01月01日
```