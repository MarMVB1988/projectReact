import React, { useState, useRef } from "react";

import axios from "axios";
import People from './assets/img 1.svg'
import Arrow from './assets/arrow.svg'
import Trash from './assets/trash.svg'

import {
  Container,
  H1,
  Image,
  ContainerItens,
  InputLabel,
  Input,
  Button,
  User
} from "./styles";


function App() {
  const [users, setUsers] = useState([])
  const inputName = useRef()
  const inputAge = useRef()


  async function addNewUser() {
    const  { data: newUser} = await axios.post("http://localhost:3001/users", {
      name: inputName.current.value, 
      age: inputAge.current.value,
    });

    

    setUsers([...users, newUser
      // {
      //   id: Math.random(),
      //   name: inputName.current.value,
      //   age: inputAge.current.value,
      // }
  ])
  }

  function deleteUser(userId) {
    const newUsers = users.filter( user => user.id !== userId)
    setUsers(newUsers)
  }

  return (
    <Container>

      <Image alt='logo-image' src={People}></Image>
      <ContainerItens>
        <H1>Olá!</H1>

        <InputLabel>Name</InputLabel>
        <Input ref={inputName} placeholder="Name"></Input>

        <InputLabel>Age</InputLabel>
        <Input ref={inputAge} placeholder="Age"></Input>

        <Button onClick={addNewUser}>Register <img alt='seta' src={Arrow} /></Button>

       <ul>
          
          {users.map((user) => (
            <User key={user.id}>
              <p>key={user.name}</p>  <p>{user.age}</p>
              <button onClick={() => deleteUser(user.id)}>
                <img alt="lixo" src={Trash}/>
              </button>
            </User>
          ))}

        </ul>
      </ContainerItens>
    </Container>
  );
}

export default App;