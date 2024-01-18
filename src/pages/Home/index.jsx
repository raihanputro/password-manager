import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Select, MenuItem } from '@mui/material';

import Navbar from '../../components/Navbar/index'
import { callApi } from '../../domain/api';

import classes from './style.module.scss';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Home = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [email, setEmail] = useState("");
    const [provider, setProvider] = useState("");
    const [password, setPassword] = useState("");
    const [category, setCategory] = useState("");
    const[accounts, setAccounts] = useState([]);
    const { nameCategory } = useParams();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenDel = () => setOpenDel(true);
    const handleCloseDel = () => setOpenDel(false);

    useEffect(() => {
        fetchAccounts();
    })
    
    const fetchAccounts = async() => {
            const response = await callApi('/password', 'GET');
            setAccounts(response);
    }

    const addAccount = async() => {
        try {
            const response = await callApi(`/password`, 'POST', {provider: provider, email: email, password: password, category: category })
        } catch(error) {
            console.log(error)
        }   
    }

    const deleteAccount = async(id) => {
        try {
            const response = await callApi(`/password/${id}`, 'DELETE');
            fetchAccounts()
        } catch(error) {
            console.log(error)
        }
    }

  return (
    <>
        <Navbar />
        <Button sx={{ marginTop: '7%' }} variant="contained" color='primary' onClick={() => handleOpen()}>Add</Button>
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <form autoComplete='off' onSubmit={addAccount} className={classes.form}>
                    <TextField
                        sx={{ width: '100%' }}
                        required={true}
                        id="outlined-required"
                        label="Provider"
                        value={provider}
                        onChange={e => setProvider(e.target.value)}
                    />
                    <TextField
                        sx={{ width: '100%' }}  
                        required={true}
                        id="outlined-required"
                        label="Email"
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        sx={{ width: '100%' }}
                        required={true}
                        id="outlined-required"
                        label="Password"
                        type='password'
                        min
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        inputProps={{ minLength: 6 }}
                    />
                     <Select
                        sx={{ width: '100%' }}
                        required={true}
                        value={category}
                        onChange={(e) => {setCategory(e.target.value)}}
                        className={classes.select}
                    >
                        <MenuItem value='work'>Work</MenuItem>
                        <MenuItem value='family'>Family</MenuItem>
                        <MenuItem value='personal'>Personal</MenuItem>
                    </Select>
                    <Button variant="outlined" color="secondary" type="submit">Submit</Button>
                </form>
            </Box>
        </Modal>
        <TableContainer component={Paper} sx={{ marginTop: '1%' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell align="center">Website</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Category</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                        { accounts && accounts?.map((acc, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center">{acc?.provider}</StyledTableCell>
                                <StyledTableCell align="center">{acc?.email}</StyledTableCell>
                                <StyledTableCell align="center">{acc?.category}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    {/* <Button variant="contained" color='error' onClick={() => deleteAccount(acc?.id)}>Delete</Button> */}
                                    <Button variant="contained" color='error' onClick={() => handleOpenDel()}>Delete</Button>
                                    <Modal
                                        open={openDel}
                                        onClose={handleCloseDel}
                                        aria-labelledby="parent-modal-title"
                                        aria-describedby="parent-modal-description"
                                    >
                                        <Box sx={{ ...style, width: 400 }}>
                                            <h2 id="parent-modal-title">Delete</h2>
                                            <p id="parent-modal-description">
                                            Are you sure want to delete this account?
                                            </p>
                                            <Button onClick={handleCloseDel}>Cancel</Button>
                                            <Button onClick={() => {deleteAccount(acc?.id), handleClose()}}>
                                            Delete
                                            </Button>
                                        </Box>
                                    </Modal>
                                    <Button variant="contained" color='primary' onClick={() => navigate(`../detail/${acc?.id}`)}>Detail</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
  )
}

export default Home