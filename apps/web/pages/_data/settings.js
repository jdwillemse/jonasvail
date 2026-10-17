import { getSettings } from '@/lib/api'

export default async () => (await getSettings()) ?? {}
