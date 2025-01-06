<template>

    <div class="has-background-color has-text-color" style="min-height: 73vh;">
        <div class="container is-fluid">
            <div class="columns is-mobile">
                <div class="column">
                    <div class="container is-fluid">

                        <p>Nom : </p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" placeholder="Nom : " id="Nom" required>
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-id-card-clip"></i>
                            </span>
                        </p>

                        <p>Référence :</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" placeholder="Ref : " id="Reference" required>
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
                            <input class="input" type="text" placeholder="Version : " id="Version" required>
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-gears"></i>
                            </span>
                        </p>

                        <p>Numéro :</p>
                        <p class="control has-icons-left">
                            <input class="input" type="text" placeholder="Numero : " id="Numero" required>
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
                                <img
                                    src="https://th.bing.com/th/id/OIP.wnawMCUfxxFji_IDaeq9DQHaGG?w=219&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
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
    /* eslint-disable */
    name: 'InfoMateriel',
    data() {
        return {
            Nom: '',
            Version: '',
            Reference: '',
            Numero: '',
            DateDebut: '',
            DateFin: '',
        };
    },

    methods: {
        reserver() {
            alert('Reserver appelée')
        },
        modifier() {
            alert('Modifier appelé');
        },
        supprimer() {
            alert('Supprimer appelé');

        }
    }
};
</script>


<style scoped></style>