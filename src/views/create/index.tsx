import { useFormik } from "formik";
import { useState, useRef } from "react";
import "../../scss/styles.scss";
import defaultImage from "../../assets/defaultImage.png";
import FormField from "../components/FormField";

export function Create() {
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
      reviewText: "",
      reviewGame: "",
      reviewPic: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="create-form">
      <div className="create-form__image-upload">
        <img alt="create-img" src={imgURL} className="create-form__image" />
        {imgURL === defaultImage ? (
          <button
            className="create-form__upload-button"
            onClick={handleImageUpload}
          >
            <span className="fas fa-upload me-2" /> Upload
          </button>
        ) : (
          <button
            className="create-form__upload-button"
            onClick={handleImageDelete}
          >
            <span className="fas fa-trash me-2" /> Delete
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
          <FormField
            className="create-form__fields--1"
            id="reviewGame"
            name="reviewGame"
            type="input"
            label="Game"
            value={formik.values.reviewGame}
            onChange={formik.handleChange}
            placeholder="Game Name"
          />
          <FormField
            className="create-form__fields--2"
            id="reviewTitle"
            name="reviewTitle"
            type="input"
            label="Title"
            value={formik.values.reviewTitle}
            onChange={formik.handleChange}
            placeholder="Review Title"
          />
          <FormField
            className="create-form__fields--3"
            id="reviewText"
            name="reviewText"
            type="textarea"
            label="Review"
            value={formik.values.reviewText}
            onChange={formik.handleChange}
            placeholder="Review"
          />
        </div>
        <button type="submit" className="create-form__submit-btn">
          Publish
        </button>
        <button type="submit" className="create-form__save-btn">
          Save
        </button>
      </form>
    </div>
  );
}
