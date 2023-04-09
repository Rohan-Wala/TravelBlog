import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Createpost.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect } from "react";

export default function CreatePost() {
  var [postimg, setFile] = useState([]);
  var [previewImg, setPrevFile] = useState();
  var [previewImgs, setPrevFiles] = useState([]);
  var [buttontext, setButtonText] = useState("Single");
  var navigate = useNavigate();
  // var formdata = new FormData();
  // formdata.append("images", postimg);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  function singleAndMultiple() {
    if (buttontext == "Single") setButtonText("Multiple");
    else setButtonText("Single");
  }

  // for (let i = 0; i < files.length; i++) {
  // 	formData.append(files[i].name, files[i])
  //   }

  const formik = useFormik({
    initialValues: {
      title: "",
      caption: "",
      location: "",
    },
    onSubmit: (values) => {
      var formdata = new FormData();
      // formdata.append("pImages", postimg);
      for (let i = 0; i < postimg.length; i++) {
        formdata.append("pImages", postimg[i]);
      }
      formdata.append("title", values.title);
      formdata.append("caption", values.caption);
      formdata.append("location", values.location);
      formdata.append("userid", localStorage.userid);

      // console.log("values in creat post", localStorage.userid);

      axios({
        url: "https://travellogserver-production.up.railway.app/post/addpost",
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

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div class="container ">
      <div class="row mb-5">
        <div>
          <h1>Create post</h1>

          <form
            onSubmit={formik.handleSubmit}
            enctype="multipart/form-data"
            method="post"
          >
            <div class="form-group mb-3">
              <div class="picture-container">
                <div class="picture_post">
                  <img
                    src="https://lh3.googleusercontent.com/LfmMVU71g-HKXTCP_QWlDOemmWg4Dn1rJjxeEsZKMNaQprgunDTtEuzmcwUBgupKQVTuP0vczT9bH32ywaF7h68mF-osUSBAeM6MxyhvJhG6HKZMTYjgEv3WkWCfLB7czfODidNQPdja99HMb4qhCY1uFS8X0OQOVGeuhdHy8ln7eyr-6MnkCcy64wl6S_S6ep9j7aJIIopZ9wxk7Iqm-gFjmBtg6KJVkBD0IA6BnS-XlIVpbqL5LYi62elCrbDgiaD6Oe8uluucbYeL1i9kgr4c1b_NBSNe6zFwj7vrju4Zdbax-GPHmiuirf2h86eKdRl7A5h8PXGrCDNIYMID-J7_KuHKqaM-I7W5yI00QDpG9x5q5xOQMgCy1bbu3St1paqt9KHrvNS_SCx-QJgBTOIWW6T0DHVlvV_9YF5UZpN7aV5a79xvN1Gdrc7spvSs82v6gta8AJHCgzNSWQw5QUR8EN_-cTPF6S-vifLa2KtRdRAV7q-CQvhMrbBCaEYY73bQcPZFd9XE7HIbHXwXYA=s200-no"
                    class="picture-src"
                    id="wizardPicturePreview"
                    style={{ display: "block" }}
                    title=""
                  />
                  {(() => {
                    if (buttontext === "Single") {
                      return (
                        <img
                          src={previewImg}
                          style={{ height: "100%", width: "100%" }}
                        />
                      );
                    } else {
                      // coursal
                      return (
                        <div
                          id="carouselExampleControlsNoTouching"
                          class="carousel slide carousel-fade"
                          data-bs-touch="false"
                          data-bs-interval="false"
                        >
                          <div class="carousel-inner">
                            {previewImgs.map((each, index) => {
                              if (index == 0) {
                                return (
                                  <div class="carousel-item active">
                                    <img
                                      src={each}
                                      class="d-block w-100"
                                      style={{ height: "245PX" }}
                                      alt="..."
                                    />
                                  </div>
                                );
                              } else {
                                return (
                                  <div class="carousel-item">
                                    <img
                                      src={each}
                                      class="d-block w-100"
                                      style={{ height: "245PX" }}
                                      alt="..."
                                    />
                                  </div>
                                );
                              }
                            })}
                          </div>
                          <button
                            class="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleControlsNoTouching"
                            data-bs-slide="prev"
                          >
                            <span
                              class="carousel-control-prev-icon"
                              aria-hidden="true"
                              style={{ opacity: 0 }}
                            ></span>
                            <span class="visually-hidden">Previous</span>
                          </button>
                          <button
                            class="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleControlsNoTouching"
                            data-bs-slide="next"
                          >
                            <span
                              class="carousel-control-next-icon"
                              aria-hidden="true"
                              style={{ opacity: 0 }}
                            ></span>
                            <span class="visually-hidden">Next</span>
                          </button>
                        </div>
                      );
                    }
                  })()}
                  {/* //input file */}
                  {(() => {
                    if (buttontext === "Single") {
                      return (
                        <input
                          type="file"
                          name="pImages"
                          onChange={(e) => {
                            const newFiles = [];
                            setPrevFile(URL.createObjectURL(e.target.files[0]));
                            for (let i = 0; i < e.target.files.length; i++) {
                              newFiles.push(e.target.files[i]);
                            }
                            setFile(newFiles);
                          }}
                        />
                      );
                    } else {
                      return (
                        <input
                          type="file"
                          name="pImages"
                          multiple
                          onChange={(e) => {
                            const newFiles = [];
                            const prevFiles = [];
                            for (let i = 0; i < e.target.files.length; i++) {
                              prevFiles.push(
                                URL.createObjectURL(e.target.files[i])
                              );
                              newFiles.push(e.target.files[i]);
                            }
                            setFile(newFiles);
                            setPrevFiles(prevFiles);
                          }}
                        />
                      );
                    }
                  })()}
                </div>
              </div>
              <div class="d-flex justify-content-center mt-1">
                <div class="form-outline">
                  <label class="form-label" for="form1">
                    Share Youre Travel Pics
                  </label>
                </div>
                <button
                  type="button"
                  class="btn btn-primary btn-sm ms-2"
                  onClick={singleAndMultiple}
                >
                  {buttontext}
                </button>
              </div>
            </div>
            <div class="input-group flex-nowrap mb-3">
              <span class="input-group-text" id="addon-wrapping">
                Title
              </span>
              <input
                type="text"
                name="title"
                class="form-control"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              <button onClick={SpeechRecognition.startListening}>Record</button>
              <p>{transcript}</p>
            </div>

            <div class="input-group flex-nowrap mb-3">
              <span class="input-group-text" id="addon-wrapping">
                Location
              </span>
              <input
                type="text"
                name="location"
                class="form-control"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                placeholder="Sinhgad, Pune"
                onChange={formik.handleChange}
                value={formik.values.location}
              />
            </div>
            <div class="input-group flex-nowrap mb-3">
              <span class="input-group-text" id="addon-wrapping">
                Caption
              </span>
              <textarea
                type="text"
                name="caption"
                class="form-control"
                aria-label="caption"
                aria-describedby="addon-wrapping"
                style={{ whiteSpace: "pre-wrap", height: "100px" }}
                onChange={formik.handleChange}
                value={formik.values.caption}
              />
            </div>

            <div class="form-group mt-2 mb-auto">
              <button type="submit" class="btn btn-primary" value="create">
                Create
              </button>
              <Link to={"/"}>
                <button class="btn btn-default">Cancel</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
