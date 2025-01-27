<template>
    <v-alert
        :title="title"
        dense
        outlined
        dismissible
        :type="type"
        class="alert-custom"
        @input="updateAlert"
    >
    {{ text }}
    </v-alert>
</template>
<script>
import { mapState, mapMutations  } from 'vuex';

export default {
  name: "AlertCustom",
  props: {
    text: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "error",
    }
  },
  computed: {
    ...mapState(["error"]),
    title() {
        return this.type === "error" ? "Error" : "Success";
    }
  },
  methods: {
    ...mapMutations(["setError"]),
    updateAlert() {
      this.setError('')
    }
  },
};
</script>

<style scoped>
.alert-custom {
    position: absolute;
    top: 80px;
    right: 20px;
}
</style>