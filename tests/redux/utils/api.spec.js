import fetchMock from 'fetch-mock'
import { get, post } from 'redux/utils/api'
import { DISCARD_TOKEN } from 'redux/modules/auth'

const RELATIVE_URL = '/foo'
const ABSOLUTE_URL = 'https://api.kidibox.net/foo'

describe('(Redux Utils) Api', function () {
  let _dispatch, _getState, _state

  beforeEach(function () {
    _dispatch = sinon.spy()
    _getState = sinon.spy(() => _state)

    _state = { auth: {} }
  })

  afterEach(function () {
    expect(fetchMock.calls().unmatched.length).to.equal(0)

    fetchMock.calls().matched.forEach(([_, { headers }]) => {
      expect(headers).to.have.property('Accept', 'application/json')
    })

    fetchMock.restore()
  })

  describe('request()', function () {
    it('should make a HTTP request to the correct path', function () {
      fetchMock.mock(ABSOLUTE_URL, 'GET', 204)

      return get(RELATIVE_URL)(_dispatch, _getState).then(() => {
        expect(fetchMock.called(ABSOLUTE_URL)).to.be.true
        expect(fetchMock.lastOptions(ABSOLUTE_URL).method).to.equal('GET')
      })
    })

    it('should ignore the payload for GET request', function () {
      fetchMock.mock(ABSOLUTE_URL, 'GET', 204)

      return get(RELATIVE_URL, { foo: 'bar' })(_dispatch, _getState).then(() => {
        expect(fetchMock.called(ABSOLUTE_URL)).to.be.true
        expect(fetchMock.lastOptions(ABSOLUTE_URL).body).to.be.undefined
      })
    })

    it('should set the payload for POST request', function () {
      fetchMock.mock(ABSOLUTE_URL, 'POST', 204)

      return post(RELATIVE_URL, { foo: 'bar' })(_dispatch, _getState).then(() => {
        expect(fetchMock.called(ABSOLUTE_URL)).to.be.true
        expect(JSON.parse(fetchMock.lastOptions(ABSOLUTE_URL).body)).to.be.eql({ foo: 'bar' })
      })
    })

    it('should resolve with the response if the request was successful but not json', function () {
      fetchMock.mock(ABSOLUTE_URL, 'GET', 200)
      return get(RELATIVE_URL)(_dispatch, _getState).should.be.fulfilled
    })

    it('should ignore the payload for GET request', function () {
      fetchMock.mock(ABSOLUTE_URL, 'GET', 204)

      return get(RELATIVE_URL, { foo: 'bar' })(_dispatch, _getState).then(() => {
        expect(fetchMock.called(ABSOLUTE_URL)).to.be.true
        expect(fetchMock.lastOptions(ABSOLUTE_URL).body).to.be.undefined
      })
    })

    it('should reject with the payload if the request was not successful', function () {
      fetchMock.mock(ABSOLUTE_URL, 'GET', { status: '500', body: { foo: 'bar' } })
      return get(RELATIVE_URL)(_dispatch, _getState).should.be.rejectedWith({ foo: 'bar' })
    })

    describe('When authenticated', function () {
      beforeEach(function () {
        _state.auth.token = 'foobarbaz'
      })

      it('should set the Authorization header on GET requests', function () {
        fetchMock.mock(ABSOLUTE_URL, 'GET', 204)

        return get(RELATIVE_URL)(_dispatch, _getState).then(() => {
          expect(fetchMock.lastOptions(ABSOLUTE_URL).headers).to.have.property('Authorization', 'Bearer foobarbaz')
        })
      })

      it('should set the Authorization header on POST requests', function () {
        fetchMock.mock(ABSOLUTE_URL, 'POST', 204)

        return post(RELATIVE_URL)(_dispatch, _getState).then(() => {
          expect(fetchMock.lastOptions(ABSOLUTE_URL).headers).to.have.property('Authorization', 'Bearer foobarbaz')
        })
      })

      it('should dispatch DISCARD_TOKEN on 401 on GET requests', function () {
        fetchMock.mock(ABSOLUTE_URL, 'GET', 401)

        return get(RELATIVE_URL)(_dispatch, _getState).catch(() => {
          _dispatch.should.have.been.calledWith({ type: DISCARD_TOKEN })
        })
      })

      it('should dispatch DISCARD_TOKEN on 401 on POST requests', function () {
        fetchMock.mock(ABSOLUTE_URL, 'POST', 401)

        return post(RELATIVE_URL)(_dispatch, _getState).catch(() => {
          _dispatch.should.have.been.calledWith({ type: DISCARD_TOKEN })
        })
      })
    })

    describe('When the server return an error', function () {
      it('should parse the response if it contain json', function () {
        fetchMock.mock(ABSOLUTE_URL, 'POST', {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
          body: { foo: 'bar' }
        })

        return post(RELATIVE_URL, { foo: 'bar' })(_dispatch, _getState).catch((json) => {
          expect(json).to.be.eql({ foo: 'bar' })
        })
      })
    })

    describe('When posting an object', function () {
      it('should set the Content-Type header', function () {
        fetchMock.mock(ABSOLUTE_URL, 'POST', { foo: 'bar' })

        return post(RELATIVE_URL, { foo: 'bar' })(_dispatch, _getState).then(() => {
          expect(fetchMock.lastOptions(ABSOLUTE_URL).headers).to.have.property('Content-Type', 'application/json')
        })
      })
    })

    describe('When posting FormData', function () {
      it('should not set the Content-Type header', function () {
        fetchMock.mock(ABSOLUTE_URL, 'POST', { foo: 'bar' })

        return post(RELATIVE_URL, new FormData())(_dispatch, _getState).then(() => {
          expect(fetchMock.lastOptions(ABSOLUTE_URL).headers).to.not.have.property('Content-Type')
        })
      })
    })
  })
})
