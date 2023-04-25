import { CgProfile } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { GoDiffAdded } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
export default function MYnavbar() {
	var isLoggedIn = useSelector((state) => state.isLoggedIn);
	var dispatch = useDispatch();
	var navigate = useNavigate();
	function logout() {
		localStorage.token = "";
		localStorage.userData = {};
		console.log("hello");
		dispatch({
			type: "LOGOUT",
		});
		navigate("/login");
	}
	// console.log("log in navbar", isLoggedIn);
	return (
		<nav
<<<<<<< HEAD
			class="navbar navbar-expand-lg navbar-light bg-success m-auto  fixed-top"
			style={{ width: "100vh" }}
=======
			class="navbar navbar-expand-lg navbar-light m-auto  fixed-top"
			style={{ width: "100vh", backgroundColor: "#EB4D4B" }}
>>>>>>> master
		>
			<div class="container-fluid  ">
				<Link
					to={"/"}
<<<<<<< HEAD
					style={{ textDecoration: "none", color: "black" }}
=======
					style={{ textDecoration: "none", color: "white" }}
>>>>>>> master
					onClick={() => {
						document.documentElement.scrollTop = 0;
					}}
				>
					{" "}
<<<<<<< HEAD
					TRAVEL BLOG
=======
					TOURISTA
>>>>>>> master
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
						<li class="nav-item ms-3 mt-1">
<<<<<<< HEAD
							<Link to={"/"}>
								<BiSearch size={"1.7rem"} color="black"></BiSearch>
							</Link>
						</li>
						<li class="nav-item ms-3 mt-1">
							<Link to={"/createPost"}>
								<GoDiffAdded size={"1.5rem"} color="black"></GoDiffAdded>
							</Link>
=======
							{isLoggedIn && (<Link to={"/"}>
								<BiSearch size={"1.7rem"} color="white"></BiSearch>
							</Link>)}
						</li>
						<li class="nav-item ms-3 mt-1">
							{isLoggedIn && (<Link to={"/createPost"}>
								<GoDiffAdded size={"1.5rem"} color="white"></GoDiffAdded>
							</Link>)}
>>>>>>> master
						</li>
					</ul>
					<form class="d-flex">
						<button class="btn " type="button">
							{isLoggedIn && (
								<div>
									<Link to={"/profile/" + localStorage.userid}>
<<<<<<< HEAD
										<CgProfile size={"2.5rem"}></CgProfile>
=======
										<CgProfile size={"2.5rem"} color="white"></CgProfile>
>>>>>>> master
									</Link>
								</div>
							)}
							{!isLoggedIn && (
								<Link to={"/login"}>
<<<<<<< HEAD
									<CgProfile size={"2.5rem"}></CgProfile>
=======
									<CgProfile size={"2.5rem"} color="white"></CgProfile>
>>>>>>> master
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
<<<<<<< HEAD
									color={"black"}
=======
									color={"white"}
>>>>>>> master
								></BsThreeDotsVertical>
							</a>
							<ul class="dropdown-menu" aria-labelledby="dropdownMenuicon">
								<li>
									<a class="dropdown-item" href="#">
										{" "}
										<AiOutlineSetting></AiOutlineSetting>Settings
									</a>
								</li>
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
