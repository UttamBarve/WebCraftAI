const openRouterURL = "https://openrouter.ai/api/v1/chat/completions";

const openRouterAPI = process.env.OPENROUTER_API;

const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL;

const generateResponse = async (prompt) => {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openRouterAPI}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [
        { role: "system", content: "You must return ONLY valid raw JSON" },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error("Open Router Error: " + error);
  }

  const data = await res.json();
  return data;
};
