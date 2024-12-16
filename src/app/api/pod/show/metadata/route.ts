import { NextResponse } from "next/server";
import Replicate from "replicate";

import { TEXT_GENERATION_MODEL, TEXT_GENERATION_INPUT } from "@/constants/api";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.",
    );
  }

  try {
    const { prompt } = await request.json();

    const prediction = await replicate.predictions.create({
      model: TEXT_GENERATION_MODEL,
      input: {
        ...TEXT_GENERATION_INPUT,
        prompt: `You are a podcast metadata generator. Given a user's prompt, generate metadata for a new podcast series including:
        - title
        - description
        - category
        - target audience
        - estimated episode length
        - format (interview, monologue, etc.)
        - tone (casual, professional, educational, etc.)
        - high-level topic outline for future episodes
        
        Respond in JSON format only.
        
        USER PROMPT: ${prompt}`,
        stream: false,
      },
    });

    return NextResponse.json({ id: prediction.id });
  } catch (error) {
    console.error("Error generating show metadata:", error);
    return NextResponse.json(
      { error: "Failed to generate show metadata" },
      { status: 500 },
    );
  }
}
