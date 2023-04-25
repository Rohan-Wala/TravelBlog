import axios from "axios";
<<<<<<< HEAD
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function PostTemplate(props) {
	// console.log("all posts in fe ........................");
	console.log(props.data);
=======
import { useContext, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import Datecontext from "./Context";

export default function PostTemplate(props) {
	// console.log("all posts in fe ........................");
	const date_func = useContext(Datecontext);
	//console.log(date_func)
	// console.log(props.data);
>>>>>>> master
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
<<<<<<< HEAD

=======
	let date = props.data.date;
>>>>>>> master
	var [likeCount, setCount] = useState(props.data.likes.length);
	var [isLiked, setIsLiked] = useState();

	//comment
	var [inputComment, setInputComment] = useState("");
	//add comment
	var [isAlertVisible, setIsAlertVisible] = useState(false);
	function addcomment() {
		setInputComment("");
		var obj = {
			postid: props.data._id,
			userid: localStorage.userid,
			comment: inputComment,
		};
		axios({
<<<<<<< HEAD
			url: "https://travellogserver-production.up.railway.app/post/comments",
=======
			url: "http://localhost:5001/post/comments",
>>>>>>> master
			method: "put",
			data: obj,
		}).then(
			(result) => {
				// console.log(result);
				setIsAlertVisible(true);
				getComment();
			},
			(err) => {
				console.log("err");
			}
		);
	}
	//getcomment
	var [allcomment, setcomments] = useState([]);
	function getComment() {
		axios({
<<<<<<< HEAD
			url:
				"https://travellogserver-production.up.railway.app/post/getcomments/" +
				props.data._id,
=======
			url: "http://localhost:5001/post/getcomments/" + props.data._id,
>>>>>>> master
			method: "get",
		}).then(
			(result) => {
				setcomments(result.data);
				// console.log(result);
			},
			(err) => {
				console.log("unable to fatch comment in fe");
			}
		);
	}
<<<<<<< HEAD
=======
	//console.log(allcomment)
>>>>>>> master

	props.data.likes.map((each) => {
		if (localStorage.userid == each) {
			isLiked = true;
		}
	});
	//check ir user has alread liked the post and set veriable according to that for like and dislike
	//work to do
	function likePost() {
		axios({
<<<<<<< HEAD
			url: "https://travellogserver-production.up.railway.app/post/likepost",
=======
			url: "http://localhost:5001/post/likepost",
>>>>>>> master
			method: "put",
			data: likePara,
		}).then(
			(result) => {
				console.log("result after post like ", result);
				setIsLiked(true);
				setCount(props.data.likes.length + 1);
			},
			(err) => {
				console.log("erroe after post like ", err);
			}
		);
	}
	function unLikePost() {
		axios({
<<<<<<< HEAD
			url: "https://travellogserver-production.up.railway.app/post/unlikepost",
=======
			url: "http://localhost:5001/post/unlikepost",
>>>>>>> master
			method: "delete",
			data: likePara,
		}).then(
			(result) => {
				console.log("result after post unlike ", result);
				setIsLiked(false);
				setCount(props.data.likes.length);
			},
			(err) => {
				console.log("erroe after post like ", err);
			}
		);
	}
	setTimeout(() => {
		setIsAlertVisible(false);
	}, 2000);
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
<<<<<<< HEAD
											src={`/userimg/${props.image}`}
											// src={`./Travel_log_Client/userimg/${props.image}`}
=======
											src={props.image}
>>>>>>> master
											class="rounded-circle me-3"
											height="50px"
											width="50px"
											alt="avatar"
										/>
									);
								} else {
									return (
										<img
<<<<<<< HEAD
											src={`/userimg/${props.data.userid.image}`}
											// src={`./Travel_log_Client/userimg/${props.data.userid.image}`}
=======
											src={props.data.userid.image}
>>>>>>> master
											class="rounded-circle me-3"
											height="50px"
											width="50px"
											alt="avatar"
										/>
									);
								}
							})()}
						</div>

						<div>
							<Link
								to={"profile/" + props.data.userid._id}
								style={{ textDecoration: "none" }}
							>
								<h5 class="card-title font-weight-bold mb-2">
									{props.data.userid.name} {props.name}
								</h5>
							</Link>
							<p class="card-text">
								<i class="far fa-clock pe-2"></i>
								{props.data.location}
							</p>
						</div>
					</div>
					<div
						class="bg-image hover-overlay ripple rounded-0"
						data-mdb-ripple-color="light"
					>
						{(() => {
							if (props.data.images.length == 1) {
								return (
<<<<<<< HEAD
									<img
										class="img-fluid p-1"
										src={`/postImages/${props.data.images[0]}`}
										alt="Card image cap"
										style={{ width: "100%", height: "25rem" }}
									/>
=======
									// return (
									// 	<img
									// 		class="img-fluid p-1"
									// 		src={props.data.images[0]}
									// 		alt="Card image cap"
									// 		style={{ width: "100%", height: "25rem" }}
									// 	/>
									// );
									<>
										{(() => {
											if (props.data.images[0].includes("mp4")) {
												console.log("heloooooo");
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
>>>>>>> master
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
<<<<<<< HEAD
											{/* <li
												data-bs-target="#carouselExampleControlsNoTouching"
												data-bs-slide-to="0"
												class="active"
											></li>
											<li
												data-bs-target="#carouselExampleControlsNoTouching"
												data-bs-slide-to="1"
											></li>
											<li
												data-bs-target="#carouselExampleControlsNoTouching"
												data-bs-slide-to="2"
											></li> */}
=======
>>>>>>> master
										</ol>
										<div class="carousel-inner">
											{props.data.images.map((each, index) => {
												if (index == 0) {
													return (
														<div class="carousel-item active">
															<img
<<<<<<< HEAD
																src={`/postImages/${each}`}
=======
																src={each}
>>>>>>> master
																style={{ width: "100%", height: "25rem" }}
																alt="..."
															/>
														</div>
													);
												} else {
													return (
														<div class="carousel-item">
															<img
<<<<<<< HEAD
																src={`/postImages/${each}`}
=======
																src={each}
>>>>>>> master
																style={{ width: "100%", height: "25rem" }}
																alt="..."
															/>
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
												style={{ opacity: 0 }}
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
												style={{ opacity: 0 }}
											></span>
											<span class="visually-hidden">Next</span>
										</button>
									</div>
								);
							}
						})()}
					</div>
					<div class="card-body">
						<h6>{props.data.title}</h6>
<<<<<<< HEAD
=======
						<p>{date_func(date)}</p>
>>>>>>> master
						{/* <p class="card-text collapse" id="collapseContent"> */}
						<p class="card-text collapse" id={aid}>
							<pre>{props.data.caption}</pre>
						</p>
						<div class="d-flex justify-content-between">
							<a
								class="btn btn-primary"
								data-bs-toggle="collapse"
								data-bs-target={sid}
								href={sid}
								role="button"
								aria-expanded="false"
								aria-controls={aid}
							>
								More
							</a>
							<div className="flex d-flex">
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
						</div>
						<div className="d-flex justify-content-end">
							<h5>{likeCount} Likes</h5>
						</div>
						<div>
							<p class="card-text collapse" id={Caid}>
								<div class="row d-flex justify-content-center">
									<div class="">
										<div
											class="card shadow-0 border"
											style={{ backgroundColor: "#f0f2f5" }}
										>
<<<<<<< HEAD
											<div class="card-body p-1">
												<div class="form-outline mb-1">
													<input
														type="text"
														// id="addANote"
=======
											<div class="card-body w-100 ">
												<div class="form-outline">
													<input
														type="text"
>>>>>>> master
														class="form-control"
														placeholder="Type comment..."
														onChange={(e) => {
															setInputComment(e.target.value);
															console.log(e.target.value);
														}}
														value={inputComment}
													/>
<<<<<<< HEAD
													<button
														class="btn btn-light me-1"
														for="addANote"
														onClick={addcomment}
													>
														+ Add a Comment
													</button>
=======
													<div className="d-flex">
														<button
															class="btn btn-light me-1"
															for="addANote"
															onClick={addcomment}
														>
															+ Add a Comment
														</button>
													</div>
>>>>>>> master
													{isAlertVisible && <lable>Comment Added</lable>}
												</div>
												{
													<div>
														{allcomment
															.slice(0)
															.reverse()
															.map((each) => {
																return (
																	<div class="card mb-1">
																		<div class="card-body">
																			<div class="d-flex justify-content-start">
<<<<<<< HEAD
																				<div class="d-flex me-3 align-items-top">
																					<img
																						src={`/userimg/${each.userid.image}`}
																						// src={`./Travel_log_Client/userimg/${each.userid.image}`}
=======
																				<div class="d-flex ">
																					<img
																						src={each.userid.image}
>>>>>>> master
																						alt="avatar"
																						class="rounded-circle"
																						width="30"
																						height="30"
																					/>
																					<h6>
<<<<<<< HEAD
																						<p class="small  ms-2">
=======
																						<p class="small  ms-2 me-2">
>>>>>>> master
																							{each.userid.name}:
																						</p>
																					</h6>
																				</div>
<<<<<<< HEAD
																				<pre>{each.text}</pre>
=======
																				<pre className="ms-1 me-3">
																					{each.text}
																				</pre>
																				<pre>{date_func(each.date)}</pre>
>>>>>>> master
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
					</div>
				</div>
			</section>
		</div>
	);
}
