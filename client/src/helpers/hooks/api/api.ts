import axios from "axios";
import { Review, Comment, Draft } from "../../../model/review";

export const ROOT_URL = "https://api-ttvkb2gtia-uc.a.run.app";

export const userSignUp = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });
    if (!response.ok) {
      throw new Error("Failed to sign up");
    }
    return response;
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export const userSignIn = async (username: string, password: string) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error("Failed to sign in");
    }
    return response;
  } catch (error) {
    console.error("Error Logining:", error);
  }
};

export const getRecommendReviews = async () => {
  try {
    const response = await fetch(`${ROOT_URL}/api/reviews`);
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const reviews = (await response.json()) as Review[];
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

export const getReviewComments = async (reviewId: number) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/comments/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviewId }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const comments = (await response.json()) as Comment[];
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

export const getReviewDetail = async (reviewId: string) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/reviews/${reviewId}`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const review = (await response.json()) as Review;
    return review;
  } catch (error) {
    console.error("Error fetching review detail:", error);
  }
};

export const searchReviews = async (query: string) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/reviews/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const reviews = (await response.json()) as Review[];
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

export const createReview = async (Review: Review) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/reviews/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Review),
    });
    if (!response.ok) {
      throw new Error("Failed to create review");
    }
    const responseData = await response.json();
    console.log("Successfully added review:", responseData);
  } catch (error) {
    console.error("Error creating review:", error);
  }
};

export const uploadImageFile = async (selectedFile: File) => {
  try {
    // Perform the POST request
    const formData = new FormData();
    formData.append("image", selectedFile);
    const response = await axios.post(
      `${ROOT_URL}/api/reviews/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to upload image");
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export const getReviewByAuthor = async (author: string) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/reviews/by-author`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author }),
    });

    if (response.status === 200) {
      // Assuming the response contains a list of reviews
      console.log("Reviews retrieved successfully:");
    } else {
      throw new Error("Failed to retrieve reviews");
    }
    const responseData = (await response.json()) as Review[];
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const saveDraft = async (draft: Draft) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/drafts/store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(draft),
    });

    if (!response.ok) {
      throw new Error("Failed to save draft");
    }

    const responseData = await response.json();
    console.log("Successfully saved draft:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error saving draft:", error);
  }
};

export const publishDraft = async (draftId: number) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/drafts/publish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ draftId }),
    });

    if (!response.ok) {
      throw new Error("Failed to publish draft");
    }

    const responseData = await response.json();
    console.log("Successfully published draft:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error publishing draft:", error);
  }
};

export const getDraftsByUserId = async (userId: string) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/drafts/user/${userId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch drafts");
    }

    const drafts = (await response.json()) as Review[];
    return drafts;
  } catch (error) {
    console.error("Error fetching drafts:", error);
  }
};
