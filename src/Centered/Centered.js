import React, { useState } from 'react';
import './centered.css'; // Import your CSS file for styling
import axios from 'axios';
import { common_Link } from '../commonlink';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const CenteredForm = () => {
  var email=localStorage.getItem("email")
  
    var api=()=>{  }
   
   var [ProjectName,setProjectName]=useState('Default')

  return (
     <>
     <ToastContainer/>
    <div className="container">
        
      <div className="formWrapper">
        <h2>Add Project</h2>
        <div>
          {/* Your form inputs go here */}
          <label htmlFor="name">Projectname:</label>
          <input onChange={(e)=>{
            setProjectName((ProjectName=e.target.value))

          }} type="text" id="name" name="name" />
          <label htmlFor="name">Email:</label>
          <input placeholder={email} type="text" id="name" name="email"readOnly={true} />
          {/* Other form fields */}
          <br/>
          <br/>
          <button onClick={async()=>{
          
             try {
             await  axios.post(common_Link+'/project/newproject',{
                    "email":email,
                    "ProjectName":ProjectName
               }).then(resp=>{
                      if(resp.data.status===503){
                         toast.error('ProjectName already exist')
                      }else{
                           toast.success('Project Created')
                      }
               }).catch(err=>{
                console.log(err);
               })
                    
            } catch (error) {
                
            }
          }}>Create new Project</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default CenteredForm;
