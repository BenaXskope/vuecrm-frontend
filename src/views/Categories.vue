<template>
    <div>
        <div class="page-title">
            <h3>{{'Categories' | localize}}</h3>
        </div>
        <section>
            <Loader v-if="loading"/>
            <div class="row" v-else>
                <CategoryCreate @created="addNewCategory"/>

                <CategoryEdit
                    v-if="categories.length"
                    @updated="updateCategories"
                    :key="categories.length + updateCount"
                    :categories="categories"
                />
                <!-- :key в данном случае нужен для перерисовки (обновления) элементов (key изменяется -> элемент побновляется) -->
                <p v-else class="center">{{'Message_NoCategories' | localize}}</p>
            </div>
        </section>
    </div>
</template>

<script>
    import CategoryCreate from '@/components/CategoryCreate'
    import CategoryEdit from '@/components/CategoryEdit'
    export default {
        name: "Categories",
        data: () => ({
            categories: [],
            loading: true,
            updateCount: 0
        }),
        metaInfo() {
            return {
                title: this.$title('Menu_Categories')
            }
        },
        components: {
            CategoryCreate, CategoryEdit
        },
        methods: {
            addNewCategory(category) {
                this.categories.push(category)
            },
            updateCategories(category) {
                const idx = this.categories.findIndex(c => c.id === category.id)
                this.categories[idx].title = category.title
                this.categories[idx].limit = category.limit
                this.updateCount++
            }
        },
        async mounted() {
            this.categories = await this.$store.dispatch('fetchCategories')
            this.loading = false
        }
    }
</script>

<style scoped>

</style>