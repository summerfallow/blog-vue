<template>
  <div class="footer">
    © {{ date }} -  秋也  - <a href="/">wzqblog.cn</a> 
    <a href="https://github.com/summerfallow" target="_blank"><img alt="" src="../../assets/fluidicon.png" /></a>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  data () {
    return {
      date: moment().format('YYYY')
    }
  }
}
</script>

<style scoped>
  .footer {
    color: #666;
    color: 14px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    margin-top: 30px;
    border-top: 1px solid #eee;
  }
  .footer a {
    color: #2479CC;
    text-decoration: none;
  }
  .footer img {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    margin-top: 8px;
  }
</style>
