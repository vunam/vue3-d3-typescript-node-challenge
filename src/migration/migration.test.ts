import fetch from 'node-fetch';
import { run } from '@shared/helpers/db';
import startProcess from './migration';
import { MigrationType } from './types';

jest.mock('@shared/helpers/db', () => ({
    initConnection: jest.fn(),
    run: jest.fn(),
    closeConnection: jest.fn(),
}));

describe('Migration', () => {
    describe('UP', () => {
        it('should fetch data and call DB queries', async () => {
            const mockedData = {
                data: [{ something: 'here' }],
            };

            jest.spyOn(fetch as any, 'default').mockImplementation(() => ({ json: () => mockedData }));

            await startProcess(MigrationType.UP);

            expect(fetch).toBeCalled();
            expect(run).toBeCalledWith(expect.any(String), {
                items: mockedData.data,
            });
            expect(run).toBeCalledTimes(2);
        });
    });

    // TO DO: Add Migration Down if there's time left
});
