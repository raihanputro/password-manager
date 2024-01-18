import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Navbar from '../../components/Navbar';

import classes from './style.module.scss';

import { callApi } from '../../domain/api';

const card = (
  <React.Fragment>
   
  </React.Fragment>
);


const Detail = () => {
  const { id } = useParams();
  const [account, setAccount] = useState([]);

  useEffect(() => {
    fetchAccounts();
  }, [id])

  const fetchAccounts = async() => {
    const response = await callApi(`/password?id=${id}`, 'GET');
    setAccount(response[0]);
  }

  console.log(account)

  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: '5%' }}>
        <Card variant="outlined" sx={{ borderRadius: '20px', backgroundColor: 'black', color: 'white' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Id <b>{account.provider}</b>
            </Typography>
            <Typography variant="h5" component="div">
              Provider <b>{account.provider}</b>
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
              Email <b>{account.email}</b>
            </Typography>
            <Typography variant="body2">
              Category <b>{account.category}</b>
            </Typography>
          </CardContent>
        </Card>
      </Box>
      
    </>
    
  )
}

export default Detail