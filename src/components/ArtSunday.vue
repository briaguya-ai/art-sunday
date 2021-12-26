<template>

  <div id="art-sunday">
    <div id="art" class="text">
      <h1 :style="{ color: '#' + artColor.toString(16) }">ART</h1>
    </div>
    <div id="sunday" class="text">
      <h1 :style="{ color: '#' + artColor.toString(16) }">SUNDAY</h1>
    </div>
  </div>

</template>

<script>

  export default {
    name: 'ArtSunday',
    props: {
      artColor: {
        type: Number,
        default: 0x1e30d6
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
