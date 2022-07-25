import  { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Container, IconButton, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import EditarModal from './EditarModal'
import AgregarModal from './AgregarModal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function TablaInventario ({ data }) {

  const [ editModal, setEditModal ] = useState( false )
  const [ agregarModal, setAgregarModal ] = useState( false )

  const [ producto, setProducto ] = useState( {} )

  const openModal = ( prod ) => {
      setProducto( prod )
      setEditModal( true )
  }
  const closeModal = (  ) => {
    setProducto( {} )
    setEditModal( false )
  }
/*****************************************/
  const openModalAgregar = ( ) => {
    setAgregarModal( true)
  }
  const closeModalAgregar = () => {
    setAgregarModal( false )
  }


  console.log( data )
  return (
    <Container   >
      <TableContainer component={Paper}  >
        <Table  sx={{ minWidth: 700 }} aria-label="customized table"  >
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Marca</StyledTableCell>
              <StyledTableCell align="right">Nombre</StyledTableCell>
              <StyledTableCell align="right">Precio</StyledTableCell>
              <StyledTableCell align="right">Precio Mayore</StyledTableCell>
              <StyledTableCell align="right">Precio Talleres</StyledTableCell>
              <StyledTableCell align="right">Precio Publico</StyledTableCell>
              <StyledTableCell align="right">Stock Tienda</StyledTableCell>
              <StyledTableCell align="right">Stock Bodega</StyledTableCell>
              <StyledTableCell align="right">  </StyledTableCell>
              <StyledTableCell align="right"> </StyledTableCell>
              <StyledTableCell align="right"> </StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  {item.Marca}
                </StyledTableCell>
                <StyledTableCell align="right">{item.Nombre}</StyledTableCell>
                <StyledTableCell align="right">{item.Precio}</StyledTableCell>
                <StyledTableCell align="right">{item.PrecioMayoreo}</StyledTableCell>
                <StyledTableCell align="right">{item.PrecioTalleres}</StyledTableCell>
                <StyledTableCell align="right">{item.PrecioPublico}</StyledTableCell>
                <StyledTableCell align="right">{item.StockTienda}</StyledTableCell>
                <StyledTableCell align="right">{item.StockBodega}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    onClick={ () => openModal( item ) }
                  >
                    <EditIcon color='action' />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton>
                    <DeleteIcon color='error'/>
                  </IconButton>
                </StyledTableCell >

                <StyledTableCell align='right'>
                <Button
                
                onClick={ () => openModalAgregar( ) }
                  color='inherit'
                >
                  <AddIcon />
                </Button>
                </StyledTableCell>

              </StyledTableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>

      { editModal &&
        <EditarModal producto={ producto } open={ editModal } handleClose={ closeModal } />
      }

      { agregarModal &&
        <AgregarModal  open={ agregarModal } handleClose={ closeModalAgregar } />
      }
    </Container>
  );
}
