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

	var [postimg, setFile] = useState([]);
	var [previewImg, setPrevFile] = useState();
	var [previewImgs, setPrevFiles] = useState([]);
	var [buttontext, setButtonText] = useState("Single");

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

	function singleAndMultiple() {
		if (buttontext == "Single") setButtonText("Multiple");
		else setButtonText("Single");
	}

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

	return (
		<div class="container ">
			<div class="row mb-5">
				<div>
					<h1 className="text-center">Create post</h1>

					<form
						enctype="multipart/form-data"
						// method="post"
					>
						<div class="form-group mb-3">
							<div class="picture-container">
								<div class="picture_post">
									<img
										// src="https://lh3.googleusercontent.com/LfmMVU71g-HKXTCP_QWlDOemmWg4Dn1rJjxeEsZKMNaQprgunDTtEuzmcwUBgupKQVTuP0vczT9bH32ywaF7h68mF-osUSBAeM6MxyhvJhG6HKZMTYjgEv3WkWCfLB7czfODidNQPdja99HMb4qhCY1uFS8X0OQOVGeuhdHy8ln7eyr-6MnkCcy64wl6S_S6ep9j7aJIIopZ9wxk7Iqm-gFjmBtg6KJVkBD0IA6BnS-XlIVpbqL5LYi62elCrbDgiaD6Oe8uluucbYeL1i9kgr4c1b_NBSNe6zFwj7vrju4Zdbax-GPHmiuirf2h86eKdRl7A5h8PXGrCDNIYMID-J7_KuHKqaM-I7W5yI00QDpG9x5q5xOQMgCy1bbu3St1paqt9KHrvNS_SCx-QJgBTOIWW6T0DHVlvV_9YF5UZpN7aV5a79xvN1Gdrc7spvSs82v6gta8AJHCgzNSWQw5QUR8EN_-cTPF6S-vifLa2KtRdRAV7q-CQvhMrbBCaEYY73bQcPZFd9XE7HIbHXwXYA=s200-no"
										src=""
										class="picture-src"
										id="wizardPicturePreview"
										style={{ display: "block" }}
										title=""
									/>
									{(() => {
										if (buttontext === "Single") {
											return (
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

															newFiles.push(e.target.files[i]);
														}
														setFile(newFiles);
														setPrevFiles(prevFiles);
														// console.log(previewImgs);
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
					</form>
				</div>
			</div>
		</div>
	);
}
