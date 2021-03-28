import React, { useEffect, useState } from 'react';
import {makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';


import Loader from '../../../Components/Loader/Loader';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
      },
  }));

const AllUsers=()=> {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [error, setError]= useState('');
    const [search, setSearch] = useState('');
    const [loader, setLoader] = useState(false);

    useEffect(()=>{
        if(search === ''){
            setLoader(true);
            setError('');
            const token = localStorage.getItem('token');
            axios.get('http://localhost:5000/users',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res=>{
                setLoader(false);
                setUsers(res.data.users);
            }).catch(err=>{
                setError(err.response.data)
                setLoader(false);
            })
        }
    },[search])
    const onSearch = (e)=>{
        if (e.key === 'Enter' && search.trim().length !== 0) {
            setLoader(true);
            setError('');
            const token = localStorage.getItem('token');
            axios.get(`http://localhost:5000/search/${search}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res=>{
                setLoader(false);
                setUsers(res.data.users);
                
            }).catch(err=>{
                setError(err.response.data)
                setLoader(false);
            })
        }
    }
    let userTabel = (
        <div>
            <div style={{height: 50 , display: 'flex'}}>
                <h3 style={{marginLeft: 10}}>Users : </h3>
                <div style={{marginLeft: 'auto'}}> {error.nouser ? <p style={{color: 'red'}}>{error.nouser}</p>: null}</div>
                
                <div style={{marginLeft: 'auto'}}>
                    <input style={{marginTop: 20}}value={search} type="text" placeholder="Search" name="search" 
                        onChange={(e)=> setSearch(e.target.value)}
                        onKeyDown={onSearch}/>
                    <button onClick={()=>setSearch('')}>X</button>
                </div>
            </div>
            {error.error ? <p style={{marginLeft: 10, color: 'red'}}>{error.error}</p>: (
                    <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Phone</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">Birth Date</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {users.map((user, idx) => (
                            <TableRow key={idx}>
                            <TableCell component="th" scope="row">{user.first_name} {user.last_name}</TableCell>
                            <TableCell align="left">{user.email}</TableCell>
                            <TableCell align="left">{user.phone}</TableCell>
                            <TableCell align="left">{user.address}</TableCell>
                            <TableCell align="left">{user.birth_date.toString().slice(0,10)}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                        
                    </Table>
                </TableContainer>
            )}
        </div>
    )
    if(loader){
        userTabel = <Loader/>
    }
  return (
        <div>
            {userTabel}
        </div>
  );
}

export default AllUsers;