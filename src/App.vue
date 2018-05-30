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
/* .ivu-layout-header,.ivu-layout-content{
  padding: 0 300px !important;
} */
</style>
