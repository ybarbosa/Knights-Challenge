import { knightService } from '@/service/knight'
import { weaponService } from '@/service/weapon'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    knight: [
      {
        id: 1,
        nombre: "Artanis",
        funcion: "Agresor",
        titulo: "Jerarca de los daelaam",
        ataque: "111",
        imagen: "https://static.heroesofthestorm.com/heroes/yrel/skins/light-of-hope-800.jpg",
      },
    ],
    weapons: []
  },
  getters: {
  },
  mutations: {
    setKnight(state, value) {
      state.heroes = [
        ...state.knight,
        ...value
      ]
    },
    setWeapon(state, value) {
      state.weapons = [
        ...state.weapons,
        ...value
      ]
    }
  },
  actions: {
    async findAllKnight({commit}, filters) {
      const result = await knightService.findAll(filters)
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
