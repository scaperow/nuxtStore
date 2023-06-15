import AV from 'leancloud-storage'

// 订单信息实体类
export class Order extends AV.Object {
  constructor() {
    super('Order')
  }
}

export default { Order }
