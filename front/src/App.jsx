
import { useEffect, useState } from 'react';
import './App.css'

function Bouton({ texte, couleur }) {
  return <button style={{ backgroundColor: couleur, padding: "20px" }}>{texte}</button>
}



// Composant React
function App() {

  const prenom = "John";

  const [todos, setTodos] = useState([]);
  console.log("RENDER");

  async function getAllTodos() {
    const reponse = await fetch('http://localhost:3001/todos');
    const data = await reponse.json();
    console.log(data);

    setTodos(data.todos)
    return data;
  }
  useEffect(() => {
    getAllTodos()
  }, [])

  return (
    <>
      <h1>Salut {prenom}</h1>
      <Bouton couleur="purple" texte="Inscription" />
      <Bouton couleur="green" texte="Ajouter" />

      <div>
        {todos.map((todo) => <h2>{todo.titre}</h2>)}

      </div>
    </>
  )
}

export default App
