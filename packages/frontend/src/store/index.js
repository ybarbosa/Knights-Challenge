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
      {
        id: 2,
        nombre: "D.va",
        funcion: "Guerrero",
        titulo: "Piloto de MEKA ",
        ataque: "22 (meca), 55 (piloto)",
        imagen: "https://static.heroesofthestorm.com/heroes/dva/skins/meka-pilot-800.jpg",
      },
      {
        id: 3,
        nombre: "Ragnaros ",
        funcion: "Agresor",
        titulo: "El señor del fuego",
        ataque: "180",
        imagen: "https://static.heroesofthestorm.com/heroes/ragnaros/skins/the-firelord-800.jpg",
      },
      {
        id: 4,
        nombre: "Yrel",
        funcion: "Guerrero",
        titulo: "Luz de la esperanza",
        ataque: "155",
        imagen: "https://static.heroesofthestorm.com/heroes/yrel/skins/light-of-hope-800.jpg",
      },
      {
        id: 5,
        nombre: "Ana",
        funcion: "Sanadora",
        titulo: "Francotiradora Veterana",
        ataque: "30",
        imagen: "https://static.heroesofthestorm.com/heroes/ana/skins/veteran-sniper-800.jpg",
      },
      {
        id: 6,
        nombre: "Auriel",
        funcion: "Sanadora",
        titulo: "Arcángel de la esperanza",
        ataque: "64",
        imagen: "https://static.heroesofthestorm.com/heroes/ana/skins/veteran-sniper-800.jpg",
      },
      {
        id: 7,
        nombre: "Malfurion",
        funcion: "Sanadora",
        titulo: "Archidruida ",
        ataque: "60",
        imagen: "https://static.heroesofthestorm.com/heroes/malfurion/skins/archdruid-800.jpg",
      },
      {
        id: 8,
        nombre: "Arthas ",
        funcion: "Tanque",
        titulo: "El rey Exánime",
        ataque: "95",
        imagen: "https://static.heroesofthestorm.com/heroes/arthas/skins/the-lich-king-800.jpg",
      },
      {
        id: 9,
        nombre: "Johanna ",
        funcion: "Tanque",
        titulo: "Cruzada de Zakarum",
        ataque: "99",
        imagen: "https://static.heroesofthestorm.com/heroes/johanna/skins/crusader-of-zakarum-800.jpg",
      },
      {
        id: 10,
        nombre: "Muradin",
        funcion: "Tanque",
        titulo: "Rey de la montaña",
        ataque: "88",
        imagen: "https://static.heroesofthestorm.com/heroes/muradin/skins/mountain-king-800.jpg",
      },
      {
        id: 11,
        nombre: "Illidan",
        funcion: "Asesino a Cuerpo",
        titulo: "El traidor",
        ataque: "87",
        imagen: "https://static.heroesofthestorm.com/heroes/illidan/skins/the-betrayer-800.jpg",
      },
      {
        id: 12,
        nombre: "Maiev",
        funcion: "Asesino a Cuerpo",
        titulo: "La celadora ",
        ataque: "145",
        imagen: "https://static.heroesofthestorm.com/heroes/maiev/skins/the-warden-800.jpg",
      },
      {
        id: 13,
        nombre: "Zeratul",
        funcion: "Asesino a Cuerpo",
        titulo: "Prelado tétrico",
        ataque: "131",
        imagen: "https://static.heroesofthestorm.com/heroes/zeratul/skins/dark-prelate-800.jpg",
      },
      {
        id: 14,
        nombre: "Abathur",
        funcion: "Apoyo",
        titulo: "Maestro de evolución",
        ataque: "27",
        imagen: "https://static.heroesofthestorm.com/heroes/abathur/skins/evolution-master-800.jpg",
      },
      {
        id: 15,
        nombre: "Medivh",
        funcion: "Apoyo",
        titulo: "El ultimo guardián",
        ataque: "83",
        imagen: "https://www.hellofriki.com/wp-content/uploads/2016/05/medivh.jpg",
      },
      {
        id: 16,
        nombre: "Zarya",
        funcion: "Apoyo",
        titulo: "Defensora de Rusia",
        ataque: "22",
        imagen: "https://static.heroesofthestorm.com/heroes/zarya/skins/defender-of-russia-800.jpg",
      },
      {
        id: 17,
        nombre: "Nazeebo",
        funcion: "Asesino a distancia",
        titulo: "Médico brujo ",
        ataque: "92",
        imagen: "https://static.heroesofthestorm.com/heroes/nazeebo/skins/heretic-witch-doctor-800.jpg",
      },
      {
        id: 18,
        nombre: "Genji",
        funcion: "Asesino a distancia",
        titulo: "Ninja cibernético",
        ataque: "44",
        imagen: "https://static.heroesofthestorm.com/heroes/genji/skins/cybernetic-ninja-800.jpg",
      },
      {
        id: 19,
        nombre: "Zagara",
        funcion: "Asesino a distancia",
        titulo: "Madre de la prole del enjambre",
        ataque: "85",
        imagen: "https://static.heroesofthestorm.com/heroes/zagara/skins/broodmother-of-the-swarm-800.jpg",
      },
    ]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
