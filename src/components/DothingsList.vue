<template>
  <div class="demo-infinite-container">
    <a-list :data-source="dataView">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <!--列表显示区 -->
        <a-checkbox
          :checked="item.isDone"
          @change="handleCheckbox(item.id)"
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
        <a-button type="danger" size="small" @click="handleDel(item.id)"
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
            <a-checkbox :checked="item.isDone" class="checkbox" disabled>
            </a-checkbox>
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
                e =>
                  handleModify({
                    value: e.target.value,
                    type: 'title',
                    id: item.id
                  })
              "
              @blur="
                e =>
                  handleValidate({
                    value: e.target.value,
                    type: 'title',
                    id: item.id
                  })
              "
            />
            <div v-show="switchAreaType === 'DothigsList'">
              <Validate v-if="areaType === 'title'"></Validate>
            </div>
            <span class="listStyle">内容:</span>
            <a-textarea
              :value="item.content"
              style="width: 100%"
              :rows="3"
              @change="
                e =>
                  handleModify({
                    value: e.target.value,
                    type: 'content',
                    id: item.id
                  })
              "
              @blur="
                e =>
                  handleValidate({
                    type: 'content',
                    value: e.target.value,
                    id: item.id
                  })
              "
            />
            <div v-show="switchAreaType === 'DothigsList'">
              <Validate v-if="areaType === 'content'"></Validate>
            </div>
            <span class="listStyle">时间:</span>
            <a-textarea
              :value="item.time"
              style="width: 100%"
              :rows="1"
              @change="
                e =>
                  handleModify({
                    value: e.target.value,
                    type: 'time',
                    id: item.id
                  })
              "
              @blur="
                e =>
                  handleValidate({
                    type: 'time',
                    value: e.target.value,
                    id: item.id
                  })
              "
            />
            <div v-show="switchAreaType === 'DothigsList'">
              <Validate v-if="areaType === 'time'"></Validate>
            </div>
            <span class="listStyle">地点:</span>
            <a-textarea
              :value="item.pos"
              style="width: 100%"
              :rows="1"
              @change="
                e =>
                  handleModify({
                    value: e.target.value,
                    type: 'pos',
                    id: item.id
                  })
              "
              @blur="
                e =>
                  handleValidate({
                    type: 'pos',
                    value: e.target.value,
                    id: item.id
                  })
              "
            />
            <div v-show="switchAreaType === 'DothigsList'">
              <Validate v-if="areaType === 'pos'"></Validate>
            </div>
            <div>
              <span class="listStyle">是否已处理:</span>
              <a-checkbox
                :checked="item.isDone"
                @change="() => toggelCheckbox(item.id)"
                class="checkbox"
              >
              </a-checkbox>
            </div>
          </a-list-item>
          <div class="confirm" v-show="switchAreaType === 'DothigsList'">
            <Validate v-if="areaType === 'confirm'"></Validate>
          </div>
        </a-list>
        <!-- 处理列表部分状态显示情况 -->
        <a-list
          v-show="type === 'checkbox'"
          class="modalStyle"
          size="small"
          bordered
        >
          <a-list-item class="modifyState">
            <span>确定要修改完成状态吗?</span>
          </a-list-item>
        </a-list>
      </a-modal>
      <div
        v-if="dataView.length === 0 && handleViewType === 'all'"
        class="none"
      >
        请添加事情
      </div>
    </a-list>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Validate from './Validate'
export default {
  data() {
    return {
      ModalText: ' this is the content of ModalText',
      visible: false,
      confirmLoading: false,
      modalData: [],
      type: '',
      handleData: [],
      checkedId: 0,
      // 控制是否点ok,对状态进行更改
      isOk: 'checkbox'
    }
  },
  components: { Validate },
  computed: {
    ...mapState([
      'dataView',
      'dataObj',
      'areaType',
      'switchAreaType',
      'errMsgModify',
      'errMsgModifyType',
      'handleViewType'
    ])
  },
  beforeMount() {},

  methods: {
    ...mapMutations([
      'initData',
      'toggelCheckbox',
      'modifyThings',
      'inputContent',
      'delThings',
      'totalCount',
      'validate',
      'confirmModifyData',
      'initModalData',
      'handleView'
    ]),
    ...mapActions([]),
    // 控制对话框的关闭
    showModal(id, type) {
      this.visible = true
      this.type = type
      switch (type) {
        case 'checkbox':
          this.isOk = 'checkbox'
          return
        case 'see':
          this.modalData = this.dataView.filter(key => key.id === id)
          this.isOk = 'see'
          break
        case 'modify':
          this.modalData = this.dataView.filter(key => key.id === id)
          this.isOk = 'modify'
          this.initModalData(this.modalData)
      }
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after one seconds'
      this.confirmLoading = true
      if (this.isOk === 'checkbox') {
        this.confirmLoading = false
        this.visible = false
        this.toggelCheckbox(this.checkedId)
      } else if (this.isOk === 'modify') {
        this.confirmLoading = false
        this.validate({
          switchAreaType: 'DothigsList',
          type: 'confirm'
        })
        if (this.errMsgModifyType === 1) {
          this.confirmLoading = true
          setTimeout(() => {
            this.confirmLoading = false
            this.visible = false
            this.isOk = true
          }, 1000)
        } else {
          this.confirmLoading = false
        }
      } else if (this.isOk === 'see') {
        this.visible = false
        this.confirmLoading = false
      }
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    handleCheckbox(id) {
      this.showModal(id, 'checkbox')
      this.checkedId = id
    },
    handleModify(targetDate) {
      this.modifyThings(targetDate)
    },
    handleDel(id) {
      this.delThings(id)
      this.handleView(this.handleViewType)
    },
    handleValidate(data) {
      // console.log(data)
      this.modifyThings(data)
      this.validate(Object.assign(data, { switchAreaType: 'DothigsList' }))
    }
  },
  created() {
    this.initData()
  },
  updated() {
    this.totalCount()
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
.modifyState {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
.confirm {
  position: absolute;
  right: 0;
}
.none {
  position: absolute;
  top: 100px;
  left: 50%;
  font-size: 24px;
  width: 200px;
  height: 100px;
  transform: translateX(-100px);
  text-align: center;
}
</style>
