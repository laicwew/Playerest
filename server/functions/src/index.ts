/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
import cors from "cors";
import app from "./app";


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();

dotenv.config();

const corsMiddleware = cors({origin: [
  "http://localhost:5173",
  "https://main.d1zjx5qj46wizn.amplifyapp.com",
]});

export const api = onRequest((req, res) => {
  corsMiddleware(req, res, () => {
    app(req, res);
  }); // repost request to app
});
