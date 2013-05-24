should    = require 'should'
bandwidth = require '../../'
path      = require 'path'

describe 'bandwidth', ->
  client = null

  before (done) ->
    config = require('../config')
    client = new bandwidth.Client(
      config.host
      config.user_id
      config.api_token
      config.secret
    )

    done()

  it 'should send SMS and get SMS details', (done) ->

    client.getPhoneNumbers (err, numbers) ->
      should.not.exist(err)
      numbers.should.be.an.instanceOf(Array)
      (numbers.length > 0).should.be.true
      numbers[0].should.have.property 'number'
      number = numbers[0].number

      message = new bandwidth.Message number, "+79268375020", "message"
      client.sendMessage message, (err, response) ->
          should.not.exist(err)
          response.should.have.property 'entityId'
          client.getMessage response.entityId, (err,msg) ->
            should.not.exist(err)
            msg.should.have.property 'messageId'
            msg.messageId.should.equal response.entityId
            msg.should.have.property 'text'
            msg.text.should.equal "message"
            msg.should.have.property 'direction'
            msg.direction.should.equal 'out'

            done()

  it 'should send SMS with "Number" object in parameters ', (done) ->

    client.getPhoneNumbers (err, numbers) ->
      should.not.exist(err)
      numbers.should.be.an.instanceOf(Array)
      (numbers.length > 0).should.be.true
      numbers[0].should.have.property 'number'

      message = new bandwidth.Message numbers[0], "+79268375020", "message"
      client.sendMessage message, (err, response) ->
          should.not.exist(err)
          response.should.have.property 'entityId'
          done()

