import React, { useEffect, useState } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import './App.css';
import LogIn from './Containers/LogIn/LogIn';
import SignUp from './Containers/User/SingUp/SignUp';
import UserHome from './Containers/User/Home/Home';
import Nav from './Components/Navigation/Navigation';
import ChangePassword from './Containers/User/ChangePassword/ChangePassword';
import LogOut from './Containers/Logout/Logout';
import AdminHome from './Containers/Admin/Home/Home';
import axios from 'axios';


function App() {
  const [user, setUser] = useState('');

  useEffect(()=>{
    if(user === ''){
      const prevUser = localStorage.getItem('first_name');
      const token = localStorage.getItem('token');
      let url = "http://localhost:5000/autologin"
      if(prevUser === 'admin'){
        url = "http://localhost:5000/autologinadmin"
      }
      if(token){
        axios.post(url, {},{
          headers:{Authorization: `Bearer ${token}`}
        }).then(res=>{
          setUser(res.data.user.first_name);
        }).catch(err=>{
          
        })
      }}
  },[user]);

  let routes = (
    <Switch>
      <Route exact path={'/'}  component={()=> <LogIn setUser={setUser}/> }/>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/admin'}  component={()=> <LogIn admin setUser={setUser}/> }/>
      <Redirect to={'/'}/>
    </Switch>
  )
  if(user!== '' && user !== 'admin'){
    routes = (
     <> 
        <Nav user={user}>
          <div className="App">
            <Switch>
              <Route exact path={'/'}  component={UserHome} />
              <Route exact path={'/password'} component={ChangePassword}/>
              <Route exact path={'/logout'} component={()=><LogOut auth={setUser}/>}/>
              <Redirect to={'/'}/>
            </Switch>
          </div>
        </Nav>
     </>
     )
  }
  if(user === 'admin'){
    routes = (
     <> 
        <Nav user={user}>
          <div className="App">
            <Switch>
              <Route exact path={'/'}  component={AdminHome} />
              <Route exact path={'/logout'} component={()=><LogOut auth={setUser}/>}/>
              <Redirect to={'/'}/>
            </Switch>
          </div>
        </Nav>
     </>
     )
  }
  return (
    <>
      {routes}
    </>
  );
}

export default App;
