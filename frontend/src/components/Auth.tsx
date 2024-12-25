import { SignupInput } from "@rudraprasaaad/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type} : {type : "signup" | "signin"}) => {
	const navigate = useNavigate();
	const [postInputs, setPostInputs] = useState<SignupInput>({
		email : "",
		password : "",	
		name : ""
	}) 



	async function sendRequest(){
		try{
			const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
			const { token , name } = response.data;
			localStorage.setItem("token", token);
			localStorage.setItem("name", name);
			navigate("/blogs");
		}
		catch(e){
			console.log(e);					
		}
		
	}


	return <div className="h-screen flex justify-center flex-col">
		<div className="flex justify-center">
			<div>
				<div className="px-10">
					<div className="text-3xl font-extrabold">
						{type === "signin" ? "Nice to see you again!" : "Create an account"}
					</div>
					<div className="text-slate-500 text-center">
						{type === "signin" ? "Don't have an account?" : "Already have an account?"}
						<Link to={type === "signin" ? "/signup" : "/signin"} className="pl-2 underline">{type === "signin" ? "Sign Up" : "Sign In"}</Link>
					</div>
				</div>
				<div className="pt-8">
						{ type === "signup" ? 
							<LabelledInput  label="Name" placeholder="Rudraprasad Gouda" onChange={(e) => {
								setPostInputs({
									...postInputs, 
									name : e.target.value
								})	
							}}/> : null
						}

						<LabelledInput label="Username" placeholder="rudra@mail.com" onChange={(e) => {
								setPostInputs({
								...postInputs, 
								email : e.target.value
							})	
						}}/>
						<LabelledInput label="Password" type="password" onChange={(e) => {
							setPostInputs({
								...postInputs, 
								password : e.target.value
							})	
						}}/>	
						<button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{type === "signup" ? "Sign Up" : "Sign In"}</button>
				</div>
			</div>
		</div>
	</div>
}

interface LabelledInputType {
	label : string
	placeholder? : string
	onChange : (e : ChangeEvent<HTMLInputElement>) => void;
	type? : string
}

function LabelledInput({label, placeholder, onChange, type} : LabelledInputType){
	return <div>
		<label className="block mb-2 text-md font-bold text-gray-900 pt-2">{label}</label>
		<input onChange={onChange}  type={type || "text"} id="first_name" className="bg-gray-50 border 	 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
	</div>
}