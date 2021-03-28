import React, {  useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import {Link, useHistory} from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';

import {checkSignUpInput} from '../../../utility';
import Loader from '../../../Components/Loader/Loader';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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

const SignUp=()=> {
    const classes = useStyles();
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [birth_date, setBirth_date] = useState(new Date('2000-01-01'));
    const [phone, setPhone] = useState('');
    const [error, setError]= useState('');
    const [loader, setLoader] = useState(false);

    const history = useHistory();

    const onSignUp = (e)=>{
        e.preventDefault();
        setLoader(true);
        setError('');
        let check = checkSignUpInput({email, password, first_name, last_name, address, birth_date,phone});
        if(check.isValid){
            axios.post('http://localhost:5000/signup', {email, password, first_name, last_name, address, birth_date, phone})
                .then(res=>{
                    setFirst_name('');
                    setLast_name('');
                    setEmail('');
                    setPassword('');
                    setAddress('');
                    setBirth_date(new Date('2000-01-01'));
                    setPhone('');
                    setSuccess(res.data.message);
                    setLoader(false);
                }).catch(err =>{
                    setLoader(false);
                    setError(err.response.data);
                })
        }else{
            setLoader(false);
            setError(check);
        }
    }
    const handleDateChange = (date) => {
        if(!date){
            setBirth_date(new Date('2000-01-01'));
        }else{
            setBirth_date(date)
        }
    };
    let signUp = (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
            
            <h2>Sign Up</h2>
                <Grid item>
                    {error.error ? <p className={classes.invalid}> {error.error}</p> : <p></p>}
                </Grid>
                {success === '' ? (<form className={classes.form} autoComplete="off" onSubmit={(e)=>onSignUp(e)}>
                    <TextField
                    value={first_name}
                    error = {error.firstNameError ? true : false}
                    fullWidth margin="normal" className="outlined-error-helper-text" variant="outlined" label="First Name"  name="firstname"
                    helperText={error.firstNameError ? error.firstNameError : ''}
                    onChange={e=> setFirst_name(e.target.value)}
                    />

                    <TextField
                    value={last_name}
                    error = {error.lastNameError ? true : false}
                    fullWidth margin="normal" className="outlined-error-helper-text" variant="outlined" label="Last Name"  name="lastname"
                    helperText={error.lastNameError ? error.lastNameError : ''}
                    onChange={e=> setLast_name(e.target.value)}
                    />  
                    
                    <TextField
                    value={address}
                    error = {error.addressError ? true : false}
                    fullWidth margin="normal" className="outlined-error-helper-text" variant="outlined" label="Address"  name="address"
                    helperText={error.addressError ? error.addressError : ''}
                    onChange={e=>  setAddress(e.target.value)}
                    />

                    <TextField
                    value={phone}
                    error = {error.phoneError ? true : false}
                    fullWidth margin="normal" className="outlined-error-helper-text" variant="outlined" label="Phone"  name="phone"
                    helperText={error.phoneError ? error.phoneError : ''}
                    onChange={e=>  setPhone(e.target.value)}
                    />
                    <TextField
                    value={email}
                    error = {error.emailError ? true:false}
                    fullWidth margin="normal" className="outlined-error-helper-text" variant="outlined" label="Email Address" name="email" 
                    helperText={error.emailError ? error.emailError : ''}
                    onChange={e=> setEmail(e.target.value)}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="center">
                            <KeyboardDatePicker
                            error = {error.birthError ? true : false}
                            style={{ width: '100%' }}
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date of Birth"
                            format="MM/dd/yyyy"
                            value={birth_date}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <TextField
                    type="password"
                    value={password}
                    error = {error.passError ? true : false}
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
                    > Sign Up </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/" variant="body2">
                                {"Already have an account? Log In"}
                            </Link>
                        </Grid>
                        
                    </Grid>
                </form>): (<>
                            <h2 className={classes.success}>{success}</h2>
                            <Grid container>
                                <Grid item style={{marginLeft: '70px'}}>
                                    <p onClick={()=>history.push('/')} style={{color: '#3F51B5', cursor:'pointer'}}>Sign In</p>
                                </Grid>
                                    <p onClick={()=>setSuccess('')} style={{marginLeft: '40px', color: '#3F51B5', cursor:'pointer'}}>Create Another Account?</p>
                                </Grid>
                            </>)
                }
            </div>
        </Container>
    )
    if(loader){
        signUp = <Loader/>
    }
    return (
        <>
           {signUp}
        </>
    );
}

export default SignUp;

