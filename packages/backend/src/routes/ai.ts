import { FastifyInstance } from 'fastify';
import { llmService } from '../services/llm';
import { vectorStoreService } from '../services/vectorStore';

export default async function (server: FastifyInstance) {
  interface GenerateTextRequestBody {
  prompt: string;
  model: string;
}

  server.post('/generate-text', async (request, reply) => {
    const { prompt, model } = request.body as GenerateTextRequestBody;

    try {
      const text = await llmService.generateText(prompt, model);
      return { text };
    } catch (error) {
      console.error(error as Error);
      return reply.status(500).send({ error: 'Failed to generate text' });
    }
  });

  interface GenerateEmbeddingRequestBody {
  text: string;
  model: string;
}

  server.post('/generate-embedding', async (request, reply) => {
    const { text, model } = request.body as GenerateEmbeddingRequestBody;

    try {
      const embedding = await llmService.generateEmbedding(text, model);
      return { embedding };
    } catch (error) {
      console.error(error as Error);
      return reply.status(500).send({ error: 'Failed to generate embedding' });
    }
  });

  interface UpsertVectorsRequestBody {
  vectors: { id: string; values: number[]; metadata: Record<string, unknown> }[];
}

  server.post('/upsert-vectors', async (request, reply) => {
    const { vectors } = request.body as UpsertVectorsRequestBody;

    try {
      await vectorStoreService.upsertVectors(vectors);
      return { message: 'Vectors upserted successfully' };
    } catch (error) {
      console.error(error as Error);
      return reply.status(500).send({ error: 'Failed to upsert vectors' });
    }
  });

  interface QueryVectorsRequestBody {
  vector: number[];
  indexName: string;
  topK: number;
}

  server.post('/query-vectors', async (request, reply) => {
    const { vector, indexName, topK } = request.body as QueryVectorsRequestBody;

    try {
      const matches = await vectorStoreService.queryVectors(vector, indexName, topK);
      return { matches };
    } catch (error) {
      console.error(error as Error);
      return reply.status(500).send({ error: 'Failed to query vectors' });
    }
  });
}