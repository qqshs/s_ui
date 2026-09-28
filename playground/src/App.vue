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
const tabsActive = ref('a')
const tabs = [
  { name: 'a', label: '标签A' },
  { name: 'b', label: '标签B' },
  { name: 'c', label: '标签C' },
]
const folderActive = ref('d')
const folderTabs = ref([
  { name: 'd', label: '文档' },
  { name: 'e', label: '图片' },
  { name: 'f', label: '视频' },
  { name: 'g', label: '音乐' },
  { name: 'h', label: '设置' },
  { name: 'i', label: '下载' },
  { name: 'j', label: '收藏' },
  { name: 'k', label: '历史记录' },
  { name: 'l', label: '标签九' },
  { name: 'm', label: '标签十' },
  { name: 'n', label: '标签十一' },
  { name: 'o', label: '标签十二' },
  { name: 'p', label: '标签十三' },
  { name: 'q', label: '标签十四' },
  { name: 'r', label: '标签十五' },
])
const removeTab = (name: string) => {
  const i = folderTabs.value.findIndex((t) => t.name === name)
  if (i === -1) return
  folderTabs.value.splice(i, 1)
  if (folderActive.value === name)
    folderActive.value = folderTabs.value[i]?.name ?? folderTabs.value[i - 1]?.name ?? ''
}
const uploadFiles = ref([])
const proFormFields = [
  { prop: 'name', label: '姓名', required: true },
  {
    prop: 'city',
    label: '城市',
    type: 'select',
    options: [
      { label: '北京', value: 'bj' },
      { label: '上海', value: 'sh' },
    ],
  },
  { prop: 'remark', label: '备注', type: 'textarea' },
]
const proFormData = ref({})
const proTableColumns = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'city', label: '城市' },
]
const proTableData = ref([
  { name: '张三', age: 28, city: '北京' },
  { name: '李四', age: 32, city: '上海' },
  { name: '王五', age: 25, city: '深圳' },
])
const proTableSearchFields = [{ prop: 'keyword', label: '关键词' }]
const proTablePage = ref(1)
const proTableTotal = ref(3)
const onProTableSearch = (params: Record<string, unknown>) => {
  console.log('查询：', params)
}
const onProFormSubmit = (data: Record<string, unknown>, valid: boolean) => {
  if (valid) alert(`提交成功：${JSON.stringify(data)}`)
}
const treeData = [
  {
    label: '节点A',
    children: [{ label: 'A-1' }, { label: 'A-2', children: [{ label: 'A-2-1' }] }],
  },
  { label: '节点B' },
]
const treeShowLine = ref(true)
const onThemeApply = (color: string) => message.success(`主题色已切换为 ${color}`)
</script>

<template>
  <div class="page">
    <h1>shs_ui Playground</h1>
    <p>
      M2 组件演示：Button / Icon / Tag / Card / Input / Select / Form / Modal / Message / Table /
      Pagination / Menu / Radio / Checkbox / DatePicker / DateTimePicker / Row / Col
    </p>

    <h2>ThemeSetting 主题设置</h2>
    <div class="row">
      <shs-theme-setting @apply="onThemeApply" />
      <span style="font-size: 13px; color: #6b7280">
        点击齿轮图标打开主题设置面板 → 选择颜色设置主题色 → 点击「确定」立即全局生效。
      </span>
    </div>

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
    <div class="row">
      <shs-button type="primary" radius="none"> 无圆角 </shs-button>
      <shs-button type="primary" radius="small"> 小圆角 </shs-button>
      <shs-button type="primary"> 中圆角(默认) </shs-button>
      <shs-button type="primary" radius="large"> 大圆角 </shs-button>
      <shs-button type="primary" :radius="20"> 20px </shs-button>
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
      <shs-icon name="settings" :size="18" color="#3b82f6" />
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

    <h2>Tabs 标签页</h2>
    <shs-tabs v-model="tabsActive" :tabs="tabs">
      <template #pane-a>
        <div>面板 A 内容</div>
      </template>
      <template #pane-b>
        <div>面板 B 内容</div>
      </template>
      <template #pane-c>
        <div>面板 C 内容</div>
      </template>
    </shs-tabs>

    <h2>Tabs 文件夹式 + 可关闭 + 溢出滑动</h2>
    <shs-tabs
      v-model="folderActive"
      type="folder"
      :tabs="folderTabs"
      closable
      style="max-width: 720px"
      @close="removeTab"
    >
      <template v-for="t in folderTabs" :key="t.name" #[`pane-${t.name}`]>
        <div>“{{ t.label }}”面板内容</div>
      </template>
    </shs-tabs>
    <p style="font-size: 13px; color: #6b7280">
      当标签超出容器宽度时，两侧出现左右滑动按钮；悬停标签可看到关闭按钮，点击可关闭当前页签。
    </p>

    <h2>Tree 树形控件</h2>
    <shs-tree :data="treeData" default-expand-all :show-line="treeShowLine" style="width: 260px" />
    <p style="font-size: 13px; color: #6b7280">
      <label><input v-model="treeShowLine" type="checkbox" /> 显示虚线连接线</label>
    </p>

    <h2>Upload 上传</h2>
    <shs-upload v-model="uploadFiles" multiple style="width: 320px" />

    <h2>ProForm 高级表单</h2>
    <shs-pro-form
      v-model="proFormData"
      :fields="proFormFields"
      style="width: 520px"
      @submit="onProFormSubmit"
    />

    <h2>ProTable 高级表格</h2>
    <shs-pro-table
      v-model:current-page="proTablePage"
      :columns="proTableColumns"
      :data-source="proTableData"
      :search-fields="proTableSearchFields"
      :total="proTableTotal"
      border
      @search="onProTableSearch"
    />

    <h2>Watermark 水印</h2>
    <shs-watermark content="shs_ui 内部资料" :font-size="16" :rotate="-22">
      <div
        style="border: 1px dashed #d1d5db; background: #fff; padding: 28px 20px; min-height: 130px"
      >
        <p>这是一段被文字水印覆盖的内容区域。</p>
        <p style="color: #6b7280">
          水印默认跟随容器尺寸；可通过 gapX / gapY / rotate / opacity 调节密度与角度，content
          支持数组表示多行，也可传 image 使用图片水印，或 full-screen 全屏铺满。
        </p>
      </div>
    </shs-watermark>

    <h2>Layout 容器布局</h2>
    <shs-layout
      style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; height: 320px"
    >
      <shs-header :height="48" style="background: #eef2ff; padding: 0 16px">
        Header（height=48）
      </shs-header>
      <shs-layout>
        <shs-aside :width="160" style="background: #f9fafb; padding: 12px">
          Aside（width=160）
        </shs-aside>
        <shs-content style="padding: 16px">
          Content —— 检测到 Aside 时 Layout 自动切换为左右布局。
        </shs-content>
      </shs-layout>
      <shs-footer :height="44"> Footer（height=44） </shs-footer>
    </shs-layout>

    <h2>Layout 容器布局（侧边栏全高）</h2>
    <shs-layout
      style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; height: 320px"
    >
      <shs-aside :width="160" style="background: #f9fafb; padding: 12px">
        Aside（全高，width=160）
      </shs-aside>
      <shs-layout>
        <shs-header :height="48" style="background: #eef2ff; padding: 0 16px">
          Header（height=48）
        </shs-header>
        <shs-content style="padding: 16px">
          Content —— 右侧纵向：Header / Content / Footer。
        </shs-content>
        <shs-footer :height="44"> Footer（height=44） </shs-footer>
      </shs-layout>
    </shs-layout>

    <h2>Layout 容器布局（头部全宽）</h2>
    <shs-layout
      style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; height: 320px"
    >
      <shs-header :height="48" style="background: #eef2ff; padding: 0 16px">
        Header（全宽，height=48）
      </shs-header>
      <shs-layout>
        <shs-aside :width="160" style="background: #f9fafb; padding: 12px">
          Aside（width=160）
        </shs-aside>
        <shs-layout>
          <shs-content style="padding: 16px">
            Content —— 头部下左侧区域 + 右侧主区 / 底部。
          </shs-content>
          <shs-footer :height="44"> Footer（height=44） </shs-footer>
        </shs-layout>
      </shs-layout>
    </shs-layout>
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
