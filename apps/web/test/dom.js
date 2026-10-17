import { GlobalRegistrator } from '@happy-dom/global-registrator'

// Its own preload, so the DOM exists before Testing Library is imported.
GlobalRegistrator.register({
  // Iframes (YouTube) stay empty instead of logging a load error.
  settings: { handleDisabledFileLoadingAsSuccess: true },
})
