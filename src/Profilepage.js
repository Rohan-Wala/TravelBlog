import axios from "axios";
import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostTemplate from "./PostTemplate";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
export default function Profilepafge(props) {
	var params = useParams();
	var userid = params.userid;
	// console.log("userid from profile", userid);
	var [userData, setdata] = useState([]);
	var [userposts, setpost] = useState([]);
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0); // if user has scroll down, it will scroll back to top on re-render
		axios({
			url: "http://localhost:5001/users/getuser/" + userid,
			method: "get",
			headers: { authorization: localStorage.token },
		}).then(
			(result) => {
				setdata(result.data.data[0]);
				setpost(result.data.data[0].posts);
				console.log("call for", userid);
				// posts = userData.posts;
				// console.log(result.data.data[0]);
			},
			(error) => {
				// console.log("error in fe", error);
			}
		);
	}, [location.pathname]);
	//location.pathname to handel re-render page on url change,

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
		<div>
			<section class="h-100 gradient-custom-2">
				<div class="container-fluid py-5 h-100">
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
											class="profile-pic img-fluid img-thumbnail mt-4 mb-2"
										/>

										{userid === localStorage.userid && (
											<button
												type="button"
												class="btn btn-outline-dark mt-3"
												data-mdb-ripple-color="dark"
												style={{ "z-index": "1" }}
											>
												<Link
													className="text-decoration-none"
													to={"/updateprofile/" + localStorage.userid}
												>
													Edit profile
												</Link>
											</button>
										)}
									</div>
									<div class="ms-3" style={{ "margin-top": "130px" }}>
										<h5>{userData.name}</h5>
										<h6>@{userData.userid}</h6>
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
										{userData.bio && (
											<div class="p-4" style={{ backgroundColor: "#f8f9fa" }}>
												<pre class="font-italic mb-1">{userData.bio}</pre>
											</div>
										)}
									</div>
									<div class="d-flex justify-content-between align-items-center mb-4">
										<p class="lead fw-normal mb-0">Recent photos</p>
										{/* <p class="mb-0">
											<a href="#!" class="text-muted">
												Show all
											</a>
										</p> */}
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
																userid={userData.userid}
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
			<ToastContainer />
		</div>
	);
}
