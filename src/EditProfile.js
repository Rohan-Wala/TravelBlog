import { FitScreen } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProfile() {
	var params = useParams();
	var userid = params.userid;
	var [userData, setUserData] = useState({});
	var [file, setFile] = useState();
	var [Imgsrc, setImgSrc] = useState("");
	var [isTaken, setIsTaken] = useState(false);
	var [prevUserId, setPrevUserId] = useState("");
	var [imageUpdateButton, setImageUpdateButton] = useState(true);
	var incData;

	useEffect(() => {
		// console.log("UseEffect")
		axios({
			url: "http://localhost:5001/users/getuser/" + userid,
			method: "get",
			headers: { authorization: localStorage.token },
		}).then(
			(result) => {
				// console.log("Data fetched", result.data)
				incData = result.data.data[0];
				// console.log("Inc", incData)
				setUserData({
					name: incData.name,
					bio: incData.bio,
					image: incData.image,
					userid: incData.userid,
				});
				setImgSrc(incData.image);
				setPrevUserId(incData.userid);
			},
			(error) => {
				// console.log(error)
			}
		);
	}, []);

	const handleNameChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleBioChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleUserIdChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
		axios({
			url: "http://localhost:5001/users/checkUserName",
			method: "post",
			data: { userName: e.target.value },
			headers: { authorization: localStorage.token },
		}).then(
			(result) => {
				if (
					result.data.message === "Username unavailable" &&
					!(e.target.value === prevUserId)
				) {
					setIsTaken(true);
				}
				if (result.data.message === "Username available") {
					setIsTaken(false);
				}
			},
			(err) => {
				console.log(err);
			}
		);
	};

	const handleImageChange = (e) => {
		var inputImg = e.target.files[0];
		console.log(e.target.files[0]);
		if (inputImg.type.startsWith("image/")) {
			setImageUpdateButton(false);
			setImgSrc(URL.createObjectURL(e.target.files[0]));
			setFile(e.target.files[0]);
		} else {
			setImageUpdateButton(true);
			return toast.error("Please select a valid image", {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 2000,
			});
		}
	};

	function updateProfilePicture() {
		const imageData = new FormData();
		imageData.append("displaypic", file);

		axios({
			url: "http://localhost:5001/users/updateDisplayPicture/" + userid,
			method: "patch",
			data: imageData,
			headers: {
				"content-type": "multipart/form-data",
				authorization: localStorage.token,
			},
		}).then(
			(result) => {
				setImageUpdateButton(true);
				return toast.success("Profile Picture updated successfully", {
					position: toast.POSITION.TOP_CENTER,
				});
			},
			(error) => {
				return toast.error("Error in Updating Profile Picture", {
					position: toast.POSITION.TOP_CENTER,
				});
			}
		);
	}

	function updateProfile() {
		const data = {
			name: userData.name,
			bio: userData.bio,
			userid: userData.userid,
		};
		if (isTaken) {
			return toast.warn("Please selete a valid UserName", {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 2000,
			});
		} else if (data.name != "" && data.userid != "") {
			axios({
				url: "http://localhost:5001/users/updateProfile/" + userid,
				method: "patch",
				data: data,
				headers: {
					"content-type": "application/json",
					authorization: localStorage.token,
				},
			}).then(
				(result) => {
					return toast.success("Profile updated successfully", {
						position: toast.POSITION.TOP_CENTER,
						autoClose: 2000,
					});
				},
				(error) => {
					return toast.error("Error in Updating Profile", {
						position: toast.POSITION.TOP_CENTER,
						autoClose: 2000,
					});
				}
			);
		} else {
			return toast.warn("Name or Username fields cannot be empty", {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 2000,
			});
		}
	}

	return (
		<div class="container bg-dark mt-5">
			<div class="row p-2">
				<div class="col-md-4 mt-3 border-right">
					<div class="picture-container">
						<div class="mt-5 picture">
							<img
								src={Imgsrc}
								class="picture-src"
								id="wizardPicturePreview"
								title=""
								style={{ width: "100%", height: "100%" }}
							/>
							<input
								type="file"
								accept="image/*"
								name="displaypic"
								onChange={handleImageChange}
							/>
							<img src={Imgsrc} style={{ height: "100%", width: "100%" }} />
						</div>
					</div>
					<div class="mt-3 text-center">
						<button
							onClick={updateProfilePicture}
							disabled={imageUpdateButton}
							class="ms-1 btn btn-primary profile-button"
							type="button"
						>
							Update Picture
						</button>
					</div>
				</div>
				<div class="col-md-8">
					<div class="p-3 py-5">
						<div className="row">
							<label className="row ms-1 text-light" for="name">
								Name
							</label>
							<div class="col-md-12">
								<input
									type="text"
									class="form-control text-dark bg-light border-dark"
									id="name"
									autoComplete="off"
									name="name"
									placeholder="Name"
									onInput={handleNameChange}
									defaultValue={userData.name}
								/>
							</div>
						</div>
						<div class="row mt-3 text-dark">
							<label className="row ms-1 text-light" for="userid">
								Username
							</label>
							<div class="col-md-12">
								<input
									type="text"
									class="form-control text-dark bg-light border-dark"
									id="userid"
									name="userid"
									autoComplete="off"
									placeholder="Username"
									onInput={handleUserIdChange}
									defaultValue={userData.userid}
								/>
							</div>
							<span className="text-danger">
								{isTaken && "Username not available"}
							</span>
						</div>
						<div class="row mt-3">
							<label className="mb-1 ms-1 text-light" for="bio">
								Bio
							</label>
							<div class="col-md-12">
								<textarea
									type="textarea"
									class="form-control text-dark bg-light border-dark"
									style={{ resize: "none", height: "25vh" }}
									id="bio"
									name="bio"
									placeholder="Bio"
									onChange={handleBioChange}
									defaultValue={userData.bio}
								/>
							</div>
						</div>
						<div className="d-flex ms-5 mt-3 text-center">
							<Link
								to={"/profile/" + localStorage.userid}
								className="ms-4 text-decoration-none"
							>
								<button className="btn btn-primary rounded">Back</button>
							</Link>
							<div class="text-center">
								<button
									onClick={updateProfile}
									class="ms-3 btn btn-primary profile-button"
									type="button"
								>
									Update Profile
								</button>
							</div>
						</div>
						<ToastContainer pauseOnFocusLoss={false} />
					</div>
				</div>
			</div>
		</div>
	);
}
