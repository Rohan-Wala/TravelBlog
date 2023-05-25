import { useEffect, useState } from "react";
import "./Home.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import PostTemplate from "./PostTemplate";
// import jwt from 'jwt-decode'
// const decode = jwt(localStorage.getItem('token'));
// console.log(decode)
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
			url: "http://localhost:5001/post/getpost",
			method: "get",
			headers: { authorization: localStorage.token },
		}).then(
			(result) => {
				setpost(result.data.allpost);
				// console.log("all post get successfully");
			},
			(err) => {
				// console.log("unabel to get post ", err);
			}
		);
	}, []);
	// console.log(allpost);
	return (
		<div className=" mt-3 p-5" style={{ width: "100vh", border:"1px solid gray" }}>			
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

			<div class="collapse" id="collapseExample">
				<div class="card card-body">
					Some placeholder content for the collapse component. This panel is
					hidden by default but revealed when the user activates the relevant
					trigger.
				</div>
			</div>
		</div>
	);
}
