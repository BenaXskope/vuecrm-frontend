<template>
    <div>
        <div class="page-title">
            <h3>{{'RecordHistory' | localize}}</h3>
        </div>

        <div class="history-chart">
            <canvas ref="canvas"></canvas>
        </div>

        <Loader v-if="loading" />

        <p class="center" v-else-if="!records.length">{{'Message_NoRecords' | localize}} <router-link to="/record">{{"Message_AddNewRecord" | localize}}</router-link> </p>

        <section v-else>
            <HistoryTable :records="items"/>
            <Paginate
                v-model="page"
                :page-count="pageCount"
                :click-handler="pageChangeHandler"
                :prev-text="'Pagination_Prev' | localize"
                :next-text="'Pagination_Next' | localize"
                :container-class="'pagination'"
                :page-class="'waves-effect'"
                :active-class="'active teal'"
            />
        </section>
    </div>
</template>

<script>
    import HistoryTable from "../components/HistoryTable"
    import paginationMixin from "../mixins/pagination.mixin"
    import localizeFilter from "../../filters/localize.filter"
    import {Pie} from 'vue-chartjs'

    export default {
        name: "History",
        extends: Pie,
        mixins: [paginationMixin],
        metaInfo() {
            return {
                title: this.$title('Menu_History')
            }
        },
        data: () => ({
            loading: true,
            records: []
        }),
        components: {
            HistoryTable
        },
        computed: {
            locale() {
                return this.$store.getters.info.locale
            }
        },
        methods: {
            setup(categories) {
                //console.log(categories)
                //console.log(record)
                this.setupPagination(this.records.map(record => {
                    return {
                        ...record,
                        categoryName: categories.find(cat => cat.id === record.categoryId).title,
                        typeClass: record.type === 'income' ? 'green' : 'red',
                        typeText: record.type === 'income' ? 'Income' : 'Outcome'
                    }
                }))
            },
        },
        async mounted() {
            this.records = await this.$store.dispatch('fetchRecords')
            const categories = await this.$store.dispatch('fetchCategories')

            this.setup(categories)
            this.renderChart({
                labels: categories.map(c => c.title),
                datasets: [{
                    label: 'Расходы по категориям',
                    data: categories.map(c => {
                        return this.records.reduce((total, r) => {
                            if (r.categoryId === c.id && r.type ==='outcome')
                            {
                                total += +r.amount
                            }
                            return total
                        },0)
                    }),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            })
            this.loading = false
        }
    }
</script>

<style scoped>
    #app .pagination li.active a {
        color: #000;
    }
</style>