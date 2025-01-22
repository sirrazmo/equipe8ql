<template>

    <div class="has-background-color has-text-color" style="min-height: 73vh;">
        <div class="container is-fluid">
            <div class="columns is-mobile">
                <div class="column">
                    <div class="container is-fluid">

                        <p>Nom : </p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.nom" id="Nom" :readonly="!roleAdmin">
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-id-card-clip"></i>
                            </span>
                        </p>
                        <p class="help is-danger" v-if="nameError">{{ nameError }}</p>

                        <p>Référence :</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.reference" id="Reference"
                                :readonly="!roleAdmin">
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-barcode"></i>
                            </span>
                        </p>
                        <p class="help is-danger" v-if="referenceError">{{ referenceError }}</p>

                    </div>
                </div>

                <div class="column">
                    <div class="container is-fluid">

                        <p>Version :</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.version" id="Version" :readonly="!roleAdmin">
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-gears"></i>
                            </span>
                        </p>
                        <p class="help is-danger" v-if="versionError">{{ versionError }}</p>
                        

                        <p>Numéro :</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.numero" id="Numero" :readonly="!roleAdmin">
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-list-ol"></i>
                            </span>
                        </p>
                        <p class="help is-danger" v-if="telephoneError">{{ telephoneError }}</p>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="container is-fluid has-color-background">
            <div class="columns ">
                <div class="column is-offset-one-fifth">
                    <div class="container is-fluid">
                        <div class="is-center">
                            <p class="is-center">Photo : </p>
                            <p class="control has-icons-left">
                            <input class="input is-small" style="width: 50%;" type="text" v-model="this.image" id="Image" v-if="roleAdmin">
                        </p>
                        <p class="help is-danger" v-if="imageError">{{ imageError }}</p>
                        <br>
                            <figure class="image is-128x128 is-center">
                                <img :src="this.image" />
                            </figure>
                        </div>
                       
                    </div>
                    
                </div>

                <div v-if="this.loading" class="has-text-centered">       
                </div>
                <div v-else>
                    <div class="column">
                        <p class="help is-info" id="Reservation"></p>
                        <br>
                        <button class="button is-warning is-rounded is-center" disabled="BoutonOff" @click="reserver" v-if="connecte" id="BoutonReservation">
                            Reserver
                        </button>
                        <br> <br>
                        <button class="button is-warning is-rounded is-center" @click="modifier" v-if="roleAdmin">
                            Modifier
                        </button>
                        <br> <br>
                        <button class="button is-warning is-rounded is-center" @click="supprimer" v-if="roleAdmin">
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>

import { db } from '../firebase.js';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import router from '../router.js';
import {useVerificationMateriel} from '../verification.js';

export default {
    /* eslint-disable */
    name: 'InfoMateriel',

    data() {
        return {
            nom: "",
            version: "",
            numero: "",
            image: "",
            reference: "",
            nameError: "",
            versionError: "",
            referenceError: "",
            telephoneError: "",
            imageError:"",
            roleAdmin: true,
            connecte: true,
            loading: true,
            
        };
    },

    async mounted() {
        const materielRef = doc(db, "materiels", this.$route.params.id);
        const materiel = await getDoc(materielRef);
        const auth = getAuth();
        if (!auth.currentUser) {
            this.roleAdmin = false;
            this.connecte = false;
        }
        else {
            
            if (auth.currentUser.email != "admin@admin.com" && auth.currentUser.email != "admin2@admin.com" ) {
                this.roleAdmin = false;
            }
        }

        if (materiel.get("ReserverPar") == "") {
            document.getElementById("Reservation").innerText = "Ce matériel n'est actuellement pas réservé.";;
            document.getElementById("BoutonReservation").removeAttribute("disabled");
        }
        else if(!auth.currentUser)
        {
            document.getElementById("Reservation").innerText = "Connectez-vous pour pouvoir réserver ce matériel.";
        }
        else if (auth.currentUser.email == materiel.get("ReserverPar")) {
            document.getElementById("Reservation").innerText = "Vous réservez actuellement ce matériel.";
            document.getElementById("BoutonReservation").removeAttribute("disabled");
            document.getElementById("BoutonReservation").innerText = "Rendre";
        }
        else {
            document.getElementById("Reservation").innerText = "Ce document est réservé par quelqu'un d'autre.";
            document.getElementById("BoutonReservation").setAttribute("disabled","BoutonOff");
        }
    },

    created() {
        this.getMateriel();
        
    },

    methods: {
        async getMateriel() {
            const materielRef = doc(db, "materiels", this.$route.params.id);
            const materiel = await getDoc(materielRef);

            this.nom = materiel.get("Nom");
            this.version = materiel.get("Version");
            this.numero = materiel.get("Numero");
            this.image = materiel.get("Photo_url");
            this.reference = materiel.get("Reference");
            this.loading = false;
            
        },

        async reserver() {
            const auth = getAuth();
            const materielRef = doc(db, "materiels", this.$route.params.id)
            const materiel = await getDoc(materielRef);
            if (materiel.get("ReserverPar") == "") {
                await updateDoc(materielRef, {
                    ReserverPar: auth.currentUser.email,

                })
                document.getElementById("message").innerText = "Matériel réservé";
            }
            else if (auth.currentUser.email == materiel.get("ReserverPar")) {
                await updateDoc(materielRef, {
                    ReserverPar: "",
                })
                document.getElementById("message").innerText = "Matériel rendu";
            }
            else {
                alert("Le matériel est déjà emprunté par quelqu'un d'autre !");
            }
            router.push("/");

        },
        async modifier() {
            let verif = false;
            try {
                this.nameError = "";
                this.versionError = "";
                this.referenceError = "";
                this.imageError = "";
                this.telephoneError = "";
                verif = useVerificationMateriel(this.nom,this.version,this.reference,this.image,this.numero);
            } catch (e) {
                for(const error of e) {
                    if (error.code == 1) { this.nameError = error.message; }
                    if (error.code == 2) { this.versionError = error.message; }
                    if (error.code == 3) { this.referenceError = error.message; }
                    if (error.code == 4) { this.imageError = error.message; }
                    if (error.code == 5) { this.telephoneError = error.message; }
                }
            }

            if (verif) {
                const materielRef = doc(db, "materiels", this.$route.params.id)
                await updateDoc(materielRef, {
                Nom: this.nom,
                Numero: this.numero,
                Reference: this.reference,
                Photo_url: this.image,
                Version: this.version
                })
            }
           
           
        },
        async supprimer() {
            await deleteDoc(doc(db, "materiels", this.$route.params.id));
            document.getElementById("message").innerText = "Matériel supprimé";
            router.push("/");
        },
    }
};
</script>


<style scoped></style>