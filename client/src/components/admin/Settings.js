import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import actions from '../../actions'
import { ListGroup, ListGroupItem, Modal } from 'reactstrap'
import AddWorkerForm from './AddWorkerForm'
import EditWorkerForm from './EditWorkerForm'
import FaTrash from 'react-icons/lib/fa/trash'
import FaPencil from 'react-icons/lib/fa/pencil'
import Plus from 'react-icons/lib/fa/plus-circle'

class Settings extends Component {
	state = {
		addModal: false,
		editModal: false,
		workerToEdit: null,
	}

	toggleAddModal = () => {
		this.setState({ addModal: !this.state.addModal })
	}

	toggleEditModal = () => {
		this.setState({ editModal: !this.state.editModal })
	}

	handleDeleteClick = ev => {
		this.props.deleteWorker(this.props.schedule.url_name, ev.currentTarget.id)
	}

	handleEditClick = ev => {
		const workerToEdit = this.props.schedule.workers.find(
			w => w.id === +ev.currentTarget.id,
		)
		console.log(workerToEdit)
		this.setState({ workerToEdit, editModal: !this.state.editModal })
	}

	render() {
		const workers = this.props.schedule.workers || []
		const workerElements = workers.sort((a, b) => a.id - b.id).map(w => (
			<ListGroupItem key={w.id}>
				<FaTrash id={w.id} onClick={this.handleDeleteClick} />
				<FaPencil id={w.id} onClick={this.handleEditClick} />
				{w.first_name + ' ' + w.last_name}
			</ListGroupItem>
		))

		return (
			<div>
				<h3>Settings</h3>
				<ListGroup>
					{workerElements}
					<ListGroupItem onClick={this.toggleAddModal}>
						<Plus />
						Add New Employee
					</ListGroupItem>
				</ListGroup>
				<Modal isOpen={this.state.addModal} toggle={this.toggleAddModal}>
					<AddWorkerForm toggle={this.toggleAddModal} />
				</Modal>
				<Modal isOpen={this.state.editModal} toggle={this.toggleEditModal}>
					<EditWorkerForm
						toggle={this.toggleEditModal}
						worker={this.state.workerToEdit}
					/>
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	// errorMsg: state.schedules.errorMsg,
	schedule: state.schedules.schedule,
})

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			deleteWorker: actions.deleteWorker,
			editWorker: actions.editWorker,
		},
		dispatch,
	)

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Settings),
)
