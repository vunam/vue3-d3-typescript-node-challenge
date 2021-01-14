
import { run } from '@shared/helpers/db';

const getAllNodes = async (_, res) => {
  try {
    const result = await run(`
      MATCH (n)
      RETURN n
    `);

    res.send(result.records);
  } catch (err) {
    console.log(err);
    res.send({
      error: 'An error has occurred',
    });
  }
};

export default getAllNodes;
