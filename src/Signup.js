import "./Signup.css";
import { useState } from "react";
import { Field, Formik, useFormik, Form } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import login from "./login.jpg";
export default function Signup() {
	const [file, setFile] = useState();
	const [previewImg, setPrevFile] = useState();
	var navigate = useNavigate();
	// var userimg;
	// function handleChange() {
	// 	// setFile(URL.createObjectURL(e.target.files[0]));
	// 	// setFieldValue("file", e.target.files[0]);
	// 	formdata.append("avatar", file);
	// }

	var uservalues = {};
	var userdata = {};
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			userid: "",
			password: "",
			bdate: "",
			gender: "",
			city: "",
			phone: "",
		},
		onSubmit: (values) => {
			let formdata = new FormData();
			formdata.append("avatar", file);
			//fields
			formdata.append("name", values.name);
			formdata.append("email", values.email);
			formdata.append("userid", values.userid);
			formdata.append("password", values.password);

			// axios({
			// 	url: "http://localhost:5001/users/upload",
			// 	method: "post",
			// 	data: formdata,
			// 	headers: {
			// 		"content-type": "multipart/form-data",
			// 	},
			// })
			// 	.then((result) => {
			// 		// console.log("log in upload file client side");
			// 		// console.log(result);
			// 		userdata.img = result.data;
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});

			axios({
				url: "http://localhost:5001/users/signup",
				method: "post",
				data: formdata,
			}).then(
				(res) => {
					console.log(res.data);
					alert(res.mes);
					navigate("/login");
				},
				(err) => {
					console.log(err);
				}
			);
		},
	});

	const handelradio = (e) => (formik.values.gender = e.target.value);
	// var user = {};
	// function getname(e) {
	// 	user.name = e.target.value;
	// }
	// function getpasswoed(e) {
	// 	user.password = e.target.value;
	// }
	// function getemail(e) {
	// 	user.email = e.target.value;
	// }
	// function getuserdi(e) {
	// 	user.userid = e.target.value;
	// }
	// function getbdate(e) {
	// 	user.bdate = e.target.value;
	// }
	// function getcity(e) {
	// 	user.city = e.target.value;
	// }
	// function getphone(e) {
	// 	user.phone = e.target.value;
	// }
	// function getgender(e) {
	// 	userdata.gender = e.target.value;
	// 	// console.log(e.target.value);
	// 	// console.log(userdata);
	// }
	// use formik instated of this

	return (
		<div
			className="img"
			style={{ backgroundImage: `url(${login})`, "background-size": "cover" }}
		>
			<section class="vh-100">
				<div class="container py-2 h-100">
					<div class="row justify-content-center align-items-center h-100">
						<div class="col-12 ">
							<h2 className="logo">Create an account</h2>
							<div
								class="card shadow-2-strong card-registration"
								style={{ borderRadius: "15px;" }}
							>
								<div class="card-body">
									<form
										onSubmit={formik.handleSubmit}
										enctype="multipart/form-data"
										method="post"
									>
										<div class="picture-container">
											<div class="picture">
												<img
													// src="https://lh3.googleusercontent.com/LfmMVU71g-HKXTCP_QWlDOemmWg4Dn1rJjxeEsZKMNaQprgunDTtEuzmcwUBgupKQVTuP0vczT9bH32ywaF7h68mF-osUSBAeM6MxyhvJhG6HKZMTYjgEv3WkWCfLB7czfODidNQPdja99HMb4qhCY1uFS8X0OQOVGeuhdHy8ln7eyr-6MnkCcy64wl6S_S6ep9j7aJIIopZ9wxk7Iqm-gFjmBtg6KJVkBD0IA6BnS-XlIVpbqL5LYi62elCrbDgiaD6Oe8uluucbYeL1i9kgr4c1b_NBSNe6zFwj7vrju4Zdbax-GPHmiuirf2h86eKdRl7A5h8PXGrCDNIYMID-J7_KuHKqaM-I7W5yI00QDpG9x5q5xOQMgCy1bbu3St1paqt9KHrvNS_SCx-QJgBTOIWW6T0DHVlvV_9YF5UZpN7aV5a79xvN1Gdrc7spvSs82v6gta8AJHCgzNSWQw5QUR8EN_-cTPF6S-vifLa2KtRdRAV7q-CQvhMrbBCaEYY73bQcPZFd9XE7HIbHXwXYA=s200-no"
													src=""
													class="picture-src"
													id="wizardPicturePreview"
													title=""
												/>
												<input
													type="file"
													name="avatar"
													onChange={(e) => {
														setPrevFile(URL.createObjectURL(e.target.files[0]));
														setFile(e.target.files[0]);
													}}
												/>

												<img
													// className="card-img-top"
													src={previewImg}
													style={{ height: "100%", width: "100%" }}
												/>
											</div>
											<h6 class="">Choose Picture</h6>
										</div>

										<div class="form-outline mb-3">
											<input
												type="text"
												id="name"
												class="form-control "
												onChange={formik.handleChange}
												value={formik.values.name}
												placeholder="&#xf007; Enter your name"
												style={{ fontFamily: "Arial, 'Font Awesome 5 Free'" }}
											/>
										</div>

										<div class="form-outline mb-3">
											<input
												type="email"
												id="email"
												class="form-control "
												onChange={formik.handleChange}
												value={formik.values.email}
												placeholder="&#xf0e0; Enter Email"
												style={{ fontFamily: "Arial, 'Font Awesome 5 Free'" }}
											/>
										</div>

										<div class="form-outline mb-3">
											<input
												type="text"
												id="userid"
												class="form-control "
												onChange={formik.handleChange}
												value={formik.values.userid}
												placeholder="&#xf507; Enter username"
												style={{ fontFamily: "Arial, 'Font Awesome 5 Free'" }}
											/>
										</div>

										<div class="form-outline mb-3">
											<input
												type="password"
												id="password"
												class="form-control "
												onChange={formik.handleChange}
												value={formik.values.password}
												placeholder="&#xf084; Enter your password"
												style={{ fontFamily: "Arial, 'Font Awesome 5 Free'" }}
											/>
										</div>

										<div class="form-check d-flex justify-content-center mb-2">
											<input
												class="form-check-input me-2"
												type="checkbox"
												value=""
												id="form2Example3cg"
											/>
											<label class="form-check-label" for="form2Example3g">
												I agree all statements in{" "}
												<a href="#!" class="text-body">
													<u>Terms of service</u>
												</a>
											</label>
										</div>

										{/* <div class="d-flex justify-content-center">
											<button
												type="button"
												class="btn btn-block btn-lg gradient-custom-4"
											>
												Register
											</button>
										</div> */}

										<div class="d-flex justify-content-center">
											<input
												class="btn btn-block btn-lg gradient-custom-4"
												type="submit"
												value="Register"
											/>
										</div>

										<p class="text-center text-muted mt-5 mb-0">
											Have already an account?
											<Link to="/login" class="fw-bold text-body">
												<u>Login here</u>
											</Link>
										</p>
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
