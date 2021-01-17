import neo4j, { Driver , Session} from 'neo4j-driver';

let driver: Driver;
let session: Session;

export const initConnection = async () => {
	const [ neo4jUser, neo4jPassword ] = process.env.NEO4J_AUTH.split('/');
	driver = neo4j.driver(process.env.NEO4J_DB_URL, neo4j.auth.basic(neo4jUser, neo4jPassword));
	session = await driver.session();
	return session;
};

export const run = (query: string, data?: { items: [any] }) => session.run(query, data);

export const closeConnection = async () => {
	await session.close();
	await driver.close();
};
