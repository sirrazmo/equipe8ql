<template>

    <div class="has-background-color has-text-color" style="min-height: 73vh;">
        <div class="container is-fluid" >
            <div class="columns is-mobile">
                <div class="column">
                    <div class="container is-fluid">

                        <p>Nom : </p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.nom" id="Nom" readonly>
                             
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-id-card-clip"></i>
                            </span>
                            
                            
                        </p>

                        <p>Référence :</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.reference" id="Reference" readonly>
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
                            <input class="input" type="text" v-model="this.version" id="Version" readonly>
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-gears"></i>
                            </span>
                        </p>

                        <p>Numéro :</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" v-model="this.numero" id="Numero" readonly>
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
                                <img :src="this.image"/>
                            </figure>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <br>
                    <button class="button is-warning is-rounded is-center" @click="modifier">
                        Modifier
                    </button>
                    <br> <br>
                    <button class="button is-warning is-rounded is-center" @click="supprimer">
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
        <br>
        <div class="container is-fluid">
            <p class="is-size-3 has-text-centered">Réservation : </p>
            <div class="columns is-mobile">
                <div class="column">
                    <p>Date de début :</p>
                    <p class="control has-icons-left">
                        <input class="input" type="date" placeholder="Date de début : " id="DateDebut" required>
                        <span class="icon is-small is-left">
                            <i class="fa-solid fa-calendar-days"></i>
                        </span>
                    </p>
                </div>

                <div class="column">
                    <p>Date de fin :</p>
                    <p class="control has-icons-left">
                        <input class="input" type="date" placeholder="Date de fin : " id="DateFin" required>
                        <span class="icon is-small is-left">
                            <i class="fa-solid fa-calendar-days"></i>
                        </span>
                    </p>
                </div>
            </div>
            <div class="container is-fluid">
                <div class="columns is-centered">
                    <div class="column is-narrow">
                        <button class="button is-warning is-rounded is-center" @click="reserver">
                            Reserver
                        </button>
                    </div>
                </div>
            </div>
            <br>
        </div>
    </div>

</template>

<script>

import { db } from '../firebase.js';
import { doc,getDoc, deleteDoc} from 'firebase/firestore';
import router from '@/router.js';
export default {
    /* eslint-disable */
    name: 'InfoMateriel',

    data() {
        return {
            nom:"",
            version:"",
            numero:"",
            image:"",
            reference:"",
        };
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

        reserver() {
            alert('Reserver appelée')
        },
        modifier() {
            alert('Modifier appelé');
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