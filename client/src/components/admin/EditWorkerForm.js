import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import actions from '../../actions'
import {
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	FormFeedback,
	FormText,
	Label,
	Input,
	Button,
} from 'reactstrap'

class EditWorkerForm extends Component {
	state = {
		firstName: this.props.worker.first_name,
		lastName: this.props.worker.last_name,
		isTraining: this.props.worker.is_training,
	}

	handleSubmit = ev => {
		ev.preventDefault()
		this.props.editWorker(
			{
				first_name: this.state.firstName,
				last_name: this.state.lastName,
				is_training: this.state.isTraining,
				id: this.props.worker.id,
				schedule_id: this.props.schedule.id,
			},
			this.props.schedule.url_name,
		)
	}

	render() {
		const isSubmitDisabled = !this.state.firstName || !this.state.lastName
		return (
			<Fragment>
				<ModalHeader>Edit Employee</ModalHeader>
				<ModalBody>
					<Form onSubmit={this.handleSubmit}>
						<FormGroup>
							<Label for="firstName">First Name</Label>
							<Input
								type="text"
								name="first_name"
								id="firstName"
								onChange={ev => this.setState({ firstName: ev.target.value })}
								value={this.state.firstName}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="lastName">Last Name</Label>
							<Input
								type="text"
								name="last_name"
								id="lastName"
								onChange={ev => this.setState({ lastName: ev.target.value })}
								value={this.state.lastName}
							/>
						</FormGroup>
						<FormGroup check>
							<Label check>
								<Input type="checkbox" /> Employee is Currently In-Training
							</Label>
						</FormGroup>
						<Button
							color="primary"
							disabled={isSubmitDisabled}
							type="submit"
							onClick={this.props.toggle}
						>
							Submit
						</Button>
					</Form>
				</ModalBody>
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
	schedule: state.schedules.schedule,
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			editWorker: actions.editWorker,
		},
		dispatch,
	)

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(EditWorkerForm),
)
