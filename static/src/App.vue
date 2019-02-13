<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Connect from '../utils/connect'
import ConnectConfig from '../utils/config'

export default {
  name: 'App',
  mounted: function () {
    Connect.init(ConnectConfig)
    this.$router.push({ path: '/login' })
  }
}
</script>

<style>
body, html{
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: 'Microsoft Yahei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
