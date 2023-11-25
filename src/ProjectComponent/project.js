import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import './project.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { common_Link } from '../commonlink'
import Popup from 'reactjs-popup'
import CenteredForm from '../Centered/Centered'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
export default function Project() {
    
    const navigate=useNavigate()
    const saveProjectName=(Pname)=>{
       localStorage.setItem("projectname",Pname)
      //console.log( localStorage.getItem('projectname'))  
    }
   var email =localStorage.getItem('email')
 var [value,setvalue]=useState([])
  var api=async()=>{await axios.post(common_Link+'/project/myproject',{"email":email}).then((resp)=>{
    if(resp.status==200){
       setvalue(resp.data)
    }
    else{
        alert("Something went wrong")
    }

  }).catch(err=>{

  })}
useEffect(()=>{
    api()
})

    return (
    <>
    <Navbar/>
    <br/>
   <ToastContainer/>
    <div class="card">
         <Popup position={'center center'}  trigger={
            <button style={{"borderColor":"black",background:"white",color:"black","fontSize":"350%"}}>+ <br/>Add Project</button>
            
        }>

       <CenteredForm/>

         </Popup>
       
      </div>
   
      {value.map(data_props=>{
        
       return (
            <div class="card">
              <button onClick={()=>{
                    saveProjectName(data_props.ProjectName)
                    navigate('/dashboard')
              }} value={data_props.ProjectName} key={data_props.ProjectName} style={{"borderColor":"black",background:"white",color:"black","fontSize":"100%"}}><br/><Link>{data_props.ProjectName}</Link><br/>{data_props._id}</button>
              <br/>
              <button key={data_props._id} onClick={async()=>{
                
                var userprompt=prompt("Enter project Name to Delete")
                if(userprompt===data_props.ProjectName){

                     await axios.delete(common_Link+'/project/deleteproject',{data:{
                        "ProjectName":data_props.ProjectName
                     }}).then(resp=>{
                        alert("Deleted successfully")
                     }).catch(err=>{
                    
                     })

                     await axios.delete(common_Link+"/customer/delete_cust",{data:{"projectname":data_props.ProjectName,"email":localStorage.getItem("email")}}).then(resp=>{
                             toast.success(`Project deleted`,{position:"top-center"})
                     }).catch(err=>{
                        toast.err(`Failed to delete`,{position:"top-center"})
                     })
                     await axios.delete(common_Link+'/customer/delete_cust',{data:{"projectname":data_props.ProjectName}}).then(resp=>{
                        toast.success(`all data of ${data_props.ProjectName} deleted Successfully`,{position:"top-center"})
    
                      }).catch(err=>{
                        toast.error('failed to delete data',{position:"top-center"})
    
                      })
                      await axios.delete(common_Link+'/task/deletemanyTask',{data:{"email":localStorage.getItem('email'),"projectname":data_props.ProjectName}}).then(resp=>{
                        toast.success(`all data of ${data_props.ProjectName} deleted Successfully`,{position:"top-center"})
    
                      }).catch(err=>{
                        toast.error('failed to delete data',{position:"top-center"})
    
                      })
                      await axios.delete(common_Link+'/task/deleteWhatsappTask',{data:{"email":localStorage.getItem('email'),"projectname":data_props.ProjectName}}).then(resp=>{
                        toast.success(`all data of ${data_props.ProjectName} deleted Successfully`,{position:"top-center"})
    
                      }).catch(err=>{
                        toast.error('failed to delete data',{position:"top-center"})
    
                      })
                }
                  else{
                    alert("Incorrect Project Name")
                  }
                  
             
            }} style={{"background":"red"}}> 🗑️ </button>
            </div>

        )
      })}
    
    </>
  )
}
