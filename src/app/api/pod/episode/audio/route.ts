import { ElevenLabsClient } from "elevenlabs";
import { NextResponse } from "next/server";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVEN_LABS_API_KEY,
});

export async function POST(request: Request) {
  if (!process.env.ELEVEN_LABS_API_KEY) {
    throw new Error(
      "The ELEVEN_LABS_API_KEY environment variable is not set. See README.md for instructions on how to set it.",
    );
  }

  try {
    const { episodeScript } = await request.json();

    // Just use the raw script data
    const scriptText =
      typeof episodeScript === "string"
        ? episodeScript
        : JSON.stringify(episodeScript, null, 2);

    console.log("Generating audio for script:", scriptText);

    const content = await client.textToSpeech.convert("JBFqnCBsd6RMkjVDRZzb", {
      output_format: "mp3_44100_128",
      text: scriptText,
      model_id: "eleven_multilingual_v2",
    });

    // Return the ReadableStream directly with proper headers
    const response = new NextResponse(content);
    response.headers.set("Content-Type", "audio/mpeg");
    return response;
  } catch (error) {
    console.error("Error generating episode audio:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate episode audio",
      },
      { status: 500 },
    );
  }
}
