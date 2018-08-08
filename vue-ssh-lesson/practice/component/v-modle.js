import Vue from 'vue'

const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value1'],
  template: '<input type="text" :value="value1" @input="handleInput">',
  data () {
    return {
      test: 3333
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  el: '#root',
  components: {
    Comp: component
  },
  template:
    `<div>
        <!--<comp :value="value" @input="value=arguments[0]"></comp>-->
        <comp v-model="value"></comp>
    </div>`,
  data () {
    return {
      value: 111111
    }
  }
})
