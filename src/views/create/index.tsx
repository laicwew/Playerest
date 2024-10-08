import { useFormik } from "formik";
import { useState, useRef, useEffect } from "react";
import "../../scss/styles.scss";
import defaultImage from "../../assets/defaultImage.png";
import FormField from "../components/FormField";
import SavedDraftSidebar from "./components/SavedDraftSidebar";

export function Create() {
  const [draftList, setDraftList] = useState<
    { id: number; title: string; imgURL?: string; createdDate: string }[]
  >([]);
  const [isFormModified, setIsFormModified] = useState(false);

  const [imgURL, setImgURL] = useState(defaultImage);
  const fileUploadedRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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
      const submissionValues = {
        ...values,
        reviewPic: imgURL === defaultImage ? "" : imgURL, // If imgURL is not default, include it
      };
      alert(JSON.stringify(submissionValues, null, 2));
    },
  });

  useEffect(() => {
    if (
      formik.values.reviewTitle ||
      formik.values.reviewText ||
      formik.values.reviewGame ||
      imgURL !== defaultImage
    ) {
      const newDraft = {
        id: draftList.length + 1,
        title: formik.values.reviewTitle || "Untitled Draft",
        imgURL: imgURL === defaultImage ? undefined : imgURL,
        createdDate: new Date().toISOString().split("T")[0],
      };

      setDraftList((prevDrafts) => {
        const draftIndex = prevDrafts.findIndex(
          (draft) => draft.title === newDraft.title
        );
        if (draftIndex >= 0) {
          const updatedDrafts = [...prevDrafts];
          updatedDrafts[draftIndex] = newDraft;
          return updatedDrafts;
        }
        return [...prevDrafts, newDraft];
      });
    }
  }, [formik.values, imgURL, draftList]);

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    formik.handleChange(event);
    setIsFormModified(true);
  };

  const loadDraft = (draft: {
    id: number;
    title?: string;
    imgURL?: string;
    createdDate?: string;
  }) => {
    formik.setValues({
      reviewTitle: draft.title || "",
      reviewText: "",
      reviewGame: "",
      reviewPic: draft.imgURL || "",
    });
    setImgURL(draft.imgURL || defaultImage);
    setIsFormModified(true);
    setIsOpen(false);
  };

  return (
    <div className="create-page">
      <SavedDraftSidebar
        isOpen={isOpen}
        setIsOpen={handleDraftListOpen}
        draftList={draftList}
        loadDraft={loadDraft}
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
            <FormField
              className="create-form__fields--game"
              id="reviewGame"
              name="reviewGame"
              type="input"
              label="Game"
              value={formik.values.reviewGame}
              onChange={handleFieldChange}
              placeholder="Game Name"
            />
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
        </form>
      </div>
    </div>
  );
}
