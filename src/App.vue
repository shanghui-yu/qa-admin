<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './mixins/reset.css';

#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
}
/* 防止table在flex下无限增加宽度 */
.ivu-table-auto table{
  /* table-layout: auto;
  width: 100% !important; */
}
</style>
