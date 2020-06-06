import { Router } from './deps/oak.ts'
import * as endpoints from './endpoints/mod.ts'

export const router = new Router()

router.get('/messages', endpoints.message.index)
router.post('/messages', endpoints.message.store)
router.get('/messages/events', endpoints.message.events)
