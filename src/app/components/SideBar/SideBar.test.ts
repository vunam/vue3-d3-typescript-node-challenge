import { shallowMount } from '@vue/test-utils';
import SideBar from './SideBar.vue';
import { StateProps } from '../../types';

describe('SideBar.vue', () => {
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

	it('renders correctly', () => {
		const wrapper = shallowMount(SideBar, options);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('renders with data', () => {
		const wrapper = shallowMount(SideBar, {
      ...options,
      global: {
        provide: {
          ...options.global.provide,
          state: {
            selectedNode: 'A',
            nodeData: {
              name: 'A',
              description: 'Description'
            }
          }
        }
      }
    });
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('reset selectedNode on close', () => {
    const mockSetState = jest.fn();
		const wrapper = shallowMount(SideBar, {
      ...options,
      global: {
        provide: {
          ...options.global.provide,
          setState: mockSetState,
        }
      }
    });
  
    expect(mockSetState).toHaveBeenCalledTimes(0);
  
    wrapper.find('button').trigger('click');
  
		expect(mockSetState).toHaveBeenCalledWith('selectedNode', null);
	});
});
