import axios from "axios";
import { useContext, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import Datecontext from "./Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PostTemplate.css";
import { Block, SpaRounded } from "@mui/icons-material";

export default function PostTemplate(props) {
	// console.log("all posts in fe ........................");
	const date_func = useContext(Datecontext);
	//console.log(date_func)
	// console.log(props.data);
	var user_id = props.data.userid._id;
	var id = props.data._id;
	var aid = "collapseContent" + id;
	var sid = "#" + "collapseContent" + id;

	var Caid = "commentSection" + id;
	var Csid = "#" + "commentSection" + id;

	var CCid = "Carousel" + id;
	var CCAid = "#" + "Carousel" + id;

	var likePara = {
		userid: localStorage.userid,
		postid: props.data._id,
	};
	let date = props.data.date;
	var [likeCount, setCount] = useState(props.data.likes.length);
	var [isLiked, setIsLiked] = useState();

	//comment
	var [inputComment, setInputComment] = useState("");
	//add comment
	var [isAlertVisible, setIsAlertVisible] = useState(false);
	var [text, setText] = useState("Show More");

	function moreAndLess() {
		if (text == "Show More") setText("Show Less");
		else setText("Show More");
	}

	function addcomment() {
		setInputComment("");
		var obj = {
			postid: props.data._id,
			userid: localStorage.userid,
			comment: inputComment,
		};
		axios({
			url: "http://localhost:5001/post/comments",
			method: "put",
			headers: { authorization: localStorage.token },
			data: obj,
		}).then(
			(result) => {
				// console.log(result);
				setIsAlertVisible(true);
				getComment();
			},
			(err) => {
				// console.log("err");
			}
		);
	}
	//getcomment
	var [allcomment, setcomments] = useState([]);
	function getComment() {
		axios({
			url: "http://localhost:5001/post/getcomments/" + props.data._id,
			method: "get",
			headers: { authorization: localStorage.token },
		}).then(
			(result) => {
				setcomments(result.data);
				// console.log(result);
			},
			(err) => {
				// console.log("unable to fatch comment in fe");
			}
		);
	}
	//console.log(allcomment)

	props.data.likes.map((each) => {
		if (localStorage.userid == each) {
			isLiked = true;
		}
	});
	//check ir user has alread liked the post and set veriable according to that for like and dislike
	//work to do
	function likePost() {
		axios({
			url: "http://localhost:5001/post/likepost",
			method: "put",
			headers: { authorization: localStorage.token },
			data: likePara,
		}).then(
			(result) => {
				// console.log("result after post like ", result);
				setIsLiked(true);
				setCount(props.data.likes.length + 1);
			},
			(err) => {
				// console.log("erroe after post like ", err);
			}
		);
	}
	function unLikePost() {
		axios({
			url: "http://localhost:5001/post/unlikepost",
			method: "delete",
			headers: { authorization: localStorage.token },
			data: likePara,
		}).then(
			(result) => {
				// console.log("result after post unlike ", result);
				setIsLiked(false);
				setCount(props.data.likes.length);
			},
			(err) => {
				// console.log("erroe after post like ", err);
			}
		);
	}
	setTimeout(() => {
		setIsAlertVisible(false);
	}, 2000);

	function deletePost() {
		axios({
			url: "http://localhost:5001/post/deletepost",
			method: "delete",
			headers: { authorization: localStorage.token },
			data: props.data,
		}).then(
			(result) => {
				setTimeout(() => {
					window.location.reload();
				}, 3000);
				return toast.success("Post Deleted successfully", {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 2000,
				});
			},
			(err) => {
				// console.log("erroe after post like ", err);
			}
		);
	}

	return (
		<div class="container">
			<section class="mx-auto my-2" style={{ maxWidth: "37rem" }}>
				<div class="card">
					<div class="card-body d-flex flex-row">
						<div>
							{(() => {
								if (props.image) {
									return (
										<img
											src={props.image}
											class="rounded-circle me-3"
											height="50px"
											width="50px"
											alt="avatar"
										/>
									);
								} else {
									return (
										<img
											src={props.data.userid.image}
											class="rounded-circle me-3"
											height="50px"
											width="50px"
											alt="avatar"
										/>
									);
								}
							})()}
						</div>

						<div className="col-5">
							<Link
								to={"profile/" + props.data.userid._id}
								style={{ textDecoration: "none" }}
							>
								<h5 class="card-title font-weight-bold">
									{props.data.userid.name} {props.name}
								</h5>
							</Link>
							<p class="card-text">
								<MdLocationOn size={"5vh"}></MdLocationOn>
								{props.data.location}
							</p>
						</div>
						<>
							{(() => {
								// console.log(user_id, localStorage.userid);
								if (props.data.userid === localStorage.userid) {
									return (
										<div
											class="dropdown mt-2 col-6 container align-content-end "
											style={{
												alignItems: "start",
												display: "flex",
												flexDirection: "row-reverse",
											}}
										>
											<a
												class="dropdown hidden-arrow"
												type="button"
												id="dropdownMenuicon"
												data-bs-toggle="dropdown"
												aria-expanded="false"
											>
												<BsThreeDotsVertical
													size={"1.6rem"}
													color={"black"}
												></BsThreeDotsVertical>
											</a>
											<ul
												class="dropdown-menu"
												aria-labelledby="dropdownMenuicon"
											>
												<li>
													<a class="dropdown-item " onClick={deletePost}>
														<AiOutlineDelete
															className="me-1"
															size={"1.5rem"}
														></AiOutlineDelete>
														<span className="fs-6 text-center text-bold">
															Delete
														</span>
													</a>
												</li>
											</ul>
										</div>
									);
								}
							})()}
						</>
					</div>
					<div
						class="bg-image hover-overlay ripple rounded-0"
						data-mdb-ripple-color="light"
					>
						{(() => {
							if (props.data.images.length == 1) {
								return (
									<>
										{(() => {
											if (props.data.images[0].includes("mp4")) {
												// console.log("heloooooo");
												// alert("it has a video");
												return (
													<video
														// class="img-fluid p-1"
														autoPlay
														loop
														muted
														style={{ height: "100%", width: "100%" }}
													>
														<source src={props.data.images[0]} />
													</video>
												);
											} else {
												return (
													<img
														class="img-fluid p-1"
														src={props.data.images[0]}
														alt="Card image cap"
														style={{ width: "100%", height: "25rem" }}
													/>
												);
											}
										})()}
									</>
								);
							} else {
								return (
									<div
										id={CCid}
										class="carousel slide carousel-fade"
										data-bs-touch="false"
										data-bs-interval="false"
									>
										<ol class="carousel-indicators">
											{props.data.images.map((each, index) => {
												if (index == 0) {
													return (
														<li
															data-bs-target={CCAid}
															data-bs-slide-to={index}
															class="active"
														></li>
													);
												} else {
													return (
														<li
															data-bs-target={CCAid}
															data-bs-slide-to={index}
														></li>
													);
												}
											})}
										</ol>
										<div class="carousel-inner">
											{props.data.images.map((each, index) => {
												if (index == 0) {
													return (
														<div class="carousel-item active">
															{(() => {
																if (each.includes("mp4")) {
																	// console.log("heloooooo");
																	// alert("it has a video");
																	return (
																		<>
																			<video
																				// class="img-fluid p-1"
																				autoPlay
																				loop
																				muted
																				style={{
																					width: "100%",
																					height: "25rem",
																				}}
																			>
																				<source src={each} />
																			</video>
																			<div class="position-absolute top-0 end-0 m-2">
																				<h6>
																					{index +
																						1 +
																						"/" +
																						props.data.images.length}
																				</h6>
																			</div>
																		</>
																	);
																} else {
																	return (
																		<>
																			<img
																				class="img-fluid p-1"
																				src={each}
																				alt="Card image cap"
																				style={{
																					width: "100%",
																					height: "25rem",
																				}}
																			/>
																			<div class="position-absolute top-0 end-0 m-2">
																				<h6>
																					{index +
																						1 +
																						"/" +
																						props.data.images.length}
																				</h6>
																			</div>
																		</>
																	);
																}
															})()}
														</div>
													);
												} else {
													return (
														<div class="carousel-item">
															{(() => {
																if (each.includes("mp4")) {
																	// console.log("heloooooo");
																	// alert("it has a video");
																	return (
																		<>
																			{" "}
																			<video
																				// class="img-fluid p-1"
																				autoPlay
																				loop
																				muted
																				style={{
																					width: "100%",
																					height: "25rem",
																				}}
																			>
																				<source src={each} />
																			</video>
																			<div class="position-absolute top-0 end-0 m-2">
																				<h6>
																					{index +
																						1 +
																						"/" +
																						props.data.images.length}
																				</h6>
																			</div>
																		</>
																	);
																} else {
																	return (
																		<>
																			<img
																				class="img-fluid p-1"
																				src={each}
																				alt="Card image cap"
																				style={{
																					width: "100%",
																					height: "25rem",
																				}}
																			/>
																			<div class="position-absolute top-0 end-0 m-2">
																				<h6>
																					{index +
																						1 +
																						"/" +
																						props.data.images.length}
																				</h6>
																			</div>
																		</>
																	);
																}
															})()}
														</div>
													);
												}
											})}
										</div>
										<button
											class="carousel-control-prev"
											type="button"
											data-bs-target={CCAid}
											data-bs-slide="prev"
										>
											<span
												class="carousel-control-prev-icon"
												aria-hidden="true"
												style={{ opacity: 1 }}
											></span>
											<span class="visually-hidden">Previous</span>
										</button>
										<button
											class="carousel-control-next "
											type="button"
											data-bs-target={CCAid}
											data-bs-slide="next"
										>
											<span
												class="carousel-control-next-icon"
												aria-hidden="true"
												style={{ opacity: 1 }}
											></span>
											<span class="visually-hidden">Next</span>
										</button>
									</div>
								);
							}
						})()}
					</div>
					<div>
						{!isLiked && (
							<AiOutlineHeart
								className="me-2"
								size={"5vh"}
								onClick={likePost}
							></AiOutlineHeart>
						)}
						{isLiked && (
							<AiFillHeart
								className="me-2"
								size={"5vh"}
								color="red"
								onClick={unLikePost}
							></AiFillHeart>
						)}
						<button
							class="btn btn-link"
							data-bs-toggle="collapse"
							data-bs-target={Csid}
							href={Csid}
							aria-expanded="false"
							aria-controls={Caid}
							onClick={getComment}
						>
							<FaRegComment
								className="m-auto"
								size={"5vh"}
								color="black"
							></FaRegComment>
						</button>
					</div>
					<div className="d-flex justify-content-end">
						<h5 style={{ marginRight: "auto", marginLeft: "0.7rem" }}>
							{likeCount} Likes
						</h5>
					</div>
					<div class="card-body">
						<div className="d-flex">
							<pre className="me-1">
								@{props.data.userid.userid} {props.userid} :
							</pre>
							<h6> {props.data.title}</h6>
						</div>

						<div class="justify-content-between">
							<p class="card-text collapse" id={aid}>
								<pre>{props.data.caption}</pre>
							</p>

							<a
								className="show-more"
								data-bs-toggle="collapse"
								data-bs-target={sid}
								href={sid}
								onClick={moreAndLess}
								// role="button"
								aria-expanded="false"
								aria-controls={aid}
							>
								{text}
							</a>
							<br />
							<div>
								<p class="card-text collapse" id={Caid}>
									<div class="row d-flex justify-content-center">
										<div class="">
											<div
												class="card shadow-0 border"
												style={{ backgroundColor: "#f0f2f5" }}
											>
												<div class="card-body w-100 ">
													<div class="form-outline">
														<input
															type="text"
															class="form-control"
															placeholder="Type comment..."
															onChange={(e) => {
																setInputComment(e.target.value);
																// console.log(e.target.value);
															}}
															value={inputComment}
														/>
														<div className="d-flex">
															<button
																class="btn btn-light me-1"
																for="addANote"
																onClick={addcomment}
															>
																+ Add a Comment
															</button>
														</div>
														{isAlertVisible && <lable>Comment Added</lable>}
													</div>
													{
														<div>
															{allcomment
																.slice(0)
																.reverse()
																.map((each) => {
																	return (
																		<div class="comment-card card mb-1">
																			<div
																				class="card-body"
																				style={{ borderBottom: "1px solid" }}
																			>
																				<div>
																					<div class="d-flex ">
																						<img
																							src={each.userid.image}
																							alt="avatar"
																							class="rounded-circle"
																							width="30"
																							height="30"
																						/>
																						<div className="text-start">
																							<span class="small  ms-2 me-2">
																								<strong>
																									{each.userid.name}:
																								</strong>
																							</span>

																							<span className="ms-1 me-3">
																								{each.text}
																							</span>
																						</div>
																					</div>

																					<p className="text-end">
																						{date_func(each.date)}
																					</p>
																				</div>
																			</div>
																		</div>
																	);
																})}
														</div>
													}
												</div>
											</div>
										</div>
									</div>
								</p>
							</div>
							<p>{date_func(date)}</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
