import React from 'react';
import { useHistory } from 'react-router-dom';

import classes from './Navigation.module.css'
import DropDown from './DropDown/DropDown'


const Navigation = (props)=>{
    const history = useHistory();
    return(
        <div>
            <div className={classes.nav}>
                <h2 className={classes.navfirst}>Navigation</h2>
                <div style={{marginLeft: 'auto',marginRight: 70}}>
                    <DropDown user={props.user}/>
                </div>
            </div>
            <div>
                <div className={classes.sideBar}>
                    {props.user === 'admin' ? (
                        <> 
                            <div className={classes.tab}>
                                <p style={{margin: "10px"}}><b>User List</b></p>
                            </div>
                        </>
                    ): (
                        <> 
                            <div className={classes.tab}>
                                <p style={{margin: "10px"}}
                                 onClick={()=>history.push('/')}><b>Profile</b></p>
                            </div>
                            <div className={classes.tab}>
                                <p style={{margin: "10px"}}
                                    onClick={()=>history.push('/password')}><b>Change Password</b></p>
                            </div>
                        </>
                    )}
                </div>
                <div>
                    <div className={classes.children}>
                        {props.children}
                    </div>
                </div>  
            </div>
        </div>
        )
}
 
export default Navigation;