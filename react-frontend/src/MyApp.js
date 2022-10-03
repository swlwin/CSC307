import React, {useState, useEffect} from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios';


function MyApp()
{
  const [characters, setCharacters] = useState([]);

  //=== FUNCTIONS =======================================//
  function updateList(person){
    makePostCall(person).then(result => {
      if(result && result.status === 201)
      setCharacters([...characters, person]);
    });
  }

  function removeOneCharacter (index) 
  {
    makeDeleteCall(index).then(response => 
    {
      if (response && response.status === 204)
      {
        const updated = characters.filter( (character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }
      else if (response.status === 404)
      {
        console.log('User to be deleted not found');
      }
    });
  }
  //====================================================//

   //=== ASYNC FUNCTION =================================//
  //Linking Frontend with Backend (Assignemnt 3)
  async function fetchAll()
  {
    try{
      const response = await axios.get('http://localhost:5000/users')
      return response.data.users_list;
    }
    catch (error){
      //We ar not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  async function makePostCall(person)
  {
    try{ 
      const response = await axios.post('http://localhost:5000/users', person)
      .then(response => {
        setCharacters(characters=> [...characters,response.data]);
      });
      return response;
    }
    catch(error){
      console.log(error); 
      return false;
    }
  }

  async function makeDeleteCall(index)
  {
    try{
      const response = await axios.delete(`http://localhost:5000/users/${characters[index].id}`);
      return response;
    }
    catch (error) { 
      console.log(error);
      return false;
    }
  }
  //=====================================================//
  
  useEffect(()=>{
    fetchAll().then( result => {
      if(result)
        setCharacters(result);
    });
  }, [] );

  return (
  <div className="container">
    <Table characterData={characters} removeCharacter = {removeOneCharacter} />
    <Form handleSubmit = {updateList}/>
  </div>
  )
}
export default MyApp;