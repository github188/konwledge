import Vue from 'vue'

const div = document.createElement('div')
document.body.appendChild(div)

const app = new Vue({
  // el: '#root',
  template: '<div ref="div">{{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  },
  mounted () {

  }
  // watch: {
  //   text (newText, oldText) {
  //     console.log(`${newText}:${oldText}`)
  //   }
  // }
})

app.$mount('#root')

// let i = 0
// app.text = 'text1'
setInterval(() => {
  // i++
  app.text += 1
  // app.obj.a = i
  // app.$set(app.obj, 'a', i) // $set相当于给这个 属性添加了reactive
  // app.$delete() ---- 可以删除数据监听：如果直接删除这个数据的话，它的reactive是还在的，这样多了会导致内存溢出，$delete可以删除掉 reactive
  // app.$forceUpdate()
  // app.$options.data.text += 1
  // app.$data.text += 1
}, 1000)

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
// console.log(app.$root === app)
// console.log(app.$children)
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs)
// console.log(app.$isServer)

// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText}:${oldText}`)
// })
// setTimeout(() => {
//   unWatch()
// }, 2000)

// app.$once('test', (a, b) => { // 这里用$once就会只触发一次;$on则每次都会触发
//   console.log(`test emited ${a} ${b}`)
// })
//
// setInterval(() => {
//   app.$emit('test', 1, 2)
// }, 1000)

app.$forceUpdate()
// app.$nextTick
