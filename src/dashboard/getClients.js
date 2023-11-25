import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from 'react'
import MiniDrawer from './Dashboard'
import axios from 'axios'
import { common_Link } from '../commonlink'
import { ToastContainer, toast } from 'react-toastify'
import './dashboard.css'
import { Download } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import {BeatLoader} from 'react-spinners'
export default function GetClients() {

   var[file,setfile]=useState()
   var[loading,setloading]=useState(true)   
   var api=()=>{
        axios.get(common_Link+'/customer/getCustomerinfo',{headers:{

            'projectname':localStorage.getItem('projectname')
        }

        }
        ).then(res=>{
            setloading((false))
            if(res.status===200){
                 
                  getclient(res.data)
            }
            else{
                toast.error("Something went wrong",{
                    position:"top-center"
                })  
            }
        }).catch(err=>{
            toast.error("Something went wrong",{
                position:"top-center"
            })
        })
   }
   var [client, getclient]=useState([])
  
   

   useEffect(()=>{
     api()
  },[client])
    return (
    <>

   <MiniDrawer/>

    <ToastContainer />
    <div style={{width:"100%",height:'100%',background:"white",left:'15%'}} class="card">
 <div className="table-wrapper">
    <table className="table"  >
  <thead>
    <tr>
      
      <th scope="col">Name</th>
      <th scope="col">Client-Email</th>
      <th scope="col">File</th>
      <th scope="col">Actions</th>
      <th scope="col">Trash</th>
      
    </tr>
  </thead>
  <tbody >
   
   {loading?<BeatLoader   style={{alignContent:"center"}}  size={30}  color="blue" />:
    client.map(props=>{
        
   return(

        <tr key={props.email}>
        <th>{props.name}</th>
        <th>{props.email}</th>
        <th>{props.file.map(filename=>{
            return(
                 
                <a href={common_Link+'/'+filename.split('uploads/').pop()}>CleintFile{props.name}<br/></a>
            )
        })}<br/></th>

        <th><Popup position={'centre center'} trigger={<button  className="btn btn-warning">update File</button>}><div style={{backdropFilter:"blur(5px)"}}>
            <input onChange={e=>{
                setfile((e.target.files))
               console.log(e.target.files[0]);
            }} type="file"></input>
            <br/>
            <button 

             style={{alignContent:"center",alignItems:"center"}} onClick={async()=>{

            var data= new FormData()
            data.append('name',props.name) 
            data.append("file",file[0])
              
            await axios.put(common_Link+'/customer/updateCustomer',data).then(res=>{
                toast.success(`Updated ${props.name} File`,{position:'top-center'})
                
            }).catch(err=>{
                toast.err(`Can't update ${props.nam} File`,{position:'top-center'})
            })

            }}>update file</button>
            </div></Popup></th>
        <th><button onClick={async()=>{
          await axios.delete(common_Link+'/customer/deleteCustomer',{data:{
            'name':props.name
          }})
          window.location.reload()
        }} className="btn btn-danger">Delete</button></th>
      </tr>
   ) 

    })
   }
    
   

  </tbody>
</table>
</div>
</div>    
    
    </>
  )
}
