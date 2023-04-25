<<<<<<< HEAD
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Createpost.css";
export default function CreatePost() {
=======
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import "./Createpost.css";
import axios from "axios";
import { FaMicrophone } from "react-icons/fa";
import { Player } from "video-react";

export default function CreatePost() {
	const [title, setTitle] = useState("");
	const [caption, setCaption] = useState("");
	const [location, setLocation] = useState("");

>>>>>>> master
	var [postimg, setFile] = useState([]);
	var [previewImg, setPrevFile] = useState();
	var [previewImgs, setPrevFiles] = useState([]);
	var [buttontext, setButtonText] = useState("Single");
<<<<<<< HEAD
	var navigate = useNavigate();
	// var formdata = new FormData();
	// formdata.append("images", postimg);
=======

	var navigate = useNavigate();

	const titleRef = useRef(null);
	const captionRef = useRef(null);
	const locationRef = useRef(null);

	const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
		useSpeechRecognition();

	//handling title field

	const handleTitleInput = (event) => {
		setTitle(event.target.value);
	};

	const handleTitleEndSpeech = () => {
		if (transcript !== "") {
			setTitle((prev) => prev + " " + transcript);
			resetTranscript();
		}
	};

	const handleTitleSpeechRecognition = () => {
		SpeechRecognition.startListening();
		titleRef.current.focus();
	};

	//handle caption field

	const handleCaptionInput = (event) => {
		setCaption(event.target.value);
	};

	const handleCaptionEndSpeech = () => {
		if (transcript !== "") {
			setCaption((prev) => prev + " " + transcript);
			resetTranscript();
		}
	};

	const handleCaptionSpeechRecognition = () => {
		SpeechRecognition.startListening();
		captionRef.current.focus();
	};

	//handle location field

	const handleLocationInput = (event) => {
		setLocation(event.target.value);
	};

	const handleLocationEndSpeech = () => {
		if (transcript !== "") {
			setLocation((prev) => prev + " " + transcript);
			resetTranscript();
		}
	};

	const handleLocationSpeechRecognition = () => {
		SpeechRecognition.startListening();
		locationRef.current.focus();
	};

	//function to handle single and multiple images
>>>>>>> master

	function singleAndMultiple() {
		if (buttontext == "Single") setButtonText("Multiple");
		else setButtonText("Single");
	}

<<<<<<< HEAD
	// for (let i = 0; i < files.length; i++) {
	// 	formData.append(files[i].name, files[i])
	//   }

	const formik = useFormik({
		initialValues: {
			title: "",
			caption: "",
			location: "",
		},
		onSubmit: (values) => {
			var formdata = new FormData();
			// formdata.append("pImages", postimg);
			for (let i = 0; i < postimg.length; i++) {
				formdata.append("pImages", postimg[i]);
			}
			formdata.append("title", values.title);
			formdata.append("caption", values.caption);
			formdata.append("location", values.location);
			formdata.append("userid", localStorage.userid);

			// console.log("values in creat post", localStorage.userid);

			axios({
				url: "https://travellogserver-production.up.railway.app/post/addpost",
				method: "post",
				data: formdata,
				headers: {
					"content-type": "multipart/form-data",
				},
			}).then(
				(result) => {
					console.log("resilt in add post fe", result.data.message);
					navigate("/");
					alert(result.data.message);
				},
				(err) => {
					console.log("error in add post fe", err);
				}
			);
		},
	});
=======
	//function to create post

	function createPost() {
		var formdata = new FormData();

		for (let i = 0; i < postimg.length; i++) {
			formdata.append("pImages", postimg[i]);
		}

		formdata.append("title", title);
		formdata.append("caption", caption);
		formdata.append("location", location);
		formdata.append("userid", localStorage.userid);
		console.log(formdata);

		axios({
			url: "http://localhost:5001/post/addpost",
			method: "post",
			data: formdata,
			headers: {
				"content-type": "multipart/form-data",
			},
		}).then(
			(result) => {
				console.log("resilt in add post fe", result.data.message);
				navigate("/");
				alert(result.data.message);
			},
			(err) => {
				console.log("error in add post fe", err);
			}
		);
	}

	//check to see if browser supports speech recognition

	if (!browserSupportsSpeechRecognition) {
		return alert("Browser does not support Speech Recognition");
	}
>>>>>>> master

	return (
		<div class="container ">
			<div class="row mb-5">
				<div>
<<<<<<< HEAD
					<h1>Create post</h1>

					<form
						onSubmit={formik.handleSubmit}
						enctype="multipart/form-data"
						method="post"
=======
					<h1 className="text-center">Create post</h1>

					<form
						enctype="multipart/form-data"
						// method="post"
>>>>>>> master
					>
						<div class="form-group mb-3">
							<div class="picture-container">
								<div class="picture_post">
									<img
<<<<<<< HEAD
										src="https://lh3.googleusercontent.com/LfmMVU71g-HKXTCP_QWlDOemmWg4Dn1rJjxeEsZKMNaQprgunDTtEuzmcwUBgupKQVTuP0vczT9bH32ywaF7h68mF-osUSBAeM6MxyhvJhG6HKZMTYjgEv3WkWCfLB7czfODidNQPdja99HMb4qhCY1uFS8X0OQOVGeuhdHy8ln7eyr-6MnkCcy64wl6S_S6ep9j7aJIIopZ9wxk7Iqm-gFjmBtg6KJVkBD0IA6BnS-XlIVpbqL5LYi62elCrbDgiaD6Oe8uluucbYeL1i9kgr4c1b_NBSNe6zFwj7vrju4Zdbax-GPHmiuirf2h86eKdRl7A5h8PXGrCDNIYMID-J7_KuHKqaM-I7W5yI00QDpG9x5q5xOQMgCy1bbu3St1paqt9KHrvNS_SCx-QJgBTOIWW6T0DHVlvV_9YF5UZpN7aV5a79xvN1Gdrc7spvSs82v6gta8AJHCgzNSWQw5QUR8EN_-cTPF6S-vifLa2KtRdRAV7q-CQvhMrbBCaEYY73bQcPZFd9XE7HIbHXwXYA=s200-no"
=======
										// src="https://lh3.googleusercontent.com/LfmMVU71g-HKXTCP_QWlDOemmWg4Dn1rJjxeEsZKMNaQprgunDTtEuzmcwUBgupKQVTuP0vczT9bH32ywaF7h68mF-osUSBAeM6MxyhvJhG6HKZMTYjgEv3WkWCfLB7czfODidNQPdja99HMb4qhCY1uFS8X0OQOVGeuhdHy8ln7eyr-6MnkCcy64wl6S_S6ep9j7aJIIopZ9wxk7Iqm-gFjmBtg6KJVkBD0IA6BnS-XlIVpbqL5LYi62elCrbDgiaD6Oe8uluucbYeL1i9kgr4c1b_NBSNe6zFwj7vrju4Zdbax-GPHmiuirf2h86eKdRl7A5h8PXGrCDNIYMID-J7_KuHKqaM-I7W5yI00QDpG9x5q5xOQMgCy1bbu3St1paqt9KHrvNS_SCx-QJgBTOIWW6T0DHVlvV_9YF5UZpN7aV5a79xvN1Gdrc7spvSs82v6gta8AJHCgzNSWQw5QUR8EN_-cTPF6S-vifLa2KtRdRAV7q-CQvhMrbBCaEYY73bQcPZFd9XE7HIbHXwXYA=s200-no"
										src=""
>>>>>>> master
										class="picture-src"
										id="wizardPicturePreview"
										style={{ display: "block" }}
										title=""
									/>
									{(() => {
										if (buttontext === "Single") {
											return (
<<<<<<< HEAD
												<img
													src={previewImg}
													style={{ height: "100%", width: "100%" }}
												/>
=======
												<>
													{previewImg && (
														<>
															{previewImg.type === "image" && (
																<img
																	src={previewImg.url}
																	style={{ height: "100%", width: "100%" }}
																/>
															)}
															{previewImg.type === "video" && (
																<video
																	autoPlay
																	loop
																	muted
																	style={{ height: "100%", width: "100%" }}
																>
																	<source src={previewImg.url} />
																</video>
															)}
														</>
													)}
												</>
>>>>>>> master
											);
										} else {
											// coursal
											return (
												<div
													id="carouselExampleControlsNoTouching"
													class="carousel slide carousel-fade"
													data-bs-touch="false"
													data-bs-interval="false"
												>
													<div class="carousel-inner">
														{previewImgs.map((each, index) => {
															if (index == 0) {
																return (
<<<<<<< HEAD
																	<div class="carousel-item active">
																		<img
																			src={each}
																			class="d-block w-100"
																			style={{ height: "245PX" }}
																			alt="..."
																		/>
																	</div>
																);
															} else {
																return (
																	<div class="carousel-item">
																		<img
																			src={each}
																			class="d-block w-100"
																			style={{ height: "245PX" }}
																			alt="..."
																		/>
																	</div>
																);
=======
																	<>
																		{each && (
																			<div class="carousel-item active">
																				{each.type === "image" && (
																					<img
																						src={each.url}
																						class="d-block w-100"
																						style={{ height: "245PX" }}
																					/>
																				)}
																				{each.type === "video" && (
																					<video
																						class="d-block w-100"
																						style={{ height: "245PX" }}
																						autoPlay
																						loop
																						muted
																					>
																						<source src={each.url} />
																					</video>
																				)}
																			</div>
																		)}
																	</>
																);
																// return (
																// <div class="carousel-item active">
																// 	<img
																// 		src={each.url}
																// 		class="d-block w-100"
																// 		style={{ height: "245PX" }}
																// 		alt="..."
																// 	/>
																// 	// </div>
																// );
															} else {
																return (
																	<>
																		{each && (
																			<div class="carousel-item ">
																				{each.type === "image" && (
																					<img
																						src={each.url}
																						class="d-block w-100"
																						style={{ height: "245PX" }}
																					/>
																				)}
																				{each.type === "video" && (
																					<video
																						autoPlay
																						loop
																						muted
																						class="d-block w-100"
																						style={{ height: "245PX" }}
																					>
																						<source src={each.url} />
																					</video>
																				)}
																			</div>
																		)}
																	</>
																);

																// return (
																// 	<div class="carousel-item">
																// 		<img
																// 			src={each.url}
																// 			class="d-block w-100"
																// 			style={{ height: "245PX" }}
																// 			alt="..."
																// 		/>
																// 	</div>
																// );
>>>>>>> master
															}
														})}
													</div>
													<button
														class="carousel-control-prev"
														type="button"
														data-bs-target="#carouselExampleControlsNoTouching"
														data-bs-slide="prev"
													>
														<span
															class="carousel-control-prev-icon"
															aria-hidden="true"
															style={{ opacity: 0 }}
														></span>
														<span class="visually-hidden">Previous</span>
													</button>
													<button
														class="carousel-control-next"
														type="button"
														data-bs-target="#carouselExampleControlsNoTouching"
														data-bs-slide="next"
													>
														<span
															class="carousel-control-next-icon"
															aria-hidden="true"
															style={{ opacity: 0 }}
														></span>
														<span class="visually-hidden">Next</span>
													</button>
												</div>
											);
										}
									})()}
									{/* //input file */}
									{(() => {
										if (buttontext === "Single") {
											return (
												<input
													type="file"
													name="pImages"
													onChange={(e) => {
														const newFiles = [];
<<<<<<< HEAD
														setPrevFile(URL.createObjectURL(e.target.files[0]));
=======
														const uploadedFile = e.target.files[0];
														if (uploadedFile.type.includes("image")) {
															setPrevFile({
																type: "image",
																url: URL.createObjectURL(e.target.files[0]),
															});
														} else if (uploadedFile.type.includes("video")) {
															setPrevFile({
																type: "video",
																url: URL.createObjectURL(e.target.files[0]),
															});
														} else {
															alert("please select valid image or video");
														}
>>>>>>> master
														for (let i = 0; i < e.target.files.length; i++) {
															newFiles.push(e.target.files[i]);
														}
														setFile(newFiles);
													}}
												/>
											);
										} else {
											return (
												<input
													type="file"
													name="pImages"
													multiple
													onChange={(e) => {
														const newFiles = [];
														const prevFiles = [];
														for (let i = 0; i < e.target.files.length; i++) {
<<<<<<< HEAD
															prevFiles.push(
																URL.createObjectURL(e.target.files[i])
															);
=======
															const uploadedFile = e.target.files[i];
															console.log(uploadedFile);
															if (uploadedFile.type.includes("image")) {
																prevFiles.push({
																	type: "image",
																	url: URL.createObjectURL(e.target.files[i]),
																});
															} else if (uploadedFile.type.includes("video")) {
																prevFiles.push({
																	type: "video",
																	url: URL.createObjectURL(e.target.files[i]),
																});
															} else {
																alert("please select valid image or video");
															}
															// prevFiles.push(
															// 	URL.createObjectURL(e.target.files[i])
															// );

>>>>>>> master
															newFiles.push(e.target.files[i]);
														}
														setFile(newFiles);
														setPrevFiles(prevFiles);
<<<<<<< HEAD
=======
														// console.log(previewImgs);
>>>>>>> master
													}}
												/>
											);
										}
									})()}
								</div>
							</div>
							<div class="d-flex justify-content-center mt-1">
								<div class="form-outline">
									<label class="form-label" for="form1">
										Share Youre Travel Pics
									</label>
								</div>
								<button
									type="button"
									class="btn btn-primary btn-sm ms-2"
									onClick={singleAndMultiple}
								>
									{buttontext}
								</button>
							</div>
						</div>
<<<<<<< HEAD
						<div class="input-group flex-nowrap mb-3">
							<span class="input-group-text" id="addon-wrapping">
								Title
							</span>
							<input
								type="text"
								name="title"
								class="form-control"
								aria-label="Username"
								aria-describedby="addon-wrapping"
								onChange={formik.handleChange}
								value={formik.values.title}
							/>
						</div>

						<div class="input-group flex-nowrap mb-3">
							<span class="input-group-text" id="addon-wrapping">
								Location
							</span>
							<input
								type="text"
								name="location"
								class="form-control"
								aria-label="Username"
								aria-describedby="addon-wrapping"
								placeholder="Sinhgad, Pune"
								onChange={formik.handleChange}
								value={formik.values.location}
							/>
						</div>
						<div class="input-group flex-nowrap mb-3">
							<span class="input-group-text" id="addon-wrapping">
								Caption
							</span>
							<textarea
								type="text"
								name="caption"
								class="form-control"
								aria-label="caption"
								aria-describedby="addon-wrapping"
								style={{ whiteSpace: "pre-wrap", height: "100px" }}
								onChange={formik.handleChange}
								value={formik.values.caption}
							/>
						</div>

						<div class="form-group mt-2 mb-auto">
							<button type="submit" class="btn btn-primary" value="create">
								Create
							</button>
							<Link to={"/"}>
								<button class="btn btn-default">Cancel</button>
							</Link>
						</div>
=======

						<div className="m-1 p-2">
							<div class="m-2 p-2 form-outline d-flex mb-4">
								<label class="me-1 form-label" for="input-title">
									Title
								</label>
								<input
									type="text"
									onChange={handleTitleInput}
									id="input-title"
									value={title}
									class="form-control"
									onBlur={handleTitleEndSpeech}
									ref={titleRef}
								/>
								<button
									className="btn"
									type="button"
									onClick={handleTitleSpeechRecognition}
								>
									<FaMicrophone></FaMicrophone>
								</button>
							</div>
						</div>

						<div class="m-2 p-2 form-outline d-flex mb-4">
							<label class="me-1 form-label" for="input-location">
								Location
							</label>
							<input
								type="text"
								onChange={handleLocationInput}
								id="input-location"
								value={location}
								class="form-control"
								onBlur={handleLocationEndSpeech}
								ref={locationRef}
							/>
							<button
								className="btn"
								type="button"
								onClick={handleLocationSpeechRecognition}
							>
								<FaMicrophone></FaMicrophone>
							</button>
						</div>

						<div class="m-2 p-2 d-flex form-outline mb-4">
							<label class="me-1 form-label" for="input-caption">
								Caption
							</label>
							<textarea
								type="text"
								onChange={handleCaptionInput}
								id="input-caption"
								value={caption}
								class="form-control"
								onBlur={handleCaptionEndSpeech}
								ref={captionRef}
							/>
							<button
								className="btn"
								type="button"
								onClick={handleCaptionSpeechRecognition}
							>
								<FaMicrophone></FaMicrophone>
							</button>
						</div>

						<div class="form-group mt-2 mb-auto">
							<button
								type="submit"
								onClick={createPost}
								class="btn btn-primary"
								value="create"
							>
								Create
							</button>
							<Link to={"/"}>
								<button type="submit" class="btn btn-default">
									Cancel
								</button>
							</Link>
						</div>

						{/* <video width="400" autoPlay loop muted>
							<source src={previewImg.url} />
						</video>
						<Player
							playsInline
							src={previewImg}
							fluid={false}
							width={480}
							height={272}
						/> */}
>>>>>>> master
					</form>
				</div>
			</div>
		</div>
	);
}
