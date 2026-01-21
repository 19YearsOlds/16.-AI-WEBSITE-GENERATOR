const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const admin = require("firebase-admin");
const serviceAccount = require("./ai-website-generator-26623-firebase-adminsdk-fbsvc-56fe52be57.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-database.firebaseio.com"
});

const db = admin.firestore();

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Use environment variable
}));

app.post("/generate", async (req, res) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Generate a full HTML, CSS, and JavaScript website for: ${req.body.prompt}`
        },
      ],
      max_tokens: 1500,
    });

    res.json({ html: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error generating website:", error.message);
    res.status(500).send("Error generating website");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
