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

  ###
  it 'should get toll-free phone numbers', (done) ->
  
    searchCriteria = new bandwidth.AvailableNumberSearchCriteria()
    searchCriteria.numberType = "tollFree"
    searchCriteria.quantity = 2
    client.getAvailableNumbers searchCriteria, (err, numbers) ->
      should.not.exist(err)
      numbers.should.be.an.instanceOf(Array)
      numbers.should.have.length 2
      numbers[0].should.have.property 'number'
  
      done()
  ###


  it 'should get two local phone numbers', (done) ->
  
    searchCriteria = new bandwidth.AvailableNumberSearchCriteria()
    searchCriteria.numberType = "local"
    searchCriteria.state = "NC"
    searchCriteria.quantity = 2
    client.getAvailableNumbers searchCriteria, (err, numbers) ->
      should.not.exist(err)
      numbers.should.be.an.instanceOf(Array)
      numbers.should.have.length 2

      number = numbers[0]
      number.should.have.property 'number'
      number.should.have.property 'city'
      number.should.have.property 'state'
      number.should.have.property 'rateCenter'
  
      done()

  it 'should get all messages', (done) ->
    client.getMessages (err,messages) ->
      should.not.exist(err)
      messages.should.be.an.instanceOf(Array)
      (messages.length > 0).should.be.true

      done()

  it 'should get phone number details', (done) ->

    client.getPhoneNumbers (err, numbers) ->
      should.not.exist(err)
      numbers.should.be.an.instanceOf(Array)
      (numbers.length > 0).should.be.true
      numbers[0].should.have.property 'number'

      client.getPhoneNumber numbers[0].id, (err, number) ->
        should.not.exist(err)
        number.should.have.property 'number'
        numbers[0].number.should.equal number.number

        done()

  #TEST PASSED
  ###
  it 'should buy new local phone number', (done) ->
    searchCriteria = new bandwidth.AvailableNumberSearchCriteria()

    searchCriteria.numberType = "local"
    searchCriteria.state = "NC"
    searchCriteria.quantity = 2

    client.getAvailableNumbers searchCriteria, (err, numbers) ->
      should.not.exist(err)
      numbers.should.be.an.instanceOf(Array)
      numbers.should.have.length 2
      numbers[0].should.have.property 'number'

      phoneNumber = new bandwidth.PhoneNumber(numbers[0].number,"Home Phone")
      client.acquirePhoneNumber phoneNumber, (err,response) ->
        should.not.exist(err)
        response.should.have.property 'entityId'
        client.getPhoneNumber response.entityId, (err,number) ->
          should.not.exist(err)
          number.should.have.property 'number'
          numbers[0].number.should.equal number.number

          done()
  ###
