// tests/unit/TwinBook.spec.js
import { shallowMount } from '@vue/test-utils'
import TwinBook from '@/components/pages/SlamBook/TwinBook.vue'
import RegistrationForm from '@/components/pages/SlamBook/RegistrationForm.vue'
import FriendList from '@/components/pages/SlamBook/FriendList.vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonButton from '@/components/common/CommonButton.vue'

describe('TwinBook.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TwinBook);
  });

  it('should initialize with correct data', () => {
    expect(wrapper.vm.showRegistrationForm).toBe(false);
    expect(wrapper.vm.showFriendList).toBe(true);
    expect(wrapper.vm.twinListArray).toEqual([]);
  });

  it('should show registration form when action is "add"', () => {
    wrapper.vm.getButtonAction('add');
    expect(wrapper.vm.showRegistrationForm).toBe(true);
    expect(wrapper.vm.showFriendList).toBe(false);
  });

  it('should show friend list when action is "display"', () => {
    wrapper.vm.getButtonAction('display');
    expect(wrapper.vm.showFriendList).toBe(true);
    expect(wrapper.vm.showRegistrationForm).toBe(false);
  });

  it('should not change visibility for unknown action', () => {
    const initialRegistrationFormState = wrapper.vm.showRegistrationForm;
    const initialFriendListState = wrapper.vm.showFriendList;

    wrapper.vm.getButtonAction('unknown');
    expect(wrapper.vm.showRegistrationForm).toBe(initialRegistrationFormState);
    expect(wrapper.vm.showFriendList).toBe(initialFriendListState);
  });

  it('should render child components', () => {
    expect(wrapper.findComponent(RegistrationForm).exists()).toBe(true);
    expect(wrapper.findComponent(FriendList).exists()).toBe(true);
    expect(wrapper.findComponent(CommonHeader).exists()).toBe(true);
    expect(wrapper.findComponent(CommonButton).exists()).toBe(true);
  });

  it('should provide correct data to child components', () => {
    const providedData = wrapper.vm.$options.provide.call(wrapper.vm);
    expect(providedData.twinShowData).toBe(wrapper.vm.twinListArray);
  });
});