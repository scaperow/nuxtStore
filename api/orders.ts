// 在 api 目录下创建 orders.js 文件

// api/orders.js

import express from 'express'
import { Order } from '~/common/order'

const router = express.Router()

// 创建订单
router.post('/', async (req, res) => {
  try {
    // 创建订单对象
    const order = new Order()
    order.set(req.body)

    await order.save()
    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({ success: false, error: 'Failed to create order' })
  }
})

export default {
  path: '/api/orders',
  handler: router,
}
