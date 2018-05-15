<script type="text/jsx">
  function noop() {}
  const firstUpperCase = str => {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  };

  export default {
    name:"TabNav",
    inject:["rootTabs"],
    props: {
      panes: Array,
      currentName: String,
      editable: Boolean,
      onTabClick: {
        type: Function,
        default: noop
      },
      onTabRemove: {
        type: Function,
        default: noop
      },
      type: String
    },
    data() {
      return {
        scrollable: false,
      }
    },
    computed:{
      navStyle(){

      }
    },
    created() {

    },
    methods: {
      changeTab(){

      },
      removeFocus(){
        this.isFocus = false;
      }
    },
    render(h){
      let {scrollable,navStyle,panes,closable,editable,
        changeTab,onTabRemove,removeFocus,onTabClick}=this;

      const tabs =this._l(panes,(pane, index)=>{
        let tabName = pane.name || pane.index || index;
        const closable = pane.isClosable || editable;
        pane.index = `${index}`;

        const btnClose = closable ? <span class="el-icon-close" on-click={(ev) => { onTabRemove(pane, ev); }}></span> : null;
        const tabLabelContent = pane.$slots.label || pane.label;
        const tabindex = pane.active ? 0 : -1;

        return (<div class={{
          'el-tabs__item': true,
          [`is-${ this.rootTabs.tabPosition }`]: true,
          'is-active': pane.active,
          'is-disabled': pane.disabled,
          'is-closable': closable,
          'is-focus': this.isFocus
        }}
                     id={`tab-${tabName}`}
                     aria-controls={`pane-${tabName}`}
                     role="tab"
                     aria-selected={ pane.active }
                     ref="tabs"
                     tabindex={tabindex}
                     refInFor
                     on-click={(ev) => { removeFocus(); onTabClick(pane, tabName, ev); }}
        >
          {tabLabelContent}
          {btnClose}
        </div>)
      }) ;

      return (<div class={["el-tabs__nav-wrap",scrollable? 'is-scrollable':'',`is-${ this.rootTabs.tabPosition }`]}>
        <div class={["el-tabs__nav-scroll"]} ref="navScroll">
          <div class="el-tabs__nav" ref="nav" style={navStyle} role="tablist" on-keydown={ changeTab }>
            {tabs}
          </div>
        </div>
      </div>)
    }

  }
</script>

<style lang="scss" scoped>

</style>
