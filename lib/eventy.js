var debug = require('dever').debug('Eventy'),
    error = require('dever').error('Eventy'),
    warn = require('dever').warn('Eventy'),
    slice = Array.prototype.slice;

module.exports = function Eventy(object) {
  /**
   * Remove the first matched callback from callbacks array
   */
  function removeCallback(callback, callbacks) {
    for (var i = 0; i < callbacks.length; i++) {
      if (callbacks[i] === callback) {
        return callbacks.splice(i, 1);
      }
    }

    return false;
  }

  /**
   * Listen to an event with a callback
   * @param  {String eventname}
   * @param  {Function callback}
   * @return {Object object || Boolean false}
   */
  object.on = function (eventname, callback) {
    var self = this;

    if (typeof self.__eventRegistry === 'undefined') {
      self.__eventRegistry = {};
    }

    if (typeof callback !== 'function') {
      error('callback is not a function');
      return false;
    }

    if (typeof self.__eventRegistry[eventname] === 'undefined') {
      self.__eventRegistry[eventname] = [];
    }

    self.__eventRegistry[eventname].push(callback);

    return self;
  }

  /**
   * Remove one callback from the event callback list
   * @param  {String eventname}
   * @param  {Function callback}
   * @return {Object object || Boolean false}
   */
  object.off = function (eventname, callback) {
    var self = this;

    if (typeof self.__eventRegistry === 'undefined') {
      return;
    }

    if (typeof callback !== 'function') {
      error('callback is not a function');
      return false;
    }

    if (typeof self.__eventRegistry[eventname] === 'undefined') {
      error('unregistered event');
      return false;
    }

    var callbacks = self.__eventRegistry[eventname];

    if (callbacks.length === 0) {
      return this;
    }

    removeCallback(callback, callbacks);

    return this;
  }

  /**
   * Loop through all callbacks of the event and call them asynchronously
   * @param  {String eventname}
   * @param  [Arguments args]
   * @return {Object object}
   */
  object.trigger = function (eventname, args) {
    var self = this;

    args = slice.call(arguments);
    eventname = args.shift();

    if (typeof self.__eventRegistry === 'undefined') {
      self.__eventRegistry = {};
    }

    if (typeof self.__eventRegistry[eventname] === 'undefined') {
      return self;
    }

    var callbacks = self.__eventRegistry[eventname];

    if (callbacks.length === 0) {
      return self;
    }

    callbacks.forEach(function (callback, index) {
      setTimeout(function () {
        callback.apply(self, args);
      }, 0);
    });

    return self;
  }

  /**
   * Alias of trigger
   */
  object.emit = object.trigger;

  /**
   * Loop through all callbacks of the event and call them synchronously
   * @param  {String eventname}
   * @param  [Arguments args]
   * @return {Object object}
   */
  object.triggerSync = function (eventname, args) {
    var self = this;

    args = slice.call(arguments);
    eventname = args.shift();

    if (typeof self.__eventRegistry === 'undefined') {
      self.__eventRegistry = {};
    }

    if (typeof self.__eventRegistry[eventname] === 'undefined') {
      return self;
    }

    var callbacks = self.__eventRegistry[eventname];

    if (callbacks.length === 0) {
      return self;
    }

    callbacks.forEach(function (callback, index) {
      callback.apply(self, args);
    });

    return self;
  }

  return object;
}
