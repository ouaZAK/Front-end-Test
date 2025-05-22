import React, { useEffect, useMemo, useRef, useState } from 'react';
import './TaskForm.css';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify'


const TaskForm = ({ open, onClose, onSave, users , tskId}) => {
const { user, isAdmin } = useAuth();
const [title, setTitle] = useState('Task 01');
const [assignedTo, setAssignedTo] = useState('');
const [description, setDescription] = useState(
	'Note: Add relevant details, blockers, or context for this task here.'
);

const modalRef = useRef(null);
const usersList = useMemo(() => {
	return users.filter(user => user.role !== 'admin')
}, [users])

const handleSave = () => {
	console.log('Current assignedTo before save:', assignedTo); // Debug log
    if (!assignedTo && isAdmin()) {
		toast.error('Please select a user');
        return;
    }
	onSave({
		title,
		assignedTo: isAdmin() ? assignedTo : user.username,
		description,
		status: 'in_progress',
		id: tskId
	});
	onClose();
};

useEffect(() => {
    console.log('assignedTo state updated:', assignedTo);
}, [assignedTo,title, description]);

useEffect(() => {
	const handleClickOutside = (event) => {
	if (modalRef.current && !modalRef.current.contains(event.target)) {
		onClose();
	}
	};

	if (open) {
	document.addEventListener('mousedown', handleClickOutside);
	}

	return () => {
	document.removeEventListener('mousedown', handleClickOutside);
	};
}, [open, onClose]);

if (!open) return null;
return (
	<div className="modal-backdrop">
	<div className="taskform-box" ref={modalRef}>
		<div className='task-assign'>
			<div className="form-group input">
			<label className='task-title-form'>Task title</label>
			<input className='text-input' value={title} onChange={(e) => setTitle(e.target.value)} />
			</div>

			{isAdmin() && (
				<div className="form-group select">
					<label className="task-title-form">Assign to</label>
					<select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
						<option value="">User</option>
						{
							usersList.map((user, key) => (
							<option key={key} value={user.username}>
								{user.username}
							</option>
						))}
					</select>
				</div>
			)}
		</div>

		<div className="form-group">
		<label className='task-title-form'>Description</label>
		<textarea 	className='text-area' placeholder="Note: Add relevant details, blockers, or context for this task here."
					value={description} 
					onChange={(e) => setDescription(e.target.value)} />
		</div>

		<div className="form-buttons">
		<button onClick={onClose} className="cancel-button">Cancel</button>
		<button onClick={handleSave} className="save-button">Save</button>
		</div>
	</div>
	</div>
);
};

export default TaskForm;
