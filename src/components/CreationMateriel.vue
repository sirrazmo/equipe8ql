<template>
<div class="container">
    <section class="hero is-primary">
      <div class="hero-body">
        <p class="title">
          Création d'un matériel
        </p>
      </div>
    </section>
</div>

<div class="container">
  <section class="hero is-info">
    <div class="field">
      <label class="label">Nom</label>
      <div class="control">
        <input class="input" type="text" name="nom" placeholder="Nom" required>
      </div>
    </div>

<div class="field">
  <label class="label">Version</label>
  <div class="control">
    <input class="input" type="text" name="version" placeholder="Version" required>
  </div>
</div>

<div class="field">
  <label class="label">Ref</label>
  <div class="control">
    <input class="input" type="text" name="reference" placeholder="Ref : AN185 / AP748 / XX784" required>
  </div>
</div>

<label class="label">Image</label>
<div class="file is-primary"> 
  <label class="file-label">
    <input class="file-input" type="file" name="image" @change="selectionFichier"/>
    <span class="file-cta">
      <span class="file-icon">
        <i class="fas fa-upload"></i>
      </span>
      <span class="file-label">Choisir une image...</span>
    </span>
    <span v-if="file" class="file-name">{{ file.name }}</span>
  </label>
</div>

<div class="field">
  <label class="label">N° de téléphone</label>
  <div class="control">
    <input class="input" type="tel" name="telephone" placeholder="ex : 0678145936" required>
  </div>
</div>
<div class="field">
        <div class="columns is-centered">
          <div class="column is-narrow">
            <p class="control">
              <button class="button is-warning is-rounded is-center" @click="verificationMateriel(nom, version,reference,telephone)">
                Créer le matériel
              </button>
            </p>
            <br>
          </div>
        </div>
      </div>
        </section>
      </div>
</template>

<script>

export default {
    name: 'creationMateriel',
    data() {
        return {
          file:null
        };
    },
    methods: {
      verificationMateriel(nom,version,reference,telephone) {
        if (nom > 30 && nom < 1 ) {
          alert('Nom invalide !');
        }
        if (version > 15 && version < 3) {
          alert('version incomplete ou trop longue')
        }
        if (reference != 5) {
          alert('reference incomplete ou trop longue')
        }
        if (telephone != 10) {
          alert('telephone incomplet ou trop long')
        }
      },

      selectionFichier(event) {
        this.file = event.target.files[0];
      }
    }
};

</script>


<style scoped></style>