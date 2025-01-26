<template>
  <v-container class="add-knight">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-4" outlined>
          <v-card-title class="headline text-center">
            <span>Add New Knight</span>
          </v-card-title>

          <v-form v-model="formValid">
            <v-text-field
              v-model="newKnight.nombre"
              label="Knight name"
              :rules="[rules.required]"
              outlined
              dense
              height="48px"
              class="mb-8"
            />

            <v-text-field
              v-model="newKnight.funcion"
              label="Function"
              :rules="[rules.required]"
              outlined
              dense
              height="48px"
              class="mb-8"
            />

            <v-text-field
              v-model="newKnight.titulo"
              label="Title"
              :rules="[rules.required]"
              outlined
              dense
              height="48px"
              class="mb-8"
            />

            <v-text-field
              v-model="newKnight.ataque"
              label="Attack"
              :rules="[rules.required]"
              outlined
              dense
              height="48px"
              class="mb-8"
            />

            <v-text-field
              v-model="newKnight.dataNascimento"
              label="Date of birth"
              :rules="[rules.required]"
              outlined
              dense
              height="48px"
              type="date"
              class="mb-8"
            />

            <v-subheader class="mt-6">Attributes</v-subheader>

            <v-row class="mt-4">
              <v-col v-for="(value, attribute) in attributes" :key="attribute" cols="12" sm="6">
                <v-text-field
                  v-model="attributes[attribute]"
                  :label="toCamelCase(attribute)"
                  outlined
                  dense
                  height="48px"
                  append-icon="mdi-plus"
                  @click:append="increaseAttribute(attribute)"
                  class="mb-8"
                />
              </v-col>
            </v-row>

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
  </v-container>
</template>

<script>
export default {
  name: "AddKnight",
  data() {
    return {
      formValid: false,
      newKnight: {
        nombre: "",
        funcion: "",
        titulo: "",
        ataque: "",
        dataNascimento: "",
      },
      attributes: {
        strength: 0,
        character: 0,
        agility: 0,
      },
      rules: {
        required: value => !!value || "This field is required",
      },
    };
  },
  methods: {
    addKnight() {
      console.log("New Knight:", this.newKnight);
      console.log("Attributes:", this.attributes);
    },
    increaseAttribute(attribute) {
      if (this.attributes[attribute] < 100) {
        this.attributes[attribute]++;
      }
    },
    toCamelCase(str) {
      return str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => 
          index === 0 ? match.toLowerCase() : match.toUpperCase())
        .replace(/\s+/g, '');
      },
  },
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
