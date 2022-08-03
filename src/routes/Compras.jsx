import React,{useEffect, useState} from "react";
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

const Compras = () => {
    
  const baseUrl = "http://localhost/ApiProveedores/"

  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);

  const [proveedorSelecionado, setProveedorSeleccionado]=useState({
    id: '',
    nombreProveedor: '',
    nombreProducto:'',
    precioCompra:'',
    Stock:'',
    Marca: ''
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setProveedorSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(proveedorSelecionado);
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


  const peticionPost = async()=>{
    var f = new FormData();
    f.append("nombreProveedor", proveedorSelecionado.nombreProveedor);
    f.append("nombreProducto", proveedorSelecionado.nombreProducto);
    f.append("precioCompra", proveedorSelecionado.precioCompra);
    f.append("Stock", proveedorSelecionado.Stock);
    f.append("Marca", proveedorSelecionado.Marca);
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
    f.append("nombreProveedor", proveedorSelecionado.nombreProveedor);
    f.append("nombreProducto", proveedorSelecionado.nombreProducto);
    f.append("precioCompra", proveedorSelecionado.precioCompra);
    f.append("Stock", proveedorSelecionado.Stock);
    f.append("Marca", proveedorSelecionado.Marca);

    await axios.post(baseUrl, f, {params: {id: proveedorSelecionado.id}})
    .then(response=>{
      var dataNueva2= data;
      dataNueva2.map(proveedor=>{
        if(proveedor.id===proveedorSelecionado.id){
          proveedor.nombreProveedor=proveedorSelecionado.nombreProveedor;
          proveedor.nombreProducto=proveedorSelecionado.nombreProducto;
          proveedor.precioCompra=proveedorSelecionado.precioCompra;
          proveedor.Stock=proveedorSelecionado.Stock;
          proveedor.Marca=proveedorSelecionado.Marca;
        }
      });
      setData(dataNueva2);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }



  const seleccionarProveedor=(proveedor, caso)=>{
    setProveedorSeleccionado(proveedor);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[])



  return (


    <div className="navbar" style={{ textAlign: 'center' }}>
         
          <table className="table table-striped">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Nombre del Proveedor</th>
                      <th>Nombre del Producto</th>
                      <th>Precio de Compra</th>
                      <th>Cantidad Comprada</th>
                      <th>Marca</th>
                      <th> <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Nueva Compra</button></th>
                  </tr>
              </thead>
              <tbody>
        {data.map(proveedor=>(
          <tr key={proveedor.id}>
            <td>{proveedor.id}</td>
            <td>{proveedor.nombreProveedor}</td>
            <td>{proveedor.nombreProducto}</td>
            <td>{proveedor.precioCompra}</td>
            <td>{proveedor.Stock}</td>
            <td>{proveedor.Marca}</td>
            
          <td>
          <button className="btn btn-primary" onClick={()=>seleccionarProveedor(proveedor, "Editar")}>Editar</button> {"  "}
          </td>
          </tr>
        ))}


      </tbody> 

      </table>
          <Modal isOpen={modalInsertar}>
              <ModalHeader>Nueva Compra</ModalHeader>
              <ModalBody>
                  <div className="form-group">
                      <label>Nombre del Proveedor: </label>
                      <br />
                      <input type="text" className="form-control" name="nombreProveedor" onChange={handleChange} />
                      <br />
                      <label>Nombre del Producto: </label>
                      <br />
                      <input type="text" className="form-control" name="nombreProducto" onChange={handleChange} />
                      <br />
                      <label>Precio de Compra: </label>
                      <br />
                      <input type="text" className="form-control" name="precioCompra" onChange={handleChange} />
                      <br />
                      <label>Cantidad Comprada: </label>
                      <br />
                      <input type="text" className="form-control" name="Stock" onChange={handleChange} />
                      <br />
                      <label>Marca: </label>
                      <br />
                      <input type="text" className="form-control" name="Marca" onChange={handleChange} />
                      <br />
                  </div>
              </ModalBody>
              <ModalFooter>
                  <button className="btn btn-primary" onClick={() => peticionPost()}>Guardar</button>{"   "}
                  <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
              </ModalFooter>
          </Modal>

          <Modal isOpen={modalEditar}>
              <ModalHeader>Editar producto</ModalHeader>
              <ModalBody>
                  <div className="form-group">
                      <label>Nombre del Proveedor: </label>
                      <br />
                      <input type="text" className="form-control" name="nomreProveedor" onChange={handleChange} value={proveedorSelecionado && proveedorSelecionado.nombreProveedor} />
                      <br />
                      <label>Nombre del Producto: </label>
                      <br />
                      <input type="text" className="form-control" name="nombreProducto" onChange={handleChange} value={proveedorSelecionado && proveedorSelecionado.nombreProducto} />
                      <br />

                      <label>Precio de Compra: </label>
                      <br />
                      <input type="text" className="form-control" name="precioCompra" onChange={handleChange} value={proveedorSelecionado && proveedorSelecionado.precioCompra} />
                      <br />
                      <label>Cantidad Comprada: </label>
                      <br />
                      <input type="text" className="form-control" name="Stock" onChange={handleChange} value={proveedorSelecionado && proveedorSelecionado.Stock} />
                      <br />
                      <label>Marca: </label>
                      <br />
                      <input type="text" className="form-control" name="Marca" onChange={handleChange} value={proveedorSelecionado && proveedorSelecionado.Marca} />
                      <br />
                  </div>
              </ModalBody>
              <ModalFooter>
                  <button className="btn btn-primary" onClick={() => peticionPut()}>Guardar</button>{"   "}
                  <button className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
              </ModalFooter>
          </Modal>

                 </div>
  );
 
}
export default Compras;
