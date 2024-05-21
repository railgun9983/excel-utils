import { h, defineComponent } from 'vue'
import { NIcon } from 'naive-ui'

export const CustomIcon = defineComponent(
  async (props, ctx) => {
    const icon = ctx.attrs.icon as any
    if (!icon) return () => h('template')
    // @ts-ignore
    const { [icon]: IconCom } = await import('@vicons/ionicons5')
    if (!IconCom) return () => h('template')

    return () => h(NIcon, null, { default: () => h(IconCom) })
  }
)