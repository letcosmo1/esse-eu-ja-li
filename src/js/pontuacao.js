import '../css/pontuacao.css'
import { db, auth } from './firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore'

//html elements
const pontos = document.querySelector('.pontos')
const trofeus_list = document.querySelector('.trofeus-list')
const loading_wheel = document.querySelector('.loader')
const main_container = document.querySelector('.main-container')

auth.authStateReady()
    .then(() => {
        const uid = auth.currentUser.uid
        const usuarios_ref = collection(db, 'usuarios')

         //gets the current user doc from the usuario colletion
         getDocs(query(usuarios_ref, where('uid', '==', uid)))
         .then(snapshot => {
             let usuario = {}
             snapshot.docs.forEach(doc => {
                 usuario = { ...doc.data() }
             })
             
             pontos.innerHTML = usuario.pontos

             usuario.trofeus.forEach(trofeu => {
                if(trofeu.qtd_lida >= 5) {
                    let li = document.createElement('li')

                    let nome = document.createElement('p')
                    nome.innerHTML = `LEITOR DE ${trofeu.genero.toUpperCase()}`

                    li.appendChild(nome)
                    trofeus_list.appendChild(li)
                }
             })
             loading_wheel.style.display = 'none'
             main_container.style.display = 'block'
         })
         .catch(err => console.log(err))
    })