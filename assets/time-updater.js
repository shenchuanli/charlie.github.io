// Docsify plugin default values
let defaultDocsifyUpdatedOptions = {
    text: ">Last Modify: {docsify-updated}",
    formatUpdated: "{YYYY}/{MM}/{DD}",
    whereToPlace: "bottom"
  }
  
  // Docsify plugin functions
  function plugin(hook, vm) {
    let text = vm.config.timeUpdater.text
    let whereToPlace = String(vm.config.timeUpdater.whereToPlace).toLowerCase()
    hook.beforeEach(function (content) {
      switch (whereToPlace) {
        case "top":
          return text + "\n\n" + content
        case "bottom":
          return content + "\n\n" + text
        default:
          return content + "\n\n" + text
      }
    })
  }
  
  window.$docsify = (window.$docsify || {})

  window.$docsify.formatUpdated = window.$docsify["timeUpdater"] ? window.$docsify["timeUpdater"].formatUpdated : defaultDocsifyUpdatedOptions.formatUpdated
  window.$docsify["timeUpdater"] = Object.assign(defaultDocsifyUpdatedOptions, window.$docsify["timeUpdater"])
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(plugin)