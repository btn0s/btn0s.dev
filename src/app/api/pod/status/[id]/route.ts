import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.",
    );
  }

  try {
    const prediction = await replicate.predictions.get(params.id);

    // Just pass through the prediction data directly
    return NextResponse.json(prediction);
  } catch (error) {
    console.error("Error checking prediction status:", error);
    return NextResponse.json(
      { error: "Failed to check prediction status" },
      { status: 500 },
    );
  }
}
