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

                        <p>Référence :</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.reference" id="Reference"
                                :readonly="!roleAdmin">
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-barcode"></i>
                            </span>
                        </p>

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

                        <p>Numéro :</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.numero" id="Numero" :readonly="!roleAdmin">
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-list-ol"></i>
                            </span>
                        </p>

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
                            <figure class="image is-128x128 is-center">
                                <img :src="this.image" />
                            </figure>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <br>
                    <button class="button is-warning is-rounded is-center" @click="modifier" v-if="roleAdmin">
                        Modifier
                    </button>
                    <br> <br>
                    <button class="button is-warning is-rounded is-center" @click="supprimer" v-if="roleAdmin">
                        Supprimer
                    </button>
                    <br> <br>
                    <button class="button is-warning is-rounded is-center" @click="reserver" v-if="connecte">
                        Reserver
                    </button>
                </div>
            </div>
        </div>
    </div>


</template>

<script>

import { db } from '../firebase.js';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import router from '@/router.js';
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
            roleAdmin: true,
        };
    },

    async mounted() {
        const auth = getAuth();
        this.connecte = true
        if (!auth.currentUser) {
            this.roleAdmin = false;
            this.connecte = false;
        }
        else {
            if (auth.currentUser.email != "admin@admin.com") {
                this.roleAdmin = false;
            }
        }
        
    },

    created() {
        this.getMateriel();
        console.log("Nom : " + this.nom);
    },

    methods: {
        async getMateriel() {
            const materielRef = doc(db, "materiels", this.$route.params.id)
            const materiel = await getDoc(materielRef);

            this.nom = materiel.get("Nom");
            this.version = materiel.get("Version");
            this.numero = materiel.get("Numero");
            this.image = materiel.get("Photo_url");
            this.reference = materiel.get("Reference");
        },

        async reserver() {
            const auth = getAuth();
            const materielRef = doc(db, "materiels", this.$route.params.id)
            const materiel = await getDoc(materielRef);
            if (materiel.get("ReserverPar") == "") {
                await updateDoc(materielRef, {
                    ReserverPar: auth.currentUser.email,
                   
                })
                alert("Réservé !");
            }
            else if(auth.currentUser.email == materiel.get("ReserverPar"))
            {
                await updateDoc(materielRef, {
                    ReserverPar: "",
                })
                alert("Rendu !")
            }
            else {
                alert("Le matériel est déjà emprunté par quelqu'un d'autre !")
            }
            router.push("/")
            
        },
        async modifier() {
            const materielRef = doc(db, "materiels", this.$route.params.id)
            await updateDoc(materielRef, {
                Nom: this.nom,
                Numero: this.numero,
                Reference: this.reference,
                Version: this.version
            })
        },
        async supprimer() {
            await deleteDoc(doc(db, "materiels", this.$route.params.id));
            alert('Matériel supprimé !');
            router.push("/");
        }
    }
};
</script>


<style scoped></style>