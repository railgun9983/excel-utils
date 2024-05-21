<template>
  <div>
    <n-flex>
      <n-upload
        style="width: 260px"
        ref="file"
        :default-upload="false"
        accept=".xlsx"
        @change="onChangeFileUpload"
        @remove="handleRemove"
      >
        <n-button>选择文件（文件后缀为 xlsx）</n-button>
      </n-upload>
      <n-input-number v-model:value="columns" clearable placeholder="列数量" />
      <n-button @click="mergeExcel">合并文件</n-button>
    </n-flex>
    <n-divider />

    <n-flex v-if="!!records.length">
      <section>
        <h3 style="padding-bottom: 10px; text-align: center">数据源</h3>
        <n-flex>
          <section v-for="(record, key) in records" :key="key">
            <n-table striped>
              <thead>
                <tr>
                  <th>考号</th>
                  <th>姓名</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in record" :key="index">
                  <td>{{ item.no }}</td>
                  <td>{{ item.name }}</td>
                </tr>
              </tbody>
            </n-table>
          </section>
        </n-flex>
      </section>
      <n-divider vertical />
      <section>
        <h3 style="padding-bottom: 10px; text-align: center">预览</h3>
        <n-flex v-for="(row, index) in previewData" :key="index">
          <div
            v-for="col in row"
            :key="col.no"
            style="padding: 10px; border: 1px dashed #f3f3f3; width: 90px"
          >
            <div style="text-align: center">{{ col.no }}</div>
            <div style="text-align: center">{{ col.name }}</div>
          </div>
        </n-flex>
      </section>
    </n-flex>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ExcelJS from 'Exceljs'
import { useMessage } from 'naive-ui'
import { chunk } from 'lodash-es'
import { saveAs } from 'file-saver'

const columns = ref(6)
const isLoading = ref(false)
const file = ref(null)
const records = ref([])

const message = useMessage()

const previewData = computed(() => {
  const maxLen = Math.max(...records.value.map((it) => it.length))
  const result = []

  for (let index = 0; index < maxLen; index++) {
    result.push(records.value.map((it) => it[index]))
  }

  const resultBycolumns = chunk(result.flat().filter(Boolean), columns.value)
  return resultBycolumns
})

function updateRecords(res) {
  records.value = res
}

async function onChangeFileUpload(options) {
  const files = options.fileList
  isLoading.value = true
  if (files.length > 0) {
    const bf = await files[0].file.arrayBuffer()
    const wb = new ExcelJS.Workbook()
    await wb.xlsx.load(bf)
    const result = []
    wb.eachSheet(function (item) {
      const [_n, __n, ...noValue] = item.getColumn(1).values
      const [_v, __v, ...nameValue] = item.getColumn(2).values
      const data = noValue.map((it, index) => ({
        no: it,
        name: nameValue[index]
      }))
      result.push(data)
    })
    updateRecords(result)
  }
  isLoading.value = false
}

function mergeExcel() {
  if (records.value.length <= 0) {
    message.warning('请先选择文件')
    return
  }
  if (columns.value.length <= 0) {
    message.warning('请先输入列数')
    return
  }

  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('座位表')
  try {
    previewData.value.forEach((element, row) => {
      element.map((it, col) => {
        const cell = ws.getCell(2 * row + 1, 2 * col + 1)
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
          wrapText: true
        }
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }

        cell.value = `${it.no}\n${it.name}`
      })
    })
  } catch (e) {
    message.warning('文件解析失败！请确实文件格式正确')
  }

  wb.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), '合并表.xlsx')
  })
}

function handleRemove() {
  updateRecords([])
}

</script>

<style></style>
