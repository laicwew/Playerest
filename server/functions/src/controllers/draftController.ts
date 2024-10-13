import { Request, Response } from "express";
import {
  storeDraft,
  publishDraft,
  getDraftsByUserName,
} from "../services/dynamoService";

export const storeDraftHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { imageUrl, author, title, content, rate } = req.body;

  if (!author || !title || !content) {
    res.status(400).json({ error: "author, title, and content are required" });
  }

  try {
    const result = await storeDraft({ imageUrl, author, title, content, rate });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error storing draft" });
  }
};

export const publishDraftHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { draftId } = req.body;

  if (!draftId) {
    res.status(400).json({ error: "draftId is required" });
  }

  try {
    const result = await publishDraft(draftId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error publishing draft" });
  }
};

export const getDraftsByUserNameHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ error: "UserId is required" });
  }

  try {
    const drafts = await getDraftsByUserName(userId);
    res.status(200).json(drafts);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error fetching drafts for userId ${userId}` });
  }
};
