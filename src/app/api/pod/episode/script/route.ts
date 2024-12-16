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
    const { prompt, showMetadata, episodeMetadata, episodeOutline } =
      await request.json();

    const prediction = await replicate.predictions.create({
      model: TEXT_GENERATION_MODEL,
      input: {
        ...TEXT_GENERATION_INPUT,
        prompt: `You are a podcast script writer. Given the show metadata, episode metadata, episode outline, and user's prompt, create a detailed script including:
        - Word-for-word dialogue
        - Sound effects and music cues (if any)
        - Timing markers
        - Emphasis and tone notes
        - Ad break positions (if applicable)
        
        Follow the show's established tone and format. Write in a natural, conversational style that matches the show's personality.
        Respond in JSON format with the following structure:
        {
          "segments": [
            {
              "type": "intro"|"main"|"transition"|"outro",
              "timing": "MM:SS-MM:SS",
              "content": "The actual script text",
              "notes": "Any production notes or cues"
            }
          ]
        }
        
        SHOW METADATA: ${JSON.stringify(showMetadata)}
        EPISODE METADATA: ${JSON.stringify(episodeMetadata)}
        EPISODE OUTLINE: ${JSON.stringify(episodeOutline)}
        USER PROMPT: ${prompt}`,
        stream: false,
      },
    });

    return NextResponse.json({ id: prediction.id });
  } catch (error) {
    console.error("Error generating episode script:", error);
    return NextResponse.json(
      { error: "Failed to generate episode script" },
      { status: 500 },
    );
  }
}
