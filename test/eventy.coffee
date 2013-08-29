eventy = require('../lib/eventy')

testObj = {}
eventy testObj

describe 'eventy.on()', ->
  it 'should be a function', ->
    testObj.on.should.be.a 'function'

  it 'should register an event to the object', ->
    testObj.on 'update', (value)->
      console.log('value');

describe 'eventy.off()', ->
  it 'should be a function', ->
    testObj.off.should.be.a 'function'

  it 'should remove the registered event listener from the object'

describe 'eventy.trigger()', ->
  it 'should be a function', ->
    testObj.trigger.should.be.a 'function'

  it 'should trigger the event listener on the object', (done)->
    test = {}
    eventy test
    test.on 'error', (err)->
      done()

    test.trigger 'error'
