import { useFormik } from "formik";
import { useState, useRef, useEffect } from "react";
import "../../scss/styles.scss";
import defaultImage from "../../assets/defaultImage.png";
import FormField from "../components/FormField";
import SavedDraftSidebar from "./components/SavedDraftSidebar";
import { Rating } from "react-simple-star-rating";
import { createReview, uploadImageFile } from "../../helpers/hooks/api/api";
import { Review, Draft } from "../../model/review";

export function Create() {
  const [draftList, setDraftList] = useState<
    { id: number; title: string; imgURL?: string; createdDate: string }[]
  >([]);
  const [isFormModified, setIsFormModified] = useState(false);
  const [currentDraftId, setCurrentDraftId] = useState<number | null>(null);

  const [imgURL, setImgURL] = useState(defaultImage);
  const fileUploadedRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const generateUniqueId = () => Math.floor(Math.random() * 1000000);

  const handleDraftListOpen = () => {
    setIsOpen(!isOpen);
  };

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

  const formik = useFormik({
    initialValues: {
      reviewRate: 0,
      reviewTitle: "",
      reviewText: "",
      reviewGame: "",
      reviewPic: null,
    },
    onSubmit: async (values) => {
      let imageUrl = defaultImage;

      if (values.reviewPic) {
        // Upload the file and get the image URL
        imageUrl = await uploadImageFile(values.reviewPic);
      }

      console.log(imageUrl)

      const review: Review = {
        content: values.reviewText,
        rate: rating * 2,
        imageUrl, // Use the uploaded image URL
        like: 0,
        author: "Current User", //TODO
        title: values.reviewTitle,
      };

      createReview(review)
        .then((review) => alert(review))
        .catch((error) => console.error("Error", error));
    },
  });

  useEffect(() => {
    if (
      (isFormModified && formik.values.reviewTitle) ||
      formik.values.reviewText ||
      formik.values.reviewGame ||
      imgURL !== defaultImage
    ) {
      const draftId = currentDraftId || generateUniqueId();
      const newDraft = {
        id: draftId,
        title: formik.values.reviewTitle,
        imgURL: imgURL === defaultImage ? defaultImage : imgURL,
        createdDate: new Date().toISOString().split("T")[0],
      };

      setDraftList((prevDrafts) => {
        const draftIndex = prevDrafts.findIndex(
          (draft) => draft.id === draftId
        );
        if (draftIndex >= 0) {
          const updatedDrafts = [...prevDrafts];
          updatedDrafts[draftIndex] = newDraft;
          return updatedDrafts;
        }

        return [...prevDrafts, newDraft];
      });

      setCurrentDraftId(draftId);
    }
  }, [formik.values, imgURL, currentDraftId, isFormModified]);

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    formik.handleChange(event);
    setIsFormModified(true);
  };

  const handleSaveDraft = async (draft: Draft) => {
    console.log("Draft", draft);
    // await saveDraft(draft);
  };

  const loadDraft = (draft: {
    id: number;
    title?: string;
    imgURL?: string;
    createdDate?: string;
  }) => {
    formik.setValues({
      reviewRate: 0,
      reviewTitle: draft.title || "",
      reviewText: "",
      reviewGame: "",
      reviewPic: null,
    });
    setImgURL(draft.imgURL || "");
    setIsFormModified(true);
  };

  const createNew = () => {
    formik.resetForm();
    setImgURL(defaultImage);
    setCurrentDraftId(null);
    setIsFormModified(false);
  };

  const [rating, setRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
    formik.setFieldValue("reviewRate", rate);
  };

  return (
    <div className="create-page">
      <SavedDraftSidebar
        isOpen={isOpen}
        setIsOpen={handleDraftListOpen}
        draftList={draftList}
        loadDraft={loadDraft}
        createNew={createNew}
      />

      <div className="card-container create-form">
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
              <Rating onClick={handleRating} />
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
            type="submit"
            className="create-form__btn--submit"
            style={{ marginRight: "1rem" }}
            onClick={() =>
              handleSaveDraft({
                imageUrl: formik.values.reviewPic,
                author: formik.values.reviewTitle,
                title: formik.values.reviewGame,
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
