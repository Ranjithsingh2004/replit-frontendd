import { PineconeClient } from 'pinecone-client';

let pinecone: PineconeClient<Record<string, unknown>> | null = null;

if (process.env.PINECONE_API_KEY) {
  pinecone = new PineconeClient({
    apiKey: process.env.PINECONE_API_KEY,
    baseUrl: 'https://api.pinecone.io',
  });
}

export class VectorStoreService {
  async upsertVectors(vectors: { id: string; values: number[]; metadata: Record<string, unknown> }[]) {
    if (!pinecone) {
      throw new Error('Pinecone not initialized - PINECONE_API_KEY not set');
    }
    try {
      await pinecone.upsert({
        vectors,
      });
      return { success: true };
    } catch (error) {
      console.error('Error upserting vectors:', error);
      throw error;
    }
  }

  async queryVectors(vector: number[], indexName: string, topK: number = 10) {
    if (!pinecone) {
      throw new Error('PINECONE_API_KEY environment variable is not set');
    }

    try {
      const response = await pinecone.query({
        vector,
        namespace: indexName,
        topK,
      });

      return response.matches || [];
    } catch (error) {
      console.error('Error querying vectors:', error);
      throw new Error('Failed to query vectors');
    }
  }

  async deleteVectors(ids: string[]) {
    if (!pinecone) {
      throw new Error('PINECONE_API_KEY environment variable is not set');
    }

    try {
      await pinecone.delete({
        ids,
      });
    } catch (error) {
      console.error('Error deleting vectors:', error);
      throw new Error('Failed to delete vectors');
    }
  }
}

export const vectorStoreService = new VectorStoreService();