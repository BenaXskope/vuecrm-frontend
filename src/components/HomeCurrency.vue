<template>
    <div class="col s12 m6 l8">
        <div class="card grey bill-card">
            <div class="card-content white-text">
                <div class="card-header">
                    <span class="card-title">{{'ExchangeRates'| localize}}</span>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>{{'Currency' | localize}}</th>
                        <th>{{'Rate' | localize}}</th>
                        <th>{{'Date' | localize}}</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr v-for="cur of currencies" :key="cur">
                        <td>{{cur}}</td>
                        <td>{{rubRates[cur].toFixed(2)}}</td>
                        <td>{{date | date}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeCurrency",
        props: ['rates', 'date'],
        data: () => ({
            currencies: ['RUB','USD','EUR']
        }),
        computed: {
            rubRates() {
                return {
                    'RUB':1,
                    'USD': 1 / this.rates['USD'],
                    'EUR': 1 / this.rates['EUR']
                }
            }
        }
    }
</script>

<style scoped>

</style>