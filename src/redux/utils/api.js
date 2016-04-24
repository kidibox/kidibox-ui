/* @flow */

import 'isomorphic-fetch'
import { discardToken } from '../modules/auth'

export const API_BASE = 'https://api.kidibox.net'

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

    return fetch(API_BASE + path, options)
      .then((res) => res.json().then((json) => ({ res, json })))
      .then(({ res, json }) => {
        if (!res.ok) {
          if (token && res.status === 401) {
            dispatch(discardToken())
          }

          return Promise.reject(json)
        }

        return json
      })
  }
}

export const get = (path: string): Function => request('GET', path)
export const post = (path: string, payload: FormData|Object): Function => request('POST', path, payload)
export const del = (path: string): Function => request('DELETE', path)
