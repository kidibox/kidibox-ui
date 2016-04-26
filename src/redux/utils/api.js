/* @flow */

import 'isomorphic-fetch'
import { discardToken } from '../modules/auth'

export const API_BASE = 'https://api.kidibox.net'

function containsJson (response) {
  return response.status !== 204 &&
    response.headers.has('Content-Type') &&
    response.headers.get('Content-Type').toLowerCase().startsWith('application/json')
}

function request (method = 'GET', path: string, payload?: FormData|Object): Function {
  return (dispatch, getState): Promise => {
    const { auth: { token } } = getState()
    const options: FetchOptions = {
      headers: {
        'Accept': 'application/json'
      }
    }

    if (method) {
      options.method = method
    }

    if (method !== 'GET' && payload) {
      if (payload instanceof FormData) {
        options.body = payload
      } else {
        options.body = JSON.stringify(payload)
        options.headers = {
          ...options.headers,
          'Content-Type': 'application/json'
        }
      }
    }

    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: 'Bearer ' + token
      }
    }

    return fetch(API_BASE + path, options).then((response) => {
      if (response.ok) {
        return containsJson(response) ? response.json() : response
      } else {
        if (token && response.status === 401) {
          dispatch(discardToken())
        }

        if (containsJson(response)) {
          return response.json().then((json) => Promise.reject(json))
        }

        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    })
  }
}

export const get = (path: string): Function => request('GET', path)
export const post = (path: string, payload: FormData|Object): Function => request('POST', path, payload)
export const del = (path: string): Function => request('DELETE', path)
