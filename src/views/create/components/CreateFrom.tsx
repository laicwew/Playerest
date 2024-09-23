import { useFormik } from "formik";
import { useState, useRef } from "react";

const CreateFrom = () => {
  const [imgURL, setImgURL] = useState("src/assets/placeholder/1.jpeg");
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
    <div style={{ display: "flex", flexDirection: "column", width: "30rem" }}>
      {" "}
      <img src={imgURL} style={{ width: "20rem", height: "auto" }} />
      <button
        className="bg-success border-0 text-white"
        onClick={handleImageUpload}
      >
        {" "}
        Upload Image{" "}
      </button>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "30rem" }}
      >
        <label htmlFor="reviewPic">Picture</label>
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
  );
};

export default CreateFrom;
