import { db } from './firebase-config'
import { getDocs, query, collection, orderBy, startAt, endAt } from 'firebase/firestore'

const loading_wheel = document.querySelector('.loader')

//search mechanism
const livros_ref = collection(db, 'livros')
const search_form = document.querySelector('.search-form')
const livros_list = document.querySelector('.livros-list')

search_form.addEventListener('submit', (e) => {
    e.preventDefault()

    //removes elements from last search
    while (livros_list.firstChild) {
        livros_list.removeChild(livros_list.lastChild);
    }

    //shows loading wheel
    loading_wheel.style.display = 'block'

    const nome_livro = search_form.livro.value.toLowerCase()
    
    //query
    getDocs(query(livros_ref, orderBy('titulo_busca'), startAt(nome_livro), endAt(nome_livro + '\uf8ff')))
        .then(snapshot => {
            let livros = []
            snapshot.docs.forEach(doc => {
                livros.push({ id: doc.id, ...doc.data() })
            })

            //checks if there are any results
            if(livros) {
                //add books in the list
                livros.forEach(livro => {
                    let li = document.createElement('li')

                    let titulo = document.createElement('span')
                    titulo.className = 'livro-titulo'
                    titulo.innerHTML = livro.titulo

                    let autor = document.createElement('span')
                    autor.className = 'livro-autor'
                    autor.innerHTML = livro.autor

                    let ano = document.createElement('span')
                    ano.className = 'livro-ano'
                    ano.innerHTML = livro.ano_publicacao

                    let id = document.createElement('input')
                    id.setAttribute("type", "hidden")
                    id.setAttribute("value", livro.id)

                    li.appendChild(id)
                    li.appendChild(titulo)
                    li.appendChild(autor)
                    li.appendChild(ano)
                    livros_list.appendChild(li)
                })
            }
            //hides loading wheel
            loading_wheel.style.display = 'none'
        })
        .catch(err => {
            console.log(err)
            //hides loading wheel
            loading_wheel.style.display = 'none'
        })
})

//redirects the user to livro.html with the livro id as a url param
livros_list.addEventListener('click', (e) => {
    const livro = selectedLivro(e.target, e.target.parentNode)
    const id = livro.children[0].value

    window.location.href = 'livro.html?id=' + id
})

//returns clicked livro (li)
const selectedLivro = (target, target_parent) => {
    if(target_parent.tagName === 'LI') {
        return target_parent
    }

    return target
}