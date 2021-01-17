import { shallowMount } from '@vue/test-utils';
import Main from './Main.vue';

describe('Main.vue', () => {
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
		const wrapper = shallowMount(Main, { propsData: {} });
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('fetch to be called on mount', () => {
		const wrapper = shallowMount(Main);
		expect(global.fetch).toHaveBeenCalled();
	});

	it('matches snapshot when data is received', () => {
		const wrapper = shallowMount(Main, {
			data() {
				return { data: [ 'some-data' ] };
			}
		});
		expect(wrapper.html()).toMatchSnapshot();
	});
});
