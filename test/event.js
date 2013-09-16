var Eventy = require('../lib/eventy');

// Eventy.debug(true);

describe('Eventy bind and trigger:', function() {
  it('should bind event listener to event and able to trigger the event', function() {
    Eventy.bind('test-bind-and-trigger', function() {throw 'done'});
    (function() {
      Eventy.trigger('test-bind-and-trigger');
    }).should.throw();
  })

  it('should bind multiple listeners to one event', function() {
    var fruits = ['apple'];
    Eventy.bind('test-multiple-listeners', function(arr) {arr.push('pear')});
    Eventy.bind('test-multiple-listeners', function(arr) {arr.push('banana')});
    Eventy.trigger('test-multiple-listeners', fruits);
    fruits.should.eql(['apple', 'pear', 'banana']);
  })

  it('should pass arguments to the event callback', function() {
    var fruits = ['apple'];
    Eventy.bind('test-arguments', function(arg) {arg.push('pear')});
    Eventy.trigger('test-arguments', fruits);
    fruits.should.eql(['apple', 'pear']);
  })

  it('should throw an error if event callback is not a function', function() {
    (function() {
      Eventy.bind('callback-is-not-a-function', 'string callback');
      Eventy.trigger('callback-is-not-a-function');
    }).should.throw();
  })
})

describe('Eventy unbind:', function() {
  it('should unbind listener of the event', function() {
    function throwError() {
      throw 'error';
    }

    Eventy.bind('test-unbind', throwError);
    (function() {
      Eventy.trigger('test-unbind');
    }).should.throw()
    Eventy.unbind('test-unbind', throwError);
    (function() {
      Eventy.trigger('test-unbind');
    }).should.not.throw();
  })
})

describe('Eventy attach:', function() {
  it('should attach itself to an object', function() {
    var object = new Object;
    Eventy.attachTo(object);
    object.bind.should.be.a('function');
    object.trigger.should.be.a('function');
    object.bind('change', function() {throw 'change'});
    (function() {
      object.trigger('change');
    }).should.throw();
  })
})
