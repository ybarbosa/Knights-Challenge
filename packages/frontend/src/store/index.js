import { knightService } from '@/service/knight'
import { weaponService } from '@/service/weapon'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    knights: [],
    weapons: [],
    knight: {},
    error: ''
  },
  getters: {
  },
  mutations: {
    setKnights(state, value) {
      state.knights = [ ...value ]
    },
    setWeapon(state, value) {
      state.weapons = [ ...value ]
    },

    setKnight(state, value) {
      state.knight = { ...value }
    },

    setError(state, value) {
      state.error = value
    },
  },
  actions: {
    async findAllKnight({commit}, filters) {
      const { isError, data: result } = await knightService.findAll(filters)

      if(isError) {
        commit('setKnights', [])
        commit('setError', result)
        return
      }
      commit('setKnights', result.data)
      commit('setError', '')
    },

    async deleteKnight({dispatch, commit}, id) {
      const { isError, data: result } = await knightService.remove(id)
      if(isError) {
        commit('setError', result)
        return
      }
      dispatch('findByIdKnight', id)

    },

    async updateKnight({ dispatch, commit }, params) {
      const { isError, data:result } = await knightService.update(params)

      if(isError) {
        commit('setError', result)
        return
      }
      dispatch('findByIdKnight', params.id)

    },

    async findByIdKnight({commit}, id) {
      const { isError, data: result } = await knightService.findById(id)
      if(isError) {
        commit('setKnight', {})
        commit('setError', result)
        return
      }
      commit('setKnight', result.data)
      commit('setError', '')
    },

    async findAllWeapon({commit}){
      const result = await weaponService.findAll()
      commit('setWeapon', result.data)
    },

    async createKnight({commit}, payload) {
      const { isError, data: result } = await knightService.create(payload)

      if(isError) {
        commit('setError', result)
        return
      }

      return { isError }
    }

  },
  modules: {
  }
})
