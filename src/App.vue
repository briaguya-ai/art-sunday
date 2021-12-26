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
  }

  #art-sunday {
    height: 100vh;
    background-color: #000000;
  }

  @media screen and (min-width: 600px) {
    .text {
      font-size: 100px;
    }
  }

  .text {
    padding: 20px;
    font-size: 36px;
  }

  h1 {
    margin: 0;
  }

  body {
    margin: 0;
  }

</style>
