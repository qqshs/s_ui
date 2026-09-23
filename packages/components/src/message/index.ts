import Message from './message.vue'
import { withInstall } from '../utils/with-install'
import { message } from './message'

export const ShsMessage = withInstall(Message)
export { message }
export default message
export * from './props'
