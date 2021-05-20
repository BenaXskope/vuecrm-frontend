<template>
    <div>
        <Loader v-if="loading"/>
        <div class="app-main-layout" v-else>

            <Navbar @click="isOpen = !isOpen" />

            <Sidebar v-model="isOpen" />


            <main class="app-content" :class="{full: !isOpen}">
                <div class="app-page">
                    <router-view />
                </div>
            </main>

            <div class="fixed-action-btn">
                <router-link class="btn-floating btn-large" to="/record" v-tooltip="this.CreateNewRecord" :key="locale">
                    <i class="large material-icons">add</i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from '@/components/app/Navbar'
    import Sidebar from '@/components/app/Sidebar'
    import messages from "../utils/messages"
    import localizeFilter from "../../filters/localize.filter"

    export default {
        name: "main-layout",
        data: () => ({
            isOpen: true,
            loading: true,
            CreateNewRecord: localizeFilter("СreateNewRecord")
        }),
        computed: {
            error() {
                return this.$store.getters.error
            },
            locale() {
                return this.$store.getters.info.locale
            }
        },
        watch: {
            error(fbError) {
                this.$error(localizeFilter('Error_' + messages[fbError.code] || 'Error_Standard'))
            },
            locale() {
                this.CreateNewRecord = localizeFilter("СreateNewRecord")
            }
        },
        components: {
            Navbar, Sidebar
        },
        async mounted() {
            if (!Object.keys(this.$store.getters.info).length) {
                await this.$store.dispatch('fetchInfo')
            }
            this.loading = false
        }
    }
</script>

<style scoped>

</style>