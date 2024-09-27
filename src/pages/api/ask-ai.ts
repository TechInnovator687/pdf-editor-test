
import { NextApiRequest, NextApiResponse } from "next";

// The actual OpenAI API could not be used in this implementation due to a 429 error,
// indicating insufficient quota. This error occurs when the number of allowed API requests is exceeded.
// To resolve this, an increased quota needs to be purchased from OpenAI.
// For the purposes of this development, we are using a mock API instead to simulate the OpenAI API behavior.

const mockResponses = [
  "Sure, here's a summary of the book you requested.",
  "I'm sorry, I couldn't find any relevant information.",
  "Yes, I can help you with that. What specific details do you need?",
  "That's an interesting question! Let me think about it for a moment.",
  "The weather today is sunny with a slight chance of rain in the afternoon.",
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const randomIndex = Math.floor(Math.random() * mockResponses.length);
  const result = mockResponses[randomIndex];
  res.status(200).json({ result });
}
