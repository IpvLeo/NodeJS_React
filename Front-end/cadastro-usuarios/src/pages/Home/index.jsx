import { useEffect , useState, useRef} from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'



/**
 * Componente principal da página inicial.
 * 
 * Este componente permite cadastrar e listar usuários.
 * Inclui um formulário para criar novos usuários e uma lista para exibir usuários existentes.
 * 
 * @component
 * @example
 * return (
 *   <Home />
 * );
 */
function Home() {

const [users, setUsers] = useState([])

const inputName = useRef()
const inputAge = useRef()
const inputEmail = useRef()


/**
   * Obtém a lista de usuários da API e atualiza o estado.
   * 
   * @async
   * @function
   */
  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
    }

/**
   * Cria um novo usuário usando os valores dos campos de entrada e atualiza a lista de usuários.
   * 
   * @async
   * @function
   */
  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    })

    getUsers()
  }

/**
   * Deleta um usuário da lista com base no ID e atualiza a lista de usuários.
   * 
   * @param {number} id - O ID do usuário a ser deletado.
   * @async
   * @function
   */
  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()
    }

useEffect(() => {
  getUsers()
}, [])


  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name='nome' type='text' ref={inputName} />
        <input placeholder="Idade" name='idade' type='number' ref={inputAge} />
        <input placeholder="E-mail" name='email' type='email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => ( 
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span></span>{user.name}</p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span></span>{user.email}</p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>

        
      ))}


    </div>

  )
}

export default Home
