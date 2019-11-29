import { createApp } from './app'

export default context => {
  const { app, store, router } = createApp()
  router.push(context.url)
  return new Promise((resolve, reject) => {
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      Promise.all(matchedComponents.map(component => {
        if (component && component.asyncData) {
          return component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
