import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import Layout from '@/component/layout/LayoutCom.vue'
import SiteView from '@/views/SiteView.vue'
import ReportView from '@/views/ReportView.vue'

type RouteMetaContent = { icon: string, label: string }
type RouteRecordRawItem = RouteRecordRaw & { meta: RouteMetaContent, children?: RouteRecordRawItem[] }

export const routes: RouteRecordRawItem[] = [
  {
    path: '/excel',
    component: Layout,
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
      },
      {
        path: 'report',
        name: 'report',
        component: ReportView,
        meta: {
          icon: 'ReceiptOutline',
          label: '报表'
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory('/excel-utils/'),
  routes: [
    {
      path: '/',
      redirect: '/excel/exam'
    },
    ...routes
  ]
})

export default router
