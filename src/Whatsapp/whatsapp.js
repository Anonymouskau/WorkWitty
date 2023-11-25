import React, { useEffect, useState } from "react";
import MiniDrawer from "../dashboard/Dashboard";
import QRCode from "react-qr-code";
import axios from "axios";
import { common_Link } from "../commonlink";
import { ToastContainer, toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {Qrcode } from 'react-qr-code'
export default function Whatsapp() {
  const currentTime = new Date(); // Create a new Date object with the current date and time
  
  var [value, setvalue] = useState("");
  var [loading, setloading] = useState(true);
  var [phone, setphone] = useState("");
  var [message, setmessage] = useState("");
  
  useEffect(() => {},[value,loading]);
  return (
    <>
      <MiniDrawer />
      <ToastContainer />
      <div className="card" style={{ left: "20%", width: "75%" ,height:"400px"}}>
        <h1>Whatsapp Integration</h1>
        <label>Task</label>
        <br/>
        <input
        rows="4" 
        cols="50"
        style={{height:'50px'}}
         placeholder="Write Task Here"
          onChange={(e) => {
            setmessage(e.target.value);
          }}
        />
        <label>Phone number</label>

        <PhoneInput
          country={"eg"}
          enableSearch={true}
          defaultCountry="IN"
          onChange={(e) => setphone(e)}
        />
        <br />
       
        <br />
        <button
          onClick={async () => {
            toast.warning("It Will take 40sec to 1min to assign please Wait");
            await axios
              .post( common_Link+'/task/whatsapp',)
              .then((resp) => {
               
               setvalue((resp.data.qr))
               setloading((false))
               
               axios.post(common_Link+'/task/whatsappsave',{
                message: message,
                phone_number: phone,
                hours: currentTime.getHours(),
                miniutes: currentTime.getMinutes(),
                assignedTo: phone,
                projectname: localStorage.getItem("projectname"),
               email: localStorage.getItem("email"),
               }).then(resp=>{

                toast.success('Message Sent Succesfully')
                setloading((true))
               }).catch(err=>{
                toast.error("Something Went Wrong")
               })

              })
              .catch((err) => {
                console.log(err);
              });
          }}
          className="btn-primary"
        >
          Create Task{" "}
        </button>

      <h3>Scan below QRCode</h3>
      {loading?<BeatLoader size={50} color="grey" />:<QRCode  size={256}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={value}
    viewBox={`0 0 256 256`}/>}
      </div>
    </>
  );
}
