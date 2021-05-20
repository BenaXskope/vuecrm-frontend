<template>
    <div>
        <Loader v-if="loading" />
        <div v-else-if="record">
            <div class="breadcrumb-wrap">
                <router-link to="/history" class="breadcrumb">{{'Menu_History' | localize}}</router-link>
                <a @click.prevent class="breadcrumb">
                    {{localize(record.type === 'income' ? 'Income' : 'Outcome')}}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div class="card" :class="{
                         'grey': record.type ==='outcome',
                         'green': record.type === 'income'
                         }"
                    >
                        <div class="card-content white-text">
                            <p>{{'Description' | localize}}: {{record.description}}</p>
                            <p>{{'Amount' | localize}}: {{record.amount | currency}}</p>
                            <p>{{'Category' | localize}}: {{record.categoryName}}</p>

                            <small>{{record.date | date('datetime')}}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="center" v-else><strong>Запись с id={{$route.params.id}} не найдена</strong></p>
    </div>
</template>

<script>
    import localizeFilter from "../../filters/localize.filter";

    export default {
        name: "Detail",
        data: () => ({
            record: null,
            loading: true
        }),
        methods: {
            localize(key) {
                return localizeFilter(key)
            }
        },
        async mounted() {
            const id = this.$route.params.id
            const record = await this.$store.dispatch('fetchRecordById', id)
            console.log(record)
            const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
            console.log(category)
            this.record = {
                ...record,
                categoryName: category.title,

            }

            this.loading = false
        }
    }
</script>

<style scoped>

</style>