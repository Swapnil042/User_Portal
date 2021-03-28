import React, {  useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import {checkPassChange} from '../../../utility';
import Loader from '../../../Components/Loader/Loader';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(5),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    invalid:{
        color: 'red'
    },
    success:{
        color: '#4CAF50'
      }
  }));

const ChangePassword = ()=>{
    const classes = useStyles();
    const [currentPass, setCurrentPass] = useState('');
    const [newPassword, setNewPassword]= useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    let check = null;
    const onPassChange = (e)=>{
        e.preventDefault();
        check = checkPassChange({currentPass, newPassword, confirmNewPass});
        if(check.isValid){
            setError('');
            setLoader(true);
            const token = localStorage.getItem('token');
            axios.post('http://localhost:5000/password', {currentPass, newPassword},{
                headers:{Authorization: `Bearer ${token}`}
            }).then(res=>{
                setLoader(false);
                setCurrentPass('');
                setNewPassword('');
                setConfirmNewPass('');
                setSuccess(res.data.message);
            }).catch(err=>{
                setLoader(false);
                setError(err.response.data);
            })
        }else{
            setError(check)
        }
    }

    let changePass = (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
            <h3>Change Password</h3>
                <Grid item>
                    {error.error ? <p className={classes.invalid}> {error.error}</p> : <p></p>}
                    {success !== '' ? <p className={classes.success}> {success}</p> : <p></p>}
                </Grid>
                <form className={classes.form} autoComplete="off" onSubmit={onPassChange}>    
                    <TextField
                    type="password"
                    error = {error.curPassError ? true:false}
                    value={currentPass}
                    fullWidth margin="normal" className="outlined-error-helper-text" variant="outlined" label="Current Password" name="currentpassword" 
                    helperText={error.curPassError ? error.curPassError : ''}
                    onChange={e=> setCurrentPass(e.target.value)}
                    />
                    <TextField
                    type="password"
                    error = {error.newPassError ? true : false}
                    value={newPassword}
                    fullWidth margin="normal" className="outlined-error-helper-text" variant="outlined" label="New Password"  name="newpassword"
                    helperText={error.newPassError ? error.newPassError : ''}
                    onChange={e=> setNewPassword(e.target.value)}
                    />
                    <TextField
                    type="password"
                    error = {error.confirmPassError ? true : false}
                    value={confirmNewPass}
                    fullWidth margin="normal" id="outlined-error-helper-text" variant="outlined" label="Cofirm Password"  name="confirmpassword"
                    helperText={error.confirmPassError ? error.confirmPassError : ''}
                    onChange={e=> setConfirmNewPass(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    > Change </Button>
                </form>
            </div>
        </Container>
    )
    if(loader){
        changePass = <Loader/>
    }

    return(
        <>
            {changePass}
        </>
    )
}

export default ChangePassword;

