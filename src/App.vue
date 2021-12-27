<template>

  <div id="click-handler" :style="{ background: backgroundStyleString }" @mousemove="fadeSeven" @touchmove="fadeSeven">
    <ArtSunday :baseHue=baseHue :mode=mode :score=score :endgame=endgame />
  </div>

</template>

<script>

  import ArtSunday from './components/ArtSunday.vue'

  import { StaticAuthProvider } from '@twurple/auth'
  import { ChatClient } from '@twurple/chat'

  const clientId = 'hvr2k1lvhk4t7ln331a78ndfwmav8a'
  const accessToken = 'dm3fb86nflzvlj9xqg8y4scdqmxv8q'
  const auth = new StaticAuthProvider(clientId, accessToken, ['chat:read']);
  const chatClient = new ChatClient(auth, { channels: ['briaguya0'] })
  chatClient.onMessage((channel, user, message) => {
    console.log(message)
  })
  export default {
    name: 'App',
    components: {
      ArtSunday
    },
    data() {
      return {
        baseHue: 0,
        mode: 0,
        endgame: false,
        score: 0,
        hueChangeRate: 0.5,
        maxChangeRate: 1
      }
    },
    created() {
      async function apimain() {
        await chatClient.connect()
        console.log('blarg');
      }
      apimain()
    },
    methods: {
      fadeSeven() {
        this.baseHue = (this.baseHue + this.hueChangeRate) % 360
        this.score += this.hueChangeRate
        if (this.score % 570 === 0) {
          this.mode = (this.mode + 1) % 2
          switch (this.score) {
            case 24510:
              console.log('endgame')
              this.endgame = true
              break
            case 17670:
              this.hueChangeRate = 2
              this.maxChangeRate = 2
              break
            case 9120:
              this.hueChangeRate = 0.5
              this.maxChangeRate = 2
              break
            case 5700:
              this.hueChangeRate = 1
              this.maxChangeRate = 0.5
              break
            default:
              this.hueChangeRate += (this.maxChangeRate - this.hueChangeRate) / 2
          }
        }
      }
    },
    computed: {
      backgroundStyleString() {
        switch (this.mode) {
          case 1:
            return (
              'linear-gradient(' +
              'hsl(' +
              ((this.baseHue + 180) % 360) +
              ',100%,25%)' +
              ',' +
              'hsl(' +
              ((this.baseHue + 210) % 360) +
              ',100%,25%)' +
              ')'
            )
          default:
            return '#000000'
        }
      }
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

  #click-handler {
    margin: 0;
    height: 100vh;
    width: 100%;
    background-color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    padding: 20px;
    font-size: 36px;
  }

  @media screen and (min-width: 600px) and (min-height: 400px) {
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
