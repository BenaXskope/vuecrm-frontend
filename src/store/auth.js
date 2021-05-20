import firebase from "firebase/app";
import axios from "axios"


export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                await axios.post(
                    'http://127.0.0.1:8000/api/token_auth/',
                    {
                        'username': email,
                        'password': password
                    }
                )
                    .then(function (response) {
                        localStorage.token = response.data.token
                    });
            } catch (e) {
                commit('setError', e)
                console.log(e)
                throw e
            }
        },
        async logout({commit}) {
            try {
                await axios.get(
                    'http://127.0.0.1:8000/api/logout/',
                    {},
                    {
                        headers: {
                            'Authorization': `Token ${localStorage.token}`
                        }
                    },
                )
                    .then(function (response) {
                        console.log(response.data)
                        localStorage.removeItem('token')
                    });
            } catch (e) {
                commit('setError', e)
                console.log(e)
                throw e
            }
        },
        async register({dispatch, commit}, {email, password, name}) {
            try {
                try {
                    await axios.post(
                        'http://127.0.0.1:8000/api/register/',
                        {
                            'email': email,
                            'name': name,
                            'password': password
                        }
                    )
                        .then(function (response) {
                            console.log(response.data)
                        });

                } catch (e) {
                    console.log(e)
                    throw e
                }
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}