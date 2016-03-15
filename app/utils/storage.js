// localStore polyfill

const __storage = (function selectStorage() {
  try {
    let testKey = '__ls.test__'
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return localStorage
  } catch (e) {
    return createStorage()
  }
})()

// this pseudo-storage doesn't support storage.length or storage.key(idx)
function createStorage() {
  let storage = {}
  return {
    setItem: function (key, value) {
      storage[key] = value
    },
    getItem: function (key) {
      return storage[key]
    },
    removeItem: function (key) {
      delete storage[key]
    },
    clear: function () {
      storage = {}
    }
  }
}
export default __storage
