import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const SignOutRoute = ({ component: Component, isLoggedIn, path}) => {
  return (
    <Route path={path} render={props => (
      isLoggedIn ? <Redirect to='/chat' /> : <Component {...props} />
    )}/>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth
})

export default connect(mapStateToProps)(SignOutRoute)