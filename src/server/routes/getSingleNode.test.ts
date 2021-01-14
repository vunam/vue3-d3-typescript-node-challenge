import { run } from '@shared/helpers/db';
import getSingleNode from './getSingleNode';

jest.mock('@shared/helpers/db', () => ({
	run: jest.fn()
}));

describe('getSingleNode', () => {
	const mockedData = {
		records: [ 'A-1' ]
	};

	(run as jest.MockedFunction<any>).mockImplementation(async () => mockedData);

	it('should return a single result', async () => {
		const mockedReq = {
			params: {
				name: 'A-1'
			}
		};
		const mockedRes = {
			send: jest.fn()
		};

		await getSingleNode(mockedReq, mockedRes);

		expect(mockedRes.send).toBeCalledWith(mockedData.records[0]);
	});

	it('should error when no name is given', async () => {
		const mockedReq = {
			params: {}
		};
		const mockedRes = {
			send: jest.fn()
		};

		await getSingleNode(mockedReq, mockedRes);

		expect(mockedRes.send).toBeCalledWith({ error: 'An error has occurred', message: 'No name given' });
	});

	it('should error on illegal node name', async () => {
		const mockedReq = {
			params: {
				name: '2B'
			}
		};
		const mockedRes = {
			send: jest.fn()
		};

		await getSingleNode(mockedReq, mockedRes);

		expect(mockedRes.send).toBeCalledWith({ error: 'An error has occurred', message: 'Illegal characters' });
	});

	it('should error when no records are found', async () => {
		const mockedReq = {
			params: {
				name: 'B-2'
			}
		};
		const mockedRes = {
			send: jest.fn()
		};

		(run as jest.MockedFunction<any>).mockImplementationOnce(async () => []);

		await getSingleNode(mockedReq, mockedRes);

		expect(mockedRes.send).toBeCalledWith({ error: 'An error has occurred', message: 'No results found' });
	});
});
