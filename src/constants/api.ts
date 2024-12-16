// Text Generation

export const TEXT_GENERATION_MODEL = "meta/meta-llama-3-70b-instruct";
export const TEXT_GENERATION_INPUT = {
  top_k: 0,
  top_p: 0.9,
  prompt: "Pizza is a delicious food.",
  max_tokens: 4000,
  min_tokens: 0,
  temperature: 0.6,
  system_prompt: "You are a professional podcast writer.",
  length_penalty: 0,
  stop_sequences: "<|end_of_text|>,<|eot_id|>",
  prompt_template:
    "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a professional podcast writer.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
  presence_penalty: 1.15,
  log_performance_metrics: false,
};

export const AUDIO_GENERATION_MODEL =
  "suno-ai/bark:b76242b40d67c76ab6742e987628a2a9ac019e11d56ab96c4e91ce03b79b2787";
export const AUDIO_GENERATION_INPUT = {
  prompt:
    "Hello, my name is Suno. And, uh — and I like pizza. [laughs] But I also have other interests such as playing tic tac toe.",
  text_temp: 0.7,
  output_full: false,
  waveform_temp: 0.7,
  history_prompt: "en_speaker_4",
};
