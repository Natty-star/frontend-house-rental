import * as React from "react";
import {useEffect, useState} from 'react'
import { useNavigate, Route } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from "axios";
import Header from "../../common/header";

const columns = [
    { id: 'first name', label: 'First Name', minWidth: 170 },
    { id: 'last name', label: 'Last Name', minWidth: 170 },
    {
      id: 'role',
      label: 'Role',
      minWidth: 50,
      align: 'right',
    },
    {
      id: 'username',
      label: 'Username',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'account',
      label: 'Account Number',
      minWidth: 130,
      align: 'right',
    },
    {
      id: 'input',
      label: 'Amount',
      minWidth: 130,
      align: 'right',
    },
    {
        id: 'button',
        label: 'Button',
        minWidth: 130,
        align: 'right',
      },
  ];
  
  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }
  

export default function Admin() {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [logedin, setLogedin] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleAdd = async (id, accountNumber) => {
    console.log(id)
    try{
      const response = await axios.post(process.env.REACT_APP_BASE_URL+'/AppUser/addAmount',{
        "id": id,
        "account": {
          "balance": amount,
          "accountNumber": parseFloat(accountNumber)
        }
      })
      console.log(response.data)
      setData(response.data)
      setAmount("")
    }catch(error){
      setLoginError('You have entered invalid username or password!')
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    
    async function getUsers(){
      let localValue = JSON.parse(localStorage.getItem('MppApp'))

      console.log(localValue.myUserDetailService.authorities[0].authority)
      if(localValue && localValue.myUserDetailService.authorities[0].authority === 'ADMIN'){
        navigate("/admin");
      }else{
        navigate("/");
      }
        try{
            const response = await axios.get(process.env.REACT_APP_BASE_URL+'/AppUser')
            console.log("User----->",response.data)
            setData(response.data)
          }catch(error){
            setLoginError('You have entered invalid username or password!')
            console.log(error);
            setLoading(false);
          }  
    }
    getUsers()
    
  },[])

    return (
        <>
          <Header/>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          <TableCell align='left'>
                              {row.firstName}
                          </TableCell>
                          <TableCell align='left'>
                              {row.lastName}
                          </TableCell>
                          <TableCell align='right'>
                              {row.roles.length > 0 ? row.roles[0].roleType : 0}
                          </TableCell>
                          <TableCell align='right'>
                              {row.userName}
                          </TableCell>
                          <TableCell align='right'>
                              {row.account.accountNumber}
                          </TableCell>
                          <TableCell align='right'>
                            <TextField id="outlined-basic" label="Amount" variant="outlined" onChange={(e) => {setAmount(e.target.value)}} />
                          </TableCell>
                          <TableCell align='right'>
                            <Button variant="contained" size="small" onClick={() => {handleAdd(row.id, row.account.accountNumber)}}>
                                Add
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      );
}
