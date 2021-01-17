import { Request, Response } from 'express';
import { run } from '@shared/helpers/db';
import { transformPayloadSingle } from '../utils/transformPayload';

const validateInputSafety = (text: string) => /^([a-zA-Z])(-[0-9])?$/.test(text);

const getSingleNode = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    if (!name) {
      throw Error('No name given');
    }

    if (!validateInputSafety(name)) {
      throw Error('Illegal characters');
    }

    const result = await run(`
      MATCH (n: Node)
      WHERE n.name = '${name}'
      RETURN n
    `);

    if (!result.records?.length) {
      throw Error('No results found');
    }

    const resultNode = transformPayloadSingle(result.records[0])

    res.send(resultNode);
  } catch (err) {
    // Note: Real app should log error and hide full message
    res.send({
      error: 'An error has occurred',
      message: err.message
    });
  }
};

export default getSingleNode;
