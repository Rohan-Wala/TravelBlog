import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Createpost.css";
export default function CreatePost() {
	var [postimg, setFile] = useState();
	var [previewImg, setPrevFile] = useState();
	var navigate = useNavigate();
	var formdata = new FormData();
	formdata.append("images", postimg);

	const formik = useFormik({
		initialValues: {
			title: "",
			caption: "",
		},
		onSubmit: (values) => {
			var formdata = new FormData();
			formdata.append("pImages", postimg);
			formdata.append("title", values.title);
			formdata.append("caption", values.caption);
			formdata.append("userid", localStorage.userid);

			// console.log("values in creat post", localStorage.userid);

			axios({
				url: "http://travellogserver-production.up.railway.app/post/addpost",
				method: "post",
				data: formdata,
				headers: {
					"content-type": "multipart/form-data",
				},
			}).then(
				(result) => {
					console.log("resilt in add post fe", result.data.message);
					navigate("/");
					alert(result.data.message);
				},
				(err) => {
					console.log("error in add post fe", err);
				}
			);
		},
	});

	return (
		<div class="container ">
			<div class="row">
				<div>
					<h1>Create post</h1>

					<form
						onSubmit={formik.handleSubmit}
						enctype="multipart/form-data"
						method="post"
					>
						<div class="form-group ">
							<div class="picture-container">
								<div class="picture_post">
									<img
										src="https://lh3.googleusercontent.com/LfmMVU71g-HKXTCP_QWlDOemmWg4Dn1rJjxeEsZKMNaQprgunDTtEuzmcwUBgupKQVTuP0vczT9bH32ywaF7h68mF-osUSBAeM6MxyhvJhG6HKZMTYjgEv3WkWCfLB7czfODidNQPdja99HMb4qhCY1uFS8X0OQOVGeuhdHy8ln7eyr-6MnkCcy64wl6S_S6ep9j7aJIIopZ9wxk7Iqm-gFjmBtg6KJVkBD0IA6BnS-XlIVpbqL5LYi62elCrbDgiaD6Oe8uluucbYeL1i9kgr4c1b_NBSNe6zFwj7vrju4Zdbax-GPHmiuirf2h86eKdRl7A5h8PXGrCDNIYMID-J7_KuHKqaM-I7W5yI00QDpG9x5q5xOQMgCy1bbu3St1paqt9KHrvNS_SCx-QJgBTOIWW6T0DHVlvV_9YF5UZpN7aV5a79xvN1Gdrc7spvSs82v6gta8AJHCgzNSWQw5QUR8EN_-cTPF6S-vifLa2KtRdRAV7q-CQvhMrbBCaEYY73bQcPZFd9XE7HIbHXwXYA=s200-no"
										class="picture-src"
										id="wizardPicturePreview"
										title=""
									/>
									<input
										type="file"
										name="pImages"
										onChange={(e) => {
											setPrevFile(URL.createObjectURL(e.target.files[0]));
											setFile(e.target.files[0]);
										}}
									/>

									<img
										src={previewImg}
										style={{ height: "100%", width: "100%" }}
									/>
								</div>
								<h6 class="">Add Your Travel Pic</h6>
							</div>
						</div>

						<div class="form-group">
							<label for="title">Title</label>
							<input
								type="text"
								class="form-control"
								id="title"
								name="title"
								onChange={formik.handleChange}
								value={formik.values.title}
							/>
						</div>

						<div class="form-group">
							<label for="description">Caption</label>
							<textarea
								rows="5"
								class="form-control"
								name="caption"
								id="caption"
								style={{ whiteSpace: "pre-wrap" }}
								onChange={formik.handleChange}
								value={formik.values.caption}
							></textarea>
						</div>

						<div class="form-group mt-2 mb-auto">
							<button type="submit" class="btn btn-primary" value="create">
								Create
							</button>
							<button class="btn btn-default">Cancel</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
