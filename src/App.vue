<template>
  <a-card class="app">
    <DothingsHeader />
    <div style="marginTop: 15px"></div>
    <DothingsList />
    <DithingsFooter />
  </a-card>
</template>

<script>
import DothingsHeader from './components/DothingsHeader'
import DothingsList from './components/DothingsList'
import DithingsFooter from './components/DithingsFooter'
export default {
  components: { DothingsHeader, DothingsList, DithingsFooter }
}
</script>

<style lang="less" scoped>
.app {
  width: 800px;
  height: 800px;
  overflow: scroll;
  margin: 0 auto;
}
</style>
