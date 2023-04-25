import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ProfilePage2() {
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
				console.log(userData);
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
		<div class="container">
			<section class="mx-auto my-2" style={{ maxWidth: "37rem" }}>
				<div class="card">
					<div class="card-body d-flex flex-row">
						<div>
							{(() => {
								if (userData.image) {
									return (
										<img
											src={`/userimg/${userData.image}`}
											// src={`./Travel_log_Client/userimg/${userData.image}`}
											class="rounded-circle me-3"
											height="50px"
											width="50px"
											alt="avatar"
										/>
									);
								} else {
									return (
										<img
											// src={`./Travel_log_Client/userimg/${userData.data.userid.image}`}
											class="rounded-circle me-3"
											height="50px"
											width="50px"
											alt="avatar"
										/>
									);
								}
							})()}
						</div>
					</div>
					<div
						class="bg-image hover-overlay ripple rounded-0"
						data-mdb-ripple-color="light"
					>
						<img
							class="img-fluid p-1"
							// src={`./Travel_log_Client/postImages/${userData.data.images[0]}`}
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
				</div>
			</section>
		</div>
	);
}
