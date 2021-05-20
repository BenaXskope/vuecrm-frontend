import axios from 'axios'

export default {
    actions: {
        async createRecord({dispatch, commit}, record) {
            try {
                let resp = await axios.post(
                    'http://127.0.0.1:8000/api/create_record/',
                    {
                        ...record
                    },
                    {
                        headers: {
                            'Authorization': `Token ${localStorage.token}`
                        }
                    },
                )
                resp = resp.data
                resp['categoryId'] = resp.category
                delete resp['category']
                return resp
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRecords({dispatch, commit}) {
            try {
                const records = await axios.get(
                    'http://127.0.0.1:8000/api/get_all_records/',
                    {
                        headers: {
                            'Authorization': `Token ${localStorage.token}`
                        }
                    },
                ).then(response => {
                    return response.data.map(rec => {
                        rec['categoryId'] = rec.category
                        delete rec['category']
                        return rec
                    })
                })
                return records
            } catch (e) {
                commit('setError', e)
                console.log(e)
                throw e
            }
        },
        async fetchRecordById({dispatch, commit}, id) {
            try {
                let record = await axios.patch(
                    'http://127.0.0.1:8000/api/get_record_by_id/',
                    {
                        'id': id
                    },
                    {
                        headers: {
                            'Authorization': `Token ${localStorage.token}`
                        },
                    },
                )
                record = record.data
                record['categoryId'] = record.category
                delete record['category']
                return record
            } catch (e) {
                commit('setError', e)
                console.log(e)
                throw e
            }
        }
    }
}
