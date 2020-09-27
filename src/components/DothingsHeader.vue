<template>
  <a-card>
    <a-layout>
      <a-layout-header class="header">待办事宜记录本</a-layout-header>
      <a-layout-content>
        <div class="space"></div>
        <a-icon type="pic-center" />标题 <br />
        <div class="space"></div>
        <a-input-group compact>
          <a-textarea
            :value="dataObj.title"
            @change="
              e => inputContent({ value: e.target.value, type: 'title' })
            "
            @blur="validate('title')"
            style="width: 100%"
            placeholder="请输入你要做的事"
            :rows="4"
          />
        </a-input-group>
        <!-- 验正区域 -->
        <Validate v-if="areaType === 'title'"></Validate>
        <!-- 内容 -->
        <div class="space"></div>
        <a-icon type="pic-center" />内容
        <div class="space"></div>
        <a-input-group compact>
          <a-textarea
            :value="dataObj.content"
            @change="
              e => this.inputContent({ value: e.target.value, type: 'content' })
            "
            @blur="validate('content')"
            style="width: 100%"
            placeholder="请输入你要做的事"
            :rows="4"
          />
        </a-input-group>
        <div class="space"></div>
        <Validate v-if="areaType === 'content'"></Validate>
        <a-icon type="pic-center" />时间
        <div class="space"></div>
        <a-input-group compact>
          <a-textarea
            :value="dataObj.time"
            @blur="validate('time')"
            style="width: 100%"
            placeholder="请输入时间"
            :rows="1"
            @change="
              e => this.inputContent({ value: e.target.value, type: 'time' })
            "
          />
        </a-input-group>
        <Validate v-if="areaType === 'time'"></Validate>
        <div class="space"></div>
        <a-icon type="pic-center" />地点
        <div class="space"></div>
        <a-input-group compact>
          <a-textarea
            :value="dataObj.pos"
            style="width: 100%"
            @blur="validate('pos')"
            placeholder="请输入地点"
            :rows="1"
            @change="
              e => this.inputContent({ value: e.target.value, type: 'pos' })
            "
          />
        </a-input-group>
        <Validate v-if="areaType === 'pos'"></Validate>
        <div class="btn">
          <Validate v-if="areaType === 'add'"></Validate>
          <a-button type="primary" @click="handleAddDoThings('add')"
            >添加待办事情</a-button
          >
        </div>
      </a-layout-content>
    </a-layout>
  </a-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Validate from './Validate'
// import MySlot from './Slot'
export default {
  data() {
    return {}
  },
  components: { Validate },
  computed: {
    ...mapState(['dataObj', 'data', 'areaType'])
  },
  methods: {
    ...mapMutations(['inputContent', 'addDoThings', 'validate']),
    handleAddDoThings(type) {
      this.validate(type)
      this.addDoThings(type)
    }
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
.errMsg {
  font-size: 14px;
  color: #f00;
  margin-left: 5px;
}
.errorColor {
  color: #f00 !important;
  margin-left: 5px;
}
.color {
  color: #f00 !important;
}
.okColor {
  color: #52c41a !important;
  margin-left: 5px;
}
</style>
