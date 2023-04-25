import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostTemplate from "./PostTemplate";
import profile from "./profile.jpg";

export default function Profilepafge() {
	var params = useParams();
	var userid = params.userid;
	// console.log("userid from profile", userid);
	var [userData, setdata] = useState([]);
	var [userposts, setpost] = useState([]);
	var posts;
	useEffect(() => {
		axios({
			url: "http://localhost:5001/users/getuser/" + userid,
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
