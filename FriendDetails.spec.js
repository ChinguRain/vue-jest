// tests/unit/FriendDetails.spec.js
import { shallowMount } from '@vue/test-utils';
import FriendDetails from '@/components/pages/SlamBook/FriendDetails.vue';
import SlotCard from '@/components/common/SlotCard.vue';
import { TWIN_OUTPUT } from '@/common/recipe/rTwinOutput';

describe('FriendDetails.vue', () => {
  let wrapper;

  beforeEach(() => {
    // Provide a mock for the injected twinShowData
    wrapper = shallowMount(FriendDetails, {
      provide: {
        twinShowData: [] // or some mock data that fits your use case
      }
    });
  });

  it('should initialize with correct data', () => {
    expect(wrapper.vm.label).toEqual(TWIN_OUTPUT);
    expect(wrapper.vm.favorites).toEqual([]);
    expect(wrapper.vm.twinDetails).toEqual([]);
  });

  it('should inject twinShowData', () => {
    expect(wrapper.vm.twinShowData).toBeDefined();
    expect(wrapper.vm.twinShowData).toEqual([]); // Adjust based on your mock data
  });

  it('should render SlotCard component', () => {
    expect(wrapper.findComponent(SlotCard).exists()).toBe(true);
  });

  // If btnCrudMixin has methods, you can test those here
  it('should have btnCrudMixin methods available', () => {
    expect(wrapper.vm.addItem).toBeDefined(); // Assuming addItem is a method in the mixin
    expect(wrapper.vm.removeItem).toBeDefined(); // Assuming removeItem is a method in the mixin
  });

  // Example tests for the mixin methods (assuming they are defined)
  describe('btnCrudMixin methods', () => {
    beforeEach(() => {
      // If necessary, reset the favorites array before each test
      wrapper.setData({ favorites: [] });
    });

    it('should add an item to favorites', () => {
      wrapper.vm.addItem('item1'); // Assuming addItem is defined in the mixin
      expect(wrapper.vm.favorites).toContain('item1');
    });

    it('should remove an item from favorites', () => {
      wrapper.setData({ favorites: ['item1', 'item2'] });
      wrapper.vm.removeItem('item1'); // Assuming removeItem is defined in the mixin
      expect(wrapper.vm.favorites).not.toContain('item1');
    });
  });
});