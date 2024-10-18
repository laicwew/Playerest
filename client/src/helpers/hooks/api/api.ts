import axios from "axios";
import { Review, Comment, Draft } from "../../../model/review";

export const ROOT_URL = "https://api-ttvkb2gtia-uc.a.run.app";
// export const ROOT_URL = "http://localhost:3000";
// export const ROOT_URL = "http://backend:3000";

export const userSignUp = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/users/register`, {
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

export const userSignUpVerify = async (username: string, code: string) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/users/registerconfirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, code }),
    });
    if (!response.ok) {
      throw new Error("Failed to sign up");
    }
    return response;
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export const sendVerifyCode = async (username: string) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/users/resendconfirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
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
    const response = await fetch(`${ROOT_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error("Failed to sign in");
    }

    const data = await response.json();
    if (data?.result?.AuthenticationResult) {
      return data;
    } else {
      throw new Error("AuthenticationResult not found");
    }
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

export const getReviewDetail = async (id: string) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/reviews/detail/${id}`, {
      method: "GET",
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

export const createReview = async (review: Review) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/reviews/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
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

export const deleteReview = async (reviewId: number) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete review");
    }
    const responseData = await response.json();
    console.log("Successfully deleted review:", responseData);
  } catch (error) {
    console.error("Error deleting review:", error);
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
    console.log("Image upload success");
    return response.data.imageUrl;
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

    if (response.status !== 200) {
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

export const getReviewsByPagination = async (
  limit: number,
  lastEvaluatedKeyParam?: number
) => {
  try {
    let response;
    if (lastEvaluatedKeyParam) {
      response = await fetch(
        `${ROOT_URL}/api/reviews/paginated?limit=${limit}&lastEvaluatedKey=%7B%22id%22%3A${lastEvaluatedKeyParam}%7D`,
        {
          method: "GET",
        }
      );
    } else {
      response = await fetch(
        `${ROOT_URL}/api/reviews/paginated?limit=${limit}`,
        {
          method: "GET",
        }
      );
    }
    if (!response.ok) {
      throw new Error("Failed to fetch Review by limit");
    }
    const jsonData = await response.json();
    const reviews = jsonData["reviews"] as Review[];
    if (jsonData["lastEvaluatedKey"]) {
      const newLastEvaluatedKey = jsonData["lastEvaluatedKey"].id as number;
      return { reviews, newLastEvaluatedKey };
    }

    return { reviews };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { reviews: [], lastEvaluatedKey: undefined };
  }
};

export const addComment = async (comment: Comment) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/comments/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    if (!response.ok) {
      throw new Error("Failed to add comment");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error creating comment:", error);
  }
};

export const saveReviewById = async (
  access_token: string,
  username: string,
  reviewId: number
) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/users/save`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, reviewId }),
    });
    if (!response.ok) {
      throw new Error("Failed to save review");
    }
  } catch (error) {
    console.error("Error save review:", error);
  }
};

export const unSaveReviewById = async (
  access_token: string,
  username: string,
  reviewId: number
) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/users/unsave`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, reviewId }),
    });
    if (!response.ok) {
      throw new Error("Failed to save review");
    }
  } catch (error) {
    console.error("Error save review:", error);
  }
};

export const getUserSavedReviews = async (
  access_token: string,
  username: string
) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/users/saved`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user saved reviews");
    }
    const responseData = await response.json();
    return responseData as Review[];
  } catch (error) {
    console.error("Error fetching user saved reviews:", error);
  }
};
