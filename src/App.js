import React,{useEffect, useState} from "react";
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const baseUrl="http://localhost/ApiInventario/"
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [productoSeleccionado, setproductoSeleccionado]=useState({
    id: '',
    Nombre: '',
    Precio: '',
    PrecioMayoreo: '',
    PrecioTalleres:'',
    PrecioPublico:'',
    StockTienda: '',
    StockBodega:'',
    Marca: ''
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setproductoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(productoSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    var f = new FormData();
    f.append("Nombre", productoSeleccionado.Nombre);
    f.append("Precio", productoSeleccionado.Precio);
    f.append("PrecioMayoreo", productoSeleccionado.PrecioMayoreo);
    f.append("PrecioTalleres", productoSeleccionado.PrecioTalleres);
    f.append("PrecioPublico", productoSeleccionado.PrecioPublico);
    f.append("StockTienda", productoSeleccionado.StockTienda);
    f.append("StockBodega", productoSeleccionado.StockBodega);
    f.append("Marca", productoSeleccionado.Marca);

    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("Nombre", productoSeleccionado.Nombre);
    f.append("Precio", productoSeleccionado.Precio);
    f.append("PrecioMayoreo", productoSeleccionado.PrecioMayoreo);
    f.append("PrecioTalleres", productoSeleccionado.PrecioTalleres);
    f.append("PrecioPublico", productoSeleccionado.PrecioPublico);
    f.append("StockTienda", productoSeleccionado.StockTienda);
    f.append("StockBodega", productoSeleccionado.StockBodega);
    f.append("Marca", productoSeleccionado.Marca);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: productoSeleccionado.id}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(producto=>{
        if(producto.id===productoSeleccionado.id){
          producto.Nombre=productoSeleccionado.Nombre;
          producto.Precio=productoSeleccionado.Precio;
          producto.PrecioMayoreo=productoSeleccionado.PrecioMayoreo;
          producto.PrecioTalleres=productoSeleccionado.PrecioTalleres;
          producto.PrecioPublico=productoSeleccionado.PrecioPublico;
          producto.StockTienda=productoSeleccionado.StockTienda;
          producto.StockBodega=productoSeleccionado.StockBodega;
          producto.Marca=productoSeleccionado.Marca;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: productoSeleccionado.id}})
    .then(response=>{
      setData(data.filter(producto=>producto.id!==productoSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarProducto=(producto, caso)=>{
    setproductoSeleccionado(producto);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div style={{textAlign: 'center'}}>
<br />
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>PrecioMayoreo</th>
          <th>PrecioTalleres</th>
          <th>PrecioPublico</th>
          <th>StockTienda</th>
          <th>StockBodega</th>
          <th>Marca</th>
        </tr>
      </thead>
      <tbody>
        {data.map(producto=>(
          <tr key={producto.id}>
            <td>{producto.id}</td>
            <td>{producto.Nombre}</td>
            <td>{producto.Precio}</td>
            <td>{producto.PrecioMayoreo}</td>
            <td>{producto.PrecioTalleres}</td>
            <td>{producto.PrecioPublico}</td>
            <td>{producto.StockTienda}</td>
            <td>{producto.StockBodega}</td>
            <td>{producto.Marca}</td>
          <td>
          <button className="btn btn-primary" onClick={()=>seleccionarProducto(producto, "Editar")}>Editar</button> {"  "}
          <button className="btn btn-danger" onClick={()=>seleccionarProducto(producto, "Eliminar")}>Eliminar</button>
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar producto</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="Nombre" onChange={handleChange}/>
          <br />
          <label>Precio: </label>
          <br />
          <input type="text" className="form-control" name="Precio" onChange={handleChange}/>
          <br />
          <label>PrecioMayoreo: </label>
          <br />
          <input type="text" className="form-control" name="PrecioMayoreo" onChange={handleChange}/>
          <br />
          <label>PrecioTalleres: </label>
          <br />
          <input type="text" className="form-control" name="PrecioTalleres" onChange={handleChange}/>
          <br />
          <label>PrecioPublico: </label>
          <br />
          <input type="text" className="form-control" name="PrecioPublico" onChange={handleChange}/>
          <br />
          <label>StockTienda: </label>
          <br />
          <input type="text" className="form-control" name="StockTienda" onChange={handleChange}/>
          <br />
          <label>StockBodega: </label>
          <br />
          <input type="text" className="form-control" name="StockBodega" onChange={handleChange}/>
          <br />
          <label>Marca: </label>
          <br />
          <input type="text" className="form-control" name="Marca" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>


    
    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar producto</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="Nombre" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.Nombre}/>
          <br />
          <label>Precio: </label>
          <br />
          <input type="text" className="form-control" name="Precio" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.Precio}/>
          <br />
          <label>PrecioMayoreo: </label>
          <br />
          <input type="text" className="form-control" name="PrecioMayoreo" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.PrecioMayoreo}/>
          <br />
          <label>PrecioTalleres: </label>
          <br />
          <input type="text" className="form-control" name="PrecioTalleres" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.PrecioTalleres}/>
          <br />
          <label>PrecioPublico: </label>
          <br />
          <input type="text" className="form-control" name="PrecioPublico" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.PrecioPublico}/>
          <br />
          <label>StockTienda: </label>
          <br />
          <input type="text" className="form-control" name="StockTienda" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.StockTienda}/>
          <br />
          <label>StockBodega: </label>
          <br />
          <input type="text" className="form-control" name="StockBodega" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.StockBodega}/>
          <br />
          <label>Marca: </label>
          <br />
          <input type="text" className="form-control" name="Marca" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.Marca}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Guardar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el Producto {productoSeleccionado && productoSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
