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

  it 'should get phone number recordings', (done) ->

    client.getPhoneNumbers (err, numbers) ->
      should.not.exist(err)
      numbers.should.be.an.instanceOf(Array)
      (numbers.length > 0).should.be.true
      numbers[0].should.have.property 'number'

      client.getRecordings numbers[0].id, (err, recordings) ->
        should.not.exist(err)
        recordings.should.be.an.instanceOf(Array)
        recordings.should.have.length 0

        done()

  it 'should start recording', (done) ->

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
          client.startRecording response.entityId, (err, res) ->
            should.not.exist(err)
            should.exist(res)
            res.should.have.property 'statusCode'
            res.statusCode.should.equal 200
            done()

  it 'should stop recording', (done) ->

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
          client.stopRecording response.entityId, (err, res) ->
            should.not.exist(err)
            should.exist(res)
            res.should.have.property 'statusCode'
            res.statusCode.should.equal 200
            done()

