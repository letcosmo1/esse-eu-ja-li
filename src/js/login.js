import { auth } from './firebase-config';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

const sigin_form = document.querySelector('.signin-form')
const login_err = document.querySelector('.login-err')

sigin_form.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = sigin_form.email.value
    const senha = sigin_form.senha.value

    signInWithEmailAndPassword(auth, email, senha)
        .then(cred => {
            console.log(cred)
            login_err.style.display = 'none'
            window.location.href = 'index.html'
        })
        .catch(() => {
            login_err.style.display = 'block'
        })
})
