import {Request, Response} from "express";
import {
  getAllUsers,
  getReviewById,
  getUserSavedReviews,
  saveReview,
  unsaveReview,
} from "../services/dynamoService";
import dotenv from "dotenv";
import { loginAuth, register, registerConfirm, resendConfirmationCode } from "../services/cognitoService";

dotenv.config(); // This loads the variables from .env into process.env

export const getAllUsersHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({error: "Unable to retrieve users"});
  }
};

export const saveReviewHandler = async (req: Request, res: Response) => {
  const { username, reviewId } = req.body;
  try {
    await saveReview(username, reviewId);
    res.status(200).json({ message: "Save review successfully"});
  } catch (error) {
    res.status(500).json({error: "Unable to save this review."});
  }
};

export const unsaveReviewHandler = async (req: Request, res: Response) => {
  const {username, reviewId} = req.body;
  try {
    const result = await unsaveReview(username, reviewId);
    res.status(200).json(result.message);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Unable to unsave this review."});
  }
};

export const getUserSavedReviewsHandler = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    const reviewIds = await getUserSavedReviews(username);
    const reviews = await Promise.all(reviewIds.map((id: number) => getReviewById(id)));
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({error: "Unable to get user saved reviews."});
  }
};

export const registerHandler = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
      res.status(400).json({ message: "Username, email, and password are required." });
  }

  try {
      const result = await register(username, email, password);
      res.status(201).json({ message: "User registered successfully", result });
  } catch (error) {
      res.status(500).json({ message: "An error occurred during registration." });
  }
};

export const registerConfirmHandler = async (req: Request, res: Response) => {
  const { username, code } = req.body;

  // Validate input
  if (!username || !code) {
    res.status(400).json({ message: "Username and confirmation code are required." });
  }

  try {
    // Call the registerConfirm function
    const result = await registerConfirm({ username, code });
    res.status(200).json({ message: "User confirmed successfully", result });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during user confirmation." });
  }
};

export const resendConfirmationCodeHandler = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.body;

  if (!username) {
    res.status(400).json({ error: "Username is required." });
    return;
  }

  try {
    await resendConfirmationCode({ username });
    res.status(200).json({ message: "Confirmation code resent successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error resending confirmation code." });
  }
};

export const loginAuthHandler = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required." });
  }

  try {
    // Call the loginAuth function
    const result = await loginAuth({ username, password });
    res.status(200).json({ message: "Login successful", result });
  } catch (error) {
    // Handle different error types if necessary
    console.error("Login failed:", error);
    res.status(401).json({ message: "Invalid username or password." });
  }
};
