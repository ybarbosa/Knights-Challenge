<template>
  <v-container class="add-knight">
    <v-row v-if="loading" justify="center">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary" size="30"></v-progress-circular>
        </v-col>
      </v-row>
    <v-row justify="center" v-else>
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-4" outlined>
          <v-card-title class="headline text-center">
            <span>Add New Knight</span>
          </v-card-title>

          <v-form v-model="formValid">
            <v-text-field
              v-model="newKnight.name"
              label="Name"
              :rules="[rules.required]"
              outlined
              dense
              height="48px"
              class="mb-8"
            />

            <v-text-field
              v-model="newKnight.nickName"
              label="Nickname"
              :rules="[rules.required]"
              outlined
              dense
              height="48px"
              class="mb-8"
            />

            <v-text-field
              v-model="newKnight.birthday"
              label="Date of birth"
              :max="currentDate"
              :rules="[rules.required]"
              outlined
              dense
              height="48px"
              type="date"
              class="mb-8"
            />

            <v-row >
              <v-col>
                <v-select
                  required
                  :rules="[rules.select]"
                  label="Weapon"
                  v-model="newKnight.weapons"
                  :items="weapons"
                  return-object
                  item-text="name"
                  item-value="id"
                  multiple
                  />
              </v-col>
              <v-col>
              <v-select
                required
                v-if="newKnight.weapons.length"
                :rules="[rules.select]"
                label="Equipped Weapon"
                v-model="weaponsEquipped"
                :items="newKnight.weapons"
                item-text="name"
                item-value="id"
                />
              </v-col>
            </v-row>
            
             <v-select
             :rules="[rules.required]"
              label="attributes"
              v-model="newKnight.keyAttribute"
              :items="attributes"
              />
            <v-btn
              :disabled="!formValid"
              color="primary"
              @click="addKnight"
              class="mt-4"
              block
            >
              Add Knight
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  <alert v-if="error" type="error" :text="error"/>
  </v-container>
</template>

<script>
import { mapState, mapActions  } from 'vuex';
import Alert from '@/components/alert.vue';
export default {
  name: "AddKnight",
  components: {
    Alert
  },
  computed: {
    ...mapState(["weapons","error"]),
    currentDate(){
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se necessário
      const day = String(date.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se necessário

      return `${year}-${month}-${day}`;
    }
  },
  data() {
    return {
      formValid: false,
      weaponsEquipped: [],
      newKnight: {
        name: "",
        nickName: "",
        keyAttribute: "",
        weapons: "",
        birthday: "",
      },
      attributes: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
      rules: {
        required: value => !!value || "This field is required",
        select:  (v) =>  v.length>0 || "Item is required"
      },
      loading: false
    };
  },
  methods: {
    ...mapActions({
      findAllWeapon: 'findAllWeapon',
      createKnight: 'createKnight'
    }),
    async addKnight() {
      this.loading = true
      const weapons = this.newKnight.weapons.map(({ id }) => ({
        isEquipped: this.weaponsEquipped === id,
        id,
      }))

      const payload = {
        ...this.newKnight,
        birthday: new Date(this.newKnight.birthday),
        nickName: this.newKnight.nickName.toLowerCase(),
        weapons
      }
      const { isError } = await this.createKnight(payload)

      if(isError) {
        this.loading = false
        return
      }
      this.loading = false

      this.$router.push('/')
    },
  },
  async mounted() {
    this.loading = true;
    await this.findAllWeapon();
    this.loading = false;
  }
};
</script>

<style scoped>
.add-knight {
  padding: 80px 24px 24px;
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
}

.v-card-subtitle {
  font-size: 16px;
  color: #6c757d;
}

.v-text-field, .v-file-input {
  height: 48px;
  border-radius: 10px;
}

form {
  gap: 12px;
}

.v-btn {
  border-radius: 10px;
  padding: 12px;
}

.mb-8 {
  margin-bottom: 24px;
}

.v-subheader {
  font-size: 20px;
  font-weight: bold;
  color: #2d3a3a;
}
</style>
