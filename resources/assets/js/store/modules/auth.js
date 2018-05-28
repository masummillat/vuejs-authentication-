/* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
import { USER_REQUEST } from '../actions/user'
import apiCall from 'utils/api'

const state = {token: localStorage.getItem('user-token') || '',status:'', hasLoadedOnce:false};

const getters = {
    isAuthenicated: state=> !!state.token,
    authStatus: state=> state.status
}

const actions = {
    [AUTH_REQUEST]:({commit, dispatch}, user)=>{
        return new Promise((resolve,reject)=>{
            commit(AUTH_REQUEST);
            apiCall({url: 'auth', data: user, method: 'POST'})
                .then(resp=>{
                    localStorage.setItem('user-token', resp.token);
                    //here set the header of your ajax laibraty to the token value.
                    //example with axios
                    //axios.defaults.header.common['Authorization'] = resp.tokenp;
                    commit(AUTH_SUCCESS, resp);
                    dispatch(USER_REQUEST);
                    resolve(resp);
                })
                .catch(err=>{
                    commit(AUTH_ERROR,err);
                    localStoreage.removeItem('user-token');
                    reject(err);
                })
        })
    },
    [AUTH_LOGOUT]: ({commit, dispatch})=>{
        return new Promise((resolve, reject)=>{
            commit(AUTH_LOGOUT);
            localStorage.removeItem('user-token');
            reolve();
        })
    }
}


const mutations = {
    [AUTH_REQUEST]: (state)=>{
        state.status = 'loading';
    },
    [AUTH_SUCCESS]: (state)=>{
        state.status = 'success';
    },
    [AUTH_ERROR]: (state)=>{
        state.status='error';
        state.hasLoadedOnce= true;
    },
    [AUTH_LOGOUT]: (state)=>{
        state.token = '';
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}