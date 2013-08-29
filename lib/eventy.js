var debug = require('dever').debug('Eventy'),
    error = require('dever').error('Eventy'),
    warn = require('dever').warn('Eventy');


module.exports = function(object) {
  function Eventy() {

    var self = this,
        events = {},
        slice = Array.prototype.slice,
        toString = Object.prototype.toString;

    /* Check if this is the first time binding an event */
    function isRegisteredEvent(name) {
      return events[name] ? true : false;
    }

    /**
     * Take a position in the event stack.
     * @param {String} name
     * @return {Array} event callback list
     */
    function registerEvent(name) {
      debug('register', name);
      return events[name] || (events[name] = []);
    }

    /* Remove event from event stack */
    function unregisterEvent(name) {
      return delete events[name];
    }

    /* Append a listener into event callback list */
    function appendEventListener(name, callback) {
      // debug('appendEventListener', name, callback);
      return events[name].push(callback);
    }

    /* Delete one callback from event callback list */
    function deleteEventListener(name, listener) {
      var callbacks = getEventCallbacks(name);
      callbacks.forEach(function(callback, index) {
        if (callback === listener) {
          callbacks.splice(index, 1);
        }
      })
      return resetEventCallbacks(name, callbacks);
    }

    /* Return the callback list of the event */
    function getEventCallbacks(name) {
      return events[name] ? events[name] : [];
    }

    /* Overwrite event callback list */
    function resetEventCallbacks(name, callbacks) {
      return events[name] = callbacks;
    }

    /**
     * Append a listener into event's callback list
     * @param {String} name
     * @param {Function} callback
     * @return {Object} event object itself
     */
    this.on = function(name, callback) {
      if (toString.call(callback) !== '[object Function]') {
        return error('event ' + name + ' callback is not a function');
      }
      if (!isRegisteredEvent(name)) {
        registerEvent(name);
      }
      appendEventListener(name, callback);
      return this;
    }

    /**
     * Remove one callback from event callback list
     * @param {String} name
     * @param {Function} callback
     * @return {Boolean} result of the deletion of the event callback
     */
    this.off = function(name, callback) {
      if (!isRegisteredEvent(name)) {
        warn('unregistered event', name);
        return this;
      }
      if (typeof callback === 'undefined') {
        warn('no callback given');
        return this;
      }
      deleteEventListener(name, callback);
      return this;
    }

    /**
     * Calling every listeners of the event.
     * @param {String} name
     * @param {Array} callbackArguments
     * @return {Object} event object itself
     */
    this.trigger = function(name, values) {
      values = slice.call(arguments);
      name = values.shift()
      if (!isRegisteredEvent(name)) {
        return this;
      }
      debug('trigger', name);
      getEventCallbacks(name).forEach(function(callback, index) {
        setTimeout(function() {
          callback.apply(object, values);
        }, 1);
      })
      return this;
    }

    return this;
  }

  Eventy.call(object);
}
