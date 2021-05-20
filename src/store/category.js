import firebase from "firebase/app"
import axios from "axios";

export default {
    actions: {
        async createCategory({commit, dispatch}, {title, limit}) {
            try {
                const category = await axios.post(
                    'http://127.0.0.1:8000/api/create_category/',
                    {
                        'title': title,
                        'limit': limit
                    },
                    {
                        headers: {
                            'Authorization': `Token ${localStorage.token}`
                        }
                    },
                )
                return category.data
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateCategory({commit, dispatch}, {id, title, limit}) {
            try {
                const info = await axios.patch(
                    'http://127.0.0.1:8000/api/edit_category/',
                    {
                        'id': id,
                        'title': title,
                        'limit': limit
                    },
                    {
                        headers: {
                            'Authorization': `Token ${localStorage.token}`
                        }
                    }
                )
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
        ,
        async fetchCategories({commit, dispatch}) {
            try {
                const categories = await axios.get(
                    'http://127.0.0.1:8000/api/get_categories/',
                    {
                        headers: {
                            'Authorization': `Token ${localStorage.token}`
                        }
                    },
                )
                return [...categories.data]
            } catch (e) {
                commit('setError', e)
                console.log(e)
                throw e
            }
        },
        async fetchCategoryById({commit, dispatch}, id) {
            try {
                const category = await axios.patch(
                    'http://127.0.0.1:8000/api/get_category_by_id/',
                    {
                        'id': id
                    },
                    {
                        headers: {
                            'Authorization': `Token ${localStorage.token}`
                        },
                    },
                )
                return category.data
            } catch (e) {
                commit('setError', e)
                console.log(e)
                throw e
            }
        }
    }
}