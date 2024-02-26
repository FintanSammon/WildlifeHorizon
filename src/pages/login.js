import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorMessage);
    });
}
