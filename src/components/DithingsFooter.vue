<template>
  <a-card>
    <div class="cardPosition">
      <span class="avd">未处理信息{{ unDoneCount }}条</span>
      <a-button
        size="small"
        :type="clickFlag === 'all' ? 'primary' : 'default'"
        @click="handleClick('all')"
        >全部事件</a-button
      >
      <a-button
        size="small"
        :type="clickFlag === 'done' ? 'primary' : 'default'"
        @click="handleClick('done')"
        >已经处理</a-button
      >
      <a-button
        size="small"
        :type="clickFlag === 'unDone' ? 'primary' : 'default'"
        @click="handleClick('unDone')"
        >未处理</a-button
      >
      <a-button size="small" @click="handleClick('del')" >清除已处理</a-button>
    </div>
  </a-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      clickFlag: 'all'
    }
  },
  computed: {
    ...mapState(['data', 'unDoneCount'])
  },
  methods: {
    ...mapMutations(['totalCount', 'handleView']),
    ...mapActions([]),
    handleClick(type) {
      // console.log(type)
      this.clickFlag = type
      this.handleView(type)
    }
  },
  created() {
    this.totalCount()
  }
}
</script>

<style lang="less" scoped>
.cardPosition {
  padding: 24px 0 !important;
  display: flex !important;
  justify-content: space-between !important;
}
</style>
