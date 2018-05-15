<script type="text/jsx">
  import TabNav from "./tab-nav.vue"
  export default {
    name:"ElTabs",
    components:{
      TabNav
    },
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
    data() {
      return {
        paneList: [],
        currentStyle:{},
        currentClass:{},
        tabBlock:true,

        currentName: this.value || this.activeName,
        panes:[],
      }
    },
    watch:{
      activeName(value) {
        this.setCurrentName(value);
      },
      value(value) {
        this.setCurrentName(value);
      },
    },
    provide(){
      return {
        rootTabs:this
      }
    },
    created(){
      if (!this.currentName) {
        this.setCurrentName('0');
      }
    },
    mounted() {
      //this.$nextTick(this._initData());//将回调延迟到下次 DOM 更新循环之后执行  //在nav元素初始化之后，获取nav的宽度之类的数据
    },
    methods: {
      addPanes(item) {
        const index = this.$slots.default.filter(item => {
          return item.elm.nodeType === 1 && /\bel-tab-pane\b/.test(item.elm.className);
        }).indexOf(item.$vnode);
        this.panes.splice(index, 0, item);
      },
      removePanes(item) {
        const panes = this.panes;
        const index = panes.indexOf(item);
        if (index > -1) {
          panes.splice(index, 1);
        }
      },
      setCurrentName(value) {
        this.currentName = value;
        this.$emit('input', value);
      },
      handleTabClick(tab, tabName, event) {
        if (tab.disabled) return;
        this.setCurrentName(tabName);
        this.$emit('tab-click', tab, event);
      },
      handleTabRemove(pane, ev) {
        if (pane.disabled) return;
        ev.stopPropagation();
        this.$emit('edit', pane.name, 'remove');
        this.$emit('tab-remove', pane.name);
      },
    },
    render(h){
      let {tabPosition,type,panes,handleTabClick,handleTabRemove}=this;

      const navData = {
        props:{
          type,
          panes,
          onTabClick: handleTabClick,
          onTabRemove: handleTabRemove,
        },
        ref:"nav"
      };
      const header = (<div class={['el-tabs__header', `is-${tabPosition}`]}>
        <tab-nav {...navData}></tab-nav>
      </div>);

      const panels = (<div class="el-tabs__content">
        {this.$slots.default}
      </div>);

      return (<div class={{
        'el-tabs': true,
        'el-tabs--card': type === 'card',
        [`el-tabs--${tabPosition}`]: true,
        'el-tabs--border-card': type === 'border-card'
      }}>
        { tabPosition !== 'bottom' ? [header, panels] : [panels, header] }
      </div>)

    }
  }
</script>

