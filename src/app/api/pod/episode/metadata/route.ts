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
    const { prompt, showMetadata } = await request.json();

    const prediction = await replicate.predictions.create({
      model: TEXT_GENERATION_MODEL,
      input: {
        ...TEXT_GENERATION_INPUT,
        prompt: `You are a podcast episode metadata generator. Given the show metadata and a user's prompt, generate metadata for a new episode including:
        - title
        - episode number
        - description
        - key topics to cover
        - estimated duration
        - target mood/energy level
        - learning objectives (if educational)
        
        Consider the show's overall tone and format while generating this metadata.
        Respond in JSON format only.
        
        SHOW METADATA: ${JSON.stringify(showMetadata)}
        USER PROMPT: ${prompt}`,
        stream: false,
      },
    });

    return NextResponse.json({ id: prediction.id });
  } catch (error) {
    console.error("Error generating episode metadata:", error);
    return NextResponse.json(
      { error: "Failed to generate episode metadata" },
      { status: 500 },
    );
  }
}
