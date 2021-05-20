<template>
  <div>
    <div class="page-title">
      <h3>{{'Bill' | localize}}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill :rates="currency.rates"/>


      <HomeCurrency
              :rates="currency.rates"
              :date="currency.date"
      />

    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill"
import HomeCurrency from "@/components/HomeCurrency"

export default {
  name: 'Home',
  metaInfo() {
    return {
      title: this.$title('Menu_Bill')
    }
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  components: {
    HomeBill, HomeCurrency
  },
  async mounted() {
    const currency = await this.$store.dispatch('fetchCurrency')
    const rates = {'RUB':1, 'USD': currency.rates["USD"], 'EUR': currency.rates["EUR"]}
    this.loading = false
    this.currency = {
      date: currency.date,
      rates: rates
    }
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      await this.$store.dispatch('fetchInfo')
      this.loading = false
    }
  }
}
</script>
