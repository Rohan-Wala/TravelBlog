import axios from "axios";
import { Field, Formik, useFormik, Form } from "formik";
<<<<<<< HEAD
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
=======
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Signup from "./Signup";
import login from "./login.jpg"
import "./login.css"
import {BsFillPersonFill} from "react-icons/bs"

>>>>>>> master
export default function Login() {
	var disPatch = useDispatch();
	var navigate = useNavigate();
	var [emailmes, setEmailMes] = useState(false);
	var [passmes, setPassMes] = useState(false);
	var userdata = {};
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: (values) => {
			userdata = values;
			// console.log("log in login", userdata);

			axios({
<<<<<<< HEAD
				url: "https://travellogserver-production.up.railway.app/users/login",
=======
				url: "http://localhost:5001/users/login",
>>>>>>> master
				method: "post",
				data: userdata,
				headers: {
					Authorization: localStorage.token,
				},
			})
				.then(
					(result) => {
						console.log(result.data);
						// console.log(result.data.);
						if (result.data.token) {
							localStorage.token = result.data.token;
							localStorage.userid = result.data.userid;
							// localStorage.userData = JSON.stringify(result.data.userData);
							disPatch({
								type: "LOGIN",
							});
							navigate("/");
						}

						// let sampleDate = new Date(result.data.userData.bdate);
						// let finaldate =
						// 	sampleDate.getDate() +
						// 	"/" +
						// 	sampleDate.getMonth() +
						// 	"/" +
						// 	sampleDate.getFullYear();

						// console.log(finaldate);

						if (result.data.message == "user not found") {
							setEmailMes(true);
							setPassMes(false);
						}
						if (result.data.message == "invalid password") {
							setEmailMes(false);
							setPassMes(true);
						}
						if (result.data.message == "login success") {
							setEmailMes(false);
							setPassMes(false);
						}
					},
					(err) => {
						console.log("log in err part", err);
					}
				)
				.catch((err) => {
					console.log(err);
				});
		},
	});
<<<<<<< HEAD
	return (
		<section class=" gradient-custom">
			<div class="container py-5 h-100">
				<div class="row justify-content-center align-items-center h-100">
=======

	const ric = <BsFillPersonFill/> + "Email";
	return (
		<div className="img" style={{"backgroundImage":`url(${login})` ,"background-size": "cover", "height":"100vh"}}>
		<section class=" gradient-custom">
			<div class="container-fluid py-5">
				<div class="row justify-content-center align-items-center h-100">
					<h2 className="logo">Login to your account</h2>
>>>>>>> master
					<div class="col-12 ">
						<div
							class="card shadow-2-strong card-registration"
							style={{ borderRadius: "15px;" }}
						>
							<div class="card-body">
<<<<<<< HEAD
								<h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Log In</h3>
								<form onSubmit={formik.handleSubmit}>
									<div className="row">
										<div class="col-md-6 mb-4">
											<div class="form-outline">
=======
								{/* <h3 class="mb-4 pb-2 pb-md-0 mb-md-5" style={{"textAlign":"center"}}>Log In</h3> */}
								<form onSubmit={formik.handleSubmit}>
									<div className="row">
										<div class="col-md-12 mb-4">
											<div class="form-outline">
												
												{/* <label class="form-label" for="emailAddress">
													Email
												</label> */}
>>>>>>> master
												<input
													type="email"
													id="email"
													class="form-control "
													onChange={formik.handleChange}
													value={formik.values.email}
<<<<<<< HEAD
												/>
												<label class="form-label" for="emailAddress">
													Email
												</label>
=======
													placeholder = "&#xf007; Email Address"
													style={{"fontFamily": "Arial, 'Font Awesome 5 Free'"}}/>

>>>>>>> master
												<div className="text-danger">
													{emailmes && "Can't find User"}
												</div>
											</div>
										</div>

<<<<<<< HEAD
										<div class="col-md-6 mb-4">
											<div class="form-outline">
=======
										<div class="col-md-12 mb-4">
											<div class="form-outline">
												
												{/* <label class="form-label" for="password">
													Password
												</label> */}
>>>>>>> master
												<input
													type="password"
													id="password"
													class="form-control "
													onChange={formik.handleChange}
													value={formik.values.password}
<<<<<<< HEAD
												/>
												<label class="form-label" for="password">
													Password
												</label>
=======
													placeholder = "&#xf084; Password"
													style={{"fontFamily": "Arial, 'Font Awesome 5 Free'"}}/>
>>>>>>> master
											</div>
											<div className="text-danger">
												{passmes && "Check your Password"}
											</div>
										</div>
									</div>

									<div class="row mb-4">
										<div class="col d-flex justify-content-center">
											<div class="form-check">
												<input
													class="form-check-input"
													type="checkbox"
													value=""
													id="form2Example31"
													checked
												/>
												<label class="form-check-label" for="form2Example31">
													{" "}
													Remember me{" "}
												</label>
											</div>
										</div>

										<div class="col">
<<<<<<< HEAD
											<a href="#!">Forgot password?</a>
=======
											<a href="#!">Forgotten password?</a>
>>>>>>> master
										</div>
										{/* <button
											type="button"
											class="btn btn-primary btn-block mb-4 mt-4"
										>
											Sign in
										</button> */}
										<input
											class="btn btn-primary btn-lg mb-4 mt-4"
											type="submit"
<<<<<<< HEAD
											value="LogIn"
										/>

										<div class="text-center">
											<p>
												Not a member? <Link to={"/signup"}>Register</Link>
											</p>
											<button
=======
											value="Login"
										/>
										<div className="border"></div>

										<div class="text-center">
											<Link to={"/signup"}>
												<button className="btn btn-block btn-lg gradient-custom-4">Create new account</button>
											</Link>
											{/* <p>
												Not a member? <Link to={"/signup"}>Register</Link>
											</p> */}
											{/* <button
>>>>>>> master
												type="button"
												class="btn btn-link btn-floating mx-1"
											>
												<i class="fab fa-facebook-f"></i>
<<<<<<< HEAD
											</button>
=======
											</button> */}
>>>>>>> master
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
<<<<<<< HEAD
=======
		</div>

>>>>>>> master
	);
}
