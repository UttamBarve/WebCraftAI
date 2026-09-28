const generateResponse = require("../config/openRouter");
const { masterPrompt } = require("../constants/constants");
const User = require("../models/user");
const Website = require("../models/website");
const extractJson = require("../utils/extractJson");

const generateWebsite = async (req, res) => {
  try {
    console.log("1 - generateWebsite API Called");

    const { prompt } = req.body;

    if (!prompt) {
      console.log("1.1 - Prompt missing");

      return res.status(400).json({
        message: "prompt is required",
      });
    }
    console.log("1.2 - Prompt received");
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    console.log("2 - User fetched");

    if (!user) {
      console.log("2.1 - User not found");

      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.credits < 0.5) {
      console.log("2.2 - Insufficient credits");

      return res.status(400).json({
        message: "you have not enough credits to generate a website",
      });
    }

    console.log("3 - Credits check passed");

    const finalPrompt = masterPrompt.replace("USER_PROMPT", prompt);

    console.log("4 - Final prompt created");

    let raw = "";
    let parsed = null;

    console.log("5 - Starting first AI attempt");

    // =========================
    // FIRST ATTEMPT
    // =========================

    raw = await generateResponse(finalPrompt);

    console.log("5.1 - First AI response received");

    console.log("5.2 - Extracting first AI response content");

    const firstContent = raw?.choices?.[0]?.message?.content;
    console.log("5.2.1 - AI Response " + firstContent);

    if (!firstContent) {
      console.log("5.3 - First AI response content is missing");
    } else {
      console.log("5.3 - First AI response content received");
      console.log("First response length:", firstContent.length);

      parsed = extractJson(firstContent);

      console.log("5.4 - First JSON extraction completed");
    }

    // =========================
    // SECOND ATTEMPT
    // =========================

    if (!parsed) {
      console.log("6 - First attempt failed");

      console.log("6.1 - Starting second AI attempt");

      raw = await generateResponse(
        finalPrompt + "\n\nRETURN ONLY VALID RAW JSON.",
      );

      console.log("6.2 - Second AI response received");

      const secondContent = raw?.choices?.[0]?.message?.content;
      console.log("6.2.1 - AI Response " + secondContent);

      if (!secondContent) {
        console.log("6.3 - Second AI response content is missing");
      } else {
        console.log("6.3 - Second AI response content received");
        console.log("Second response length:", secondContent.length);

        parsed = extractJson(secondContent);

        console.log("6.4 - Second JSON extraction completed");
      }
    }

    // =========================
    // BOTH ATTEMPTS FAILED
    // =========================

    if (!parsed) {
      console.log("7 - Both AI attempts failed");

      return res.status(400).json({
        message: "AI returned invalid JSON after 2 attempts",
      });
    }

    console.log("7.1 - Valid JSON received");

    // =========================
    // VALIDATE CODE
    // =========================

    if (!parsed.code) {
      console.log("7.2 - Parsed JSON does not contain code");

      return res.status(400).json({
        message: "AI returned invalid response",
      });
    }

    console.log("8 - Parsed response is valid");

    console.log("8.1 - Generated code length:", parsed.code.length);

    console.log("9 - Saving Website Info...")
    const website = await Website.create({
      user: user._id,
      title: prompt.slice(0, 60),
      latestCode: parsed.code,
      conversation: [
        {
          role: "user",
          content: prompt,
        },
        {
          role: "model",
          content: parsed.message,
        },
      ],
    });
    console.log("9.1 - Website Info Saved");

    user.credits = user.credits - 0.5;
    console.log("10 - user credit deducted");
    
    await user.save();
    console.log("10.1 - User Credits Saved");


    return res.status(201).json({
      websiteId: website._id,
      remainingCredits: user.credits,
    });
  } catch (error) {
    console.log(`generate website error ${error}`)
    return res.status(500).json({ message: `generate website error ${error}` });
  }
};

const generateWebsiteDemo = async (req, res) => {
  try {
    console.log("DEMO 1 - Starting");

    const result = await generateResponse(masterPrompt);

    console.log("DEMO 2 - AI response received");

    console.log(result?.choices?.[0]?.message?.content);

    console.log("DEMO 3 - Sending response");

    res.send(result);

    console.log("DEMO 4 - Response sent");
  } catch (err) {
    console.error("DEMO ERROR:", err);

    res.status(500).json({
      message: "Error generating demo response",
      error: err.message,
    });
  }
};

module.exports = {
  generateWebsiteDemo,
  generateWebsite,
};
