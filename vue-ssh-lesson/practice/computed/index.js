import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
      <div>
        <p>Name : {{name}}</span>
        <p>Name : {{getName()}}</span>
        <p>Number : {{number}}</p>
        <p>fullName : {{fullName}}</p>
        <p><input type="text" v-model="number"></p>
        <p>firstName : <input type="text" v-model="firstName"></p>
        <p>lastName : <input type="text" v-model="lastName"></p>
        <p>name : <input type="text" v-model="name"></p>
         <p>obj.a : <input type="text" v-model="obj.a"></p>
       </div>
  `,
  data: {
    firstName: 'Jocky',
    lastName: 'Lou',
    number: 0,
    fullName: '',
    obj: {
      a: 123
    }
  },
  computed: {
    // name () {
    //   console.log(`computed name`, this.firstName)
    //   return `${this.firstName} ${this.lastName}`
    // },
    name: {
      get () {
        console.log(`computed name`, this.firstName)
        return `${this.firstName} ${this.lastName}`
      },
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  methods: {
    getName () {
      console.log(`methods name`, this.number)
      return `${this.firstName} ${this.lastName}`
    }
  },
  watch: {
    // firstName (newName, oldName) {
    //   this.fullName = newName + '' + this.lastName
    // }
    firstName: {
      handler (newName, lodName) {
        console.log(111)
        this.fullName = newName + ' ' + this.lastName
      }
    },
    // obj: {
    //   handler () {
    //     console.log('obj is changed')
    //   },
    //   imemediate: true,
    //   deep: true
    // },
    'obj.a': {
      handler () {
        console.log('obj is changed')
      },
      imemediate: true
    }
  },
  mounted () {
    this.obj.a = 23333
    // this.obj = 234
    // this.obj.a = 23333
  }
})
