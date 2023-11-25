import React, { useEffect, useState } from 'react'
import MiniDrawer from './Dashboard'
import axios from 'axios'
import { common_Link } from '../commonlink'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Popup from 'reactjs-popup'
import {BeatLoader } from 'react-spinners'
export default function GetEmployee() {

    var [title,settitle]=useState('')
    var [description,setdesc]=useState('')
    var [custemail,setCust_email]=useState('')
  var [emp,setemp]=useState([])
  var [loading,setloading ]=useState(true)
  var api=()=>{
    axios.get(common_Link+'/employee/getEmployee',{headers:{
        "projectname":localStorage.getItem('projectname')
    }}).then(resp=>{
         setloading((false))
        if(resp.status==200){
            setemp(resp.data)
        }
    }).catch(err=>{
          toast.error('Something Went wrong')
    })
}

useEffect(()=>{
api()
},[emp])
  
    return (
 <>
 <MiniDrawer/>
 
 <ToastContainer />
 <div style={{width:"100%",height:'100%',background:"white",left:'15%'}} class="card">
 <div className="table-wrapper">
  <table class="table">
  <thead>
    <tr>
      
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      
      <th scope="col">Actions</th>
      <th scope="col">Trash</th>
      
    </tr>
  </thead>
  <tbody>
   {
     loading?<BeatLoader  style={{alignContent:"center"}}  size={30}  color="blue" />:emp.map(props=>{
     return(
        <tr key={props._id}> 
        <th scope="col">{props.name}</th>
        <th scope="col">{props.email}</th>
        
        <th scope="col"><Popup position={'center center'} trigger={<button  className='btn-success'>Assign_Task</button>}>
            
            <div style={{height:"400px",marginTop:"50%"}}  className='card w-75'>
             <div className='card-body'>
                
                <h5> Assign Task</h5>
                <br/>
                <label>Project Name :</label>
     <br/>
    <input readOnly={true} type='text' style={{borderRadius:"5px"}} className='card-input' placeholder={localStorage.getItem('projectname')}/>
    <label>Assigned to :</label>
     <br/>
    <input readOnly={true} type='text' style={{borderRadius:"5px"}} className='card-input' placeholder={props.email}/>
    <label>Customer_email :</label>
     <br/>
    <input  onChange={(e)=>{setCust_email((e.target.value))}} type='email' style={{borderRadius:"5px"}} className='card-input' />
    <label>Title of Task :</label>
     <br/>
    <input  onChange={e=>{settitle((e.target.value))}} type='text' style={{borderRadius:"5px"}} className='card-input' />
    <label>Description :</label>
     <br/>
     <textarea onChange={e=>setdesc((e.target.value))} ></textarea>           
                </div> 

     <button onClick={async()=>{
        await axios.post(common_Link+'/task/todotask',{'projectname':localStorage.getItem('projectname'),
        'title':title,
        'description':description,
        'assignedTo':props.email,
        'customeremail':custemail,
    
        'senderEmail':localStorage.getItem('email')
    }).then(resp=>{
                     if(resp.status==200){
                           
                        toast.success('Task To Do created')
                     }
                     else{
                        toast.error("Something Went Wrong")            
                     }
        }).catch(err=>{
            toast.error("Something Went Wrong")
        })
     }}>Create Task</button>
            </div>
            </Popup></th>
        <th scope="col"><button onClick={async()=>{
                  await axios.delete(common_Link+'/employee/deleteEmployee',{data:{
                    _id:props._id

                  }}).then((resp)=>{
                    if(resp.status==200){
                        toast.success(`Deleted employee ${props.name}`)
                        window.location.reload()
                    }
                    else{
                        toast.error("Something Went Wrong")

                    }

                  }).catch(err=>console.log(err))
        }} className='btn-danger'>Trash</button></th>
        </tr>
    )})
   }


  </tbody>
  </table>
  </div>
</div>
 </>
 
  )
}
