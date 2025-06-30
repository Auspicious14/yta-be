// Path: youtube-automation-backend/services/scriptService.ts

import { openRouter } from "../config/openrouter";

class ScriptService {
  private openRouter = openRouter;
  private model = "cognitivecomputations/dolphin3.0-r1-mistral-24b:free";
  private defaultOptions = {
    max_tokens: 200,
    temperature: 0.7,
    stream: false
  };

  private async generateWithAI(systemPrompt: string, userContent: string): Promise<string> {
    const response = await this.openRouter.completions.create({
      ...this.defaultOptions,
      model: this.model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent }
      ]
    });
    return response.choices[0].message.content;
  }

  async generateScript(prompt: string): Promise<string> {
    console.log(`Generating script for prompt: ${prompt}`);
    return this.generateWithAI("You're a professional script writer.", prompt);
  }

  async generateVideoTitle(script: string): Promise<string> {
    console.log("Generating video title...");
    return this.generateWithAI("You're a professional video title creator.", script);
  }

  async generateVideoDescription(script: string): Promise<string> {
    console.log("Generating video description...");
    return this.generateWithAI("You're a professional video description creator.", script);
  }

  async generateTags(script: string): Promise<string[]> {
    console.log("Generating video tags...");
    const tags = await this.generateWithAI("You're a professional video tag creator.", script);
    return tags.split(",");
  }

  async generateImageSearchQuery(scriptSegment: string): Promise<string> {
    console.log(`Generating image search query for segment: ${scriptSegment}`);
    return `query for ${scriptSegment.substring(0, 20)}...`;
  }

  async generateVideoSearchQuery(scriptSegment: string): Promise<string> {
    console.log(`Generating video search query for segment: ${scriptSegment}`);
    return this.generateWithAI(
      "You're a professional video search query creator.",
      scriptSegment
    );
  }
}

export const scriptService = new ScriptService();
