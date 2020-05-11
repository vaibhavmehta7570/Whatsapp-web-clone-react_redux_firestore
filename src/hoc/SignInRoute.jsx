import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const SignInRoute = ({ component: Component, isLoggedIn, path}) => {
  return (
    <Route path={path} render={props => (
      isLoggedIn ? <Component {...props} /> : <Redirect to='/login' />
    )}/>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth
})

export default connect(mapStateToProps)(SignInRoute)

