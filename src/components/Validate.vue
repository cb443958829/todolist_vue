<template>
  <div>
    <span
      v-if="errMsgType === 'error'"
      :style="{ display: !errMsg ? 'none' : 'inline-block' }"
      class="iconfont icon-error color"
    />
    <a-icon
      v-if="errMsgType === 'ok'"
      :style="{ display: !errMsg ? 'none' : 'inline-block' }"
      type="check-circle"
      theme="twoTone"
      two-tone-color="#52c41a"
    />
    <span :class="errMsgType === 'error' ? 'errorColor' : 'okColor '">{{
      errMsg
    }}</span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['errMsg', 'errMsgType']),
    ...mapMutations([])
  }
}
</script>

<style></style>
