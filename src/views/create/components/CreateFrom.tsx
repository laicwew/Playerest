import { useFormik } from "formik";
import { useState, useRef } from "react";
import "../../../scss/styles.scss";
import defaultImage from "../../../assets/defaultImage.png";

const CreateFrom = () => {
  const [imgURL, setImgURL] = useState(defaultImage);
  const fileUploadedRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.MouseEvent) => {
    event.preventDefault();
    if (fileUploadedRef.current) {
      fileUploadedRef.current.click();
    }
  };

  const handleImageDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    setImgURL(defaultImage);
  };

  const uploadImageDisplay = () => {
    const uploadedFile = fileUploadedRef.current?.files?.[0];
    if (uploadedFile) {
      const cachedURL = URL.createObjectURL(uploadedFile);
      setImgURL(cachedURL);
    }
  };

  const formik = useFormik({
    initialValues: {
      reviewTitle: "",
      reviewMessage: "",
      reviewGame: "",
      reviewPic: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <div className="create-form">
        <div className="create-form__image-upload">
          <img src={imgURL} className="create-form__image" />
          {imgURL === defaultImage ? (
            <button
              className="create-form__upload-button"
              onClick={handleImageUpload}
            >
              <span className="fas fa-upload" />
              Upload
            </button>
          ) : (
            <button
              className="create-form__upload-button"
              onClick={handleImageDelete}
            >
              <span className="fas fa-trash" /> Delete
            </button>
          )}
        </div>

        <form onSubmit={formik.handleSubmit}>
          <input
            id="reviewPic"
            name="reviewPic"
            type="file"
            ref={fileUploadedRef}
            onChange={uploadImageDisplay}
            value={formik.values.reviewPic}
            hidden
          />
          <div className="create-form__fields">
            <div className="create-form__fields--1">
              <label
                htmlFor="reviewGame"
                className="create-form__fields--1-label"
              >
                Game
              </label>
              <input
                id="reviewGame"
                name="reviewGame"
                type="text"
                placeholder="Game Name"
                onChange={formik.handleChange}
                value={formik.values.reviewGame}
                className="create-form__fields--1-input"
              />
            </div>
            <div className="create-form__fields--2">
              <label
                htmlFor="reviewTilte"
                className="create-form__fields--2-label"
              >
                Title
              </label>
              <input
                id="reviewTitle"
                name="reviewTitle"
                type="text"
                placeholder="Game Review Title"
                onChange={formik.handleChange}
                value={formik.values.reviewTitle}
                className="create-form__fields--2-input"
              />
            </div>
            <div className="create-form__fields--3">
              <label
                htmlFor="reviewMessage"
                className="create-form__fields--3-label"
              >
                Review
              </label>
              <textarea
                id="reviewMessage"
                name="reviewMessage"
                placeholder="Review"
                onChange={formik.handleChange}
                value={formik.values.reviewMessage}
                className="create-form__fields--3-input"
              />
            </div>
          </div>
          <button type="submit" className="create-form__submit-btn">
            Publish
          </button>
          <button type="submit" className="create-form__save-btn">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateFrom;
