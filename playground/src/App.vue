<script setup lang="ts">
import { reactive, ref } from 'vue'
import { message } from '@shs-ui/components'

const fruits = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '西瓜', value: 'watermelon' },
]
const selected = ref('apple')

const modalVisible = ref(false)

const formRef = ref()
const formModel = reactive({ name: '', phone: '' })
const formRules = {
  name: { required: true, message: '请输入姓名' },
  phone: { min: 11, pattern: /^1\d{10}$/, message: '请输入 11 位手机号' },
}
const submitForm = async () => {
  const valid = await formRef.value.validate()
  if (valid) message.success('校验通过，已提交')
}

const tableColumns = [
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age', align: 'center' },
  { label: '城市', prop: 'city' },
]
const tableData = [
  { name: '张三', age: 18, city: '深圳' },
  { name: '李四', age: 20, city: '广州' },
  { name: '王五', age: 22, city: '上海' },
]
const page = ref(1)
const menuItems = [
  { label: '首页', key: 'home' },
  {
    label: '组件',
    key: 'components',
    children: [
      { label: '按钮', key: 'button' },
      { label: '表格', key: 'table' },
    ],
  },
  { label: '禁用项', key: 'disabled', disabled: true },
]
const handleMenuSelect = (key: string) => message.info(`选中：${key}`)

const gender = ref('male')
const hobbies = ref(['read'])
const date = ref('')
const datetime = ref('2026-09-23 08:30')

const calendarDate = ref('')
const calendarEvents = ref([
  { id: '1', date: '2026-09-23', title: '开会' },
  { id: '2', date: '2026-09-24', title: '出差' },
])
</script>

<template>
  <div class="page">
    <h1>shs_ui Playground</h1>
    <p>
      M2 组件演示：Button / Icon / Tag / Card / Input / Select / Form / Modal / Message / Table /
      Pagination / Menu / Radio / Checkbox / DatePicker / DateTimePicker / Row / Col
    </p>

    <h2>Button</h2>
    <div class="row">
      <shs-button> 默认按钮 </shs-button>
      <shs-button type="primary"> 主要按钮 </shs-button>
      <shs-button type="success" @click="message.success('操作成功')"> 成功 </shs-button>
      <shs-button type="warning"> 警告 </shs-button>
      <shs-button type="danger"> 危险 </shs-button>
      <shs-button type="primary" loading> 加载中 </shs-button>
      <shs-button type="primary" round> 圆角 </shs-button>
    </div>

    <h2>Icon</h2>
    <div class="row">
      <shs-icon name="arrow-down" :size="18" />
      <shs-icon name="arrow-up" :size="18" />
      <shs-icon name="close" :size="18" />
      <shs-icon name="check" :size="18" color="#22c55e" />
      <shs-icon name="info" :size="18" color="#3b82f6" />
      <shs-icon name="warning" :size="18" color="#f59e0b" />
      <shs-icon name="search" :size="18" />
    </div>

    <h2>Tag</h2>
    <div class="row">
      <shs-tag> 默认 </shs-tag>
      <shs-tag type="primary"> 主要 </shs-tag>
      <shs-tag type="success"> 成功 </shs-tag>
      <shs-tag type="warning"> 警告 </shs-tag>
      <shs-tag type="danger"> 危险 </shs-tag>
      <shs-tag type="primary" closable> 可关闭 </shs-tag>
    </div>

    <h2>Card</h2>
    <div class="cards">
      <shs-card title="卡片标题">
        <p>卡片内容区域，可自由放置任意内容。</p>
        <template #footer>
          <shs-button type="primary" size="small"> 操作 </shs-button>
        </template>
      </shs-card>
      <shs-card title="hover 阴影" shadow="hover">
        <p>鼠标悬停显示阴影。</p>
      </shs-card>
    </div>

    <h2>Input / Select</h2>
    <div class="row">
      <shs-input placeholder="请输入内容" clearable style="width: 240px" />
      <shs-select v-model="selected" :options="fruits" clearable style="width: 180px" />
      <shs-select :options="fruits" disabled style="width: 180px" />
    </div>

    <h2>Form</h2>
    <div class="form-box">
      <shs-form ref="formRef" :model="formModel" :rules="formRules" label-width="80px">
        <shs-form-item label="姓名" prop="name">
          <shs-input v-model="formModel.name" placeholder="请输入姓名" style="width: 260px" />
        </shs-form-item>
        <shs-form-item label="手机号" prop="phone">
          <shs-input
            v-model="formModel.phone"
            placeholder="请输入 11 位手机号"
            style="width: 260px"
          />
        </shs-form-item>
        <shs-form-item label="水果">
          <shs-select v-model="selected" :options="fruits" style="width: 260px" />
        </shs-form-item>
        <shs-button type="primary" @click="submitForm"> 提交 </shs-button>
      </shs-form>
    </div>

    <h2>Modal / Message</h2>
    <div class="row">
      <shs-button type="primary" @click="modalVisible = true"> 打开弹窗 </shs-button>
      <shs-button @click="message.info('这是一条提示')"> info </shs-button>
      <shs-button type="warning" @click="message.warning('请检查输入')"> warning </shs-button>
      <shs-button type="danger" @click="message.error('操作失败')"> error </shs-button>
    </div>

    <shs-modal v-model="modalVisible" title="确认操作" @confirm="message.success('已确认')">
      <p>确定要执行该操作吗？</p>
    </shs-modal>

    <h2>Table / Pagination</h2>
    <shs-table :columns="tableColumns" :data="tableData" border style="max-width: 560px">
      <template #cell-name="{ row }">
        <strong>{{ row.name }}</strong>
      </template>
    </shs-table>
    <div class="row">
      <shs-pagination v-model:current-page="page" :total="35" :page-size="10" />
    </div>

    <h2>Menu</h2>
    <shs-menu
      :items="menuItems"
      mode="vertical"
      style="max-width: 200px"
      @select="handleMenuSelect"
    />

    <h2>Radio / Checkbox</h2>
    <div class="row">
      <shs-radio-group v-model="gender">
        <shs-radio value="male" label="男" />
        <shs-radio value="female" label="女" />
      </shs-radio-group>
      <shs-checkbox-group v-model="hobbies">
        <shs-checkbox value="read" label="阅读" />
        <shs-checkbox value="sport" label="运动" />
        <shs-checkbox value="music" label="音乐" />
      </shs-checkbox-group>
    </div>

    <h2>DatePicker / DateTimePicker</h2>
    <div class="row">
      <shs-date-picker v-model="date" clearable />
      <shs-date-time-picker v-model="datetime" clearable />
    </div>

    <h2>Calendar</h2>
    <shs-calendar v-model="calendarDate" v-model:events="calendarEvents" />

    <h2>Layout（Row / Col）</h2>
    <div class="row">
      <shs-row :gutter="16" style="width: 100%">
        <shs-col :span="8">
          <div class="cell">span 8</div>
        </shs-col>
        <shs-col :span="8">
          <div class="cell">span 8</div>
        </shs-col>
        <shs-col :span="8">
          <div class="cell">span 8</div>
        </shs-col>
        <shs-col :span="6">
          <div class="cell">span 6</div>
        </shs-col>
        <shs-col :span="6">
          <div class="cell">span 6</div>
        </shs-col>
        <shs-col :span="6">
          <div class="cell">span 6</div>
        </shs-col>
        <shs-col :span="6">
          <div class="cell">span 6</div>
        </shs-col>
      </shs-row>
    </div>

    <h2>Empty 空状态</h2>
    <div class="row" style="display: flex; gap: 24px; align-items: flex-start">
      <shs-empty description="暂无数据" />
      <shs-empty description="没有更多了" size="large">
        <template #description>
          <span style="color: #333">没有更多了</span>
        </template>
        <shs-button type="primary" size="small"> 去添加 </shs-button>
      </shs-empty>
    </div>
  </div>
</template>

<style>
.page {
  padding: 32px;
  font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
.page h2 {
  margin-top: 24px;
}
.row {
  display: flex;
  gap: 12px;
  margin: 12px 0;
  align-items: center;
  flex-wrap: wrap;
}
.cards {
  display: grid;
  grid-template-columns: repeat(2, 280px);
  gap: 16px;
}
.form-box {
  max-width: 420px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}
.cell {
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  border-radius: 4px;
  padding: 16px 0;
  text-align: center;
  font-size: 13px;
  color: #4f46e5;
}
</style>
