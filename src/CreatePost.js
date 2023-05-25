import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Popup from "reactjs-popup";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import "./Createpost.css";
import axios from "axios";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import post from "./CreatePost.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreatePost() {
	const [title, setTitle] = useState("");
	const [caption, setCaption] = useState("");
	const [location, setLocation] = useState("");
	const [isSelected, setIsSelected] = useState(false);

	const [microphoneStatus, setMicrophoneStatus] = useState(false);
	const [captionMicrophoneStatus, setCaptionMicrophoneStatus] = useState(false);
	const [locationMicrophoneStatus, setLocationMicrophoneStatus] =
		useState(false);

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
		setMicrophoneStatus(true);
		SpeechRecognition.startListening({ continuous: true });
		titleRef.current.focus();
	};

	const turnTitleSpeechOff = () => {
		setMicrophoneStatus(false);
		SpeechRecognition.stopListening();
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
		setCaptionMicrophoneStatus(true);
		SpeechRecognition.startListening({ continuous: true });
		captionRef.current.focus();
	};

	const turnCaptionSpeechOff = () => {
		setCaptionMicrophoneStatus(false);
		SpeechRecognition.stopListening();
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
		setLocationMicrophoneStatus(true);
		SpeechRecognition.startListening({ continuous: true });
		locationRef.current.focus();
	};

	const turnLocationSpeechOff = () => {
		setLocationMicrophoneStatus(false);
		SpeechRecognition.stopListening();
	};

	//function to handle  multiple files
	const onFileChange = (e) => {
		// const newFiles = [];
		const prevFiles = [];
		for (let i = 0; i < e.target.files.length; i++) {
			const uploadedFile = e.target.files[i];
			// console.log(uploadedFile);
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
				return toast.error("Please select valid image or video", {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 2000,
				});
			}
			// prevFiles.push(
			// 	URL.createObjectURL(e.target.files[i])
			// );

			//handle location field

			// newFiles.push(e.target.files[i]);
			setFile([...postimg, ...e.target.files]);
		}
		setPrevFiles(prevFiles);
		if (prevFiles) {
			setIsSelected(true);
		}
	};

	// popup screen
	var [seen, setSeen] = useState(false);
	var togglePop = () => {
		// this.setState({
		// 	seen: !this.state.seen,
		// });
		setSeen(!seen);
	};

	//re arrange files
	const onOrderChange = (e, oldIndex, newIndex) => {
		e.preventDefault();
		const newPreviFiles = Array.from(previewImgs);
		newPreviFiles.splice(newIndex, 0, newPreviFiles.splice(oldIndex, 1)[0]);
		setPrevFiles(newPreviFiles);

		const newFiles = Array.from(postimg);
		newFiles.splice(newIndex, 0, newFiles.splice(oldIndex, 1)[0]);
		setFile(newFiles);

		// const new
		// console.log(postimg);
	};

	//function to handle single and multiple images

	//drag and drop
	const dragItem = useRef();
	const dragOverItem = useRef();
	// file set is previewImgs
	const dragStart = (e, position) => {
		dragItem.current = position;
		// console.log(e.target.innerHTML);
	};
	const dragEnter = (e, position) => {
		dragOverItem.current = position;
		// console.log(e.target.innerHTML);
	};
	const drop = (e) => {
		const copyListItems = [...previewImgs];
		const dragItemContent = copyListItems[dragItem.current];
		copyListItems.splice(dragItem.current, 1);
		copyListItems.splice(dragOverItem.current, 0, dragItemContent);
		dragItem.current = null;
		dragOverItem.current = null;
		setPrevFiles(copyListItems);
	};

	// drag drop ends

	function singleAndMultiple() {
		if (buttontext === "Single") {
			setButtonText("Multiple");
			setFile([]);
			setPrevFile();
		} else {
			setButtonText("Single");
			setFile([]);
			setPrevFiles([]);
			setIsSelected(false);
		}
	}

	//function to create post

	function createPost() {
		var formdata = new FormData();

		for (let i = 0; i < postimg.length; i++) {
			formdata.append("pImages", postimg[i]);
		}
		if (
			title.length != "" &&
			caption.length != "" &&
			location.length != "" &&
			postimg.length != ""
		) {
			formdata.append("title", title);
			formdata.append("caption", caption);
			formdata.append("location", location);
			formdata.append("userid", localStorage.userid);
			// console.log(formdata);

			axios({
				url: "http://localhost:5001/post/addpost",
				method: "post",
				data: formdata,

				headers: {
					"content-type": "multipart/form-data",
					authorization: localStorage.token,
				},
			}).then(
				(result) => {
					// console.log("resilt in add post fe", result.data.message);
					setTimeout(() => {
						navigate("/");
					}, 3000);
					return toast.success("Post successfully created", {
						position: toast.POSITION.TOP_CENTER,
						autoClose: 2000,
					});
				},
				(err) => {
					// console.log("error in add post fe", err);
					return toast.error("Error in Creating Post", {
						position: toast.POSITION.TOP_CENTER,
					});
				}
			);
		} else {
			return toast.warn("Please fill all the fields", {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 2000,
			});
		}
	}

	//check to see if browser supports speech recognition

	if (!browserSupportsSpeechRecognition) {
		return toast.warn("Browser does not support speech recognition", {
			position: toast.POSITION.TOP_CENTER,
		});
	}

	return (
		<div
			className="img"
			style={{
				backgroundImage: `url(${post})`,
				"background-size": "cover",
			}}
		>
			<div class="container mt-5  pt-3">
				<div class="row mb-5">
					<div>
						<h3 className="text-center text-white logo fw-bold mt-3">
							Share your Journey
						</h3>

						<form
							autocomplete="off"
							enctype="multipart/form-data"
							// method="post"
						>
							<div class="form-group mb-3">
								<div class="picture-container">
									<div
										class="picture_post"
										style={{ backgroundColor: "transparent" }}
									>
										<img
											// src="https://lh3.googleusercontent.com/LfmMVU71g-HKXTCP_QWlDOemmWg4Dn1rJjxeEsZKMNaQprgunDTtEuzmcwUBgupKQVTuP0vczT9bH32ywaF7h68mF-osUSBAeM6MxyhvJhG6HKZMTYjgEv3WkWCfLB7czfODidNQPdja99HMb4qhCY1uFS8X0OQOVGeuhdHy8ln7eyr-6MnkCcy64wl6S_S6ep9j7aJIIopZ9wxk7Iqm-gFjmBtg6KJVkBD0IA6BnS-XlIVpbqL5LYi62elCrbDgiaD6Oe8uluucbYeL1i9kgr4c1b_NBSNe6zFwj7vrju4Zdbax-GPHmiuirf2h86eKdRl7A5h8PXGrCDNIYMID-J7_KuHKqaM-I7W5yI00QDpG9x5q5xOQMgCy1bbu3St1paqt9KHrvNS_SCx-QJgBTOIWW6T0DHVlvV_9YF5UZpN7aV5a79xvN1Gdrc7spvSs82v6gta8AJHCgzNSWQw5QUR8EN_-cTPF6S-vifLa2KtRdRAV7q-CQvhMrbBCaEYY73bQcPZFd9XE7HIbHXwXYA=s200-no"
											src=""
											class="picture-src"
											id="wizardPicturePreview"
											style={{ display: "block" }}
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
																						<>
																							<img
																								src={each.url}
																								class="d-block w-100"
																								style={{ height: "245PX" }}
																							/>
																							<div class="position-absolute top-0 end-0 m-2">
																								<h5>
																									{index +
																										1 +
																										"/" +
																										previewImgs.length}
																								</h5>
																							</div>
																						</>
																					)}
																					{each.type === "video" && (
																						<>
																							<video
																								class="d-block w-100"
																								style={{ height: "245PX" }}
																								autoPlay
																								loop
																								muted
																							>
																								<source src={each.url} />
																							</video>
																							<div class="position-absolute top-0 end-0 m-2">
																								<h6>
																									{index +
																										1 +
																										"/" +
																										previewImgs.length}
																								</h6>
																							</div>
																						</>
																					)}
																				</div>
																			)}
																		</>
																	);
																} else {
																	return (
																		<>
																			{each && (
																				<div class="carousel-item ">
																					{each.type === "image" && (
																						<>
																							<img
																								src={each.url}
																								class="d-block w-100"
																								style={{ height: "245PX" }}
																							/>
																							<div class="position-absolute top-0 end-0 m-2">
																								<h6>
																									{index +
																										1 +
																										"/" +
																										previewImgs.length}
																								</h6>
																							</div>
																						</>
																					)}
																					{each.type === "video" && (
																						<>
																							<video
																								autoPlay
																								loop
																								muted
																								class="d-block w-100"
																								style={{ height: "245PX" }}
																							>
																								<source src={each.url} />
																							</video>
																							<div class="position-absolute top-0 end-0 m-2">
																								<h5>
																									{index +
																										1 +
																										"/" +
																										previewImgs.length}
																								</h5>
																							</div>
																						</>
																					)}
																				</div>
																			)}
																		</>
																	);
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
																for (
																	let i = 0;
																	i < e.target.files.length;
																	i++
																) {
																	newFiles.push(e.target.files[i]);
																}
																setFile(newFiles);
															} else if (uploadedFile.type.includes("video")) {
																setPrevFile({
																	type: "video",
																	url: URL.createObjectURL(e.target.files[0]),
																});
																for (
																	let i = 0;
																	i < e.target.files.length;
																	i++
																) {
																	newFiles.push(e.target.files[i]);
																}
																setFile(newFiles);
															} else {
																toast.error(
																	"Please select valid image or video",
																	{
																		position: toast.POSITION.TOP_CENTER,
																		autoClose: 2000,
																	}
																);
															}
															// if (previewImg) {
															// 	console.log("helooo");
															// 	for (
															// 		let i = 0;
															// 		i < e.target.files.length;
															// 		i++
															// 	) {
															// 		newFiles.push(e.target.files[i]);
															// 	}
															// 	setFile(newFiles);
															// }
														}}
													/>
												);
											} else {
												return (
													<input
														type="file"
														name="pImages"
														multiple
														onChange={onFileChange}
													/>
												);
											}
										})()}
									</div>
								</div>

								<div class="d-flex justify-content-center mt-1">
									<div class="form-outline">
										<label
											class="form-label fw-bold text-white"
											for="form1"
											style={{ color: "black" }}
										>
											Choose the number of items you want to upload
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
							<div>
								{isSelected && (
									<Popup
										trigger={
											<button className="btn btn-primary" type="button">
												{" "}
												Re-arrange{" "}
											</button>
										}
										modal
										nested
									>
										{(close) => (
											<div className="model  ">
												<div className="d-flex flex-wrap">
													{/* //sample drag and drop  */}
													{previewImgs &&
														previewImgs.map((file, index) => (
															<div
																class="col-2 previwes "
																style={{
																	// backgroundColor: "lightblue",
																	margin: "auto",
																	padding: "1vh",
																	// textAlign: "center",
																	// fontSize: "20px",
																}}
																onDragStart={(e) => dragStart(e, index)}
																onDragEnter={(e) => dragEnter(e, index)}
																onDragEnd={drop}
																key={index}
																draggable
															>
																<>
																	{file.type === "image" && (
																		<>
																			<img
																				class="previwes"
																				src={file.url}
																				style={{
																					height: "20vh",
																					width: "100%",
																				}}
																			/>
																			{index + 1 + "/" + previewImgs.length}
																		</>
																	)}
																	{file.type === "video" && (
																		<>
																			<video
																				autoPlay
																				loop
																				muted
																				style={{
																					height: "20vh",
																					width: "100%",
																				}}
																			>
																				<source src={file.url} />
																			</video>
																			{index + 1 + "/" + previewImgs.length}
																		</>
																	)}
																</>
															</div>
														))}
												</div>
												<div>
													<button
														className="btn btn-primary"
														onClick={() => close()}
													>
														Done
													</button>
												</div>
											</div>
										)}
									</Popup>
								)}
								<div
									className="row align-items-center justify-content-center post-card"
									style={{ marginLeft: "20px", marginRight: "20px" }}
								>
									<div className="m-1 p-2">
										<div class="m-2 form-outline mb-4">
											<label
												class="me-1 form-label text-white"
												for="input-title"
											>
												Title
											</label>
											<div className="col-md-12 d-flex">
												<input
													type="text"
													onChange={handleTitleInput}
													id="input-title"
													value={title}
													class="form-control text-dark"
													onBlur={() => {
														handleTitleEndSpeech();
													}}
													ref={titleRef}
												/>
												{!microphoneStatus && (
													<button
														className="btn"
														type="button"
														onClick={handleTitleSpeechRecognition}
													>
														<FaMicrophoneSlash color="white"></FaMicrophoneSlash>
													</button>
												)}
												{microphoneStatus && (
													<button
														className="btn"
														type="button"
														onClick={turnTitleSpeechOff}
													>
														<FaMicrophone color="blue"></FaMicrophone>
													</button>
												)}
											</div>
										</div>
									</div>

									<div class="m-2 form-outline mb-4">
										<label
											class="me-1 form-label text-white"
											for="input-location"
										>
											Location
										</label>
										<div className="col-md-12 d-flex">
											<input
												type="text"
												onChange={handleLocationInput}
												id="input-location"
												value={location}
												class="form-control text-dark"
												onBlur={handleLocationEndSpeech}
												ref={locationRef}
											/>
											{!locationMicrophoneStatus && (
												<button
													className="btn"
													type="button"
													onClick={handleLocationSpeechRecognition}
												>
													<FaMicrophoneSlash color="white"></FaMicrophoneSlash>
												</button>
											)}
											{locationMicrophoneStatus && (
												<button
													className="btn"
													type="button"
													onClick={turnLocationSpeechOff}
												>
													<FaMicrophone color="blue"></FaMicrophone>
												</button>
											)}
										</div>
									</div>

									<div class="m-2 form-outline mb-4">
										<label
											class="me-1 form-label text-white"
											for="input-caption"
										>
											Caption
										</label>
										<div className="justify-content-center d-flex">
											<textarea
												type="text"
												onChange={handleCaptionInput}
												id="input-caption"
												value={caption}
												class="form-control text-dark"
												onBlur={handleCaptionEndSpeech}
												ref={captionRef}
												style={{ resize: "none", height: "8rem" }}
											/>
											{!captionMicrophoneStatus && (
												<button
													className="btn"
													type="button"
													onClick={handleCaptionSpeechRecognition}
												>
													<FaMicrophoneSlash color="white"></FaMicrophoneSlash>
												</button>
											)}
											{captionMicrophoneStatus && (
												<button
													className="btn"
													type="button"
													onClick={turnCaptionSpeechOff}
												>
													<FaMicrophone color="blue"></FaMicrophone>
												</button>
											)}
										</div>
									</div>
								</div>
							</div>
							<div class="form-group mt-2 mb-2" style={{ marginLeft: "2rem" }}>
								<button
									type="button"
									onClick={createPost}
									class="btn btn-primary"
									value="create"
								>
									Create
								</button>
								<Link to={"/"}>
									<button type="submit" class="btn btn-danger text-white ms-2">
										Cancel
									</button>
								</Link>
								<ToastContainer pauseOnFocusLoss={false} />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
