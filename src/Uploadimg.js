import "./Signup.css";
import { useState } from "react";
import { Field, Formik, useFormik, Form } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Uploadimg() {
	var data = {
		name: "rohan",
		email: "rohan@gmail.com",
		userid: "rohan_Wala",
		passsword: "",
		bdate: "",
		gender: "",
		city: "",
		phone: "",
		img: "1677739049913rajgad.jpg",
	};
	const [file, setFile] = useState();

	return (
		<div>
			<div class="picture-container">
				<div class="picture">
					<img
						src="https://lh3.googleusercontent.com/LfmMVU71g-HKXTCP_QWlDOemmWg4Dn1rJjxeEsZKMNaQprgunDTtEuzmcwUBgupKQVTuP0vczT9bH32ywaF7h68mF-osUSBAeM6MxyhvJhG6HKZMTYjgEv3WkWCfLB7czfODidNQPdja99HMb4qhCY1uFS8X0OQOVGeuhdHy8ln7eyr-6MnkCcy64wl6S_S6ep9j7aJIIopZ9wxk7Iqm-gFjmBtg6KJVkBD0IA6BnS-XlIVpbqL5LYi62elCrbDgiaD6Oe8uluucbYeL1i9kgr4c1b_NBSNe6zFwj7vrju4Zdbax-GPHmiuirf2h86eKdRl7A5h8PXGrCDNIYMID-J7_KuHKqaM-I7W5yI00QDpG9x5q5xOQMgCy1bbu3St1paqt9KHrvNS_SCx-QJgBTOIWW6T0DHVlvV_9YF5UZpN7aV5a79xvN1Gdrc7spvSs82v6gta8AJHCgzNSWQw5QUR8EN_-cTPF6S-vifLa2KtRdRAV7q-CQvhMrbBCaEYY73bQcPZFd9XE7HIbHXwXYA=s200-no"
						class="picture-src"
						id="wizardPicturePreview"
						title=""
					/>
					<input
						type="file"
						name="avatar"
						onChange={(e) => {
							setFile(e.target.files[0]);
						}}
					/>

					<img
						// className="card-img-top"
						src={file}
						style={{ height: "100%", width: "100%" }}
					/>
				</div>
				<h6 class="">Choose Picture</h6>
			</div>
			<div>
				<button className="m-2">upload Image</button>
				<img src={`/appimg/${data.img}`}></img>
			</div>
		</div>
	);
}
