import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '3hjgtb6q',
    dataset: 'production',
  },
  studioHost: 'jonasvail',
  deployment: { appId: 'l1y0yz7grnbt9p222sboipw1', autoUpdates: true },
})
