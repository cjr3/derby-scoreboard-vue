<template>
  <div id="app">
    <Scoreboard/>
  </div>
</template>

<script>
import Scoreboard from './components/scoreboard/Scoreboard'

export default {
  name: 'app',
  components: {
    Scoreboard
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
