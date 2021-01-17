import { Request, Response } from 'express';
import { run } from '@shared/helpers/db';
import { transformPayloadAll } from '../utils/transformPayload';

const getAllNodes = async (_: Request, res: Response) => {
  try {
    const result = await run(`
        MATCH (n)
        RETURN n
    `);

    const transformedData = result.records.map(transformPayloadAll);

    res.send(transformedData);
  } catch (err) {
    // Note: Real app should log error and hide full message
    res.send({
      error: 'An error has occurred',
    });
  }
};

export default getAllNodes;
