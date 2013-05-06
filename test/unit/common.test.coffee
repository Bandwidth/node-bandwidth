should = require 'should'
bandwidth = require '../../'

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

  it 'should be available for phone number porting', (done) ->
    check = new bandwidth.LNPAvailabilityCheck("+19193499479")
    client.checkPortInAvailability check, (err, res) ->
      should.not.exist(err)
      should.exist(res)
      res.should.have.property 'available'
      res.available.should.be.true
      done()

  it 'should not be available for phone number porting', (done) ->
    check = new bandwidth.LNPAvailabilityCheck("+19195551212")
    client.checkPortInAvailability check, (err, res) ->
      should.not.exist(err)
      should.exist(res)
      res.should.have.property 'available'
      res.available.should.be.false
      done()


  it 'should get port in state', (done) ->
    client.getPortInState "lnpin-pwjoyuxvij5xthd3tuxctdi", (err, res) ->
      should.not.exist(err)
      should.exist(res)
      # "state" : "submitted" | "created" | "pending-documents" | "submitted" | "foc" | "exception" | "requested-cancel" | "cancelled" | "complete"
      res.should.have.property 'state'
      done()

  it 'should port in phone number', (done) ->
    data = new bandwidth.PortInData "+16882010226",
      # If you don't send requestedFocDate, IRIS picks the earliest available for the losing carrier (recommended)
      # requestedFocDate: "2013-04-08T14:42:47.692Z"

      # Not necessarily the ported number, but the main number on the account, E.164 format
      billingNumber: "+15551112222"

      # Full name of the authorizing person
      loaAuthorizingPerson: "Shaw Terwilliger"

      subscriberType: "business" # or "residential"

      # Required if subscriberType is business
      subscriberBusinessName: "Smith BBQ"

      subscriberFirstName: "John"
      subscriberMiddleInitial: "Q"
      subscriberLastName: "Smith"

      # Only addressHouseNumber, addressStreetName, addressCity, addressStateCode, and addressZip are required
      addressHouseNumber: "5307"
      addressPreDirectional: "NE"
      addressStreetName: "Chrimbus"
      addressStreetSuffix: "Blvd"
      addressPostDirectional: "S"
      addressLine2: "Apartment 123"
      addressCity: "Durham"
      addressStateCode: "NC"
      addressZip: "27713"
      addressZipFour: "6789"

      # For ports from wireless carriers, these may be required
      wirelessAccountNumber: "1234567"
      wirelessPin: "1234"

    client.portIn data, (err, res) ->
      should.not.exist(err)
      should.exist(res)
      res.should.have.property 'entityId'
      done()


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