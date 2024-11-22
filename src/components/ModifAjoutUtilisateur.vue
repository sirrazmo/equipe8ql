<template>

    <div class="container is-fluid">
        <section class="hero is-primary">
            <div class="hero-body">
                <p class="title">
                    Modification et ajout d'utilisateur
                </p>
                <p class="subtitle">
                    Modification et ajout d'utilisateur
                </p>
            </div>
        </section>
        <section class="hero is-info">
            <br>
            <div class="columns is-mobile">
                <div class="column">
                    <p>Nom :</p>
                    <p class="control has-icons-left">
                        <input class="input" type="text" placeholder="Nom : " id="Nom" required>
                        <span class="icon is-small is-left">
                            <i class="fa-solid fa-user"></i>
                        </span>
                    </p>
                    <a></a>
                    <br>

                    <p>Prénom :</p>
                    <p class="control has-icons-left">
                        <input class="input" type="text" placeholder="Prénom : " id="Prenom" required>
                        <span class="icon is-small is-left">
                            <i class="fa-solid fa-user"></i>
                        </span>
                    </p>

                    <br><br>

                    <input type="radio" id="administrateur" name="admin" v-model="choix">
                    <label for="administrator">Administrateur</label>
                    <br>
                    <input type="radio" id="utilisateur" name="admin" v-model="choix">
                    <label for="administrator">Utilisateur</label>
                </div>



                <div class="column">
                    <p>Email : </p>
                    <p class="control has-icons-left">
                        <input class="input" type="email" placeholder="Mail : " id="Email" required>
                        <span class="icon is-small is-left">
                            <i class="fa-solid fa-at"></i>
                        </span>
                    </p>

                    <br>

                    <p>Matricule :</p>
                    <p class="control has-icons-left">
                        <input class="input" type="text" placeholder="Matricule : " id="Matricule" required>
                        <span class="icon is-small is-left">
                            <i class="fa-solid fa-id-card-clip"></i>
                        </span>
                    </p>

                    <br>

                    <p>Mot de passe :</p>
                    <p class="control has-icons-left">
                        <input class="input" type="password" placeholder="Password" id="MotDePasse" required>
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
            </div>

            <div class="columns is-centered">
                <div class="column is-narrow">
                    <button class="button is-warning is-rounded is-center" @click="Valider">
                        Valider
                    </button>
                </div>
            </div>
            <br>
        </section>
    </div>




</template>

<script>


export default {
    /* eslint-disable */
    name: 'ModifAjoutUtlisateur',
    data() {
        return {
            Nom:'',
            Prenom:'',
            Matricule:'',
            MotDePasse:'',
            Email:'',
            choix:'utilisateur'
        };
    },

    methods: {
        Valider() {
            alert('Valider appeler')
        }
    }
};
</script>


<style scoped></style>