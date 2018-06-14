<template>
  <div id="app" class="h-100 d-flex flex-column">
    <!--we want the container of router-view fill the height of the screen-->
    <div class="container app-content flex-grow-1 d-flex flex-column">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'App',
    data: () => ({}),
    methods: {},
    mounted() {
    },
  }
</script>

<style lang="scss">
  @import './assets/custom-bootstrap';
  @import '~bootstrap/scss/bootstrap';

  html {
    height: 580px;
    width: 780px;
    margin: $none;
    padding: $none;
  }

  body {
    background-color: $gray-lighter !important;
    margin: $none;
    height: 100%;
  }
  .app-content {
    padding-top: 15px;
  }
</style>
