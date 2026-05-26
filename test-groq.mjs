import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY || '',
});

async function main() {
  try {
    const result = await streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: 'You are a helpful assistant.',
      messages: [{ role: 'user', content: 'hello' }],
    });

    console.log("Stream starting for llama-3.3-70b-versatile...");
    for await (const chunk of result.textStream) {
      process.stdout.write(chunk);
    }
    console.log("\nDone!");
  } catch (error) {
    console.error("Error:", error.message || error);
  }
}

main();
