import "./Signup.css";
import { useState } from "react";
import { Field, Formik, useFormik, Form } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

	function uploadimage() {
		let formdata = new FormData();
		formdata.append("avatar", file);
		axios({
			url: "https://travellogserver-production.up.railway.app/users/upload",
			method: "post",
			data: formdata,
			headers: {
				"content-type": "multipart/form-data",
			},
		})
			.then((result) => {
				console.log(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
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
			formdata.append("bdate", values.bdate);
			formdata.append("gender", values.gender);
			formdata.append("city", values.city);
			formdata.append("phone", values.phone);

			// axios({
			// 	url: "https://localhost:5001/users/upload",
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
				url: "https://travellogserver-production.up.railway.app/users/signup",
				method: "post",
				data: formdata,
			}).then(
				(res) => {
					console.log(res.data);
					alert(res);
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
		<section class=" gradient-custom">
			<div class="container py-5 h-100">
				<div class="row justify-content-center align-items-center h-100">
					<div class="col-12 ">
						<div
							class="card shadow-2-strong card-registration"
							style={{ borderRadius: "15px;" }}
						>
							<div class="card-body">
								<h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Signup here</h3>
								<form
									onSubmit={formik.handleSubmit}
									enctype="multipart/form-data"
									method="post"
								>
									<div class="row">
										<div class="picture-container">
											<div class="picture">
												<img
													src="https://lh3.googleusercontent.com/LfmMVU71g-HKXTCP_QWlDOemmWg4Dn1rJjxeEsZKMNaQprgunDTtEuzmcwUBgupKQVTuP0vczT9bH32ywaF7h68mF-osUSBAeM6MxyhvJhG6HKZMTYjgEv3WkWCfLB7czfODidNQPdja99HMb4qhCY1uFS8X0OQOVGeuhdHy8ln7eyr-6MnkCcy64wl6S_S6ep9j7aJIIopZ9wxk7Iqm-gFjmBtg6KJVkBD0IA6BnS-XlIVpbqL5LYi62elCrbDgiaD6Oe8uluucbYeL1i9kgr4c1b_NBSNe6zFwj7vrju4Zdbax-GPHmiuirf2h86eKdRl7A5h8PXGrCDNIYMID-J7_KuHKqaM-I7W5yI00QDpG9x5q5xOQMgCy1bbu3St1paqt9KHrvNS_SCx-QJgBTOIWW6T0DHVlvV_9YF5UZpN7aV5a79xvN1Gdrc7spvSs82v6gta8AJHCgzNSWQw5QUR8EN_-cTPF6S-vifLa2KtRdRAV7q-CQvhMrbBCaEYY73bQcPZFd9XE7HIbHXwXYA=s200-no"
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
										<div>
											{/* <button
												type="button"
												className="m-2"
												// onClick={uploadimage}
											>
												upload Image
											</button> */}
										</div>
										<div class="col-md-6 mb-4">
											<div class="form-outline">
												<input
													type="name"
													id="name"
													class="form-control"
													onChange={formik.handleChange}
													value={formik.values.name}
												/>
												<label class="form-label" for="firstName">
													Name
												</label>
											</div>
										</div>
										<div class="col-md-6 mb-4">
											<div class="form-outline">
												<input
													type="email"
													id="email"
													class="form-control "
													onChange={formik.handleChange}
													value={formik.values.email}
												/>
												<label class="form-label" for="emailAddress">
													Email
												</label>
											</div>
										</div>
										<div class="col-md-6 mb-4">
											<div class="form-outline">
												<input
													type="text"
													id="userid"
													class="form-control "
													onChange={formik.handleChange}
													value={formik.values.userid}
												/>
												<label class="form-label" for="userid">
													User Id
												</label>
											</div>
										</div>
										<div class="col-md-6 mb-4">
											<div class="form-outline">
												<input
													type="password"
													id="password"
													class="form-control "
													onChange={formik.handleChange}
													value={formik.values.password}
												/>
												<label class="form-label" for="password">
													Password
												</label>
											</div>
										</div>
									</div>

									<div class="row">
										<div class="col-md-6 mb-4 d-flex align-items-center">
											<div class="form-outline datepicker w-100">
												<input
													type="date"
													format="yyyy-MM-dd"
													class="form-control "
													id="bdate"
													onChange={formik.handleChange}
													value={formik.values.bdate}
												/>
												<label for="birthdayDate" class="form-label">
													Birthday
												</label>
											</div>
										</div>
										<div class="col-md-6 mb-4">
											<h6 class="mb-2 pb-1">Gender: </h6>

											<div class="form-check form-check-inline">
												<input
													class="form-check-input"
													type="radio"
													name="flexRadioDefault"
													id="Male"
													value="Male"
													onChange={(e) => handelradio(e)}
												/>
												<label class="form-check-label" for="flexRadioDefault2">
													Male
												</label>
											</div>
											<div class="form-check form-check-inline">
												<input
													class="form-check-input"
													type="radio"
													name="flexRadioDefault"
													id="Female"
													value="Female"
													onChange={(e) => handelradio(e)}
												/>
												<label class="form-check-label" for="flexRadioDefault2">
													Female
												</label>
											</div>
											<div class="form-check form-check-inline">
												<input
													class="form-check-input"
													type="radio"
													name="flexRadioDefault"
													id="Other"
													value="Other"
													onChange={(e) => handelradio(e)}
												/>
												<label class="form-check-label" for="flexRadioDefault2">
													other
												</label>
											</div>
										</div>
									</div>

									<div class="row">
										<div class="col-md-6 mb-4 pb-2">
											<div class="form-outline">
												<input
													type="text"
													id="city"
													class="form-control "
													onChange={formik.handleChange}
													value={formik.values.city}
												/>
												<label class="form-label" for="city">
													City
												</label>
											</div>
										</div>
										<div class="col-md-6 mb-4 pb-2">
											<div class="form-outline">
												<input
													type="tel"
													id="phone"
													class="form-control "
													onChange={formik.handleChange}
													value={formik.values.phone}
												/>
												<label class="form-label" for="phoneNumber">
													Phone Number
												</label>
											</div>
										</div>
									</div>
									<div class="mt-4 pt-2">
										<input
											class="btn btn-primary btn-lg"
											type="submit"
											value="Submit"
										/>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
