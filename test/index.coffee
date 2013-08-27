project = require('../index')

describe 'project.version', ->
  it 'should have a version', ->
    project.version.should.be.a 'string'
