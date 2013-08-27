eventy = require('../lib/eventy')

testObj = {}
eventy testObj

describe 'eventy.on()', ->
  it 'should be a function', ->
    testObj.on.should.be.a 'function'

  it 'should register an event to the object', ->
    testObj.on 'update', (value)->
      console.log('value');

    testObj.on 'error', (err)->
      console.log('on error');
      throw err

describe 'eventy.off()', ->
  it 'should be a function', ->
    testObj.off.should.be.a 'function'

  it 'should remove the registered event listener from the object'

describe 'eventy.trigger()', ->
  it 'should be a function', ->
    testObj.trigger.should.be.a 'function'

  it 'should trigger the event listener on the object', ->
    (->
      testObj.trigger 'error', new Error('test')
    ).should.throw()
