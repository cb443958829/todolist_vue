<template>
  <a-card>
    <div class="cardPosition">
      <span class="avd">未处理信息{{ unDoneCount }}条</span>
      <a-button size="small" type="primary">已全部处理</a-button>
      <a-button size="small">已经处理</a-button>
      <a-button size="small">未处理</a-button>
      <a-button size="small">清除已处理</a-button>
    </div>
  </a-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['data', 'unDoneCount'])
  },
  methods: {
    ...mapMutations(['totalCount']),
    ...mapActions([])
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
