!function(n){function t(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return n[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var e={};t.m=n,t.c=e,t.i=function(n){return n},t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:r})},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},t.p="/build/",t(t.s=1)}([function(module,exports){eval('var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\n/**\n*\n*   Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)\n*   Licensed Under MIT (http://opensource.org/licenses/MIT)\n*   CountingDay.js\n*\n*/\n\nvar CountingDay = function () {\n  function CountingDay(options) {\n    _classCallCheck(this, CountingDay);\n\n    this.MAX_MONTH = 12;\n    var date = options.date,\n        month = options.month,\n        year = options.year;\n\n    // Default Value\n\n    var now = new Date();\n    month = month || now.getMonth() + 1;\n    year = year || now.getFullYear();\n\n    var notValid = date < 1 || date > 31 || month < 1 || month > 12 || typeof date !== "number" || typeof month !== "number" || typeof year !== "number";\n    if (notValid) throw new Error("[CountingDay]: Invalid constructor argument");\n\n    this.state = _extends({}, options, { month: month, year: year });\n    this.state.day = this.getDate().getDay();\n    return this;\n  }\n\n  _createClass(CountingDay, [{\n    key: "getDate",\n    value: function getDate() {\n      var _state = this.state,\n          date = _state.date,\n          month = _state.month,\n          year = _state.year;\n\n      return new Date(year, month - 1, date);\n    }\n  }, {\n    key: "convertToTwoDigit",\n    value: function convertToTwoDigit(num) {\n      var string = num.toString();\n      var isTwoDigit = string.length >= 2;\n      if (isTwoDigit) return string;\n      return "0" + string;\n    }\n  }, {\n    key: "getSQLDate",\n    value: function getSQLDate(date, month, year) {\n      date = date || this.state.date;\n      month = month || this.state.month;\n      year = year || this.state.year;\n      var newDate = this.convertToTwoDigit(date);\n      var newMonth = this.convertToTwoDigit(month);\n      return year + "-" + newMonth + "-" + newDate;\n    }\n  }, {\n    key: "isLeap",\n    value: function isLeap(year) {\n      year = year || this.state.year;\n      return year % 4 === 0;\n    }\n  }, {\n    key: "maxDayCount",\n    value: function maxDayCount(month, year) {\n      if (typeof month === "string") throw new Error("[CountingDay]: Invalid month index");\n\n      month = month || this.state.month;\n      year = year || this.state.year;\n\n      var THIRTY_ONE = [1, 3, 5, 7, 8, 10, 12];\n      var THIRTY = [4, 6, 9, 11];\n      var FEBRUARY = 2;\n\n      var isThirtyOne = THIRTY_ONE.find(function (index) {\n        return index === month;\n      });\n      var isThirty = THIRTY.find(function (index) {\n        return index === month;\n      });\n      var isFebruary = FEBRUARY === month;\n\n      if (isThirtyOne) return 31;else if (isThirty) return 30;else if (isFebruary) return this.isLeap(year) ? 29 : 28;else return false; // out of range\n    }\n  }, {\n    key: "validArgument",\n    value: function validArgument(variable, errorMessage) {\n      if (variable === (undefined || null) || isNaN(variable) || typeof variable !== \'number\') {\n        throw new Error(errorMessage);\n      }\n      return true;\n    }\n  }, {\n    key: "returnValue",\n    value: function returnValue(typeReturn, date, month, year) {\n      var dateInstance = new Date(year, month - 1, date);\n      var objectToReturn = {\n        day: dateInstance.getDay(),\n        date: date,\n        month: month,\n        maxDay: this.maxDayCount(month, year),\n        year: year\n      };\n      if (typeReturn === \'this\') {\n        this.state = _extends({}, objectToReturn);\n        return this;\n      } else {\n        objectToReturn.then = function () {\n          return new CountingDay(objectToReturn);\n        };\n      }\n      return objectToReturn;\n    }\n  }, {\n    key: "addDay",\n    value: function addDay(count, initDate, initMonth, initYear) {\n      var _this = this;\n\n      this.validArgument(count, "[CountingDay]: Invalid count argument");\n      var typeReturn = initDate || initMonth || initYear ? \'object\' : \'this\';\n\n      var currentDate = (initDate || this.state.date) + count;\n      var currentMonth = initMonth || this.state.month;\n      var currentYear = initYear || this.state.year;\n\n      var IS_NEGATIVE = count < 0;\n\n      var maxDayMonth = function maxDayMonth() {\n        var monthToCount = IS_NEGATIVE ? currentMonth - 1 : currentMonth;\n        var maxDay = _this.maxDayCount(monthToCount, currentYear);\n        if (!maxDay) {\n          if (IS_NEGATIVE) currentYear--;else currentYear++;\n          currentMonth = IS_NEGATIVE ? 12 : 1;\n          return _this.maxDayCount(currentMonth, currentYear);\n        }\n        return maxDay;\n      };\n\n      var recursive = function recursive() {\n\n        var diff = 0;\n        var isOutOfRange = currentDate > maxDayMonth();\n        if (IS_NEGATIVE) isOutOfRange = currentDate <= 0;\n\n        if (!isOutOfRange) {\n          return _this.returnValue(typeReturn, currentDate, currentMonth, currentYear);\n        } else {\n          if (IS_NEGATIVE) {\n            diff = currentDate + maxDayMonth();\n            currentMonth--;\n          } else {\n            diff = currentDate - maxDayMonth();\n            currentMonth++;\n          }\n          currentDate = diff;\n          return recursive();\n        }\n      };\n      return recursive();\n    }\n  }, {\n    key: "addMonth",\n    value: function addMonth(count, initDate, initMonth, initYear) {\n      var _this2 = this;\n\n      var MAX_MONTH = this.MAX_MONTH;\n\n      this.validArgument(count, "[CountingDay]: Invalid count argument");\n      var typeReturn = initDate || initMonth || initYear ? \'object\' : \'this\';\n      var IS_NEGATIVE = count < 0;\n\n      var currentDate = initDate || this.state.date;\n      var currentMonth = (initMonth || this.state.month) + count;\n      var currentYear = initYear || this.state.year;\n\n      var recursive = function recursive() {\n        var diff = 0;\n        var isOutOfRange = currentMonth > MAX_MONTH;\n        if (IS_NEGATIVE) isOutOfRange = currentMonth <= 0;\n\n        if (!isOutOfRange) {\n          return _this2.returnValue(typeReturn, currentDate, currentMonth, currentYear);\n        } else {\n          if (IS_NEGATIVE) {\n            diff = currentMonth + MAX_MONTH;\n            currentYear--;\n          } else {\n            diff = currentMonth - MAX_MONTH;\n            currentYear++;\n          }\n          currentMonth = diff;\n          return recursive();\n        }\n      };\n      return recursive();\n    }\n  }, {\n    key: "addYear",\n    value: function addYear(count, initDate, initMonth, initYear) {\n      this.validArgument(count, "[CountingDay]: Invalid count argument");\n      var typeReturn = initDate || initMonth || initYear ? \'object\' : \'this\';\n      var currentDate = initDate || this.state.date;\n      var currentMonth = initMonth || this.state.month;\n      var currentYear = initYear || this.state.year + count;\n      currentYear += count;\n      return this.returnValue(typeReturn, currentDate, currentMonth, currentYear);\n    }\n  }, {\n    key: "get",\n    value: function get() {\n      var newState = _extends({}, this.state, {\n        month: this.state.month\n      });\n      var date = newState.date,\n          month = newState.month,\n          year = newState.year;\n\n      var dateInstance = new Date(year, month - 1, date);\n      return _extends({}, newState, {\n        day: dateInstance.getDay(),\n        date: date,\n        maxDay: this.maxDayCount(month, year)\n      });\n    }\n  }], [{\n    key: "fromDate",\n    value: function fromDate(dateInstance) {\n      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n      var validDate = dateInstance.isPrototypeOf(Date);\n      if (validDate) throw new Error("[CountingDay]: Invalid Date Instance");\n      var day = dateInstance.getDay();\n      var date = dateInstance.getDate();\n      var month = dateInstance.getMonth() + 1;\n      var year = dateInstance.getFullYear();\n      return new CountingDay(_extends({}, options, {\n        day: day,\n        date: date,\n        month: month,\n        year: year\n      }));\n    }\n  }]);\n\n  return CountingDay;\n}();\n\nmodule.exports = CountingDay;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/index.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/index.js?')},function(module,__webpack_exports__,__webpack_require__){"use strict";eval('Object.defineProperty(__webpack_exports__, "__esModule", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index_js__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_index_js__);\n\n\nconsole.log(__WEBPACK_IMPORTED_MODULE_0__src_index_js___default.a);\n\n//////////////////\n// WEBPACK FOOTER\n// ./examples/index.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./examples/index.js?')}]);