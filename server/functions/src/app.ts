import express from "express";
import userRoutes from "./routes/userRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import commentRoutes from "./routes/commentRoutes";
import draftRoutes from "./routes/draftRoutes";
import cors from "cors";

const app = express();
app.use(cors());

app.use(cors());

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/drafts", draftRoutes);

export default app;
