import '../css/livro.css'
import { db, auth } from './firebase-config'
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'

//html elements
const livro_container = document.querySelector('.livro-container')
const titulo = document.querySelector('.titulo')
const ano = document.querySelector('.ano')
const sinopse = document.querySelector('.sinopse')
const genero = document.querySelector('.genero')
const autor = document.querySelector('.autor')
const paginas = document.querySelector('.paginas')
const info_loader = document.querySelector('.info-loader')
const checkbox_loader = document.querySelector('.checkbox-loader')
const checkbox_container = document.querySelector('.checkbox-container')
const checkbox = document.querySelector('.livro-checkbox')

//states
let livro = {}
let livros_lidos = []
let usuario_doc_id = ''
let pontos_usuario = 0;
let trofeus = []

//getting livro id from url
const url_param = new URLSearchParams(window.location.search).get('id');
//checks if the param exists
const livro_id = url_param ? url_param : ''

if (livro_id !== '') {
    //gets livro ref from db
    const livro_ref = doc(db, 'livros', livro_id)

    //gets livro from db and updates livro state
    getDoc(livro_ref)
        .then(doc => {
            livro = { id: doc.id, ...doc.data() }

            titulo.innerHTML = livro.titulo
            ano.innerHTML = livro.ano_publicacao
            sinopse.innerHTML = livro.sinopse
            genero.innerHTML = livro.genero
            autor.innerHTML = livro.autor
            paginas.innerHTML = livro.n_paginas

            info_loader.style.display = 'none'
            livro_container.style.display = 'block'
        })
        .catch(err => console.log(err))

    //loads auth
    auth.authStateReady()
        .then(() => {
            //this section gets the usuario info from db and updates the states
            //and sets the book read checkbox status 

            const user = auth.currentUser

            //gets the user id from auth
            const uid = user.uid
            const usuarios_ref = collection(db, 'usuarios')

            //gets the current user doc from the usuario colletion
            getDocs(query(usuarios_ref, where('uid', '==', uid)))
                .then(snapshot => {
                    let usuario = {}
                    snapshot.docs.forEach(doc => {
                        usuario = { doc_id: doc.id, ...doc.data() }
                    })
                    //updates state with the usuario info
                    usuario_doc_id = usuario.doc_id
                    livros_lidos = usuario.livros_lidos
                    pontos_usuario = usuario.pontos
                    trofeus = usuario.trofeus

                    //checks if this book is in the books read array
                    //and updates the checkbox accordingly
                    usuario.livros_lidos.forEach((livro) => {
                        if (livro.id === livro_id) checkbox.setAttribute('checked', '')
                    })
                    //hiddes loader and shows checkbox
                    checkbox_loader.style.display = 'none'
                    checkbox_container.style.display = 'flex'
                })
                .catch(err => console.log(err))
        })

    //watches the checkbox for changes and updates the db
    checkbox.addEventListener('change', e => {
        //calc livro points
        let pontos_livro = 1
        pontos_livro += Math.floor(livro.n_paginas / 100)

        //gets usuario ref from db
        const usuario_doc_ref = doc(db, 'usuarios', usuario_doc_id)

        //if checkbox is changed to true adds livro else removes livro from db
        if (e.target.checked) {
            addLivro(usuario_doc_ref, pontos_livro)
        } else {
            removeLivro(usuario_doc_ref, pontos_livro)
        }
    })

    const addLivro = (usuario_doc_ref, pontos_livro) => {
        //adds this livro points to the points of the usuario
        pontos_usuario += pontos_livro

        //checks if this book genre exists in the user's trofeus field
        let flag = true
        trofeus.forEach(trofeu => {
            if (trofeu.genero === livro.genero) {
                trofeu.qtd_lida += 1
                flag = false
            }
        })
        //if the genre doesnt exists create an object on the trofeus array
        if (flag) trofeus.push({ genero: livro.genero, qtd_lida: 1 })

        //pushes current book in the livros_lidos state
        livros_lidos.push(
            {
                ano_publicacao: livro.ano_publicacao,
                autor: livro.autor,
                id: livro.id,
                titulo: livro.titulo,
                n_paginas: livro.n_paginas,
                genero: livro.genero
            })
        
        //updates usuario doc with the added livros_lidos array
        //new usuario points and trofeus array 
        updateDoc(usuario_doc_ref, { livros_lidos, pontos: pontos_usuario, trofeus })
    }

    const removeLivro = (usuario_doc_ref, pontos_livro) => {
        //subtracts this livro points from points of the usuario
        pontos_usuario -= pontos_livro

         //checks if this book genre exists in the user's trofeus field
         //and subtracts this book
        trofeus.forEach(trofeu => {
            if (trofeu.genero === livro.genero) {
                trofeu.qtd_lida -= 1
            }
        })

        //filters this book from the livros_lidos array
        livros_lidos = livros_lidos.filter(livro => livro.id !== livro_id)
        
        updateDoc(usuario_doc_ref, { livros_lidos, pontos: pontos_usuario, trofeus })
    }
}


