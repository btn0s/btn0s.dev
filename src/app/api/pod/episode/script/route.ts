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
        prompt: `You are writing a podcast script. Write ONLY the exact words that should be spoken by the host. 
        
        Target length: 750 words (based on 150 words per minute)

        Requirements:
        - 100% of the words should be spoken by a single speaker
        - The script should flow naturally as if someone is speaking to their audience. Write in a conversational, engaging style that matches the show's tone.
        - The script should be 750 words long (based on 150 words per minute)
        - The script should be in the show's tone and format
        - DO NOT say the hosts name or leave any placeholders for the hosts name
        
        Do NOT include:
        - Intro text like "Here's the script for..."
        - Speaker labels or annotations
        - Sound effects or music cues
        - Stage directions or tone notes
        - Timestamps or markers
        - Production notes
        - Line breaks between paragraphs (use single space)
        
        The script should flow naturally as if someone is speaking to their audience. Write in a conversational, engaging style that matches the show's tone.
        
        Return ONLY the raw text that should be spoken, with no formatting or annotations.
        
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
