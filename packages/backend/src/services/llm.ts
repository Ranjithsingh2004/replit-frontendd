import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export class LLMService {
  async generateText(prompt: string, model: string = 'gpt-3.5-turbo') {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }

    try {
      const response = await openai.chat.completions.create({
        model,
        messages: [{ role: 'user', content: prompt }],
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error generating text:', error as Error);
      throw new Error('Failed to generate text');
    }
  }

  async generateEmbedding(text: string, model: string = 'text-embedding-3-small') {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }

    try {
      const response = await openai.embeddings.create({
        model,
        input: text,
      });

      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error as Error);
      throw new Error('Failed to generate embedding');
    }
  }
}

export const llmService = new LLMService();