import { transformPayloadAll } from './transformPayload';

describe('transformPayload', () => {
	it('transformPayloadAll', async () => {
		const mockedData = {
			keys: [ 'n' ],
			length: 1,
			_fields: [
				{
					identity: {
						low: 27,
						high: 0
					},
					labels: [ 'Node' ],
					properties: {
						name: 'A',
						parent: 'C',
						description: 'This is a description of A'
					}
				}
			],
			_fieldLookup: {
				n: 0
			}
		};

		const result = transformPayloadAll(mockedData);

		expect(result).toEqual({
      name: 'A',
      parent: 'C'
    });
	});
});
