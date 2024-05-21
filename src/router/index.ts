import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import SidebarCom from '@/component/layout/SidebarCom.vue'
import SiteView from '@/views/SiteView.vue'

type RouteMetaContent = { icon: string, label: string }
type RouteRecordRawItem = RouteRecordRaw & { meta: RouteMetaContent, children?: RouteRecordRawItem[] }

export const routes: RouteRecordRawItem[] = [
  {
    path: '/excel',
    component: SidebarCom,
    meta: {
      icon: 'GridOutline',
      label: 'excel'
    },
    redirect: '/excel/exam',
    children: [
      {
        path: 'exam',
        name: 'exam',
        component: SiteView,
        meta: {
          icon: 'ReceiptOutline',
          label: '座位表'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/excel/exam'
    },
    ...routes
  ]
})

export default router
