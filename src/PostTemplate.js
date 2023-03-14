import axios from "axios";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function PostTemplate(props) {
	// console.log("all posts in fe ........................");
	console.log(props.data);
	var id = props.data._id;
	var aid = "collapseContent" + id;
	var sid = "#" + "collapseContent" + id;

	var Caid = "commentSection" + id;
	var Csid = "#" + "commentSection" + id;
	var likePara = {
		userid: localStorage.userid,
		postid: props.data._id,
	};

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
			url: "https://travellogserver-production.up.railway.app/post/comments",
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
			url:
				"https://travellogserver-production.up.railway.app/post/getcomments/" +
				props.data._id,
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

	props.data.likes.map((each) => {
		if (localStorage.userid == each) {
			isLiked = true;
		}
	});
	//check ir user has alread liked the post and set veriable according to that for like and dislike
	//work to do
	function likePost() {
		axios({
			url: "https://travellogserver-production.up.railway.app/post/likepost",
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
			url: "https://travellogserver-production.up.railway.app/post/unlikepost",
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
											// src={`/userimg/${props.image}`}
											src={`./Travel_log_Client/userimg/${props.image}`}
											class="rounded-circle me-3"
											height="50px"
											width="50px"
											alt="avatar"
										/>
									);
								} else {
									return (
										<img
											// src={`/userimg/${props.data.userid.image}`}
											src={`./Travel_log_Client/userimg/${props.data.userid.image}`}
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
								to={"/profile/" + props.data.userid._id}
								style={{ textDecoration: "none" }}
							>
								<h5 class="card-title font-weight-bold mb-2">
									{props.data.userid.name} {props.name}
								</h5>
							</Link>
							<p class="card-text">
								<i class="far fa-clock pe-2"></i>07/24/2018 // will give
								location
							</p>
						</div>
					</div>
					<div
						class="bg-image hover-overlay ripple rounded-0"
						data-mdb-ripple-color="light"
					>
						<img
							class="img-fluid p-1"
							// src={`/postimages/${props.data.images[0]}`}
							src={`./Travel_log_Client/postimages/${props.data.images[0]}`}
							alt="Card image cap"
							style={{ width: "100%", height: "25rem" }}
						/>
						<a href="#!">
							<div
								class="mask"
								// style="background-color: rgba(251, 251, 251, 0.15);"
							></div>
						</a>
					</div>
					<div class="card-body">
						<h6>{props.data.title}</h6>
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
								<pre>{props.data.caption}</pre>
								<div class="row d-flex justify-content-center">
									<div class="">
										<div
											class="card shadow-0 border"
											style={{ backgroundColor: "#f0f2f5" }}
										>
											<div class="card-body p-1">
												<div class="form-outline mb-1">
													<input
														type="text"
														// id="addANote"
														class="form-control"
														placeholder="Type comment..."
														onChange={(e) => {
															setInputComment(e.target.value);
															console.log(e.target.value);
														}}
														value={inputComment}
													/>
													<button
														class="btn btn-light me-1"
														for="addANote"
														onClick={addcomment}
													>
														+ Add a Comment
													</button>
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
																				<div class="d-flex me-3 align-items-top">
																					<img
																						// src={`/userimg/${each.userid.image}`}
																						src={`./Travel_log_Client/userimg/${each.userid.image}`}
																						alt="avatar"
																						class="rounded-circle"
																						width="30"
																						height="30"
																					/>
																					<h6>
																						<p class="small  ms-2">
																							{each.userid.name}:
																						</p>
																					</h6>
																				</div>
																				<pre>{each.text}</pre>
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
