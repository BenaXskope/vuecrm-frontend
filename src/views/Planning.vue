<template>
    <div>
        <div class="page-title">
            <h3>{{'Menu_Planning' | localize}}</h3>
            <h4>{{info.bill | currency('RUB')}}</h4>
        </div>

        <Loader v-if="loading" />

        <p class="center" v-else-if="!categories.length"> {{'Message_NoCategories' | localize}} <router-link to="/categories">
            {{'Message_AddNewCategory' | localize}}</router-link></p>

        <section v-else>
            <div v-for="cat of categories" :key="cat.id">
                <p>
                    <strong>{{cat.title}}:</strong>
                    {{cat.spend | currency('RUB')}} {{'OutOf' | localize}} {{cat.limit | currency('RUB')}}
                </p>
                <div class="progress" v-tooltip="cat.tooltip" :key="locale">
                    <div
                            class="determinate"
                            :class="cat.progressColor"
                            :style="{width: cat.
                             progressPercent + '%'}"
                    ></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import currencyFilter from "../../filters/currency.filter";
    import localizeFilter from "../../filters/localize.filter";

    export default {
        name: "Planning",
        metaInfo() {
            return {
                title: this.$title('Menu_Planning')
            }
        },
        data: () => ({
            loading: true,
            categories: []
        }),
        computed: {
            ...mapGetters(['info']),
            locale() {
                return this.info.locale
            }
        },
        watch: {
            locale() {
                for (let idx=0; idx < this.categories.length; idx++) {
                    const tooltipValue = this.categories[idx].limit - this.categories[idx].spend
                    const tooltip = `${tooltipValue < 0 ? localizeFilter('ExcessBy') : localizeFilter('Left')} ${currencyFilter(Math.abs(tooltipValue))}`
                    this.categories[idx].tooltip = tooltip
                }
            }
        },
        async mounted() {
            const records = await this.$store.dispatch('fetchRecords')
            const categories = await this.$store.dispatch('fetchCategories')

            this.categories = categories.map(cat => {
                const spend = records
                    .filter(r => r.categoryId === cat.id)
                    .filter(r => r.type === 'outcome')
                    .reduce((total, record) => {
                        return total += +record.amount
                    }, 0)

                const percent = 100 * spend / cat.limit
                const progressPercent = percent > 100 ? 100 : percent

                const progressColor = percent < 60
                    ? 'green'
                    : percent < 100
                        ? 'yellow'
                        : 'red'

                const tooltipValue = cat.limit - spend
                const tooltip = `${tooltipValue < 0 ? localizeFilter('ExcessBy') : localizeFilter('Left')} ${currencyFilter(Math.abs(tooltipValue))}`

                return {
                    ...cat,
                    progressPercent,
                    progressColor,
                    spend,
                    tooltip
                }
            })

            this.loading = false
        }
    }
</script>

<style scoped>

</style>