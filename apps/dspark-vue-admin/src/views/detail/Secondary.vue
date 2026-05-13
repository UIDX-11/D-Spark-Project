<template>
  <a-space direction="vertical" fill size="medium">
    <a-card title="主实体">
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="订单号">ORD-9001</a-descriptions-item>
        <a-descriptions-item label="金额">¥128.00</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card title="子资源（下级详情占位）">
      <a-table
        :columns="[
          { title: '子项', dataIndex: 'name' },
          { title: '数量', dataIndex: 'qty' },
        ]"
        :data="[
          { key: '1', name: 'SKU-A', qty: 2 },
          { key: '2', name: 'SKU-B', qty: 1 },
        ]"
        :pagination="false"
      />
    </a-card>
  </a-space>
</template>
