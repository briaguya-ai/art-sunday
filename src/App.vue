<template>

  <ArtSunday/>

</template>

<script>

  import ArtSunday from './components/ArtSunday.vue'

  export default {
    name: 'App',
    components: {
      ArtSunday
    }
  }

</script>

<style>

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000000;
  }

  .text {
    padding: 20px;
    font-size: 36px;
  }

  @media screen and (min-width: 600px) {
    .text {
      font-size: 64px;
    }
  }

  @media screen and (min-width: 900px) and (min-height: 540px) {
    .text {
      font-size: 96px;
    }
  }

  h1 {
    margin: 0;
  }

  body {
    margin: 0;
  }

</style>
