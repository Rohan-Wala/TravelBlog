import { useEffect, useState } from "react";
import "./Home.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import PostTemplate from "./PostTemplate";
export default function Home() {
	var post = {
		title: "welcome",
		caption:
			"this is my first post \r\nenjoy it\n" +
			"It was a very wonder full experience as it was first trek of my life \n" +
			"never forgetting and joyful, enjoyed it a lot \n" +
			"and i almost lost while exploring the place as i was alone 😂😂 ",
		userid: "6405dcc4c08f0490318cb28f",
	};

	var [allpost, setpost] = useState([]);
	useEffect(() => {
		axios({
			url: "http://travellogserver-production.up.railway.app/post/getpost",
			method: "get",
		}).then(
			(result) => {
				setpost(result.data.allpost);
				console.log("all post get successfully");
			},
			(err) => {
				console.log("unabel to get post ", err);
			}
		);
	}, []);
	// console.log(allpost);
	return (
		<div className=" mt-3" style={{ width: "100vh" }}>
			<div className="text-center">
				<img
					// src="mountain.jpg"
					src="./Travel_log_Client/mountain.jpg"
					class="img-fluid p-2"
					alt="Responsive image"
				></img>
			</div>
			<h1>welcome</h1>
			<h6>
				Sometimes all you need is to get lost in Nature to find yourself...
			</h6>
			{/* if(allpost) */}
			{
				<div className="row">
					{allpost
						.slice(0)
						.reverse()
						.map((each, index) => {
							return <PostTemplate data={each}></PostTemplate>;
						})}
				</div>
			}
			<pre> {post.title}</pre>
			<pre> {post.caption}</pre>
			<h1>welcome to my website..........................................</h1>
			<h1>welcome</h1>
			<h1>welcome</h1>
			{/* <div class="row">
				{parts.map((each, index) => {
					return <CartTemplate data={each} maxprice={2000} />;
				})}
			</div> */}
			{/* rendering posts  */}
			<h1>welcome</h1>
			<h1>post card</h1>
			<div class="container">
				<section class="mx-auto my-5" style={{ maxWidth: "37rem" }}>
					<div class="card">
						<div class="card-body d-flex flex-row">
							<img
								src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg"
								class="rounded-circle me-3"
								height="50px"
								width="50px"
								alt="avatar"
							/>
							<div>
								<h5 class="card-title font-weight-bold mb-2">
									New spicy meals
								</h5>
								<p class="card-text">
									<i class="far fa-clock pe-2"></i>07/24/2018
								</p>
							</div>
						</div>
						<div
							class="bg-image hover-overlay ripple rounded-0"
							data-mdb-ripple-color="light"
						>
							<img
								class="img-fluid"
								src="https://mdbootstrap.com/img/Photos/Horizontal/Food/full page/2.jpg"
								alt="Card image cap"
							/>
							<a href="#!">
								<div
									class="mask"
									// style="background-color: rgba(251, 251, 251, 0.15);"
								></div>
							</a>
						</div>
						<div class="card-body">
							<p class="card-text collapse" id="collapseContent">
								Recently, we added several exotic new dishes to our restaurant
								menu. They come from countries such as Mexico, Argentina, and
								Spain. Come to us, have some wine and enjoy our juicy meals from
								around the world.
							</p>
							<div class="d-flex justify-content-between">
								<a
									class="btn btn-primary"
									data-bs-toggle="collapse"
									data-bs-target="#collapseContent"
									href="#collapseContent"
									role="button"
									aria-expanded="false"
									aria-controls="collapseContent"
								>
									Link with href
								</a>
								<div>like and comment</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<h1>welcome</h1>
			<p>
				<a
					class="btn btn-primary"
					data-bs-toggle="collapse"
					href="#collapseExample"
					role="button"
					aria-expanded="false"
					aria-controls="collapseExample"
				>
					Link with href
				</a>
				<button
					class="btn btn-primary"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#collapseExample"
					aria-expanded="false"
					aria-controls="collapseExample"
				>
					Button with data-bs-target
				</button>
			</p>
			<div class="collapse" id="collapseExample">
				<div class="card card-body">
					Some placeholder content for the collapse component. This panel is
					hidden by default but revealed when the user activates the relevant
					trigger.
				</div>
			</div>
			<h1>welcome</h1>
			<div class="dropdown">
				<a
					class="dropdown hidden-arrow"
					type="button"
					id="dropdownMenuicon"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<BsThreeDotsVertical size={"2.5rem"}></BsThreeDotsVertical>
				</a>
				<ul class="dropdown-menu" aria-labelledby="dropdownMenuicon">
					<li>
						<a class="dropdown-item" href="#">
							{" "}
							<i class="fas fa-user-alt pe-2"></i>My Profile
						</a>
					</li>
					<li>
						<a class="dropdown-item" href="#">
							{" "}
							<i class="fas fa-cog pe-2"></i>Settings
						</a>
					</li>
					<li>
						<a class="dropdown-item" href="#">
							{" "}
							<i class="fas fa-door-open pe-2"></i>Logout
						</a>
					</li>
				</ul>
			</div>
			<h1>welcome</h1>
			<h1>welcome</h1>
			<h1>welcome</h1>
		</div>
	);
}
