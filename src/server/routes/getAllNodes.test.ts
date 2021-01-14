import { run } from '@shared/helpers/db';
import getAllNodes from './getAllNodes';

jest.mock('@shared/helpers/db', () => ({
	run: jest.fn()
}));

describe('getAllNodes', () => {
	it('should return a list of records', async () => {
    const mockedData = {
      records: [
        'a',
        'b',
        'c',
      ]
    };
    (run as jest.MockedFunction<any>).mockImplementation(async () => mockedData);

    const mockedRes = {
      send: jest.fn(),
    }

		await getAllNodes(null, mockedRes);

		expect(mockedRes.send).toBeCalledWith(mockedData.records);
  });

	it('should return an error on failure', async () => {
    (run as jest.MockedFunction<any>).mockImplementation(async () => { throw Error('Any error'); });

    const mockedRes = {
      send: jest.fn(),
    }

		await getAllNodes(null, mockedRes);

		expect(mockedRes.send).toBeCalledWith({"error": "An error has occurred"});
	});
});
