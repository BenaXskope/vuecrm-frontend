<template>
    <div>
        <div class="page-title">
            <h3>{{'ProfileTitle' | localize}}</h3>
        </div>

        <form class="form" @submit.prevent="submitHandler">
            <div class="input-field">
                <input
                        id="description"
                        type="text"
                        v-model="name"
                        :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
                >
                <label for="description">{{'Name' | localize}}</label>
                <span
                        class="helper-text invalid"
                        v-if="$v.name.$dirty && !$v.name.required"
                >{{'Message_EnterName' | localize}}</span>
            </div>



            <button class="btn waves-effect waves-light" type="submit">
                {{'Update' | localize}}
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {email, minLength, required} from "vuelidate/lib/validators";
    import localizeFilter from "../../filters/localize.filter";

    export default {
        name: "Profile",
        metaInfo() {
            return {
                title: this.$title('ProfileTitle')
            }
        },
        data: () => ({
            name: ''
        }),
        validations: {
            name: {required}
        },
        computed: {
            ...mapGetters(['info'])
        },
        methods: {
            ...mapActions(['updateInfo']),
            async submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                try {
                    await this.updateInfo({
                        name: this.name
                    })
                    setTimeout(() => {
                        this.$v.$reset()
                        },)
                    }
                catch (e) {
                }
            }
        },
        async mounted() {
            this.name = this.info.name

            setTimeout(() => {
                M.updateTextFields()
            }, 0)
        }
    }
</script>

<style scoped>


</style>