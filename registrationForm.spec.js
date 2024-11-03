// RegistrationForm.spec.js
import { shallowMount } from '@vue/test-utils'
import RegistrationForm from '@/components/RegistrationForm.vue'
import { FORM_PROPERTIES, FORM_OUTPUT } from '@/common/recipe/rRegistrationForm.js'

describe('RegistrationForm.vue', () => {
  let wrapper;
  let mockTwinShowData;

  beforeEach(() => {
    mockTwinShowData = [];
    wrapper = shallowMount(RegistrationForm, {
      provide: {
        twinShowData: mockTwinShowData
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('should initialize with correct data', () => {
    expect(wrapper.vm.regisrationForm).toEqual(FORM_PROPERTIES);
    expect(wrapper.vm.formData).toEqual(FORM_OUTPUT);
    expect(wrapper.vm.twinKey).toBe(0);
    expect(wrapper.vm.isError).toBe(true);
  });

  it('should add form data correctly', () => {
    const data1 = { key: 'nickname', value: 'JohnDoe' };
    const data2 = { key: 'fullname', value: 'John Doe' };

    wrapper.vm.addFormData(data1);
    expect(wrapper.vm.formData.nickname).toBe('JohnDoe');

    wrapper.vm.addFormData(data2);
    expect(wrapper.vm.formData.fullname).toBe('John Doe');
  });

  it('should handle form submission correctly', () => {
    wrapper.vm.isError = false; // Simulate no errors
    wrapper.vm.formData = {
      nickname: 'JohnDoe',
      fullname: 'John Doe',
      phone: '1234567890',
      email: 'john.doe@example.com',
      birthdate: '1990-01-01',
      birthorder: '1',
      coffee: 'Espresso',
      lovelanguage: ['Words of Affirmation', 'Acts of Service', 'Receiving Gifts'],
      motto: 'Live and Let Live'
    };

    wrapper.vm.handleAdd('submit');
    expect(mockTwinShowData.length).toBe(1);
    expect(mockTwinShowData[0].btnTwin).toEqual(wrapper.vm.formData);
    expect(wrapper.vm.isError).toBe(true); // Should reset isError after submission
  });

  it('should reset form correctly', () => {
    wrapper.vm.resetForm();
    expect(wrapper.vm.formData).toEqual({
      nickname: '',
      fullname: '',
      phone: '',
      email: '',
      birthdate: '',
      birthorder: '',
      coffee: '',
      lovelanguage: [],
      motto: ''
    });
    expect(wrapper.vm.twinKey).toBe(1);
  });

  it('should validate text correctly', () => {
    expect(wrapper.vm.validateText(0, 5, 'test')).toBe(true);
    expect(wrapper.vm.validateText(0, 5, '')).toBe(false);
    expect(wrapper.vm.validateText(0, 5, 'longer than five')).toBe(false);
  });

  it('should check for errors correctly', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {}); // Mock alert

    // Set invalid form data
    wrapper.vm.formData = {
      nickname: '',
      fullname: 'John Doe',
      phone: '1234567890',
      email: 'invalid-email',
      birthdate: '',
      birthorder: '',
      coffee: '',
      lovelanguage: ['Words of Affirmation', 'Acts of Service'],
      motto: 'Live and Let Live'
    };

    // Check errors
    wrapper.vm.checkError();

    expect(window.alert).toHaveBeenCalledWith('Nickname should not be empty and exceed 20 characters.');
    expect(window.alert).toHaveBeenCalledWith('Invalid format');
    expect(window.alert).toHaveBeenCalledWith('Please enter your birth date');
    expect(window.alert).toHaveBeenCalledWith('Please enter your birth order');
    expect(window.alert).toHaveBeenCalledWith('Please pick 3 love language');
    expect(wrapper.vm.isError).toBe(true); // Should remain true since there are errors

    // Set valid form data
    wrapper.vm.formData.nickname = 'JohnDoe';
    wrapper.vm.formData.email = 'john.doe@example.com';
    wrapper.vm.formData.birthdate = '1990-01-01';
    wrapper.vm .formData.birthorder = '1';
    wrapper.vm.formData.coffee = 'Espresso';
    wrapper.vm.formData.lovelanguage = ['Words of Affirmation', 'Acts of Service', 'Receiving Gifts'];

    // Check no errors
    wrapper.vm.checkError();
    expect(window.alert).not.toHaveBeenCalledWith('Nickname should not be empty and exceed 20 characters.');
    expect(window.alert).not.toHaveBeenCalledWith('Invalid format');
    expect(window.alert).not.toHaveBeenCalledWith('Please enter your birth date');
    expect(window.alert).not.toHaveBeenCalledWith('Please enter your birth order');
    expect(window.alert).not.toHaveBeenCalledWith('Please pick 3 love language');
    expect(wrapper.vm.isError).toBe(false); // Should be false since there are no errors
  });
});