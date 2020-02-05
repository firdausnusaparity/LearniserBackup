<template>
  <div class="container p-3 justify-content-center">
    <div class="row">
      <div class="col">
        <button
          type="button"
          class="btn btn-dark float-right"
          style="width: 7rem"
          v-on:click="logoutAdmin"
        >
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
    <div class="row pt-5 mt-5 text-center">
      <div class="col">
        <button
          type="button"
          class="btn btn-outline-dark btn-lg rounded-pill w-50"
          @click.prevent="subject"
        >Subject</button>
      </div>
      <div class="col">
        <button type="button" class="btn btn-outline-dark btn-lg rounded-pill w-50">Member</button>
      </div>
    </div>
    <div class="row pt-5 mt-5 text-center">
      <div class="col">
        <button
          type="button"
          class="btn btn-outline-dark btn-lg rounded-pill w-50"
          @click.prevent="security"
        >Security</button>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logoutAdmin() {
      localStorage.clear();
      this.$router.push("/admin");
    },
    subject() {
      this.$router.push("/admin-subjects");
    },
    security() {
      this.$router.push("/admin-security");
    }
  }
};
</script>