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
              <h3 class="knight-name mb-3">{{ knight.name.toUpperCase() }}</h3>
              <p class="knight-info"><strong>Apelido:</strong> {{ knight.nickName }}</p>
              <p class="knight-info"><strong>Idade:</strong> {{ knight.birthday }}</p>
              <p class="knight-info"><strong>Armas:</strong> {{ knight.weapons }}</p>
              <p class="knight-info"><strong>Atributo:</strong> {{ knight.attribute }}</p>
              <p class="knight-info"><strong>Ataque:</strong> {{ knight.attack }}</p>
              <p class="knight-info"><strong>Exp:</strong> {{ knight.experance }}</p>
              <p class="knight-info"><strong>Hero?</strong> {{ knight.hero ? 'Sim' : 'Não' }}</p>

            </div>

           <v-row class="ml-2 mr-2">
            <v-col cols="6" md="6">
               <v-btn
                :disabled="knight.hero"
                color="primary"
                @click="DeleteKnight"
                class="mt-4"
                block
              >
                Convert to hero
              </v-btn>
            </v-col>
            <v-col cols="6" md="6">
              <v-btn
                color="red accent-2"
                @click="openDialog"
                class="mt-4"
                block
              >
                <span class="white--text"> Edit </span>
              </v-btn>
            </v-col>
           </v-row>
          </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      max-width="500"
      persistent
    >
      <v-card
        max-width="500"
        prepend-icon="mdi-update"
        title="Update in progress"
      >
        <v-card-title class="text-center">
          <span>Edit Knight</span>
        </v-card-title>
        <v-form>
          <v-text-field
            v-model="newNickName"
            label="New nickname"
            :rules="[rules.required]"
            outlined
            dense
            height="48px"
            class="my-2 mx-4"
          />
        </v-form>
        <v-card-actions class="justify-end">
          <v-btn
            :disabled="knight.nickName === newNickName"
            @click="updateKnightDetails"
            small
            color="primary"
          > Save new nickname </v-btn>
          <v-btn
            small
            @click="dialog = false"
          > Close modal </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
  </v-container>

</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'KnightDetails',
  data() {
    return {
      loading: true,
      dialog: false,
      newNickName: '',
      rules: {
        required: value => !!value || "This field is required"
      }
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
      findByIdKnight: 'findByIdKnight',
      updateKnight: 'updateKnight'
    }),
    async DeleteKnight() {
      this.loading = true
      await this.deleteKnight(this.knightId)
      this.loading = false
    },
    openDialog(){
      this.dialog = true
      this.newNickName = this.knight.nickName
    },
    async updateKnightDetails() {
      this.loading = true
      await this.updateKnight({ id: this.knightId, nickName: this.newNickName.toLowerCase() })
      this.newNickName = ''
      this.loading = false
      this.dialog = false
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
