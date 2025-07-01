export interface ContentCard {
  id: string
  title: string
  description: string
  imageUrl?: string
  url?: string
  type: string
  created: Date
  viewed: boolean
  dismissed: boolean
  extras?: { [key: string]: any }
}

export interface InboxCard extends ContentCard {
  timestamp: string
  icon?: string
}
