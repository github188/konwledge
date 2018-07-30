import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
        <div v-pre>Text: {{text}}</div>
        <div v-if="active" >Text: {{text}}</div>
        <div v-else-if="text===0">Else if content</div>
        <div v-else>Else content</div>
        <div v-html="html"></div>
        <ul>
            <li v-for="(item,index) in arr" :key="item">{{ item }}:{{index}}</li>
        </ul>
         <ul>
            <li v-for="(val,key,index) in obj">{{ key }}:{{val}}:{{index}}</li>
        </ul>
        <input type="text" v-model.number="text">
        <input type="checkbox" v-model="active">
        <div>
            <input type="checkbox" :value="1" v-model="arr">
            <input type="checkbox" :value="2" v-model="arr">
            <input type="checkbox" :value="3" v-model="arr">
        </div>
        <div>
            <input type="radio" value="one" v-model="picked">
            <input type="radio" value="two" v-model="picked">
        </div>
    </div>
    `,
  data: {
    arr: [1, 2, 3],
    obj: {
      a: 123,
      b: 456,
      c: 789
    },
    text: 0,
    active: false,
    picked: '',
    html: `<span>this is html</span>`
  },
  watch: {
    text: {
      handler (newVal, oldVal) {
        console.log(newVal, typeof newVal)
      },
      immediate: true
    }
  }
})
