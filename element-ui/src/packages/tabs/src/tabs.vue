<script type="text/jsx">
  export default {
    name: "ElTabs",
    props: {
      type: String,
      activeName: String,
      closable: Boolean,
      addable: Boolean,
      value: {},
      editable: Boolean,
      tabPosition: {
        type: String,
        default: 'top'
      }
    },
    provide() {
      return {
        rootTabs: this
      };
    },
    data() {
      return {}
    },
    created() {

    },
    methods: {},
    render(h) {
      const btm = {
        props: {},

      }
      return (<div class="tabs">
        tabs2
      </div>)
    }
  }
</script>

<style lang="scss" scoped>

</style>
