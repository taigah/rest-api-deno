import { messages, messageClients } from '../store/mod.ts'

interface MessageProjection {
  content: string
}

export class Message {
  content: string

  constructor (content: string) {
    this.content = content
  }

  static async all (): Promise<Message[]> {
    return messages
  }

  static async insertOne (message: Message): Promise<Message> {
    messages.push(message)
    for (const client of messageClients) {
      client.emit('message', JSON.stringify(Message.project(message)))
    }
    return message
  }

  static project (message: Message | Message[]): MessageProjection | MessageProjection[] {
    if (message instanceof Message) {
      return {
        content: message.content
      }
    }
    return message.map(message => Message.project(message) as MessageProjection)
  }
}
