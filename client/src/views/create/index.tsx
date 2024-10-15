import { useFormik } from "formik";
import { useState, useRef, useEffect, useContext } from "react";
import "../../scss/styles.scss";
import defaultImage from "../../assets/defaultImage.png";
import FormField from "../components/FormField";
import SavedDraftSidebar from "./components/SavedDraftSidebar";
import { Rating } from "react-simple-star-rating";
import { Draft } from "../../model/review";
import { AuthContext } from "../../helpers/AuthContext";
import { createPresenter } from "../../presenter/CreatePresenter";
import { uploadImageFile } from "../../helpers/hooks/api/api";

export function Create() {
  const { isAuthenticated, userName } = useContext(AuthContext);
  const [imgURL, setImgURL] = useState(defaultImage);
  const fileUploadedRef = useRef<HTMLInputElement | null>(null);
  const [rating, setRating] = useState(0);

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
      formik.setFieldValue("reviewPic", uploadedFile);
    }
  };

  const handleRating = (rate: number) => {
    setRating(rate);
    formik.setFieldValue("reviewRate", rate);
  };

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    formik.handleChange(event);
  };

  const formik = useFormik({
    initialValues: {
      reviewRate: 0,
      reviewTitle: "",
      reviewText: "",
      reviewPic: null,
    },
    onSubmit: async (values) => {
      let imageUrl;
      if (values.reviewPic) {
        imageUrl = await uploadImageFile(values.reviewPic);
        setImgURL(imageUrl);
      }
      if (imageUrl !== null && isAuthenticated) {
        createPresenter.submitReview(
          values,
          rating,
          isAuthenticated,
          userName,
          setImgURL
        );
        formik.resetForm();
      }
    },
  });

  /* SAVED DRAFT LOGIC */
  const [isOpen, setIsOpen] = useState(false);
  // Manage drafts in a state
  const [draftList, setDraftList] = useState<Draft[]>([]);
  const handleDraftListOpen = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const storedDrafts = localStorage.getItem("drafts");
    if (storedDrafts) {
      setDraftList(JSON.parse(storedDrafts));
    }
  }, []);

  const handleSaveDraft = async (draft: Draft) => {
    // await saveDraft(draft);
    console.log(draft);
  };

  return (
    <div className="create-page">
      <SavedDraftSidebar
        isOpen={isOpen}
        setIsOpen={handleDraftListOpen}
        draftList={draftList}
      />

      <div className="create-form">
        <div className="create-form__image-upload">
          <div className="create-form__image-container">
            <img
              alt="create-img"
              src={imgURL}
              className="create-form__image-container__img"
            />
          </div>

          {imgURL === defaultImage ? (
            <button
              className="create-form__btn--upload"
              onClick={handleImageUpload}
            >
              <span className="fas fa-upload me-2" /> Upload
            </button>
          ) : (
            <button
              className="create-form__btn--delete"
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
            hidden
          />

          <div className="create-form__fields">
            <div className="score-container">
              <label className="score-label">Score</label>
              <Rating onClick={handleRating} size={25} />
            </div>
            <FormField
              className="create-form__fields--title"
              id="reviewTitle"
              name="reviewTitle"
              type="input"
              label="Title"
              value={formik.values.reviewTitle}
              onChange={handleFieldChange}
              placeholder="Review Title"
            />
            <FormField
              className="create-form__fields--text"
              id="reviewText"
              name="reviewText"
              type="textarea"
              label="Review"
              value={formik.values.reviewText}
              onChange={handleFieldChange}
              placeholder="Review"
            />
          </div>

          <button type="submit" className="create-form__btn--submit">
            Publish
          </button>
          <button
            type="reset"
            className="create-form__btn--submit"
            style={{ marginRight: "1rem" }}
            onClick={() =>
              handleSaveDraft({
                id: draftList.length + 1,
                imageUrl: /* formik.values.reviewPic || */ defaultImage,
                author: "CurrentUser",
                title: formik.values.reviewTitle,
                content: formik.values.reviewText,
              })
            }
          >
            Save As Draft
          </button>
        </form>
      </div>
    </div>
  );
}
