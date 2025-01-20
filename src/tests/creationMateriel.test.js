import { mount } from '@vue/test-utils';
import CreationMateriel from '../components/CreationMateriel.vue';

// Mock Firebase functions
jest.mock('firebase', () => ({
  getAuth: jest.fn(() => ({
    currentUser: { email: 'admin@admin.com' },
  })),
  collection: jest.fn(),
  addDoc: jest.fn(() => Promise.resolve({ id: 'mocked-id' })),
}));

describe('CreationMateriel.vue', () => {
  it('renders the form and validates input', async () => {
    const wrapper = mount(CreationMateriel);

    // Simulate valid inputs
    await wrapper.setData({
      nom: 'Valid Name',
      version: 'v1.0',
      reference: 'AN123',
      telephone: '0612345678',
    });

    // Trigger the create material function
    await wrapper.find('button').trigger('click');

    // Assert no errors and mock Firebase call
    expect(wrapper.vm.nameError).toBe('');
    expect(wrapper.vm.versionError).toBe('');
    expect(wrapper.vm.referenceError).toBe('');
    expect(wrapper.vm.telephoneError).toBe('');
    expect(wrapper.vm.verificationMateriel(wrapper.vm.nom, wrapper.vm.version, wrapper.vm.reference, wrapper.vm.telephone)).toBe(true);
  });
});
