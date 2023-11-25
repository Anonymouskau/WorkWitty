import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import  Icon from '@mui/material/Icon';
import RightAlignedAvatar from './RightAlignedAvatar';
import Popup from 'reactjs-popup';


import { minWidth } from '@mui/system';
import './dashboard.css'
import { useState } from 'react';
import axios from 'axios';
import { common_Link } from '../commonlink';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});



const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  var[post,setpost]=useState('default')
  var [emp_name,setemp_name]=useState('johndoe')
  var [emp_email,setemp_email]=useState('defaultemail@xyz.com')
  var[name,setname]=useState('default')
  var[file,setfile]=useState()
  var [Cust_email,setCust_email]=useState('defaultemail@xyz.com')
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [inputError, setInputError] = useState(false);
  var navigate=useNavigate()
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar style={{background:"black"}} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          
            <RightAlignedAvatar></RightAlignedAvatar>
        
        </Toolbar>
        
        
      </AppBar>
      <ToastContainer></ToastContainer>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List disablePadding sx={{ display: 'block' }}>
          <ListItem sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  
                }}>
               <Link style={{color:"black"}} to={'/dashboard'}> <ListItemButton  
                sx={{
                  minWidth: 3,
                  minHeight:3,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  
                }}
                >
                 Task 📧 
                  </ListItemButton></Link>  
                  <ListItemText primary='Email Task' sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
        </List>
        <Divider/>
        <List>
          {
            open?<h1>Client Interaction</h1>:<></>
          }
        <ListItem onClick={(e)=>{
              console.log(e);
            }} key={''} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
          <Popup arrow={true}  position={'right center'} trigger={<ListItemIcon
                  sx={{
                    minWidth: 3,
                    minHeight:3,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                  
                >
                 CC
                  <Icon baseClassName="fas" className="fa-plus-circle" color="primary" >+</Icon>
                </ListItemIcon>
              
        }>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<div style={{marginTop:"150px",height:"400px",width:'450px'}}   class="card w-75">
  <div class="card-body">
    <h5 class="card-title">Add Customer Details</h5>
     <label>Name :</label>
     <br/>
    <input class='card-input' onChange={(e)=>{
  setname((e.target.value))
    }} style={{borderRadius:"5px",width:'150px' ,border: inputError ? '1px solid green' : '1px solid red' }} placeholder='Name'></input>
    <br/>
    <label>Customer-Email :</label>
     &nbsp;
    <input required={true} onChange={(e)=>{
setCust_email((e.target.value))
    }} type='email' style={{borderRadius:"5px",width:'150px' ,border: inputError ? '1px solid green' : '1px solid red' }} placeholder='Customer-Email'></input>
    <br/>
    <label>Project Name :</label>
     &nbsp;
    <input style={{"borderRadius":"5px"}} placeholder={localStorage.getItem('projectname') }readOnly={true}></input>
    <br/>
    <br/>
    <input required onChange={(e)=>{
      setInputError((true))
      setfile((e.target.files))

    }} type='file' style={{borderRadius:"5px",width:'150px' ,border: inputError ? '1px solid green' : '1px solid red' }}  placeholder='Select Cust_File'></input>
    <br/>
    <button class={'btn btn-success'} style={{background:"green"}} onClick={async()=>{
      
       if(inputError){
        const data=new FormData()

        data.append("email",Cust_email)
        
        data.append("name",name)
        
        data.append("projectname",localStorage.getItem('projectname'))
        data.append('file',file[0])   
        await axios.post(common_Link+'/customer/newCustomer',data).then(resp=>{
          if(resp.status===200){
           
           toast.success("Customer Created  "+resp.data.name,{
             position:"top-right",
             
           })
          }
          else{
           toast.error("Something Went Wrong",{
             position:"top-right"
           })
          }
         }).catch((err)=>console.error(err))

       }else{
        toast.error('Incomplete data')
       }
      
    }}>Submit</button>
  </div>
</div>

        </Popup>

          <ListItemText primary='Create Customer' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>  
            <ListItem onClick={(e)=>{
              navigate('/dashboard/getClients')
            }} key={''} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                   GC🔍
                </ListItemIcon>
                <ListItemText primary='My Clients' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        
            
        </List>
        <Divider />

        <List>
          {
            open?<h1 style={{fontSize:"22px"}}>Employee Interaction</h1>:<></>
          }
        <ListItem onClick={(e)=>{
              console.log(e);
            }} key={''} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
          <Popup arrow={true}  position={'right center'} trigger={<ListItemIcon
                  sx={{
                    minWidth: 3,
                    minHeight:3,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                  
                >
                 AE
                  <Icon>💼</Icon>
                </ListItemIcon>
              
        }>
<br/>
<br/>
<br/>
<div class="card w-75"style={{ marginTop:'300px',height:'400px'}}>
  <div class="card-body">
    <h5 class="card-title">Add Employee Details</h5>
    <label>Name :</label>
     <br/>
    <input required={true} onChange={e=>{setemp_name((e.target.value))}} type='text' style={{borderRadius:"5px",width:'150px' ,border: inputError ? '1px solid green' : '1px solid red' }} className='card-input' placeholder='johnDoe'/>
    <label>Employee-Email :</label>
     <br/>
    <input required={true} onChange={(e)=>{
      setemp_email((e.target.value))

    }} type='email' style={{borderRadius:"5px"}} className='card-input' placeholder='default@xyzmail.com'/>
    <label>Project Name :</label>
     <br/>
    <input readOnly={true} type='text' style={{borderRadius:"5px"}} className='card-input' placeholder={localStorage.getItem('projectname')}/>
    <label>Employee Post :</label>
     <br/>
    <input required={true} onChange={e=>{setpost((e.target.value))}} type='text' style={{borderRadius:"5px"}} className='card-input' placeholder='Post'/>
    <br/>
    <br/>
    <button onClick={async()=>{

      await axios.post(common_Link+'/employee/newEmployee',{
        'email':emp_email,
        'projectname':localStorage.getItem('projectname'),
        'name':emp_name,
        'position':post
      }).then(resp=>{
        if (resp.status==200) {
          toast.success('Employee Created',{position:'top-center'})
          
        }
        else{
          toast.error('Something Wrong')
        }
        
      }).catch(err=>{
        console.log(err);
        toast.error('Something Wrong')
      })

          
    }}  class="btn btn-primary">Submit</button>
  </div>
</div>

        </Popup>

          <ListItemText primary='Add Employee' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>  
            <ListItem onClick={(e)=>{
              navigate('/dashboard/getEmployee')
            }} key={''} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                   GE👩‍💻
                </ListItemIcon>
                <ListItemText primary={`My Employee's`} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        <Divider/>
           <ListItem onClick={(e)=>{
              navigate('/dashboard/whatsapp')
            }} key={''} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                   <i class="fab fa-whatsapp"></i>
                </ListItemIcon>
                <ListItemText primary={`Whatsapp Integration`} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <Divider/>
           <ListItem onClick={(e)=>{
              navigate('/dashboard/whatsappTask')
            }} key={''} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  Task &nbsp;<i class="fab fa-whatsapp"></i>
                </ListItemIcon>
                <ListItemText primary={`Whatsapp Task`} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem> 
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        
      </Box>
    </Box>
  );
}
