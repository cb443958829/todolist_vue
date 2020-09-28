<template>
  <div>
    <div v-if="switchAreaType === 'Header'">
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
    <div v-else-if="switchAreaType === 'DothigsList'">
      <span
        v-if="errMsgModifyType === 'error'"
        :style="{ display: !errMsgModify ? 'none' : 'inline-block' }"
        class="iconfont icon-error color"
      />
      <a-icon
        v-if="errMsgModifyType === 'ok'"
        :style="{ display: !errMsgModify ? 'none' : 'inline-block' }"
        type="check-circle"
        theme="twoTone"
        two-tone-color="#52c41a"
      />
      <span :class="errMsgModifyType === 'error' ? 'errorColor' : 'okColor '">{{
        errMsgModify
      }}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState([
      'switchAreaType',
      'errMsg',
      'errMsgType',
      'errMsgModify',
      'errMsgModifyType'
    ]),
    ...mapMutations([])
  }
}
</script>

<style></style>
