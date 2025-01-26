import { knightService } from '@/service/knight'
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    heroes: [
      {
        id: 1,
        nombre: "Artanis",
        funcion: "Agresor",
        titulo: "Jerarca de los daelaam",
        ataque: "111",
        imagen: "https://static.heroesofthestorm.com/heroes/yrel/skins/light-of-hope-800.jpg",
      },
    ]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async findAllKnight(_, filters) {
      const result = await knightService.findAll(filters)
      return result
    }
  },
  modules: {
  }
})
