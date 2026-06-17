// Claude API utility
// Note: In production, never expose API keys on the frontend.
// Use a backend proxy (Node.js/Express) to protect your key.
// For local development only, you can set REACT_APP_ANTHROPIC_API_KEY in .env

const API_KEY = process.env.REACT_APP_ANTHROPIC_API_KEY || '';

export async function callClaude(prompt) {
  if (!API_KEY) {
    throw new Error('Missing REACT_APP_ANTHROPIC_API_KEY in .env file');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.error?.message || 'API call failed');
  }

  const data = await response.json();
  return data.content?.[0]?.text || '';
}
