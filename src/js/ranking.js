import '../css/ranking.css'
import { db } from './firebase-config';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'

//html elements
const loading_wheel = document.querySelector('.loader')
const main_container = document.querySelector('.main-container')
const usuarios_list = document.querySelector('.usuarios-list')

const usuario_ref = collection(db, 'usuarios')

getDocs(query(usuario_ref, orderBy('pontos', 'desc'), limit(10)))
    .then(snapshot => {
        snapshot.docs.forEach((doc, i) => {
            const usuario = { ...doc.data() }

            let li = document.createElement('li')

            let posicao = document.createElement('span')
            posicao.setAttribute('class', 'posicao')
            posicao.innerHTML = i + 1

            let nome = document.createElement('span')
            nome.setAttribute('class', 'nome')
            nome.innerHTML = usuario.nome

            let pontos = document.createElement('span')
            pontos.setAttribute('class', 'pontos')
            pontos.innerHTML = usuario.pontos

            li.appendChild(posicao)
            li.appendChild(nome)
            li.appendChild(pontos)

            usuarios_list.appendChild(li)

            loading_wheel.style.display = 'none'
            main_container.style.display = 'block'
        })
    })
    .catch(err => console.log(err))

