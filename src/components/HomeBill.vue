<template>
    <div class="col s12 m6 l4">
        <div class="card teal lighten-1 bill-card">
            <div class="card-content white-text">
                <span class="card-title">{{'CurrencyAccount' | localize}}</span>

                <p
                        class="currency-line"
                        v-for="cur of currencies"
                        :key="cur"

                >
                    <span>
                        {{getCurrency(cur) | currency(cur)}}
                    </span>
                </p>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "HomeBill",
        props: ['rates'],
        data: () => ({
           currencies: ['RUB', 'USD', 'EUR']
        }),
        methods: {
            getCurrency(currency) {
                return (this.$store.getters.info.bill * this.rates[currency])
            }
        }
    }
</script>

<style scoped>

</style>