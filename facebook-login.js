/**
 * Manages facebook sign-in to a web app.
 * Asks for user permissions to allow scopes.
 * Re-triggers asking for permissions if a user disabled the required scope.
 */
class FacebookLogin {
  constructor () {
    // User scopes to ask for access permission
    this.scopesList = 'email,user_likes,user_age_range,user_birthday,user_location,user_friends'

    // Keys for user allowed scopes values to retrieve
    this.queryUserFields = 'id,name,birthday,email'
  }

  /**
   * Sign-in to facebook using FB.login().
   * Requests for scope permissions.
   */
  FBLogin () {
    this.printInfo('')
    const that = this

    FB.login(function(response) {
      const { authResponse } = response
      if (response.authResponse && authResponse.accessToken) {
        if (!authResponse.grantedScopes.includes('email')) {
          this.printInfo('Email is required')
          alert('Email is required')
          return
        }
  
        console.log('Welcome! Fetching your information...')
  
        // Retrieve allowed scope values using Graph API from client.
        // that.getUserInfo(response.authResponse)
  
        // Retrieve allowed scope values using Graph API from server.
        // that.getUserDetails(response.authResponse)
  
        // Retrieve allowed scope values
        FB.api('/me', 'GET', {fields: that.queryUserFields}, function(response) {
          console.log(response)
          console.log(`Good to see you, ${response.name}`)
          that.printInfo(JSON.stringify(response))
        })
      } else {
        console.log('User cancelled login or did not fully authorize.')
      }
    }, {
      scope: this.scopesList,
      auth_type: 'rerequest',
      return_scopes: true
    })
  }

  /**
   * Display string information in the logs section.
   * @param {String} info String information.
   */
  printInfo (info) {
    document.querySelector('.logs').innerText = info
  }

  /**
   * Retrieve allowed scope values using the Graph API from client.
   * @param {Object} token access token for allowed user permission scopes.
   */
  async getUserInfo (token) {
    const queryUrl = `https://graph.facebook.com/v7.0/me?fields=${this.queryUserFields}&access_token=${token.accessToken}`
    let response = await fetch(queryUrl)
  
    if (response.ok) {
      let json = await response.json()
      this.printInfo(JSON.stringify(json))
    } else {
      this.printInfo(`Error: ${response.status}`)
    }
  }

  /**
   * Retrieve allowed scope values using the Graph API from server.
   * @param {Object} token access token for allowed user permission scopes.
   */
  async getUserDetails (token) {
    const response = await fetch('/fb-getdata', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(token)
    })

    if (response.ok) {
      let text = await response.text()
      this.printInfo(text)
    } else {
      this.printInfo(`Error: ${response.status}`)
    }
  }  

  /**
   * Check if an FB user is currently signed-in
   */
  checkLoginStatus () {
    const that = this
    FB.getLoginStatus(function(response) {
      console.log(response)
  
      if (response.authResponse) {
        console.log('someone is signed in!')
        that.printInfo(`Welcome, ${response.authResponse.userID}!`)
      }
    })
  }
}