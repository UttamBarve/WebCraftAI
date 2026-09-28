const extractJson = (text) => {
  if (!text) return null;

  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const closeBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || closeBrace === -1) {
    return null;
  }

  const jsonString = cleaned.slice(firstBrace, closeBrace + 1);

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.log("========== JSON PARSE ERROR ==========");
    console.log(error.message);
    console.log("========== RAW JSON ==========");
    console.log(jsonString);
    console.log("======================================");

    return null;
  }
};

module.exports = extractJson;