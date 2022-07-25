import React,{useEffect, useState} from "react";
import axios from 'axios';

import TablaInventario from './components/TablaInventario';

function App() {
  const baseUrl="http://localhost/ApiInventario/"
  const [data, setData]=useState([]);

  const peticionGet=async()=>{
    try {
      const resp = await axios.get(baseUrl)
      setData( resp.data )
    } catch (error) {
      console.log( error )
    }
  };

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div className="App">
   
      <TablaInventario data={ data } />
    </div>
  );
}

export default App;
