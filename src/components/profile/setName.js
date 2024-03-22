import { useState } from 'react';
import { updateUserProfileApi } from '../../service/apiServices';

const SetName = ({ user, onSave, onCancel }) => {
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);

	const handleInputChange = (setter) => (e) => {
		setter(e.target.value);
	};

	const handleSave = async () => {
		try {
			const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
			const response = await updateUserProfileApi({ firstName, lastName }, token);
			console.log('Success:', response.data);
			onSave({ firstName, lastName });
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div className='set-name-container'>
			<div className='set-name-input'>
				<input type='text' placeholder='First Name' value={firstName} onChange={handleInputChange(setFirstName)} />
				<input type='text' placeholder='Last Name' value={lastName} onChange={handleInputChange(setLastName)} />
			</div>
			<div className='set-name-btn'>
				<button onClick={handleSave}>Save</button>
				<button onClick={onCancel}>Cancel</button>
			</div>
		</div>
	);
};

export default SetName;
