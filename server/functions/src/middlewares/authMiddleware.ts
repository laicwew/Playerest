import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import * as jose from "node-jose";

// Define the structure of a JSON Web Key (JWK)
interface JWK {
    kty: string; // Key type, e.g., "RSA"
    kid: string; // Key ID
    use?: string; // Intended use, e.g., "sig" for signature
    alg?: string; // Algorithm, e.g., "RS256"
    n: string; // RSA public key modulus
    e: string; // RSA public key exponent
    x5c?: string[]; // X.509 certificate chain
    x5t?: string; // X.509 certificate thumbprint
  }

const jwksUrl = "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_NyaaPXU5o/.well-known/jwks.json";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.sendStatus(401).json({ error: "No token provided." });
    throw new Error("Missing authorization header: access token required.");
  }
  const token = authHeader.split(" ")[1];

  try {
    const response = await axios.get(jwksUrl);
    const jwks = response.data.keys;

    const decoded = jwt.decode(token, { complete: true });
    const kid = decoded?.header.kid;

    if (!kid) {
        res.sendStatus(401).json({ error: "Token decoding failed." });
        throw new Error("Token decoding failed.");
    }

    const signingKey = jwks.find((key: JWK) => key.kid === kid);
    if (!signingKey) {
      res.status(401).json({ error: "Public key not found." });
    }
    // Construct the public key using 'n' and 'e'
    const jwk = {
      kty: signingKey.kty,
      kid: signingKey.kid,
      n: signingKey.n,
      e: signingKey.e,
    };

    // Create the public key using node-jose
    const keyStore = jose.JWK.createKeyStore();
    const key = await keyStore.add(jwk, "json");
    const publicKey = key.toPEM();

    jwt.verify(token, publicKey);
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Invalid token." });
  }
};
