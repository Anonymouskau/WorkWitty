import React, {useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {app} from '../firebase/firebasecofig'
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
export default function Homepage() {
    var isAuthenticated=localStorage.setItem("isAuthenticated",JSON.stringify(false))
    const auth=getAuth(app)
	var [state,setstate]=useState(true)
	var [email,setemail]=useState('johndoe@gmail.com')
	var [password,setpassword]=useState("")
	var [repassword,setre_password]=useState("")
	var navigate=useNavigate()
  return (
    <>
    <div class="container">
	
	<div style={{background:"black"}} class="screen">
	<ToastContainer/>
	
		<div class="screen__content">
		   <Avatar sx={{width:"100px",height:"100px"}} style={{left:'30%',top:"20%"}} src='workwitty-high-resolution-logo.png'/>
			<div class="login">
		<div style={{alignContent:"initial"}}>
		</div>
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input onChange={(e)=>{
                         setemail((email=e.target.value))
					}} type="text" name='email' class="login__input" placeholder="Email"/>
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input onChange={(e)=>{
						setpassword((password=e.target.value))
					}}  name='password' type="password" class="login__input" placeholder="Password" />
				</div>
				{
					state?<></>:<input onChange={(e)=>{
						setre_password((repassword=e.target.value))
					}} name='re-password' type="password" class="login__input" placeholder="🔒  Re-Password" />
				}
				
				<button onClick={async()=>{
                  
				 if(state){
					await signInWithEmailAndPassword(auth,email,password).then(resp=>{
						if (resp) {
							localStorage.setItem("email",resp.user.email)
							localStorage.setItem('isAuthenticated',JSON.stringify(true))
							toast.success(`Welcome Ninja 🥷🥷${resp.user.email}`,{position:'top-center'})
							
							setTimeout(()=>{navigate('/projects')}

								,4000)
						} else {
							toast.error('Something Went Wrong')
						}
					
					}).catch(err=>{
						console.log(err);
						toast.error("Something went Wrong 💀💀💀💀💀💀",{position:'top-center'})
					})
				 }
				  if(state==false ){
					if(repassword===password)
                   await createUserWithEmailAndPassword(auth,email,password).then(resp=>{
                     toast.success( resp.user.email+"Now login",{position:'top-center'})   
				   }).catch(err=>{
					   toast.error("Something went Wrong 💀💀💀💀💀💀",{position:'top-center'})
					   console.log(err);
				   })
				   else{
					toast.error("Check repass and pass",{position:'top-center'})
				   }
 
				 }

				}} class="button login__submit">
					<span class="button__text">{state==true?"Log In":"Sign Up"}</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>				
			</div>
			
				
				<div class="social-icons">
				<button class="button login__submit"  onClick={()=>{
					setstate((state=!state))
				}} style={{fontSize:"10px",width:"50%",marginTop:"-20px"}}>{state?"Sign up":"Log In"}
				<i class="button__icon fas fa-chevron-right"></i>
				</button>	
				</div>
			
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
    </>
  )
}
