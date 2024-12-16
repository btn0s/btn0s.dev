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
    const { prompt, showMetadata, episodeMetadata } = await request.json();

    const prediction = await replicate.predictions.create({
      model: TEXT_GENERATION_MODEL,
      input: {
        ...TEXT_GENERATION_INPUT,
        prompt: `You are a podcast episode outline generator. Given the show metadata, episode metadata, and user's prompt, create a detailed outline for the episode including:
        - Introduction (hook, topic introduction)
        - Main segments with timing
        - Key talking points for each segment
        - Transitions between segments
        - Conclusion and call-to-action
        
        Follow the show's format and tone while maintaining good pacing and engagement.
        Respond in JSON format only.
        
        SHOW METADATA: ${JSON.stringify(showMetadata)}
        EPISODE METADATA: ${JSON.stringify(episodeMetadata)}
        USER PROMPT: ${prompt}`,
        stream: false,
      },
    });

    return NextResponse.json({ id: prediction.id });
  } catch (error) {
    console.error("Error generating episode outline:", error);
    return NextResponse.json(
      { error: "Failed to generate episode outline" },
      { status: 500 },
    );
  }
}
