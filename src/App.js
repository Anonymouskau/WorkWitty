import logo from './logo.svg';
import './App.css';
import Project from './ProjectComponent/project';
import Homepage from './homepage/homepage';
import Error from './Error/Error';
import {   BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';   
import MainDash from './dashboard/MainDash';
import GetClients from './dashboard/getClients';
import GetEmployee from './dashboard/getEmployee';
import Whatsapp from './Whatsapp/whatsapp';
import WhatsappTask from './Whatsapp/whatsappTask';
function App() {
     
  return (
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Homepage></Homepage>}/>
     
      <Route path='/projects' Component ={()=>JSON.parse(localStorage.getItem("isAuthenticated"))?<Project/>:<Error/>}/>
      <Route path='/dashboard' Component ={()=>JSON.parse(localStorage.getItem("isAuthenticated"))?<MainDash/>:<Error/>}/>
      <Route path='/dashboard/getClients' Component ={()=>JSON.parse(localStorage.getItem("isAuthenticated"))?<GetClients/>:<Error/>}/>
      <Route path='/dashboard/getEmployee' Component ={()=>JSON.parse(localStorage.getItem("isAuthenticated"))?<GetEmployee/>:<Error/>}/>
      <Route path='/dashboard/whatsapp' Component ={()=>JSON.parse(localStorage.getItem("isAuthenticated"))?<Whatsapp/>:<Error/>}/>
      <Route path='/dashboard/whatsappTask' Component ={()=>JSON.parse(localStorage.getItem("isAuthenticated"))?<WhatsappTask/>:<Error/>}/>
      
     </Routes>
     </BrowserRouter>
    )   
}

export default App;
