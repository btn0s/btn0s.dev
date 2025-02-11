"use client";

import { useState } from "react";

import { FaCheckCircle, FaHourglassStart } from "react-icons/fa";
import { FaCircleXmark, FaSpinner } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

/*
    1. Create a new episode with all empty fields except for the prompt, and the user.
    2. Kick off metadata generation for the show and pilot episode. Save these back to the db when they're done.
    3. Once metadata for the show and pilot episode is generated, kick off script generation for this pilot episode. Save this back to the db when it's done.
    4. Once script generation for the pilot episode is done, kick off audio generation for this pilot episode. Save this back to the db when it's done.
    5. All done! Show and pilot episode are ready to be played. Notify user, and show them button for generating the next episode.
    6. Repeat steps 1-5 each time the user wants to generate a new episode (skipping show metadata generation).

    NOTES:
    - Each new episode should be able to adjust the prompt so the user can steer the show in a direction they want.
    - If user decides not to adjust the prompt, then the next episode should be generated from a high-level topic outline that we create during show metadata generation.

    STEPS:
    1. Show metadata generation
    2. Episode metadata generation
    3. Episode outline generation
    4. Episode script generation
    5. Episode audio generation
 */

enum PodStep {
  GeneratingShowMetadata = "generating_show_metadata",
  GeneratingEpisodeMetadata = "generating_episode_metadata",
  GeneratingEpisodeOutline = "generating_episode_outline",
  GeneratingEpisodeScript = "generating_episode_script",
  GeneratingEpisodeAudio = "generating_episode_audio",
}

enum StepStatus {
  Pending = "pending",
  Running = "running",
  Succeeded = "succeeded",
  Failed = "failed",
}

type StepData = {
  status: StepStatus;
  data?: any;
};

type TState = Record<PodStep, StepData>;

const INITIAL_STATE: TState = {
  [PodStep.GeneratingShowMetadata]: { status: StepStatus.Pending },
  [PodStep.GeneratingEpisodeMetadata]: { status: StepStatus.Pending },
  [PodStep.GeneratingEpisodeOutline]: { status: StepStatus.Pending },
  [PodStep.GeneratingEpisodeScript]: { status: StepStatus.Pending },
  [PodStep.GeneratingEpisodeAudio]: { status: StepStatus.Pending },
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function PodWidget() {
  const [submitted, setSubmitted] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [state, setState] = useState<TState>(INITIAL_STATE);
  const [currentStep, setCurrentStep] = useState<PodStep | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const pollStatus = async (step: PodStep, id: string) => {
    while (true) {
      try {
        const response = await fetch(`/api/pod/status/${id}`);
        const prediction = await response.json();

        if (response.status !== 200) {
          throw new Error(
            prediction.error || "Failed to check prediction status",
          );
        }

        if (prediction.status === "succeeded") {
          let result = prediction.output;

          // For text responses (metadata, outline, script), parse the JSON
          if (Array.isArray(prediction.output)) {
            const fullText = prediction.output.join("");
            try {
              result = JSON.parse(fullText);
            } catch (e) {
              console.error("Failed to parse JSON:", e);
              result = fullText;
            }
          }

          setState((prev) => ({
            ...prev,
            [step]: {
              status: StepStatus.Succeeded,
              data: result,
            },
          }));

          // If this is the audio step, set the audio URL
          if (step === PodStep.GeneratingEpisodeAudio && prediction.output) {
            setAudioUrl(prediction.output);
          }

          return result;
        } else if (prediction.status === "failed") {
          setState((prev) => ({
            ...prev,
            [step]: {
              status: StepStatus.Failed,
              data: prediction.error,
            },
          }));
          throw new Error(prediction.error);
        }

        // Wait before polling again
        await sleep(2000);
      } catch (error) {
        console.error(`Error polling status for ${step}:`, error);
        setState((prev) => ({
          ...prev,
          [step]: {
            status: StepStatus.Failed,
            data: error,
          },
        }));
        throw error;
      }
    }
  };

  const generateStep = async (
    step: PodStep,
    endpoint: string,
    payload: any,
  ): Promise<any> => {
    setState((prev) => ({
      ...prev,
      [step]: { status: StepStatus.Running },
    }));
    setCurrentStep(step);

    try {
      // Special handling for audio generation since it doesn't need polling
      if (step === PodStep.GeneratingEpisodeAudio) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to generate audio");
        }

        // Create URL directly from the response
        const audioUrl = URL.createObjectURL(
          new Blob([await response.arrayBuffer()]),
        );

        setAudioUrl(audioUrl);
        setState((prev) => ({
          ...prev,
          [step]: {
            status: StepStatus.Succeeded,
            data: audioUrl,
          },
        }));

        return audioUrl;
      }

      // Normal polling flow for text generation steps
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const { id } = await response.json();
      const result = await pollStatus(step, id);

      return result;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        [step]: {
          status: StepStatus.Failed,
          data: error,
        },
      }));
      throw error;
    }
  };

  const start = async () => {
    setSubmitted(true);

    try {
      // Step 1: Generate Show Metadata
      const showMetadata = await generateStep(
        PodStep.GeneratingShowMetadata,
        "/api/pod/show/metadata",
        { prompt },
      );

      // Step 2: Generate Episode Metadata
      const episodeMetadata = await generateStep(
        PodStep.GeneratingEpisodeMetadata,
        "/api/pod/episode/metadata",
        { prompt, showMetadata },
      );

      // Step 3: Generate Episode Outline
      const episodeOutline = await generateStep(
        PodStep.GeneratingEpisodeOutline,
        "/api/pod/episode/outline",
        { prompt, showMetadata, episodeMetadata },
      );

      // Step 4: Generate Episode Script
      const episodeScript = await generateStep(
        PodStep.GeneratingEpisodeScript,
        "/api/pod/episode/script",
        { prompt, showMetadata, episodeMetadata, episodeOutline },
      );

      // Step 5: Generate Episode Audio
      await generateStep(
        PodStep.GeneratingEpisodeAudio,
        "/api/pod/episode/audio",
        { prompt, showMetadata, episodeMetadata, episodeScript },
      );

      setCurrentStep(null);
    } catch (error) {
      console.error("Error in generation process:", error);
      // Current step is already marked as failed in generateStep
      setCurrentStep(null);
    }
  };

  const retryStep = async (step: PodStep) => {
    // Get all previous successful steps' data
    const prevSteps = {
      prompt,
      showMetadata: state[PodStep.GeneratingShowMetadata].data,
      episodeMetadata: state[PodStep.GeneratingEpisodeMetadata].data,
      episodeOutline: state[PodStep.GeneratingEpisodeOutline].data,
      episodeScript: state[PodStep.GeneratingEpisodeScript].data,
    };

    // Build payload based on step dependencies
    const payload: any = { prompt };
    switch (step) {
      case PodStep.GeneratingShowMetadata:
        break;
      case PodStep.GeneratingEpisodeMetadata:
        payload.showMetadata = prevSteps.showMetadata;
        break;
      case PodStep.GeneratingEpisodeOutline:
        payload.showMetadata = prevSteps.showMetadata;
        payload.episodeMetadata = prevSteps.episodeMetadata;
        break;
      case PodStep.GeneratingEpisodeScript:
        payload.showMetadata = prevSteps.showMetadata;
        payload.episodeMetadata = prevSteps.episodeMetadata;
        payload.episodeOutline = prevSteps.episodeOutline;
        break;
      case PodStep.GeneratingEpisodeAudio:
        payload.showMetadata = prevSteps.showMetadata;
        payload.episodeMetadata = prevSteps.episodeMetadata;
        payload.episodeScript = prevSteps.episodeScript;
        break;
    }

    // Get endpoint for the step
    const endpoints = {
      [PodStep.GeneratingShowMetadata]: "/api/pod/show/metadata",
      [PodStep.GeneratingEpisodeMetadata]: "/api/pod/episode/metadata",
      [PodStep.GeneratingEpisodeOutline]: "/api/pod/episode/outline",
      [PodStep.GeneratingEpisodeScript]: "/api/pod/episode/script",
      [PodStep.GeneratingEpisodeAudio]: "/api/pod/episode/audio",
    };

    try {
      await generateStep(step, endpoints[step], payload);
    } catch (error) {
      console.error(`Error retrying ${step}:`, error);
    }
  };

  const isGenerating = currentStep !== null;
  const hasError = Object.values(state).some(
    (step) => step.status === StepStatus.Failed,
  );

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-background p-4 shadow-md">
      {/* Audio Player */}
      <div className="rounded-md border border-border bg-muted/50 p-4">
        <audio
          controls
          className="w-full opacity-100 disabled:opacity-50"
          src={audioUrl || undefined}
        >
          Your browser does not support the audio element.
        </audio>
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
          disabled={isGenerating}
        />
        <div className="flex gap-2">
          <Button onClick={start} disabled={isGenerating || !prompt.trim()}>
            {isGenerating ? (
              <>
                <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate"
            )}
          </Button>
        </div>
      </div>

      <Separator />

      {/* Status Widget */}
      <ul className="flex flex-col gap-2 border border-border p-4 font-mono text-sm text-muted-foreground">
        {Object.entries(state).map(([step, stepData]) => (
          <li key={step} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {stepData.status === StepStatus.Running && (
                <FaSpinner className="animate-spin text-yellow-500" />
              )}
              {stepData.status === StepStatus.Succeeded && (
                <FaCheckCircle className="text-green-500" />
              )}
              {stepData.status === StepStatus.Failed && (
                <FaCircleXmark className="text-red-500" />
              )}
              {stepData.status === StepStatus.Pending && (
                <FaHourglassStart className="text-gray-400" />
              )}
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div>
                <div className="text-sm font-medium">{step}</div>
                {stepData.status === StepStatus.Failed && stepData.data && (
                  <div className="text-xs text-red-500">
                    {stepData.data.message || "An error occurred"}
                  </div>
                )}
              </div>
              {stepData.status === StepStatus.Failed && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => retryStep(step as PodStep)}
                  disabled={isGenerating}
                >
                  Retry
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PodWidget;
