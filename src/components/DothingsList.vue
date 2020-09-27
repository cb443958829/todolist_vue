<template>
  <div class="demo-infinite-container">
    <a-list :data-source="dataView">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <!--列表显示区 -->
        <a-checkbox
          :checked="item.isDone"
          @change="() => toggelCheckbox(item.id)"
          class="checkbox"
        >
        </a-checkbox>
        <span>{{ index + 1 }}</span>
        <div class="content">{{ item.content }}</div>
        <!-- 查看 -->
        <a-button
          type="primary"
          size="small"
          @click="showModal(item.id, 'see')"
        >
          查看
        </a-button>
        <!-- 修改 -->
        <a-button
          type="warning"
          size="small"
          @click="showModal(item.id, 'modify')"
        >
          修改
        </a-button>
        <!-- 删除 -->
        <a-button type="danger" size="small" @click="delThings(item.id)"
          >删除</a-button
        >
      </a-list-item>
      <!-- 弹出框区域 -->
      <a-modal
        title="事件详情"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-list
          v-show="type === 'see'"
          class="modalStyle"
          size="small"
          bordered
          :data-source="modalData"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <div>
              <span class="listStyle">标题:</span>
              {{ item.title }}
            </div>
            <br />
            <div><span class="listStyle">内容:</span>{{ item.content }}</div>
            <br />
            <div><span class="listStyle">时间:</span>{{ item.time }}</div>
            <br />
            <div><span class="listStyle">地点:</span>{{ item.pos }}</div>
            <br />
            <span class="listStyle">是否处理:</span>
            <a-checkbox :checked="item.isDone" class="checkbox"> </a-checkbox>
          </a-list-item>
        </a-list>
        <a-list
          v-show="type === 'modify'"
          class="modalStyle"
          size="small"
          bordered
          :data-source="modalData"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <!-- item项 -->
            <span class="listStyle">标题:</span>
            <a-textarea
              :value="item.title"
              style="width: 100%"
              :rows="1"
              @change="
                e => modifyThings({ value: e.target.value, type: 'title' })
              "
            />
            <span class="listStyle">内容:</span>
            <a-textarea
              :value="item.content"
              style="width: 100%"
              :rows="3"
              @change="
                e => modifyThings({ value: e.target.value, type: 'title' })
              "
            />
            <span class="listStyle">时间:</span>
            <a-textarea
              :value="item.time"
              style="width: 100%"
              :rows="1"
              @change="
                e => modifyThings({ value: e.target.value, type: 'time' })
              "
            />
            <span class="listStyle">地点:</span>
            <a-textarea
              :value="item.pos"
              style="width: 100%"
              :rows="1"
              @change="
                e => modifyThings({ value: e.target.value, type: 'pos' })
              "
            />
            <span class="listStyle">是否处理:</span>
            <a-checkbox
              :checked="item.isDone"
              @change="() => toggelCheckbox(item.id)"
              class="checkbox"
            >
            </a-checkbox>
          </a-list-item>
        </a-list>
      </a-modal>
    </a-list>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      ModalText: ' this is the content of ModalText',
      visible: false,
      confirmLoading: false,
      modalData: [],
      type: '',
      handleData: []
    }
  },
  computed: {
    ...mapState(['dataView', 'dataObj'])
  },
  beforeMount() {},

  methods: {
    ...mapMutations([
      'initData',
      'toggelCheckbox',
      'modifyThings',
      'inputContent',
      'delThings'
    ]),
    ...mapActions([]),
    // 控制对话框的关闭
    showModal(id, type) {
      this.modalData = this.dataView.filter(key => key.id === id)
      this.type = type
      if (type === 'modify') {
        this.modifyThings(id)
      }
      this.visible = true
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after one seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 1000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    }
  },

  created() {
    this.initData()
  }
}
</script>
<style lang="less" scoped>
.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 300px;
}
.checkbox {
  margin-right: 15px !important;
}
.content {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
}
.ant-btn {
  margin-left: 10px !important;
}
.modalStyle .ant-list-item {
  display: block !important;
}
.listStyle {
  font-size: 15px;
  font-weight: 600;
  margin: 0 15px 0 0;
}
</style>
