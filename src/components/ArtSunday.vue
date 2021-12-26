<template>

  <div id="art-sunday">
    <div id="art" class="text">
      <h1 :style="{ color: artColorString }">ART</h1>
    </div>
    <div id="sunday" class="text">
      <h1 :style="{ color: sundayColorString }">SUNDAY</h1>
    </div>
  </div>

</template>

<script>

  // import compColors from 'complementary-colors';

  export default {
    name: 'ArtSunday',
    props: {
      baseHue: {
        type: Number,
        default: 0
      },
      counter: {
        type: Number,
        default: 0
      }
    },
    computed: {
      artColorString() {
        return 'hsl('+this.baseHue+',100%,50%)';
      },
      sundayColorString() {
        return 'hsl('+(this.baseHue + 180)%360+',100%,50%)';
      }
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
