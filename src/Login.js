import axios from "axios";
import { Field, Formik, useFormik, Form } from "formik";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Signup from "./Signup";
import login from "./login.jpg";
import "./login.css";
import { BsFillPersonFill } from "react-icons/bs";

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
		validate: (values) => {
			let errors = {};

			if (values.email.length === 0) {
				errors.email = "This field is required";
			}
			if (values.password.length === 0) {
				errors.password = "This field is required";
			}

			return errors;
		},
		onSubmit: (values) => {
			userdata = values;
			// console.log("log in login", userdata);

			axios({
				url: "http://localhost:5001/users/login",
				method: "post",
				data: userdata,
				headers: {
					Authorization: localStorage.token,
				},
			})
				.then(
					(result) => {
						// console.log(result.data);
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
						// console.log("log in err part", err);
					}
				)
				.catch((err) => {
					// console.log(err);
				});
		},
	});

	const ric = <BsFillPersonFill /> + "Email";
	return (
		<div
			className="img"
			style={{
				backgroundImage: `url(${login})`,
				"background-size": "cover",
				height: "100vh",
			}}
		>
			<section class=" gradient-custom">
				<div class="container-fluid py-5">
					<div class="row justify-content-center align-items-center h-100">
						<h2 className="logo text-white">Login to your account</h2>
						<div class="col-12 ">
							<div
								class="card shadow-2-strong card-registration"
								style={{ borderRadius: "15px;" }}
							>
								<div class="card-body">
									{/* <h3 class="mb-4 pb-2 pb-md-0 mb-md-5" style={{"textAlign":"center"}}>Log In</h3> */}
									<form onSubmit={formik.handleSubmit}>
										<div className="row">
											<div class="col-md-12 mb-4">
												<div class="form-outline">
													{/* <label class="form-label" for="emailAddress">
													Email
												</label> */}
													<input
														type="email"
														id="email"
														class="form-control text-dark"
														onChange={formik.handleChange}
														value={formik.values.email}
														placeholder="&#xf007; Email Address"
														autoComplete="off"
														style={{
															fontFamily: "Arial, 'Font Awesome 5 Free'",
														}}
													/>
													{formik.errors.email ? (
														<div style={{ color: "red" }}>
															{formik.errors.email}
														</div>
													) : null}

													<div className="text-warning">
														{emailmes && "Can't find User"}
													</div>
												</div>
											</div>

											<div class="col-md-12 mb-4">
												<div class="form-outline">
													{/* <label class="form-label" for="password">
													Password
												</label> */}
													<input
														type="password"
														id="password"
														class="form-control text-dark "
														onChange={formik.handleChange}
														value={formik.values.password}
														placeholder="&#xf084; Password"
														style={{
															fontFamily: "Arial, 'Font Awesome 5 Free'",
														}}
													/>
													{formik.errors.password ? (
														<div style={{ color: "red" }}>
															{formik.errors.password}
														</div>
													) : null}
												</div>
												<div className="text-warning">
													{passmes && "Check your Password"}
												</div>
											</div>
										</div>

										<div class="row mb-4">
											{/* <button
											type="button"
											class="btn btn-primary btn-block mb-4 mt-4"
										>
											Sign in
										</button> */}
											<input
												class="btn btn-primary btn-lg mb-4 mt-4 fw-bold"
												type="submit"
												value="Login"
											/>
											<div className="border"></div>

											<div class="text-center">
												<Link to={"/signup"}>
													<button className="btn btn-block btn-lg gradient-custom-4 fw-bold text-white	">
														Create new account
													</button>
												</Link>
												{/* <p>
												Not a member? <Link to={"/signup"}>Register</Link>
											</p> */}
												{/* <button
												type="button"
												class="btn btn-link btn-floating mx-1"
											>
												<i class="fab fa-facebook-f"></i>
											</button> */}
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
