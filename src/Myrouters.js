import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
<<<<<<< HEAD
import CreatePost from "./CreatePost";
=======
>>>>>>> master
import Home from "./Home";
import Login from "./Login";
import MYnavbar from "./Mynavbar";
import Profilepage from "./Profilepage";
import Radiobut from "./Radiobut";
import Signup from "./Signup";
import Uploadimg from "./Uploadimg";
<<<<<<< HEAD
export default function Myrouter() {
	return (
		<BrowserRouter basename="/TravelBlog">
			<MYnavbar></MYnavbar>
			<Routes>
				<Route path="/" element={<Home></Home>}></Route>
				<Route path="/signup" element={<Signup></Signup>}></Route>
				<Route path="/login" element={<Login></Login>}></Route>
				<Route path="/radio" element={<Radiobut></Radiobut>}></Route>
				<Route path="/uploadimages" element={<Uploadimg></Uploadimg>}></Route>
				<Route
					path="/profile/:userid"
					element={<Profilepage></Profilepage>}
				></Route>

				<Route path="/createPost" element={<CreatePost></CreatePost>}></Route>
=======
import CreatePost from "./CreatePost";

export default function Myrouter() {
	return (
		<BrowserRouter basename="/TravelBlog">
			<Routes>
				<Route
					path="/"
					element={
						<>
							<MYnavbar />
							<Home />
						</>
					}
				></Route>
				<Route path="/signup" element={<Signup></Signup>}></Route>
				<Route path="/login" element={<Login></Login>}></Route>
				<Route
					path="/radio"
					element={
						<>
							<MYnavbar />
							<Radiobut />
						</>
					}
				></Route>
				<Route
					path="/uploadimages"
					element={
						<>
							<MYnavbar />
							<Uploadimg />
						</>
					}
				></Route>
				<Route
					path="/profile/:userid"
					element={
						<>
							<MYnavbar />
							<Profilepage />
						</>
					}
				></Route>

				<Route
					path="/createPost"
					element={
						<>
							<MYnavbar />
							<CreatePost />
						</>
					}
				></Route>
>>>>>>> master
			</Routes>
		</BrowserRouter>
	);
}
