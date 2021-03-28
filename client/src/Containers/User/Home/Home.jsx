import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Loader from '../../../Components/Loader/Loader';
import classes from './Home.module.css';
const Home = ()=>{
    const [user, setUser] = useState([]);
    const [error, setError]  = useState('');
    const [loader, setLoader] = useState(false);

    
    useEffect(()=>{
        setError('');
        setLoader(true);
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/profile',{
            headers:{
                 Authorization: `Bearer ${token}`
            }
        }).then(res=>{
            setUser(res.data.user);
            setLoader(false);
        }).catch(err=>{
            setError(err.response.data.error);
            setLoader(false);
        })
    },[])
    let userData = (<>
        <h2 className={classes.top}>Profile</h2>
        <div className={classes.outer}>
            
            {error ? <p className={classes.inner}>{error}</p>:null}
            {user.length ? user.map((value, idx)=>{
                return(<div key={idx} className={classes.inner}>
                            <div style={{width: '30%'}}>
                                <p><b>{value[0]}</b></p>
                            </div>
                            <div style={{width: '5%'}}>
                                <p><b>:</b></p>
                            </div>
                            <div style={{ width: '55%'}}> 
                                <p>{value[1]}</p>
                            </div>
                        </div>
                        )
            }):null}
        </div>
    </>)
    if(loader){
        userData = (<div className={classes.outer}>
                        <Loader/>
                    </div>)
    }
    return(
        <div>
            {userData}
        </div>
    )
}

export default Home;