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
  },
  actions: {
    async findAllKnight({commit}, filters) {
      const result = await knightService.findAll(filters)
      commit('setKnights', result.data)
    },

    async deleteKnight({dispatch}, id) {
      await knightService.remove(id)
      dispatch('findByIdKnight', id)

    },

    async findByIdKnight({commit}, id) {
      const result = await knightService.findById(id)
      commit('setKnight', result.data)
    },

    async findAllWeapon({commit}){
      const result = await weaponService.findAll()
      commit('setWeapon', result.data)
    },

    async createKnight({dispatch}, payload) {
      await knightService.create(payload)
      dispatch('findAllKnight')
    }

  },
  modules: {
  }
})
