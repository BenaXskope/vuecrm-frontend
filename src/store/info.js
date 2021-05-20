import firebase from 'firebase/app'
import axios from 'axios'

export default {
    state: {
        info: {}
    },
    mutations: {
      setInfo(state, info) {
          state.info = info
      },
      clearInfo(state) {
          state.info = {}
      }
    },
    actions: {
        async updateInfo({dispatch, commit}, toUpdate) {
            try {
                const updateData = {...this.getters.info, ...toUpdate}
                const info = await axios.patch(
                    'http://127.0.0.1:8000/api/update_profile/',
                    {...updateData},
                    {
                        headers: {
                            'Authorization': `Token ${localStorage.token}`
                        }
                    }
                )
                commit('setInfo', updateData)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchInfo({dispatch, commit}) {
            try {
                const info = await axios.get(
                    'http://127.0.0.1:8000/api/get_profile_info/',
                    {
                        headers: {
                            'Authorization': `Token ${localStorage.token}`
                            }
                        }
                )
                commit('setInfo', info.data.profile)
            } catch (e) {
                commit('setError', e)
                throw e
            }

        }
    },
    getters : {
        info: s => s.info
    }
}
