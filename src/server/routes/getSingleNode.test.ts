import { run } from '@shared/helpers/db';
import getSingleNode from './getSingleNode';

jest.mock('@shared/helpers/db', () => ({
	run: jest.fn()
}));

jest.mock('../utils/transformPayload', () => ({
	transformPayloadSingle: (data: any) => data
}));

describe('getSingleNode', () => {
	const mockedData = {
		records: [ 'A-1' ]
	};

	(run as jest.MockedFunction<any>).mockImplementation(async () => mockedData);

	it('should return a single result', async () => {
		const mockedReq: any = {
			params: {
				name: 'A-1'
			}
		};
		const mockedRes: any = {
			send: jest.fn()
		};

		await getSingleNode(mockedReq, mockedRes);

		expect(mockedRes.send).toBeCalledWith(mockedData.records[0]);
	});

	it('should error when no name is given', async () => {
		const mockedReq: any = {
			params: {}
		};
		const mockedRes: any = {
			send: jest.fn()
		};

		await getSingleNode(mockedReq, mockedRes);

		expect(mockedRes.send).toBeCalledWith({ error: 'An error has occurred', message: 'No name given' });
	});

	it('should error on illegal node name', async () => {
		const mockedReq: any = {
			params: {
				name: '2B'
			}
		};
		const mockedRes: any = {
			send: jest.fn()
		};

		await getSingleNode(mockedReq, mockedRes);

		expect(mockedRes.send).toBeCalledWith({ error: 'An error has occurred', message: 'Illegal characters' });
	});

	it('should error when no records are found', async () => {
		const mockedReq: any = {
			params: {
				name: 'B-2'
			}
		};
		const mockedRes: any = {
			send: jest.fn()
		};

		(run as jest.MockedFunction<any>).mockImplementationOnce(async (): Promise<[]> => []);

		await getSingleNode(mockedReq, mockedRes);

		expect(mockedRes.send).toBeCalledWith({ error: 'An error has occurred', message: 'No results found' });
	});
});
