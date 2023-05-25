import "./Signup.css";
import { useState } from "react";
import { Field, Formik, useFormik, Form } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import login from "./login.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";

export default function Signup() {
	const [file, setFile] = useState();
	const [previewImg, setPrevFile] = useState();
	var [isTaken, setIsTaken] = useState(false);
	const [agree, setAgree] = useState(false);
	var navigate = useNavigate();

	function uploadimage() {
		let formdata = new FormData();
		formdata.append("avatar", file);
		axios({
			url: "http://localhost:5001/users/upload",
			method: "post",
			data: formdata,
			headers: {
				"content-type": "multipart/form-data",
			},
		})
			.then((result) => {
				// console.log(result.data);
			})
			.catch((err) => {
				// console.log(err);
			});
	}

	const handleUserIdChange = (e) => {
		axios({
			url: "http://localhost:5001/users/checkUserName",
			method: "post",
			data: { userName: e.target.value },
		}).then(
			(result) => {
				if (result.data.message === "Username unavailable") {
					setIsTaken(true);
				}
				if (result.data.message === "Username available") {
					setIsTaken(false);
				}
				// console.log("This is result", result)
			},
			(err) => {
				// console.log(err)
			}
		);
	};
	var uservalues = {};
	var userdata = {};
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			userid: "",
			password: "",
		},
		validate: (values) => {
			let errors = {};
			if (values.name.length === 0) {
				errors.name = "Name is required";
			}
			if (values.email.length === 0) {
				errors.email = "Email is required";
			}
			if (values.userid.length === 0) {
				errors.userid = "UserName is required";
			}

			if (values.password.length === 0) {
				errors.password = "password is required";
			} else if (values.password.length !== 0) {
				let pval = values.password.match(
					/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
				);
				// console.log(pval);
				if (pval == null) {
					errors.password =
						"Password Must contain one Capital,small letter one number and must be atleast 8 characters";
				}
			}

			return errors;
		},
		onSubmit: (values) => {
			// console.log(file);
			let pval = values.password.match(
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
			);
			// console.log(pval);

			if (file != null) {
				let formdata = new FormData();
				formdata.append("avatar", file);
				//fields
				formdata.append("name", values.name);
				formdata.append("email", values.email);
				formdata.append("userid", values.userid);
				formdata.append("password", values.password);
				axios({
					url: "http://localhost:5001/users/signup",
					method: "post",
					data: formdata,
				}).then(
					(res) => {
						// console.log(res.data);
						console.log(res.data.mes);
						if (res.data.mes == "already exist user") {
							return toast.error("This Email id is already registered", {
								position: toast.POSITION.TOP_CENTER,
								autoClose: 2000,
								// navigate("/signup");
							});
						} else {
							setTimeout(() => {
								navigate("/login");
							}, 4000);

							return toast.success(
								"A Verification mail has been sent to the given email id",
								{
									position: toast.POSITION.TOP_CENTER,
									autoClose: 3000,
								}
							);
						}
					},
					(err) => {
						// console.log(err);
					}
				);
			} else {
				return toast.error("Please select a display picture", {
					position: toast.POSITION.TOP_CENTER,
				});
			}
		},
	});
	const checkboxHandler = () => {
		setAgree(!agree);
	};

	return (
		<div
			className="img"
			style={{ backgroundImage: `url(${login})`, "background-size": "cover" }}
		>
			<section class="vh-200">
				<div class="container py-2 h-100">
					<div class="row justify-content-center align-items-center h-100">
						<div class="col-12 ">
							<h2 className="logo text-white">Create an account</h2>
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
													id="file"
													onChange={(e) => {
														setPrevFile(URL.createObjectURL(e.target.files[0]));
														setFile(e.target.files[0]);
													}}
												/>
												{formik.errors.file ? (
													<div style={{ color: "red" }}>
														{formik.errors.file}
													</div>
												) : null}

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
											{formik.errors.name ? (
												<div style={{ color: "red" }}>{formik.errors.name}</div>
											) : null}
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
											{formik.errors.email ? (
												<div style={{ color: "red" }}>
													{formik.errors.email}
												</div>
											) : null}
										</div>

										<div class="form-outline mb-3">
											<input
												type="text"
												id="userid"
												class="form-control text-dark"
												onChange={formik.handleChange}
												onInput={handleUserIdChange}
												value={formik.values.userid}
												placeholder="&#xf507; Enter username"
												style={{ fontFamily: "Arial, 'Font Awesome 5 Free'" }}
											/>
											{formik.errors.userid ? (
												<div style={{ color: "red" }}>
													{formik.errors.userid}
												</div>
											) : null}
											<span className="text-danger">
												{isTaken && "Username not available"}
											</span>
										</div>

										<div class="form-outline mb-3">
											<input
												type="password"
												id="password"
												class="form-control text-dark "
												onChange={formik.handleChange}
												value={formik.values.password}
												placeholder="&#xf084; Enter your password"
												style={{ fontFamily: "Arial, 'Font Awesome 5 Free'" }}
											/>
											{formik.errors.password ? (
												<div style={{ color: "red" }}>
													{formik.errors.password}
												</div>
											) : null}
										</div>

										<div class="form-check d-flex justify-content-center mb-2">
											<input
												class="form-check-input me-2"
												type="checkbox"
												value=""
												id="agree"
												onChange={checkboxHandler}
											/>
											<label class="form-check-label" for="agree">
												I agree all statements in{" "}
												<Link to="/termsofservice" class="text-body">
													<u>Terms of service</u>
												</Link>
											</label>
										</div>

										<div class="d-flex justify-content-center">
											<input
												class="btn btn-block btn-lg gradient-custom-4 fw-bold"
												type="submit"
												value="Register"
												disabled={!agree}
											/>
										</div>
										<p class="text-center text-muted mt-2 mb-0">
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
			<ToastContainer />
		</div>
	);
}
