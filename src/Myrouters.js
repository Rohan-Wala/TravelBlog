import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import CreatePost from "./CreatePost";
import Home from "./Home";
import Login from "./Login";
import MYnavbar from "./Mynavbar";
import Profilepage from "./Profilepage";
import Radiobut from "./Radiobut";
import Signup from "./Signup";
import Uploadimg from "./Uploadimg";
export default function Myrouter() {
	return (
		<BrowserRouter basename="/Travel_log_Client">
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
			</Routes>
		</BrowserRouter>
	);
}
