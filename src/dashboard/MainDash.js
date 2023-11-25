import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Dashboard from "./Dashboard";
import axios from "axios";
import { common_Link } from "../commonlink";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
export default function MainDash() {
  var [task, settask] = useState([]);
  var [donetask,setdone]=useState([])
  var [inprog,setinprog]=useState([])
  var [loading,setloading]=useState(true)
  var todo='To Do'
  var inprogress='In Progress'
  var done='Done'
  const api = async (value) => {
    await axios
      .get(common_Link + "/task/statusTasks", {
        headers: {
          projectname: localStorage.getItem("projectname"),
          email: localStorage.getItem("email"),
          status: value,
        },
      })
      .then((resp) => {
          setloading((false)) 
        if (resp.status == 200 ) {
          settask(resp.data);
          
        } else {
          toast.error("Something Went Wrong");
        }
      }).catch(error=>console.log(error));
  };
     
  const api2 = async (value) => {
    await axios
      .get(common_Link + "/task/statusTasks", {
        headers: {
          projectname: localStorage.getItem("projectname"),
          email: localStorage.getItem("email"),
          status: value,
        },
      })
      .then((resp) => {
        setloading((false)) 
        if (resp.status == 200) {
          setdone(resp.data);
        } else {
          toast.error("Something Went Wrong");
        }
      }).catch(error=>console.log(error));
  };
    
  const api3 = async (value) => {
    await axios
      .get(common_Link + "/task/statusTasks", {
        headers: {
          projectname: localStorage.getItem("projectname"),
          email: localStorage.getItem("email"),
          status: value,
        },
      })
      .then((resp) => {
        setloading((false)) 
        if (resp.status == 200) {
          setinprog(resp.data);
        } else {
          toast.error("Something Went Wrong");
        }
      }).catch(error=>console.log(error));
  };
  useEffect(() => {
    api(todo);
    api2(done)
    api3(inprogress)
  }, [task,donetask,inprog]);

  return (
    <>
      {/* <Navbar/> */}
      <Dashboard />
      <ToastContainer />    
       
      <div className="table-wrapper">
      <div
        class="card border-primary mb-3"
        style={{ width: "100%", height: "100%", left: "50px" }}
      ><h1 >Email Tasks</h1>
        <h1 class="card-header text-primary">To Do</h1>
        <div  class="card-body text-primary">
          {loading?<BeatLoader color="lightblue" />:task.map((props) => {
            return (
              <div  key={props._id}
                style={{ height:'400px',background: "#DFFFFF", color: "black" }}
                class="card"
              >
                <h3>Title: {props.title}</h3>
                <br />
                Description : {props.description}
                <br />
                assignedTo : {props.assignedTo}
                <br /> Customer email : {props.customer}
                <br/>
                 Created At : <br/>{props.createdAt}
                 <br/>
                 Updated At : <br/>{props.updatedAt}
                <button onClick={async()=>{
                await axios.patch(common_Link+'/task/updateTasks',{
                           '_id':props._id,  
                           'projectname':localStorage.getItem('projectname'),
                           'assignedTo':props.assignedTo,
                           'title':props.title,
                           'description':props.description
                           ,
                           'status':"In Progress",
                           'customer':props.customer
                }).then(resp=>{
                    if (resp.status==200) {
                        toast.success('Task Updated in In progress Section')

                    } else {
                        toast.error('Something Went Wrong')
                    }
                }).catch(error=>console.log(error))
                }} className="btn-warning">In Progress</button>
                <br/>
                <button onClick={async()=>{
                await axios.patch(common_Link+'/task/updateTasks',{
                           '_id':props._id,  
                           'projectname':localStorage.getItem('projectname'),
                           'assignedTo':props.assignedTo,
                           'title':props.title,
                           'description':props.description
                           ,
                           'status':"Done",
                           'customer':props.customer
                }).then(resp=>{
                    if (resp.status==200) {
                        toast.success('Task Completed check in Done Section')

                    } else {
                        toast.error('Something Went Wrong')
                    }
                }).catch(error=>console.log(error))
                }} className="btn-success">Done</button>
              </div>
            );
          })}
        </div>
      </div>

      <div
        class="card border-warning mb-3"
        style={{ width: "100%", height: "100%", left: "50px" }}
      >
        <h1 class="card-header text-warning">In Progress</h1> 
        <div  class="card-body text-warning">
        {loading?<BeatLoader color="#FFFF99" />:inprog.map((props) => {
            return (
              <div  key={props._id}
                style={{ height:'400px',background: "#FFFF99", color: "black" }}
                class="card w3-pale-yellow"
              >
                <h3>Title: {props.title}</h3>
                <br />
                Description : {props.description}
                <br />
                assignedTo : {props.assignedTo}
                <br /> Customer email : {props.customer}
                <br/>
                 Created At : <br/>{props.createdAt}
                 <br/>
                 Updated At : <br/>{props.updatedAt}
               
                <br/>
                <button onClick={async()=>{
                await axios.patch(common_Link+'/task/updateTasks',{
                           '_id':props._id,  
                           'projectname':localStorage.getItem('projectname'),
                           'assignedTo':props.assignedTo,
                           'title':props.title,
                           'description':props.description
                           ,
                           'status':"Done",
                           'customer':props.customer
                }).then(resp=>{
                    if (resp.status==200) {
                        toast.success('Task Completed check in Done Section')

                    } else {
                        toast.error('Something Went Wrong')
                    }
                }).catch(error=>console.log(error))
                }} className="btn-success">Done</button>
              </div>
            );
          })}


        </div>
      </div>
      <div
        class="card border-success mb-3"
        style={{ width: "100%", height: "100%", left: "50px" }}
      >
        <h1 class="card-header text-success">Done</h1> 
        <div  class="card-body text-success">
        {loading?<BeatLoader color="lightgreen" />:donetask.map((props) => {
            return (
              <div  key={props._id}
                style={{ height:'400px',background: "lightgreen", color: "black" }}
                class="card"
              >
                <h1>Title: {props.title}</h1>
                <br />
                Description : {props.description}
                <br />
                assignedTo : {props.assignedTo}
                <br /> Customer email : {props.customer}
                <br/>
                 <button class='btn-danger' onClick={async()=>{
                      await axios.delete(common_Link+'/task/deletetask',{data:{
                        '_id':props._id
                      }}).then(resp=>{
                        if(resp.status==200){
                               toast.success('Deleted Task')
                        }else{
                            
                            toast.error('Something Went Wrong')
                        }
                      }).catch(error=>{
                        console.log(error)
                      })
                 }}>Delete Task</button>
              </div>
            );
          })}


        </div>
      </div>
      </div>
    </>
  );
}
