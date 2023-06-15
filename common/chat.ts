interface TicketMessage {
  id: string
  author: {
    role: string
    metadata: any
  }
  create_time: number
  content: {
    content_type: string
    parts: string[]
  }
  status: string
  end_turn?: boolean
  weight: number
  metadata: any
  recipient: string
}

interface TicketNode {
  id: string
  message?: TicketMessage
  parent?: string
  children: string[]
}

interface TicketData {
  title: string
  create_time: number
  update_time: number
  mapping: {
    [key: string]: TicketNode
  }
  moderation_results: any[]
  current_node: string
}
