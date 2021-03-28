// import React,{useState, useEffect} from 'react';
// import Button from '@material-ui/core/Button';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
// import { makeStyles } from '@material-ui/core/styles';
// import {useHistory} from 'react-router-dom';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   paper: {
//     marginRight: theme.spacing(2),
//   },
// }));

// const DropDown=(props)=> {
//   const classes = useStyles();
//   const [open, setOpen] = useState(false);
//   const anchorRef = React.useRef(null);
//   const history = useHistory();

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

  
//   const onClose = ()=>{
//     setOpen(false);
//   }

//   const prevOpen = React.useRef(open);
//   useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }prevOpen.current = open;
//   }, [open]);

//   return (
    
//     <div className={classes.root}>
//       <div>
//         <Button
//           ref={anchorRef}
//           aria-controls={open ? 'menu-list-grow' : undefined}
//           aria-haspopup="true"
//           onClick={handleToggle}
//         >
//           <p><b>{props.user} ▼</b></p>
//         </Button>
//         <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
//           {({ TransitionProps, placement }) => (
//             <Grow
//               {...TransitionProps}
//               style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//             >
//               <Paper>
//                 <ClickAwayListener onClickAway={onClose}>
//                   <MenuList autoFocusItem={open} id="menu-list-grow">
//                     <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
//                     {props.user !== "admin" ? <MenuItem onClick={onProfileClick}>Profile</MenuItem> : null}
//                     {props.user !== "admin" ? <MenuItem onClick={onPassChange}>Change Password</MenuItem> : null}
//                   </MenuList>
//                 </ClickAwayListener>
//               </Paper>
//             </Grow>
//           )}
//         </Popper>
//       </div>
//     </div>

//   );
// }

// export default DropDown;


import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useHistory} from 'react-router-dom';

const DropDown=(props)=> {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const onLogoutClick = () => {
    history.push('/logout');
    setAnchorEl(null);
  };

  const onProfileClick = ()=>{
    history.push('/');
    setAnchorEl(null);
  }
  const onPassChange=()=>{
    history.push('/password');
    setAnchorEl(null);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      <p><b>{props.user} ▼</b></p>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        {props.user !== 'admin' ? <MenuItem onClick={onProfileClick}>Profile</MenuItem> : null}
        {props.user !== 'admin' ? <MenuItem onClick={onPassChange}>Change Password</MenuItem>: null}
        <MenuItem onClick={onLogoutClick}>Log Out</MenuItem>
      </Menu>
    </div>
  );
}

export default DropDown