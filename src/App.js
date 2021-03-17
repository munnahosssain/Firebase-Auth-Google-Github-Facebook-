import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import { Button } from '@material-ui/core';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
function App() {
    const [user, setUser] = useState({});
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const githubProvider = new firebase.auth.GithubAuthProvider();

    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                console.log("Google User", user, 'Token', token);
                setUser(user);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential);

            });
    }
    const handleFbSignIn = () => {
        firebase.auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                var credential = result.credential;
                var user = result.user;
                var accessToken = credential.accessToken;
                console.log(accessToken);
                console.log("Facebook user", user);
                setUser(user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential);
            });
    }
    const handleGitHubSignIn = () => {
        firebase.auth()
            .signInWithPopup(githubProvider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                console.log("Github User: ", user, "Token: ", token);
                setUser(user);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential);
            });
    }
    return (
        <div className="App-header">
            <Button variant="contained" color="primary" onClick={handleGoogleSignIn}>google</Button><br />
            <Button variant="contained" color="primary" onClick={handleFbSignIn}>Facebook</Button> <br />
            <Button variant="contained" color="primary" onClick={handleGitHubSignIn}>GitHub</Button>

            <h3>User: {user.displayName}</h3>
            <img src={user.photoURL} alt="" />
        </div>
    );
}

export default App;
