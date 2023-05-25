import { CgProfile } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { GoDiffAdded } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function MYnavbar() {
	var isLoggedIn = useSelector((state) => state.isLoggedIn);
	var dispatch = useDispatch();
	var navigate = useNavigate();
	function logout() {
		localStorage.token = "";
		localStorage.userData = {};
		localStorage.userid = "";
		// console.log("hello");
		dispatch({
			type: "LOGOUT",
		});
		navigate("/login");
	}
	// console.log("log in navbar", isLoggedIn);
	let [img, setImg] = useState("");
	useEffect(() => {
		axios
			.get("http://localhost:5001/users/getuser/" + localStorage.userid, {
				headers: { authorization: localStorage.token },
			})
			.then((res) => {
				setImg(res.data.data[0].image);
			})
			.catch((err) => console.log(err));
	});

	return (
		<nav
			class="navbar navbar-expand-lg navbar-light m-auto  fixed-top"
			style={{ width: "100vh", backgroundColor: "#EB4D4B" }}
		>
			<div class="container-fluid">
				<Link
					to={"/"}
					style={{ textDecoration: "none", color: "white" }}
					onClick={() => {
						document.documentElement.scrollTop = 0;
					}}
				>
					{" "}
					TOURISTA
				</Link>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse " id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						{/* <li class="nav-item ms-3 mt-1">
							{isLoggedIn && (
								<Link to={"/"}>
									<BiSearch size={"1.7rem"} color="white"></BiSearch>
								</Link>
							)}
						</li> */}
						<li class="nav-item ms-3 mt-1">
							{isLoggedIn && (
								<Link to={"/createPost"}>
									<GoDiffAdded size={"1.5rem"} color="white"></GoDiffAdded>
								</Link>
							)}
						</li>
					</ul>
					<form class="d-flex">
						<button class="btn " type="button">
							{isLoggedIn && (
								<div>
									<Link to={"/profile/" + localStorage.userid}>
										<img
											src={img}
											height="40px"
											width="40px"
											style={{ borderRadius: "20px" }}
										/>
									</Link>
								</div>
							)}
							{!isLoggedIn && (
								<Link to={"/login"}>
									<CgProfile size={"2.5rem"} color="white"></CgProfile>
								</Link>
							)}
						</button>
						<div class="dropdown mt-2">
							<a
								class="dropdown hidden-arrow"
								type="button"
								id="dropdownMenuicon"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<BsThreeDotsVertical
									size={"1.6rem"}
									color={"white"}
								></BsThreeDotsVertical>
							</a>
							<ul class="dropdown-menu" aria-labelledby="dropdownMenuicon">
								<li>
									<a class="dropdown-item" onClick={logout}>
										<CiLogin></CiLogin>Logout
									</a>
								</li>
							</ul>
						</div>
					</form>
				</div>
			</div>
		</nav>
	);
}
