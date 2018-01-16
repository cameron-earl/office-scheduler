import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap'

const Dashboard = ({user}) => {
  const scheduleElements = user.schedules.map(s=>(
    <ListGroupItem key={s.id} tag={Link} to={`/s/${s.url_name}`}>
      {s.display_name}
    </ListGroupItem>
  ))
  return (
    <div>
      <h3>Welcome, {user.firstName}!</h3>
      <ListGroup>
        { scheduleElements }
        <ListGroupItem tag={Link} to="/createschedule">
          Create New Schedule
        </ListGroupItem>
      </ListGroup>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.users.user
})

export default withRouter(connect(
  mapStateToProps,
  null
)(Dashboard))
