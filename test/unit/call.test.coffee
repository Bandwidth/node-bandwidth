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


  it 'should send Call and get Call details', (done) ->

    client.getPhoneNumbers (err, numbers) ->
      should.not.exist(err)
      numbers.should.be.an.instanceOf(Array)
      (numbers.length > 0).should.be.true
      numbers[0].should.have.property 'number'
      number = numbers[0].number

      toNumber = "+79268375020"

      call = new bandwidth.Call number, toNumber
      client.sendCall call, (err, response) ->
          should.not.exist(err)
          response.should.have.property 'entityId'
          client.getCall response.entityId, (err,call) ->
            should.not.exist(err)
            
            call.should.have.property 'id'
            call.id.should.equal response.entityId

            call.should.have.property 'direction'
            call.direction.should.equal 'out'

            call.should.have.property 'to'
            call.to.should.equal toNumber

            done()

  it 'should hang up phone call', (done) ->

    client.getPhoneNumbers (err, numbers) ->
      should.not.exist(err)
      numbers.should.be.an.instanceOf(Array)
      (numbers.length > 0).should.be.true
      numbers[0].should.have.property 'number'
      number = numbers[0].number

      toNumber = "+79268375020"

      call = new bandwidth.Call number, toNumber
      client.sendCall call, (err, response) ->
          should.not.exist(err)
          response.should.have.property 'entityId'
          client.hangUp response.entityId, (err, res) ->
            should.exist(err)
            should.not.exist(res)
            err.should.have.property 'data'
            err.data.should.have.property 'code'
            err.data.code.should.equal 'call-unavailable'
            done()