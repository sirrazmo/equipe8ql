<template>
  <div class="has-background-color" style="min-height: 73vh;">
    <div class="container">
        <p class="title" style="padding-top: 1%; padding-bottom: 1%;">
          Creation of material
        </p>
    </div>

    <button @click="creerMateriel()"> CREER</button>
  
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
      <input class="file-input" type="file" name="image" @change="selectionFichier"/>
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
      <input class="input" type="tel" v-model="telephone"  @keydown="checkDigit" placeholder="ex : 0678145936" required>
    </div>
  </div>
  <div class="field">
          <div class="columns is-centered">
            <div class="column is-narrow">
              <p class="control">
                <button class="button is-warning is-rounded is-center" type="submit" @click="creerMateriel()">
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
  import { db} from '../firebase.js';


  export default {
      name: 'creationMateriel',
      data() {
          return {
            file:null,
            telephone:"",
            reference:"",
            version:"",
            nom:"",
            imagePath:"",
            nameError: "",
            versionError:"",
            referenceError:""
          };
      },
     
      methods: {

        async creerMateriel()  {

          const docRef = await addDoc(collection(db, "materiels"), {
            Nom: this.nom,
            Type: this.type,
            Version: this.version,
            Reference: this.reference,
            Numero: parseInt(this.telephone),
          });
          console.log("Document written with ID: ", docRef.id);


        },

        verificationMateriel(nom, version, reference, telephone) {
          const errors = [];

          if (!nom || nom.length < 1 || nom.length > 30) {
            errors.push("The name must be between 1 and 30 characters.");
          }

          if (!version || version.length < 3 || version.length > 15) {
            errors.push("The version must be between 3 and 15 characters.");
          }

          if (!reference || !/^(AN|AP|XX)\d{3}$/.test(reference)) {
            errors.push("The reference must start with AN, AP, or XX and be followed by 3 digits.");
          }

          if (!telephone || !/^\d{10}$/.test(telephone)) {
            errors.push("The phone number must be 10 digits.");
          }

          if (errors.length > 0) {
            alert(errors.join("\n"));
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