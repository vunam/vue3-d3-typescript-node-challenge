import { transformPayloadAll, transformPayloadSingle } from './transformPayload';

describe('transformPayload', () => {
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

	it('transformPayloadAll', async () => {

		const result = transformPayloadAll(mockedData);

		expect(result).toEqual({
      name: 'A',
      parent: 'C'
    });
	});
  
	it('transformPayloadSingle', async () => {

		const result = transformPayloadSingle(mockedData);

		expect(result).toEqual({
      name: 'A',
      description: 'This is a description of A'
    });
	});
});
