// tests/unit/FriendList.spec.js
import { shallowMount } from '@vue/test-utils';
import FriendList from '@/components/pages/SlamBook/FriendList.vue';
import FriendDetails from '@/components/pages/SlamBook/FriendDetails.vue';

describe('FriendList.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(FriendList);
  });

  it('should initialize with correct data', () => {
    expect(wrapper.vm.twinPerson).toEqual([]);
  });

  it('should render FriendDetails component', () => {
    const friendDetailsComponent = wrapper.findComponent(FriendDetails);
    expect(friendDetailsComponent.exists()).toBe(true);
  });

  // If you want to test the props passed to FriendDetails, you can do so here
  it('should pass props to FriendDetails component', () => {
    const friendDetailsComponent = wrapper.findComponent(FriendDetails);
    // If you are passing props, you can check them here
    // expect(friendDetailsComponent.props().someProp).toEqual(someValue);
  });

  // If you have methods in FriendList that interact with twinPerson, you can test them here
  // For example, if you have a method to add a person:
  // it('should add a person to twinPerson', () => {
  //   wrapper.vm.addPerson('John Doe');
  //   expect(wrapper.vm.twinPerson).toContain('John Doe');
  // });
});