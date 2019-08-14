<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

// import User from './store/user'

export default {
  name: 'App',
  mounted: function () {
    // const info = User.getInfo()
    // if (info) {
    //   this.$router.push({ path: '/admin' })
    // } else {
    //   this.$router.push({ path: '/login' })
    // }
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
