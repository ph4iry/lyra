import { extract } from '@extractus/article-extractor';
import { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  console.log('handling article extraction');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { link } = req.body;

  if (!link || typeof link !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing URL' });
  }

  try {
    const article = await extract(link);
    if (!article) {
      return res.status(404).json({ error: 'Article could not be extracted' });
    }
    res.status(200).json(article);
  } catch (error) {
    console.error('Extraction error:', error);
    res.status(500).json({ error: 'Failed to extract article', details: error.message });
  }
} 