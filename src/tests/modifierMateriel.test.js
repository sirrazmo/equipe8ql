import { vi } from 'vitest';  // Importer vi pour le mocking
import { mount } from '@vue/test-utils';
import InfoMateriel from '../components/InfoMateriel.vue';
import { useVerificationMateriel } from '../verification.js';
import { expect } from 'vitest';

// Mock fetch (car node-fetch est utilisé dans ton projet)
vi.stubGlobal('fetch', vi.fn());  // Remplace global.fetch par une fonction mock

// Mock alert si nécessaire (si tu veux éviter les erreurs liées à l'absence de `alert`)
vi.stubGlobal('alert', vi.fn());  // Simule alert()


describe('InfoMateriel.vue', () => {
  it('renders the form and validates input', async () => {
    //Définition d'une route par défaut pour les tests (sans bugs)
        const wrapper = mount(InfoMateriel, {
            global: {
              mocks: {
                $route: {
                  params: { id: '4PDZMK7lrZTckGlbczVI' },
                },
              },
            },
          });

    // Simulate valid inputs
    await wrapper.setData({
      roleAdmin: false, 
      connecte:true,
      loading : false,
      nom: 'Valid Name',
      version: 'v1.0',
      reference: 'AN123',
      imagePath: 'https://example.com/image.png',
      numero: '0612345678',
    });

    //T033 - Accès page -> vérifie que le bouton modifier est bien invisible si l'on n'est pas admin
    const modifierButton2 = wrapper.find('#modifier');
    expect(modifierButton2.exists()).toBe(false);
    
    // On se connecte ensuite en admin pour faire les autres tests
    await wrapper.setData({roleAdmin: true});


      // Vérifiez que le bouton Modifier fonctionne -> T036
      const modifierButton = wrapper.find('#modifier');
      expect(modifierButton.exists()).toBe(true);
  
      // Déclencher l'action du bouton "modifier"
      await modifierButton.trigger('click');

    // Dans le cas où tout se passe bien
    expect(wrapper.vm.nameError).toBe('');
    expect(wrapper.vm.versionError).toBe('');
    expect(wrapper.vm.referenceError).toBe('');
    expect(wrapper.vm.telephoneError).toBe('');
    expect(useVerificationMateriel(
      wrapper.vm.nom,
      wrapper.vm.version,
      wrapper.vm.reference,
      wrapper.vm.imagePath,
      wrapper.vm.numero
    )).toBe(true);

    //T021 - Nom trop grand
    await wrapper.setData({nom : 'Valid NameValid NameValid NameValid NameValid NameValid NameValid Name'})
    await modifierButton.trigger('click');
    expect(wrapper.vm.nameError).toBe("Le nom doit être entre 1 et 30 caractères.")

    //T022 - Nom manquant
    await wrapper.setData({nom : ''})
    await modifierButton.trigger('click');
    expect(wrapper.vm.nameError).toBe("Le nom doit être entre 1 et 30 caractères.")

    //T023 - Version Trop grand
    await wrapper.setData({version : 'Versionvraimentbeaucouptroplongue'})
    await modifierButton.trigger('click');
    expect(wrapper.vm.versionError).toBe("La version doit être entre 3 et 15 caractères.")

    //T024 - Version Trop petite
    await wrapper.setData({version : 'a'})
    await modifierButton.trigger('click');
    expect(wrapper.vm.versionError).toBe("La version doit être entre 3 et 15 caractères.")

    //T025 - Version manquante
    await wrapper.setData({version : ''})
    await modifierButton.trigger('click');
    expect(wrapper.vm.versionError).toBe("La version doit être entre 3 et 15 caractères.")

    //T026 - Référence taille différente
    await wrapper.setData({reference : 'XX1234651236123'})
    await modifierButton.trigger('click');
    expect(wrapper.vm.referenceError).toBe("La référence doit commencer par AN, AP, ou XX et est suvie par 3 chiffres.")

    //T027 - Référence incohérente
    await wrapper.setData({reference : '12345'})
    await modifierButton.trigger('click');
    expect(wrapper.vm.referenceError).toBe("La référence doit commencer par AN, AP, ou XX et est suvie par 3 chiffres.")

    //T027 - Référence incohérente
    await wrapper.setData({reference : 'XXaez'})
    await modifierButton.trigger('click');
    expect(wrapper.vm.referenceError).toBe("La référence doit commencer par AN, AP, ou XX et est suvie par 3 chiffres.")

    //T028 - Référence manquante
    await wrapper.setData({reference : ''})
    await modifierButton.trigger('click');
    expect(wrapper.vm.referenceError).toBe("La référence doit commencer par AN, AP, ou XX et est suvie par 3 chiffres.")

    //T029 - Numéro trop grand
    await wrapper.setData({numero : '012345678912345'})
    await modifierButton.trigger('click');
    expect(wrapper.vm.telephoneError).toBe("Le numéro de téléphone doit correspondre à 10 chiffres.")

    //T030 - Numéro incohérent
    await wrapper.setData({numero : 'mon numero'})//on garde bien 10 caractères ici
    await modifierButton.trigger('click');
    expect(wrapper.vm.telephoneError).toBe("Le numéro de téléphone doit correspondre à 10 chiffres.")

    //T031 - Numéro manquant
    await wrapper.setData({numero : ''})
    await modifierButton.trigger('click');
    expect(wrapper.vm.telephoneError).toBe("Le numéro de téléphone doit correspondre à 10 chiffres.")

    //T032 - Image format incohérent
    await wrapper.setData({imagePath : 'https://example.com/image.test'})
    await modifierButton.trigger('click');
    expect(wrapper.vm.imageError).toBe("L'url n'est pas valide")

    
  });
});
