import { mount } from '@vue/test-utils';
import CreationMateriel from '@/components/CreationMateriel.vue';  // Assure-toi que le chemin d'importation est correct

describe('CreationMateriel.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CreationMateriel);
  });

  it('devrait retourner une erreur si le nom est supérieur à 30 caractères', async () => {
    // Simuler une entrée dans le champ 'nom'
    const longNom = 'a'.repeat(31);  // 31 caractères, ce qui est trop long
    await wrapper.setData({ nom: longNom });

    // Appeler la méthode de validation
    const result = wrapper.vm.verificationMateriel(wrapper.vm.nom, wrapper.vm.version, wrapper.vm.reference, wrapper.vm.telephone);

    // Vérifier que la validation échoue et que l'erreur correspond
    expect(result).toBe(false);
    expect(wrapper.vm.nameError).toBe("The name must be between 1 and 30 characters.");
  });

  it("ne devrait pas retourner d'erreur si le nom est correct", async () => {
    // Simuler une entrée correcte dans le champ 'nom'
    const validNom = 'Valid Name';  // Un nom de moins de 30 caractères
    await wrapper.setData({ nom: validNom });

    // Appeler la méthode de validation
    const result = wrapper.vm.verificationMateriel(wrapper.vm.nom, wrapper.vm.version, wrapper.vm.reference, wrapper.vm.telephone);

    // Vérifier que la validation réussit
    expect(result).toBe(true);
    expect(wrapper.vm.nameError).toBe("");  // Pas d'erreur
  });
});