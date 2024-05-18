import '../css/index.css'
import { auth } from './firebase-config';
import { signOut } from 'firebase/auth'

//logout mechanism
const logout_button = document.querySelector('.logout-button')
logout_button.addEventListener('click', () => {
    console.log('hi')
    signOut(auth)
        .then(() => window.location.href = "login.html")
        .catch(err => console.log(err))
})

//checks if the user is logged in
auth.authStateReady()
    .then(() => {
        if (!auth.currentUser) window.location.replace('login.html')
    })
    .catch(err => console.log(err))