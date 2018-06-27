require('isomorphic-fetch')
const _ = require('lodash')
module.exports = {
  get (url, authorization) {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (authorization) {
      headers = {
        'Content-Type': 'application/json',
        'Authorization': authorization
      }
    }
    return fetch(url, {
      method: 'GET',
      headers: headers
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        console.log(`get ${url} is error,status is ${response.status}`)
        return ''
      }
    })
  },

  getWithHeaders (url, headers) {
    return fetch(url, {
      method: 'GET',
      headers: headers
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        console.log(`get ${url} is error,status is ${response.status}`)
        return ''
      }
    })
  },
  postEeo (url, body) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: _.map(body, (value, key) => {
        return key + '=' + value
      }).join('&')
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        console.log(`post ${url} is error,status is ${response.status}`)
        return ''
      }
    })
  },
  post (url, body) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        console.log(`post ${url} is error,status is ${response.status}`)
        return ''
      }
    })
  },
  put (url, body) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        console.log(`put ${url} is error,status is ${response.status}`)
        return ''
      }
    })
  }
}
