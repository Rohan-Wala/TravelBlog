import axios from "axios";
import { useEffect, useState } from "react";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
import PostTemplate from "./PostTemplate";
=======
import { Link, useParams } from "react-router-dom";
import PostTemplate from "./PostTemplate";
import profile from "./profile.jpg";
>>>>>>> master

export default function Profilepafge() {
	var params = useParams();
	var userid = params.userid;
	// console.log("userid from profile", userid);
	var [userData, setdata] = useState([]);
	var [userposts, setpost] = useState([]);
	var posts;
	useEffect(() => {
		axios({
<<<<<<< HEAD
			url:
				"https://travellogserver-production.up.railway.app/users/getuser/" +
				userid,
=======
			url: "http://localhost:5001/users/getuser/" + userid,
>>>>>>> master
			method: "get",
		}).then(
			(result) => {
				console.log("log in get user details", result.data);
				setdata(result.data.data[0]);
				setpost(result.data.data[0].posts);
				// posts = userData.posts;
				// console.log(userData);
			},
			(error) => {
				console.log("error in fe", error);
			}
		);
	}, []);

	var posts = userData.posts;
	var Followers = userData.followers;
	var Following = userData.following;
	if (posts) {
		var lposts = posts.length;
	}
	if (Followers) {
		var lFollowers = Followers.length;
	}
	if (Following) {
		var lFollowing = Following.length;
	}

	return (
<<<<<<< HEAD
		<section class="" style={{ backgroundColor: "#9de2ff;" }}>
			<div class="container py-5 h-10">
				<div class="  flex d-flex  h-100">
					<div class="col">
						<div class="card" style={{ borderRadius: "15px;" }}>
							<div class="card-body p-4">
								<div class="d-flex text-black">
									<div class="flex-shrink-0">
										<img
											// src="mountain.jpg"
											src={`userimg/${userData.image}`}
											// src={`./Travel_log_Client/userimg/${userData.image}`}
											alt="Generic placeholder image"
											class="img-fluid mt-3"
											style={{ width: "30vh", height: "25vh" }}
										/>
									</div>
									<div class="flex-grow-1 ms-3">
										<h5 class="mb-1">{userData.name}</h5>
										<p class="mb-2 pb-1" style={{ color: " #2b2a2a;" }}>
											{userData.userid}
										</p>
										<div
											class="d-flex justify-content-start rounded-3 p-2 mb-2"
											style={{ backgroundColor: "#efefef;" }}
										>
											<div>
												<p class="small text-muted mb-1">Pots</p>
												<p class="mb-0">{lposts}</p>
											</div>
											<div class="px-3">
												<p class="small text-muted mb-1">Followers</p>
												<p class="mb-0">{lFollowers}</p>
											</div>
											<div>
												<p class="small text-muted mb-1">Following</p>
												<p class="mb-0">{lFollowing}</p>
											</div>
										</div>
										<div>
											{(() => {
												if (userData._id !== localStorage.userid) {
													return (
														<div class="d-flex pt-1">
															<button
																type="button"
																class="btn btn-outline-primary me-1 flex-grow-1"
															>
																Chat
															</button>
															<button
																type="button"
																class="btn btn-primary flex-grow-1"
															>
																Follow
															</button>
														</div>
													);
												} else {
													return (
														<div class="d-flex pt-1">
															<button
																type="button"
																class="btn btn-primary flex-grow-1"
															>
																Share
															</button>
														</div>
													);
												}
											})()}

											{/* <button type="button" class="btn btn-primary flex-grow-1">
												Share
											</button> */}
										</div>
									</div>
=======
		<section class="h-100 gradient-custom-2">
			<div class="container py-5 h-100">
				<div class="row d-flex justify-content-center align-items-center h-100">
					<div class="col col-md-12 p-0">
						<div class="card">
							<div
								class="rounded-top text-white d-flex flex-row"
								style={{ backgroundColor: "#000", height: "200px" }}
							>
								<div
									class="ms-4 mt-5 d-flex flex-column"
									style={{ width: "150px" }}
								>
									<img
										src={userData.image}
										/* <img src={profile} */
										alt="Generic placeholder image"
										class="img-fluid img-thumbnail mt-4 mb-2"
										style={{ width: "150px", "z-index": "1" }}
									/>
									<button
										type="button"
										class="btn btn-outline-dark mt-2"
										data-mdb-ripple-color="dark"
										style={{ "z-index": "1" }}
									>
										Edit profile
									</button>
								</div>
								<div class="ms-3" style={{ "margin-top": "130px" }}>
									<h5>{userData.userid}</h5>
								</div>
							</div>
							<div
								class="p-4 text-black"
								style={{ "background-color": "#f8f9fa" }}
							>
								<div class="d-flex justify-content-end text-center py-1">
									<div>
										<p class="mb-1 h5">{lposts}</p>
										<p class="small text-muted mb-0">Photos</p>
									</div>
									<div class="px-3">
										<p class="mb-1 h5">{lFollowers}</p>
										<p class="small text-muted mb-0">Followers</p>
									</div>
									<div>
										<p class="mb-1 h5">{lFollowing}</p>
										<p class="small text-muted mb-0">Following</p>
									</div>
								</div>
							</div>
							<div class="card-body p-4 text-black">
								<div class="mb-5">
									<p class="lead fw-normal mb-1">About</p>
									<div class="p-4" style={{ backgroundColor: "#f8f9fa" }}>
										<p class="font-italic mb-1">Web Developer</p>
										<p class="font-italic mb-1">Lives in Pune</p>
										<p class="font-italic mb-0"></p>
									</div>
								</div>
								<div class="d-flex justify-content-between align-items-center mb-4">
									<p class="lead fw-normal mb-0">Recent photos</p>
									<p class="mb-0">
										<a href="#!" class="text-muted">
											Show all
										</a>
									</p>
								</div>
								<div>
									{
										<div className="row">
											{userposts
												.slice(0)
												.reverse()
												.map((each, index) => {
													return (
														<PostTemplate
															data={each}
															name={userData.name}
															image={userData.image}
														></PostTemplate>
													);
												})}
										</div>
									}
>>>>>>> master
								</div>
							</div>
						</div>
					</div>
				</div>
<<<<<<< HEAD

				<div>
					{
						<div className="row">
							{userposts
								.slice(0)
								.reverse()
								.map((each, index) => {
									return (
										<PostTemplate
											data={each}
											name={userData.name}
											image={userData.image}
										></PostTemplate>
									);
								})}
						</div>
					}
				</div>
=======
>>>>>>> master
			</div>
		</section>
	);
}
