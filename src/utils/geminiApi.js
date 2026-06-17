// Google Gemini API utility (Free!)
// Get your API key from: https://aistudio.google.com/app/apikey

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || '';

export async function callGemini(prompt) {
  if (!API_KEY) {
    throw new Error('Missing REACT_APP_GEMINI_API_KEY in .env file');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.error?.message || 'API call failed');
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return text;
}
