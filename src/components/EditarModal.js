import { useState } from 'react'
import { useFormik } from 'formik'
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField } from '@mui/material'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

const EditarModal = ({ producto, handleClose, open = false }) => {

	const {
		values,
		handleSubmit,
		handleChange
	} = useFormik({
		initialValues: {
			Nombre: producto.Nombre || '',
			Precio: producto.Precio || '',
			PrecioMayoreo: producto.PrecioMayoreo || '',
			PrecioTalleres: producto.PrecioTalleres || '',
			PrecioPublico: producto.PrecioPublico || '',
			StockTienda: producto.StockTienda || '',
			StockBodega: producto.StockBodega || '',
		},
		onSubmit: async ( values ) => {
			// aqui a la api a actualizar
		}
	})


	return (
		<Dialog
			open={ open }
			onClose={ handleClose }
		>
			<DialogTitle>
				Producto - { producto.Nombre }
			</DialogTitle>
			<form onSubmit={ handleSubmit } >
				<DialogContent>
					<TextField 
						value={ values.Nombre }
						onChange={ handleChange }
						name='Nombre'
						id='Nombre'
						label='Nombre'
					/>	
				</DialogContent>
				<DialogContent>
					<TextField 
						value={ values.Precio }
						onChange={ handleChange }
						name='Precio'
						id='Precio'
						label='Precio'
					/>	
				</DialogContent>
				<DialogContent>
					<TextField 
						value={ values.PrecioMayoreo }
						onChange={ handleChange }
						name='PrecioMayoreo'
						id='PrecioMayoreo'
						label='PrecioMayoreo'
					/>	
				</DialogContent>
				<DialogContent>
					<TextField 
						value={ values.PrecioTalleres }
						onChange={ handleChange }
						name='PrecioTalleres'
						id='PrecioTalleres'
						label='PrecioTalleres'
					/>	
				</DialogContent>
	
				<DialogContent>
					<TextField 
						value={ values.PrecioPublico }
						onChange={ handleChange }
						name='PrecioPublico'
						id='PrecioPublico'
						label='PrecioPublico'
					/>	
				</DialogContent>
				
				<DialogContent>
					<TextField 
						value={ values.StockTienda }
						onChange={ handleChange }
						name='StockTienda'
						id='StockTienda'
						label='StockTienda'
					/>	
				</DialogContent>
				
				<DialogContent>
					<TextField 
						value={ values.StockBodega }
						onChange={ handleChange }
						name='StockBodega'
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

export default EditarModal
