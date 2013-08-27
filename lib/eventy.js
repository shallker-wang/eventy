var debug = require('dever').debug('Eventy');
var error = require('dever').error('Eventy');

module.exports = function(object) {
  function Eventy() {

    var self = this,
        evStack = [];

    /* Check if this is the first time binding an event */
    function isRegistered(eventName) {
      if (typeof evStack[eventName] === 'undefined') {
        return false;
      }
      return true;
    }

    /**
     * Take a position in the event stack.
     * @param {String} eventName
     * @return {Array} event callback list
     */
    function registerEvent(eventName) {
      debug('register', eventName);
      if (typeof evStack[eventName] !== 'undefined') {
        return error('event ' + eventName + ' already registered');
      }
      return evStack[eventName] = [];
    }

    /* Remove event from event stack */
    function unregisterEvent(eventName) {
      return delete evStack[eventName];
    }

    /* Append a listener into event callback list */
    function appendEventListener(eventName, eventCallback) {
      // debug('appendEventListener', eventName, eventCallback);
      return evStack[eventName].push(eventCallback);
    }

    /* Delete one callback from event callback list */
    function deleteEventListener(eventName, eventListener) {
      var callbacks = getEventCallbacks(eventName);
      callbacks.forEach(function(callback, index) {
        if (callback === eventListener) {
          callbacks.splice(index, 1);
        }
      })
      return resetEventCallbacks(eventName, callbacks);
    }

    /* Return the callback list of the event */
    function getEventCallbacks(eventName) {
      if (!isRegistered(eventName)) {
        return error('event ' + eventName + 'is not registered');
      }
      return evStack[eventName];
    }

    /* Overwrite event callback list */
    function resetEventCallbacks(eventName, eventCallbacks) {
      return evStack[eventName] = eventCallbacks;
    }

    /**
     * Append a listener into event's callback list
     * @param {String} eventName
     * @param {Function} eventCallback
     * @return {Object} event object itself
     */
    this.on = function(eventName, eventCallback) {
      if (!isRegistered(eventName)) {
        registerEvent(eventName);
      }
      appendEventListener(eventName, eventCallback);
      return this;
    }

    /**
     * Remove one callback from event callback list
     * @param {String} eventName
     * @param {Function} eventCallback
     * @return {Boolean} result of the deletion of the event callback
     */
    this.off = function(eventName, eventCallback) {
      if (!isRegistered(eventName)) {
        return this;
      }
      if (typeof eventCallback === 'undefined') {
        return unregisterEvent(eventName);
      }
      deleteEventListener(eventName, eventCallback);
      return this;
    }

    /**
     * Calling every listeners of the event.
     * @param {String} eventName
     * @param {Array} callbackArguments
     * @return {Object} event object itself
     */
    this.trigger = function(eventName) {
      var args, callbacks;
      debug('trigger', eventName);
      if (!isRegistered(eventName)) {
        return this;
      }
      args = Array.prototype.slice.call(arguments);
      args.shift();
      callbacks = evStack[eventName];
      callbacks.forEach(function(callback, index) {
        if (typeof callback !== 'function') {
          return error('event ' + eventName + ' callback is not a function');
        }
        setTimeout(function() {callback.apply({}, args)}, 1);
      })
      return this;
    }
  }

  Eventy.call(object);
}
