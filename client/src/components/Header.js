import React, {Fragment} from 'react'
import './header.css'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import actions from '../actions'

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const {
      history,
      location,
      logout,
      isLoggedIn,
      user,
      schedule
    } = this.props
    let isAdmin = false;
    if (user && schedule) {
      const currentSchedule = user.schedules.find(s=>s.id===schedule.id)
      isAdmin = currentSchedule && currentSchedule.is_admin
    }
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand tag={Link} to="/">Shift Shape</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

              {!isLoggedIn && (
                <Route
                  path="/"
                  render={()=>(<Fragment>
                    <Switch>
                      <Route exact path='/' render={()=>(
                        <NavItem>
                          <NavLink tag={Link} to="/register" >Register</NavLink>
                        </NavItem>
                      )} />
                      <Route path='/' render={()=>(
                        <NavItem>
                          <NavLink tag={Link} to="/" >Log In</NavLink>
                        </NavItem>
                      )}/>
                    </Switch>
                  </Fragment>)}
                />
              )}

              {isLoggedIn && isAdmin && (
                <Fragment>
                  <Route
                    path="/s/:schedule"
                    render={({match}) => (
                      <NavItem>
                        <NavLink tag={Link} to="/dashboard">Dashboard</NavLink>
                      </NavItem>
                    )}
                  />

                  <Route
                    exact path="/s/:schedule"
                    render={({match}) => (
                      <NavItem>
                        <NavLink tag={Link} to={`${match.url}/settings`}>Settings</NavLink>
                      </NavItem>
                    )}
                  />
                  <Route
                    path="/s/:schedule/settings"
                    render={({match}) => (
                      <NavItem>
                        <NavLink tag={Link} to={match.url.replace(/\/settings$/, '')}>Back</NavLink>
                      </NavItem>
                    )}
                  />
                </Fragment>
              )}


              {isLoggedIn && (
                <NavItem>
                  <NavLink onClick={e=>logout(history, location)}>Log Out</NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.users.isLoggedIn,
  user: state.users.user,
  schedule: state.schedules.schedule
})

const mapDispatchToProps = dispatch => bindActionCreators({
    logout: actions.logout,
  }, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
