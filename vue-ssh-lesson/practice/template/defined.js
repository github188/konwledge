import Vue from 'vue'

const component = {
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
      text: 123
    }
  },
  methods: {
    handleChange () {
      // this.onChange()
      this.$emit('change')
    }
  }
}

// Vue.component('CompOne', component)

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  data () {
    return {
      props1: `1`
    }
  },
  template: `
    <div>
        <comp-one :prop-one="props1" @change="handleChange"></comp-one>
        <comp-one></comp-one>
    </div>
  `,
  methods: {
    handleChange () {
      this.props1 += `1`
    }
  }
})
