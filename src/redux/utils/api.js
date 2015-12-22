import 'isomorphic-fetch'
import { discardToken, requireLogin } from '../modules/auth'

// export const API_BASE = '//api.kidibox.net/api'
// export const API_BASE = 'https://kidiBook:3000'
export const API_BASE = 'https://api.kidibox.net'

export const get = (path) => (dispatch, getState) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const { auth: { token } } = getState()

  if (token) {
    headers['Authorization'] = 'Bearer ' + token
  }

  return fetch(API_BASE + path, { headers })
    .then((res) => ({ res, json: res.json() }))
    .then(({ res, json }) => {
      if (!res.ok) {
        if (res.status === 401) {
          dispatch(discardToken())
          dispatch(requireLogin())
        }

        return Promise.reject(json)
      }

      return json
    })
}

export const post = (path, payload) => (dispatch, getState) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const { auth: { token } } = getState()

  if (token) {
    headers['Authorization'] = 'Bearer ' + token
  }

  return fetch(API_BASE + path, { method: 'POST', headers, body: JSON.stringify(payload) })
    .then((res) => ({ res, json: res.json() }))
    .then(({ res, json }) => {
      if (!res.ok) {
        if (res.status === 401) {
          dispatch(discardToken())
          dispatch(requireLogin())
        }

        return Promise.reject(json)
      }

      return json
    })
}
