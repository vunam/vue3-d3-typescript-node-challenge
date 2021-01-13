import 'dotenv/config';
import neo4j from 'neo4j-driver';

const [neo4jUser, neo4jPassword] = process.env.NEO4J_AUTH.split('/');
const driver = neo4j.driver(process.env.NEO4J_DB_URL, neo4j.auth.basic(neo4jUser, neo4jPassword));

export const up = async (): Promise<void> => {
  const session = driver.session();

  try {
    const result = await session.run('SHOW DATABASES');
    console.log(result);
  } catch (err) {
    console.error(err);
  }

  await session.close();
};

export const down = (): void => {};

up();
