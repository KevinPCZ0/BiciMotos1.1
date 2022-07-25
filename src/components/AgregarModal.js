import { useState } from 'react'
import { useFormik } from 'formik'
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField } from '@mui/material'
import { ModalHeader, Modal, ModalBody } from 'reactstrap';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

const AgregarModal = ({  handleClose, open = false }) => {
    const {
		handleSubmit,
		handleChange
	} = useFormik({
		initialValues: {},
        onSubmit: async (  ) => {
			// aqui a la api a actualizar
		}
    })
	return (
		<Dialog
			open={ open }
			onClose={ handleClose }
		>
			<DialogTitle>
				Nuevo Producto 
			</DialogTitle>
			<form onSubmit={ handleSubmit } >
				<DialogContent>
					<TextField 
						id='Nombre'
						label='Nombre'
					/>	
				</DialogContent>
				<DialogContent>
					<TextField 
						id='Precio'
						label='Precio'
					/>	
				</DialogContent>
				<DialogContent>
					<TextField 
						id='PrecioMayoreo'
						label='PrecioMayoreo'
					/>	
				</DialogContent>
				<DialogContent>
					<TextField 				
						id='PrecioTalleres'
						label='PrecioTalleres'
					/>	
				</DialogContent>
	
				<DialogContent>
					<TextField 											
						id='PrecioPublico'
						label='PrecioPublico'
					/>	
				</DialogContent>
				
				<DialogContent>
					<TextField 
						id='StockTienda'
						label='StockTienda'
					/>	
				</DialogContent>
				
				<DialogContent>
					<TextField 
						id='StockBodega'
						label='StockBodega'
					/>	
				</DialogContent>
				
				<DialogActions>
                {<Button variant="contained" type= 'onSubmit();' endIcon={<SendIcon />} />}
    				</DialogActions>
			</form>
             
    
   
		</Dialog> 
	)
}

export default AgregarModal
