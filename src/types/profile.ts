// src/types/Card.ts
export interface Card {
    width: '50%' | '100%'
    type: 'chart' | 'content'
    content?: string
    option?: any
  }
  