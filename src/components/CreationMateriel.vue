<template>
  <div class="has-background-color" style="min-height: 73vh;">
    <div class="container">
      <p class="title" style="padding-top: 1%; padding-bottom: 1%;">
        Creation of material
      </p>
    </div>

    <div class="container">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" v-model="nom" placeholder="Name" required>
        </div>
        <p class="help is-danger" v-if="nameError">{{ nameError }}</p>
      </div>

      <div class="field">
        <label class="label">Type</label>
        <div class="control">
          <input class="input" type="text" v-model="type" placeholder="type" required>
        </div>
        <p class="help is-danger" v-if="typeError">{{ typeError }}</p>
      </div>

      <div class="field">
        <label class="label">Version</label>
        <div class="control">
          <input class="input" type="text" v-model="version" placeholder="Version" required>
        </div>
        <p class="help is-danger" v-if="versionError">{{ versionError }}</p>
      </div>

      <div class="field">
        <label class="label">Reference</label>
        <div class="control">
          <input class="input" type="text" v-model="reference" placeholder="Ref : AN185 / AP748 / XX784" required>
        </div>
        <p class="help is-danger" v-if="referenceError">{{ referenceError }}</p>
      </div>


      <label class="label">Picture</label>
      <div class="file is-primary">
        <label class="file-label">
          <input class="file-input" type="file" name="image" @change="selectionFichier" />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">Choose a Picture...</span>
          </span>
          <span v-if="file" class="file-name">{{ file.name }}</span>
        </label>
      </div>


      <div class="field">
        <label class="label">Phone number</label>
        <div class="control">
          <input class="input" type="tel" v-model="telephone" @keydown="checkDigit" placeholder="ex : 0678145936"
            required>
        </div>
        <p class="help is-danger" v-if="telephoneError">{{ telephoneError }}</p>
      </div>
      <div class="field">
        <div class="columns is-centered">
          <div class="column is-narrow">
            <p class="control">
              <button class="button is-warning is-rounded is-center" type="submit" @click="creerMateriel(verificationMateriel(nom, version, reference, telephone))">
                Create the material
              </button>
            </p>
            <br>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import router from '@/router.js';
import { getAuth } from 'firebase/auth';

export default {
  async mounted() {
    const auth = getAuth();
    if (!auth.currentUser) {
      alert("Vous n'êtes pas connecté, connectez-vous pour accéder à la page.");
      router.push("/");
    }
    else {
      if (auth.currentUser.email != "admin@admin.com") {
        alert("Vous n'êtes pas autorisé à accéder à cette page.");
        router.push("/");
      }
    }
  },
  name: 'creationMateriel',
  data() {
    return {
      file: null,
      telephone: "",
      reference: "",
      version: "",
      nom: "",
      imagePath: "",
      nameError: "",
      versionError: "",
      referenceError: "",
      telephoneError: ""
    };
  },

  methods: {


    async creerMateriel(verif) {
      if (verif){
        const docRef = await addDoc(collection(db, "materiels"), {
          Nom: this.nom,
          Type: this.type,
          Version: this.version,
          Reference: this.reference,
          Numero: parseInt(this.telephone),
        });
        console.log("Document written with ID: ", docRef.id);
        alert("Ajout du matériel réussi");
        router.push("/");
      }
    },

    verificationMateriel(nom, version, reference, telephone) {
      this.nameError = "";
      this.versionError = "";
      this.referenceError = "";
      this.telephoneError = "";
      if (!nom || nom.length < 1 || nom.length > 30) {
        this.nameError = "The name must be between 1 and 30 characters.";
        return false;
      }

      if (!version || version.length < 3 || version.length > 15) {
        this.versionError = "The version must be between 3 and 15 characters.";
        return false;
      }

      if (!reference || !/^(AN|AP|XX)\d{3}$/.test(reference)) {
        this.referenceError = "The reference must start with AN, AP, or XX and be followed by 3 digits.";
        return false;
      }

      if (!telephone || !/^\d{10}$/.test(telephone)) {
        this.telephoneError = "The phone number must be 10 digits.";
        return false;
      }

      return true;
    },

    selectionFichier(event) {
      this.file = event.target.files[0];
    },



    checkDigit(event) {
      if (event.key.length == 1 && isNaN(Number(event.key))) {
        event.preventDefault();
      }
    }
  }
};

</script>


<style scoped></style>