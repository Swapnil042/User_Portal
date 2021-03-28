import React, {  useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import axios from 'axios';

import {checkLoginInput} from '../../utility';
import Loader from '../../Components/Loader/Loader';

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
  }
}));

const LogIn=(props)=> {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]= useState('');
    const [loader, setLoader] = useState(false);

    const onLogin = (e)=>{
        e.preventDefault();
        setLoader(true);
        setError('');
        let url = 'http://localhost:5000/signin';
        
        if(props.admin){
            url = 'http://localhost:5000/admin';
        }
        let check = checkLoginInput({email, password});
        if(check.isValid){
            axios.post(url, {email, password})
                .then(res=>{
                    setLoader(false);
                    localStorage.setItem('token', res.data.token);
                    if(res.data.user.first_name){
                        localStorage.setItem('first_name', res.data.user.first_name);
                        props.setUser(res.data.user.first_name)
                    }else{
                        localStorage.setItem('first_name', 'admin');
                        props.setUser("admin");
                    }
                }).catch(err =>{
                    setLoader(false);
                    setError(err.response.data);
                })
        }else{
            setLoader(false);
            setError(check);
        }
    }
    let login = (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
            <h2>{props.admin? "Admin Sign In": "Sign In"}</h2>
                <Grid item>
                    {error.error ? <p className={classes.invalid}> {error.error}</p> : <p></p>}
                </Grid>
                <form className={classes.form} autoComplete="off" onSubmit={(e)=>onLogin(e)}>    
                    <TextField
                    error = {error.emailError ? true:false}
                    value={email}
                    fullWidth margin="normal" className="outlined-error-helper-text" variant="outlined" label="Email Address" name="email" 
                    helperText={error.emailError ? error.emailError : ''}
                    onChange={e=> setEmail(e.target.value)}
                    />
                    <TextField
                    type="password"
                    error = {error.passError ? true : false}
                    value={password}
                    fullWidth margin="normal" className="outlined-error-helper-text" variant="outlined" label="Password"  name="password"
                    helperText={error.passError ? error.passError : ''}
                    onChange={e=> setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    > Sign In </Button>
                    {props.admin?null:<Grid container>
                        <Grid item>
                            <Link to="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>}
                </form>
            </div>
        </Container>
    )
    if(loader){
        login = <Loader/>
    }
    return (
        <>
            {login}
        </>
    );
}

export default LogIn;