import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, deleteUser } from 'firebase/auth';

const DeleteAccount = () => {
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        const isConfirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
        
        if (isConfirmed && user) {
            try {
                await deleteUser(user);
                
                alert('Your account has been successfully deleted.');
                navigate('/');
            } catch (error) {
                console.error('Error deleting account: ', error);
                alert('An error occurred while deleting your account. Please try again.');
            }
        } else {
            alert('No user is currently logged in.');
        }
    };

    return (
        <div>
            <button onClick={handleDeleteAccount}>Delete My Account</button>
        </div>
    );
};

export default DeleteAccount;
