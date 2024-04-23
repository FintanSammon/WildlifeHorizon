import React from 'react';
import { useNavigate } from 'react-router-dom'; // Hook from react-router-dom to navigate between routes
import { getAuth, deleteUser } from 'firebase/auth'; // Firebase authentication functions

// Component for handling user account deletion
const DeleteAccount = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate

    // Function to handle the account deletion process
    const handleDeleteAccount = async () => {
        const auth = getAuth(); // Initialize Firebase Auth
        const user = auth.currentUser; // Get the currently logged-in user

        // Confirm with the user before deleting the account
        const isConfirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
        
        // Proceed only if the action is confirmed and a user is logged in
        if (isConfirmed && user) {
            try {
                await deleteUser(user); // Attempt to delete the user
                
                alert('Your account has been successfully deleted.'); // Notify user of success
                navigate('/'); // Redirect to the home page
            } catch (error) {
                console.error('Error deleting account: ', error); // Log error to console
                alert('An error occurred while deleting your account. Please try again.'); // Notify user of error
            }
        } else {
            alert('No user is currently logged in.'); // Alert if no user is logged in
        }
    };

    // Render a button that when clicked will trigger the account deletion process
    return (
        <div>
            <button onClick={handleDeleteAccount}>Delete My Account</button>
        </div>
    );
};

export default DeleteAccount;
