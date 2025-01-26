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
              <!-- Editable Name Input -->
              <v-text-field
                v-model="knight.nombre"
                label="Knight Name"
                outlined
                dense
                class="mb-4"
              />
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'KnightDetails',
  data() {
    return {
      knight: null,
      loading: true,
    };
  },
  computed: {
    ...mapState(["heroes"]),
    knightId() {
      return this.$route.params.id;
    },
  },
  methods: {
    fetchKnightDetails() {
      const id = this.$route.params.id;

      return new Promise((resolve) => {
        setTimeout(() => {
          const knight = this.heroes.find(hero => hero.id == id);
          
          if (!knight) {
            this.$router.push('/');
          } else {
            this.knight = knight;
          }

          this.loading = false;
          resolve(knight);
        }, 3000);
      });
    },
  },
  mounted() {
    this.fetchKnightDetails();
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
