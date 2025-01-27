<template>
  <v-container class="knight-details">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-4" outlined>
          <v-card-title class="headline text-center">
            <span>Knight Details</span>
          </v-card-title>

          <!-- Loading Spinner -->
          <v-row v-if="loading" justify="center">
            <v-col cols="12" class="text-center">
              <v-progress-circular indeterminate color="primary" size="30"></v-progress-circular>
            </v-col>
          </v-row>

          <!-- Knight Details -->
          <v-card-text v-else>
            <v-card v-if="knight">
             <div class="knight-details mb-2">
              <h3 class="knight-name">{{ knight.name.toUpperCase() }}</h3>
              <p class="knight-info"><strong>Idade:</strong> {{ knight.birthday }}</p>
              <p class="knight-info"><strong>Armas:</strong> {{ knight.weapons }}</p>
              <p class="knight-info"><strong>Atributo:</strong> {{ knight.attribute }}</p>
              <p class="knight-info"><strong>Ataque:</strong> {{ knight.attack }}</p>
              <p class="knight-info"><strong>Exp:</strong> {{ knight.experance }}</p>
              <p class="knight-info"><strong>Hero?</strong> {{ knight.hero ? 'Sim' : 'Não' }}</p>

            </div>

            <v-btn
              :disabled="knight.hero"
              color="primary"
              @click="updateKnight"
              class="mt-4"
              block
            >
              Convert to hero
            </v-btn>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'KnightDetails',
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState(["knight"]),
    knightId() {
      return this.$route.params.id;
    },
  },
  methods: {
     ...mapActions({
      deleteKnight: 'deleteKnight',
      findByIdKnight: 'findByIdKnight'
    }),
    async updateKnight() {
      this.loading = true
      await this.deleteKnight(this.knightId)
      this.loading = false
    }
  },
  async mounted() {
    this.loading = true
    await this.findByIdKnight(this.knightId);
    this.loading = false
  },
};
</script>

<style scoped>
.knight-details {
  padding: 60px 24px 24px;
}

.v-card {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  font-size: 24px;
  font-weight: bold;
  color: #2d3a3a;
  text-align: center;
}

.v-card-subtitle {
  font-size: 16px;
  color: #6c757d;
  text-align: center;
}

.v-text-field {
  margin-bottom: 16px;
}

.v-list-item {
  margin-bottom: 16px;
}

.v-subheader {
  font-size: 20px;
  font-weight: bold;
  color: #2d3a3a;
}

.v-progress-circular {
  margin-bottom: 16px;
}

.v-row {
  gap: 16px;
}

.v-col {
  padding: 8px;
}
</style>
