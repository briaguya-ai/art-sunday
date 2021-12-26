<template>

  <div id="art-sunday">
    <div id="art" class="text">
      <h1 :style="{ color: artColorString }">{{artText}}</h1>
    </div>
    <div id="sunday" class="text">
      <h1 :style="{ color: sundayColorString }">{{sundayText}}</h1>
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
      },
      mode: {
        type: Number,
        default: 0
      },
      score: {
        type: Number,
        default: 0
      },
      endgame: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      artColorString() {
        switch (this.mode) {
          case 1:
            return 'hsl('+this.baseHue+',100%,75%)';
          default:
            return 'hsl('+this.baseHue+',100%,50%)';
        }
      },
      sundayColorString() {
        switch (this.mode) {
          case 1:
            return 'hsl('+(this.baseHue + 30)%360+',100%,75%)';
          default:
            return 'hsl('+(this.baseHue + 180)%360+',100%,50%)';
        }
      },
      artText() {
        if(this.endgame)
          return 'SCORE';
        return 'ART!';
      },
      sundayText() {
        if(this.endgame)
          return this.score;
        return 'SUNDAY!';
      }
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
