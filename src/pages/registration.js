import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export function registerUser(email, password, onRegistrationSuccess) {
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Registered with:', userCredential.user.email);
      onRegistrationSuccess();
    })
    .catch((error) => {
      console.error('Registration error:', error.message);
    });
}
