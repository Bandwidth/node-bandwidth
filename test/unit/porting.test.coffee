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

  it 'should cancel port in', (done) ->
    client.cancelPortIn "lnpin-pwjoyuxvij5xthd3tuxctdi", (err, res) ->
      should.not.exist(err)
      should.exist(res)
      res.should.have.property 'statusCode'
      res.statusCode.should.equal 202
      done()

  it 'should upload LOA', (done) ->
    file = path.resolve(__dirname, './MyLetter.pdf')
    client.uploadLOA "lnpin-pwjoyuxvij5xthd3tuxctdi", file, (err, res) ->
      should.not.exist(err)
      should.exist(res)
      res.should.have.property 'statusCode'
      res.statusCode.should.equal 200
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
      should.exist(err)
      should.not.exist(res)
      err.should.have.property 'data'
      err.data.should.have.property 'code'
      err.data.code.should.equal 'lnp-order-validation-error'
      done()