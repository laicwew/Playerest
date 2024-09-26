import { useFormik } from "formik";
import { useState, useRef } from "react";
import "../../../styles/styles.scss";

const CreateFrom = () => {
  const [imgURL, setImgURL] = useState("src/assets/defaultImage.png");
  const fileUploadedRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.MouseEvent) => {
    event.preventDefault();
    if (fileUploadedRef.current) {
      fileUploadedRef.current.click();
    }
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
    <div className="create-form">
      <div className="create-form__image-upload">
        <button
          className="create-form__upload-button"
          onClick={handleImageUpload}
        >
          <img src={imgURL} className="create-form__image" />
        </button>
      </div>
      <div className="create-form__fields">
        <form onSubmit={formik.handleSubmit} className="create-form__form">
          <input
            id="reviewPic"
            name="reviewPic"
            type="file"
            ref={fileUploadedRef}
            onChange={uploadImageDisplay}
            value={formik.values.reviewPic}
            hidden
          />
          <label htmlFor="reviewGame">Game</label>
          <input
            id="reviewGame"
            name="reviewGame"
            type="text"
            placeholder="Game Name"
            onChange={formik.handleChange}
            value={formik.values.reviewGame}
          />
          <label htmlFor="reviewTilte">Title</label>
          <input
            id="reviewTitle"
            name="reviewTitle"
            type="text"
            placeholder="Game Review Title"
            onChange={formik.handleChange}
            value={formik.values.reviewTitle}
          />
          <label htmlFor="reviewMessage">Review</label>
          <textarea
            id="reviewMessage"
            name="reviewMessage"
            placeholder="Review"
            onChange={formik.handleChange}
            value={formik.values.reviewMessage}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateFrom;
