<template>
  <v-container class="home">
    <div class="contenedor">
      <ul class="knight-list">
        <li v-for="knight in heroes" :key="knight.nombre" class="knight-card" @click="openKnightDetails(knight.id)">
          <div class="knight-image-container">
            <img :src="knight.imagen" alt="Knight Image" class="knight-image" />
          </div>
          <div class="knight-details">
            <h3 class="knight-name">{{ knight.nombre }}</h3>
            <p class="knight-info"><strong>Function:</strong> {{ knight.funcion }}</p>
            <p class="knight-info"><strong>Title:</strong> {{ knight.titulo }}</p>
            <p class="knight-info"><strong>Attack:</strong> {{ knight.ataque }}</p>
          </div>
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "HomeView",
  computed: {
    ...mapState(["heroes"]),
  },
  methods: {
    openKnightDetails(id) {
      this.$router.push(`edit-knight/${id}`);
    }
  }
};
</script>

<style scoped>
.home {
  padding: 80px 24px 24px;
}

.contenedor {
  width: 90%;
  margin: 0 auto;
  max-width: 800px;
}

.knight-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

.knight-card {
  display: flex;
  flex-direction: column;
  padding: 15px;
  cursor: pointer;
  border-radius: 10px;
  background-color: #f9f9f9;
  border: 1px solid #DDD;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.3s ease;
}

.knight-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.knight-image-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.knight-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ccc;
}

.knight-details {
  text-align: center;
}

.knight-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
}

.knight-info {
  font-size: 14px;
  color: #555;
  margin: 5px 0;
  text-align: center;
}

.knight-info strong {
  color: #333;
}
</style>
