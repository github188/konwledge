<script type="text/jsx">
  import child from "./child.vue"
  export default {
    components:{
      child
    },
    data() {
      return {
        tabPosition:"top",
        data:"1"
      }
    },
    computed:{

    },
    provide() {
      return {
        rootTabs: this
      };
    },
    created() {

    },
    methods: {},
    render(h){
      const navData = {
        props: {
          childData:"hello"
        },
        ref: 'nav'
      };

        const  child = (
          <child {...navData}></child>
          )

      return (<div class="parent">
        parents{child}
      </div>)
    }
  }
</script>

<style lang="scss" scoped>

</style>
