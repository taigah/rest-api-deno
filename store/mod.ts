import { Message } from '../models/Message.ts'
import { SSEClient } from '../lib/http.ts'

export const messages: Message[] = []

export const messageClients: SSEClient[] = []
