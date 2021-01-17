import { shallowMount } from '@vue/test-utils';
import Header from './Header.vue';

describe('Header.vue', () => {
	it('renders correctly', () => {
		const wrapper = shallowMount(Header);
		expect(wrapper.html()).toMatchSnapshot();
	});

});
