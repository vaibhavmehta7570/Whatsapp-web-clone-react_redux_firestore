import React from "react";
import cameraIcon from "../assets/images/camera-solid.svg";

function ImageUploader({ textContent, changePic, imageSrc }) {
  return (
    <div className="profile-pic-container">
      <div className="pic-container">
        <div className="fake-hover-div rounded-circle flex-column align-items-center justify-content-center text-center">
          <img src={cameraIcon} alt="camera icon" width="25px" />
          <p className="text-white w-50 mt-3">{textContent}</p>
        </div>
        <input
          type="file"
          accept="image/gif,image/jpeg,image/jpg,image/png"
          className="select-file pointer"
          onChange={(e) => {
            changePic(e);
          }}
        ></input>
        <img
          src={imageSrc}
          className="profile-image rounded-circle"
          height="100%"
          width="100%"
          alt="profile pic"
        />
      </div>
    </div>
  );
}

export default ImageUploader;
