
import { run } from '@shared/helpers/db';

const validateInputSafety = (text: string) => /^([a-zA-Z])(-[0-9])?$/.test(text);

const getSingleNode = async (req, res) => {
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

    res.send(result.records);
  } catch (err) {
    console.error(err);
    res.send({
      error: 'An error has occurred',
    });
  }
};

export default getSingleNode;
