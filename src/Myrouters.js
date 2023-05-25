import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import MYnavbar from "./Mynavbar";
import Profilepage from "./Profilepage";
import Radiobut from "./Radiobut";
import Signup from "./Signup";
import Uploadimg from "./Uploadimg";
import CreatePost from "./CreatePost";
import EditProfile from "./EditProfile";
import TermsOfService from "./TermsOfService";

export default function Myrouter() {
	return (
		// <BrowserRouter basename="/TravelBlog">
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
			<Route
				path="/updateprofile/:userid"
				element={
					<>
						<MYnavbar></MYnavbar>
						<EditProfile></EditProfile>
					</>
				}
			></Route>
			<Route path="/login" element={<Login></Login>}></Route>
			<Route
				path="/termsofservice"
				element={<TermsOfService></TermsOfService>}
			></Route>
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
		</Routes>
		// </BrowserRouter>
	);
}
