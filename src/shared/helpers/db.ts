import neo4j, { Driver } from 'neo4j-driver';

export const initConnection = (): Driver => {
  const [neo4jUser, neo4jPassword] = process.env.NEO4J_AUTH.split('/');
  const driver = neo4j.driver(process.env.NEO4J_DB_URL, neo4j.auth.basic(neo4jUser, neo4jPassword));
  return driver;
}
