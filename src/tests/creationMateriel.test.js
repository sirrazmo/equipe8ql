import { vi } from 'vitest';  // Importer vi pour le mocking
import { mount } from '@vue/test-utils';
import CreationMateriel from '../components/CreationMateriel.vue';

// Mock fetch (car node-fetch est utilisé dans ton projet)
vi.stubGlobal('fetch', vi.fn());  // Remplace global.fetch par une fonction mock

// Mock alert si nécessaire (si tu veux éviter les erreurs liées à l'absence de `alert`)
vi.stubGlobal('alert', vi.fn());  // Simule alert()

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
