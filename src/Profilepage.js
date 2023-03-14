import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostTemplate from "./PostTemplate";

export default function Profilepafge() {
	var params = useParams();
	var userid = params.userid;
	// console.log("userid from profile", userid);
	var [userData, setdata] = useState([]);
	var [userposts, setpost] = useState([]);
	var posts;
	useEffect(() => {
		axios({
			url:
				"http://travellogserver-production.up.railway.app/users/getuser/" +
				userid,
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
	}, [userData]);

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
		<section class="" style={{ backgroundColor: "#9de2ff;" }}>
			<div class="container py-5 h-10">
				<div class="  flex d-flex  h-100">
					<div class="col">
						<div class="card" style={{ borderRadius: "15px;" }}>
							<div class="card-body p-4">
								<div class="d-flex text-black">
									<div class="flex-shrink-0">
										<img
											// src={`/userimg/${userData.image}`}
											src={`./Travel_log_Client/userimg/${userData.image}`}
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
								</div>
							</div>
						</div>
					</div>
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
				</div>
			</div>
		</section>
	);
}
