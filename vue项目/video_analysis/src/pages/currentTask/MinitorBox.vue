<template>

  <div class="minitor-layer">
    <div class="minitor-top-box">
      <span class="title-text">实时监控</span>
      <div class="select-gallery" @click="channelSelect">选择通道 <i class="el-icon-caret-bottom"></i></div>
    </div>

    <div class="minitor-content">
      <i v-show="closeIconShow" class="video-delete icon-quxiao iconfont" @click="closeVideo"></i>
      <div class="video-stop"></div>
      <a id="player" href style="display:block;width:100%;height:100%"></a>
      <div class="pass-name">通道名称</div>

      <div class="video-channel">
        <panel :flag="flag">
          <el-tree :data="channelData"
                   :props="channelDefault"
                   :default-expanded-keys="[10, 2, 3]"
                   node-key="id"
                   @node-click="handleNodeClick"
          ></el-tree>
        </panel>
      </div>
    </div>
  </div>
</template>

<script>
  import Panel from '@/components/common/panel/Panel.vue'

  export default {
    name: 'MinitorBox',
    components: {
      Panel
    },
    props: {
      channelData: {
        type: Array
      },
      channelDefault: {
        type: Object,
        default: function () {
          return {
            children: 'children',
            label: 'label'
          }
        }
      }
    },
    data () {
      return {
        activeNames: '',
        flag: false,
        closeIconShow: true
      }
    },
    created () {

    },
    methods: {
      handleChange () {

      },
      handleNodeClick (data) {
        this.closeIconShow = true
        console.log(data)
      },
      channelSelect () {
        this.flag = !this.flag
      },
      closeVideo () {
        this.closeIconShow = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  $videoStop: '~@/assets/images/video-stop.png';
  .minitor-layer {
    width: 38%;
    height: 340px;
    .minitor-top-box {
      box-sizing: border-box;
      padding-left: 20px;
      line-height: 36px;
      font-size: 18px;
      height: 36px;
      margin-bottom: 10px;
      span.title-text {
        font-weight: 900;
        color: #1eebfc;
      }
      .select-gallery {
        line-height: 36px;
        width: 140px;
        height: 36px;
        border-radius: 4px;
        float: right;
        background: #29b1fb;
        color: #1b1464;
        position: relative;
        text-align: center;
        font-weight: 800;
        cursor: pointer;
      }
    }
    .minitor-content {
      position: relative;
      box-sizing: border-box;
      border: 1px solid #1eb5fc;
      height: calc(100% - 46px);
      background: #333;
      .video-delete {
        position: absolute;
        left: 5px;
        top: 5px;
        color: #1eb5fc;
        font-size: 20px;
        z-index: 5;
        background: #313131;
        &:hover{
          cursor: pointer;
        }
      }
      .video-stop {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 3;
        background-color: #313131;
        background: url($videoStop) no-repeat center center;
      }
      .pass-name {
        position: absolute;
        bottom: 0;
        right: 5%;
        color: #fff0f0;
        font-size: 18px;
      }
      .video-channel {
        box-sizing: border-box;
        position: absolute;
        right: 0;
        top: -1px;
        width: 36%;
        overflow-y: scroll;
        max-height: 100%;
        border: 1px solid #29b1fb;
        border-top: none;
        background: rgba(15, 2, 115, .6);
        z-index: 1000;
        &::-webkit-scrollbar {
          width: 5px;
          background: rgba(15, 2, 115, .6);
        }
        &::-webkit-scrollbar-thumb {
          background: orange;
          border-radius: 5px;
        }
      }
    }

    .el-tree {
      background: none;
      color: #29b1fb;
    }
    .el-tree-node__content:hover {
      background-color: #1eebfc;
    }
  }
</style>
<style lang="scss">
  .minitor-layer {
    .video-channel {
      .el-tree-node__content:hover {
        background-color: #1eebfc;
      }
      .el-tree-node:focus > .el-tree-node__content {
        background-color: #1eebfc;
      }
    }
  }
</style>
