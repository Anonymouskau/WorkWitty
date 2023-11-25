import React, { useEffect, useState } from "react";
import MiniDrawer from "../dashboard/Dashboard";
import QRCode from "react-qr-code";
import axios from "axios";
import { common_Link } from "../commonlink";
import { ToastContainer, toast } from "react-toastify";
import { ClimbingBoxLoader } from "react-spinners";
import { commonLink2 } from "../commonLink2";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function Whatsapp() {
  const currentTime = new Date(); // Create a new Date object with the current date and time

  var [value, setvalue] = useState("");
  var [loading, setloading] = useState(true);
  var [phone, setphone] = useState("");
  var [message, setmessage] = useState("");

  useEffect(() => {});
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
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker onChange={e=>{console.log(e.toString(),currentTime.getHours())}} value={currentTime.getTime} label="" />
      </DemoContainer>
    </LocalizationProvider> */}
        <br />
        <button
          onClick={async () => {
            toast.warning("It Will take 40sec to 1min to assign please Wait");
            await axios
              .post(commonLink2, {
                message: message,
                phone_number: phone,
                hours: currentTime.getHours(),
                miniutes: currentTime.getMinutes(),
              })
              .then((resp) => {
                if (resp.status == 200) {
                  toast.success("Message Sent Check to Whatsapp  Task");
                  axios
                    .post(common_Link + "/task/whatsapp", {
                      message: message,
                      assignedTo: phone,
                      projectname: localStorage.getItem("projectname"),
                      email: localStorage.getItem("email"),
                    })
                    .then((resp) => {
                      console.log(resp);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  toast.error("Something Went Wrong");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          className="btn-primary"
        >
          Create Task{" "}
        </button>
      </div>
    </>
  );
}
