import Vue from 'vue'

const component = {
  name: 'Root',
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
        <div>
            <input type="text" v-model.number="text">
            <span @click="handleChange">{{propOne}}</span>
        </div>
    `,
  data () {
    return {

    }
  },
  mounted () {
    console.log('comp mounted')
  },
  methods: {
    handleChange () {
      // this.onChange()
      this.$emit('change')
    }
  }
}

// Vue.component('CompOne', component)

const parent = new Vue({
  name: 'parent'
})

const component2 = {
  // parent: parent,
  extends: component,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    this.$parent.text = '12345'
    console.log(this.$parent.$options.name, 'comp2 mounted')
  }
}

// const CompVue = Vue.extend(component)

// new CompVue({
//   el: '#root',
//   propsData: {
//     propOne: 'xxx'
//   },
//   data: {
//     text: '123'
//   },
//   mounted () {
//     console.log('instance mounted')
//   }
// })

new Vue({
  parent: parent,
  name: 'Root2',
  el: '#root',
  components: {
    Comp: component2
  },
  data: {
    text: '23333'
  },
  template: `
    <div>
    {{text}}
     <comp></comp>
    </div>
   
  `,
  mounted () {
    console.log(this.$parent.$options.name, 'root2 mounted')
  }
})
