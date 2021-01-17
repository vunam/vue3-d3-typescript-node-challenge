import { shallowMount } from '@vue/test-utils';
import Main from './Main.vue';
import { StateProps } from '../../types';

describe('Main.vue', () => {
	const options = {
		propsData: {},
		global: {
			provide: {
				state: {
					selectedNode: null,
					nodeList: []
				} as StateProps,
				setState: () => {}
			},
		},
		provide: {
			setState: () => {}
		}
	};

	beforeAll(() => {
		global.fetch = jest.fn().mockImplementation(() => ({
			json: () => [ 'some-data' ]
		}));
	});

	afterAll(() => {
		(global.fetch as jest.MockedFunction<any>).mockClear();
		delete global.fetch;
	});

	it('matches snapshot when theres no data', () => {
		const wrapper = shallowMount(Main, options);
		expect(wrapper.html()).toMatchSnapshot();
	});
	
	it('matches snapshot when data is received', () => {
		const wrapper = shallowMount(Main, {
			...options,
			data() {
				return { state: { nodeList: [ 'some-data' ] } };
			}
		});
		expect(global.fetch).toHaveBeenCalled();
		expect(wrapper.html()).toMatchSnapshot();
	});
});
