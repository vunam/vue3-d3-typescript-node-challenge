import { shallowMount } from '@vue/test-utils';
import { StateProps } from '../../types';
import TreeChart from './TreeChart.vue';

describe('TreeChart.vue', () => {
	const options = {
		propsData: {
			data: [] as any
		},
		global: {
			provide: {
				state: {
					selectedNode: null,
					nodeList: []
				} as StateProps,
				setState: () => {}
			}
		},
		provide: {
			setState: () => {}
		}
	};
	it('renders correctly', () => {
		const wrapper = shallowMount(TreeChart, options);
		expect(wrapper.html()).toMatchSnapshot();
	});
});
