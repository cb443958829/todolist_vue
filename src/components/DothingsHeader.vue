<template>
  <a-card>
    <a-layout>
      <a-layout-header class="header">待办事宜记录本</a-layout-header>
      <a-layout-content>
        <div class="space"></div>
        <a-icon type="pic-center" />标题
        <div class="space"></div>
        <a-input-group compact>
          <a-textarea
            :value="dataObj.title"
            @change="
              e => inputContent({ value: e.target.value, type: 'title' })
            "
            style="width: 100%"
            placeholder="请输入你要做的事"
            :rows="4"
          />
        </a-input-group>
        <div class="space"></div>
        <a-icon type="pic-center" />内容
        <div class="space"></div>
        <a-input-group compact>
          <a-textarea
            :value="dataObj.content"
            @change="
              e => this.inputContent({ value: e.target.value, type: 'content' })
            "
            style="width: 100%"
            placeholder="请输入你要做的事"
            :rows="4"
          />
        </a-input-group>
        <div class="space"></div>
        <a-icon type="pic-center" />时间
        <div class="space"></div>
        <a-input-group compact>
          <a-textarea
            :value="dataObj.time"
            style="width: 100%"
            placeholder="请输入时间"
            :rows="1"
            @change="
              e => this.inputContent({ value: e.target.value, type: 'time' })
            "
          />
        </a-input-group>
        <div class="space"></div>
        <a-icon type="pic-center" />地点
        <div class="space"></div>
        <a-input-group compact>
          <a-textarea
            :value="dataObj.pos"
            style="width: 100%"
            placeholder="请输入地点"
            :rows="1"
            @change="
              e => this.inputContent({ value: e.target.value, type: 'pos' })
            "
          />
        </a-input-group>
        <div class="btn">
          <a-button type="primary" @click="addDoThings">添加待办事情</a-button>
        </div>
      </a-layout-content>
    </a-layout>
  </a-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import MySlot from './Slot'
export default {
  // components:{ "my-slot": MySlot },
  computed: {
    ...mapState(['dataObj', 'data'])
  },
  methods: {
    ...mapMutations(['inputContent', 'addDoThings'])
  }
}
</script>

<style>
.header {
  text-align: center;
  font-size: 24px;
  background-color: rgb(131, 245, 160) !important;
  margin-bottom: 15px;
  border-radius: 10px;
}
.ant-input-group {
  margin: 10px 0;
}
.space {
  height: 10px;
}
.btn {
  text-align: center;
  margin-top: 15px;
  font-size: 20px;
}
</style>
