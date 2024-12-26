import Modal from '@mui/material/Modal';
import React from 'react'
import { Box } from '@mui/material';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: '10px',
  width: '50%',
};

interface props {
  open: boolean,
  handleClose: (value:boolean) => void,
  children: React.ReactNode
}

const ModelPoper = ({open, handleClose, children}:props) => {
  const handleCloseFunction = () =>{
    handleClose(false)
  }
  return (
    <Modal
    open={open}
    onClose={handleCloseFunction}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    className='modelMain'
  >
    <Box sx={style}>
     {children}
    </Box>
  </Modal>
  )
}

export default ModelPoper