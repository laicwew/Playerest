import app from "./app";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Example endpoint
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
