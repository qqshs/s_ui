import type { App, Plugin } from 'vue'

import '@shs-ui/theme'

import SHS_UI, {
  install,
  ShsButton,
  ShsIcon,
  ShsTag,
  ShsCard,
  ShsInput,
  ShsRow,
  ShsCol,
  ShsSelect,
  ShsForm,
  ShsFormItem,
  ShsModal,
  ShsMessage,
  message,
  ShsTable,
  ShsPagination,
  ShsMenu,
  ShsRadio,
  ShsRadioGroup,
  ShsCheckbox,
  ShsCheckboxGroup,
  ShsDatePicker,
  ShsDateTimePicker,
  ShsCalendar,
  ShsEmpty,
  ShsTabs,
  ShsTree,
  ShsUpload,
  ShsProForm,
  ShsProTable,
  ShsThemeSetting,
  ShsWatermark,
  ShsLayout,
  ShsHeader,
  ShsAside,
  ShsContent,
  ShsFooter,
} from '@shs-ui/components'

export {
  install,
  ShsButton,
  ShsIcon,
  ShsTag,
  ShsCard,
  ShsInput,
  ShsRow,
  ShsCol,
  ShsSelect,
  ShsForm,
  ShsFormItem,
  ShsModal,
  ShsMessage,
  message,
  ShsTable,
  ShsPagination,
  ShsMenu,
  ShsRadio,
  ShsRadioGroup,
  ShsCheckbox,
  ShsCheckboxGroup,
  ShsDatePicker,
  ShsDateTimePicker,
  ShsCalendar,
  ShsEmpty,
  ShsTabs,
  ShsTree,
  ShsUpload,
  ShsProForm,
  ShsProTable,
  ShsThemeSetting,
  ShsWatermark,
  ShsLayout,
  ShsHeader,
  ShsAside,
  ShsContent,
  ShsFooter,
}

export * from '@shs-ui/components'

/** 聚合安装插件：app.use(S_UI) 一次性注册全部组件 */
export const S_UI: Plugin = {
  install(app: App) {
    app.use(SHS_UI)
  },
}

export default S_UI
