<template>
  <div id="canvasContainer">
    <div style="margin:5px 0;text-align: left;">
      <el-button class="button-icon" icon='delete' type='danger' size="small" title='删除 d' @click="editor && editor.img? editor.removeSelected(): null">
        <i class="el-icon-delete "></i>
      </el-button>
      <el-button class="button-icon" size="small" title="Esc/A/SPACE" @click="editor && editor.img? editor.toggleActionMode(0): null">
        <i class="icon icon-mouse"></i>
      </el-button>
      <el-button class="button-icon" size="small" title="Q 矩形" @click="editor && editor.img? editor.toggleActionMode(1): null">
        <i class="icon icon-zfx"></i>
      </el-button>
      <el-button class="button-icon" size="small" title="W 圆形" @click="editor && editor.img? editor.toggleActionMode(2): null" style="display:none">
        <i class="icon icon-yx"></i>
      </el-button>
      <el-button class="button-icon" size="small" title="E 四边形" @click="editor && editor.img? editor.toggleActionMode(3): null">
        <i class="icon icon-sbx"></i>
      </el-button>
      <el-button class="button-icon" size="small" title="R 点" @click="editor && editor.img? editor.toggleActionMode(4): null" style="display:none">
        <i class="icon icon-dw"></i>
      </el-button>
      <el-button class="button-icon" size="small" title="T 多边形" @click="editor && editor.img? editor.toggleActionMode(5): null">
        <i class="icon icon-dbx"></i>
      </el-button>
      <el-select size="small" style="width: 150px; margin:0 10px" placeholder="颜色选择" v-model="value" @change="editor? editor.onColorChange(value): null">
        <el-option v-for="item in sortSlect" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button size="small" title="PageUp 上一设备" @click="editor && editor.img? this.loadPrevEquip(): null" icon="up" style="display:none">
        <i class="el-icon-arrow-left"></i>
      </el-button>
      <el-button size="small" title="PageDown 下一设备" @click="editor && editor.img? this.loadNextEquip(): null" icon="down" style="display:none">
        <i class="el-icon-arrow-right "></i>
      </el-button>
      <el-button size="small" icon='left' title='上一张' @click="this.loadPrevImg">
        <i class="el-icon-arrow-up"></i>
      </el-button>
      <el-button size="small" icon='right' title='下一张' @click="this.loadNextImg">
        <i class="el-icon-arrow-down"></i>
      </el-button>
      <el-input size="small" style="width: 150px;margin-right:10px;display:none" v-model="sortValue" :disabled="!editor || !editor.label_editing" id="mark_edit_tool" placeholder="请输入标签" @focus="editor.label_editing=true" @blur=" this.blurLabelChange" />
      <el-select size="small" style="width: 150px;margin-left:10px;" placeholder="标签选择" v-model="value" @change="editor? editor.handleLabelChange(value): null">
        <el-option v-for="item in sortSlect" :key="item.value" :label="item.label" :value="item.value"></el-option>
        <!-- { labelsData.map((item,index)=>
                <el-option key={index} value={item.name}>{item.note}</el-option>) } -->
      </el-select>
    </div>
    <canvas id="canvas"/>
  </div>
</template>

<script>
import Editor from '../components/utils/editor';
const img = new Image();
export default {
    props: {
    drawImg: { type: String, default: '' }
  },
  data() {
    return {
      img: require('../assets/car.jpg'),
      editor: {},
      editable: true,
      sortValue: '',
      drawType: '',
      sortSlect: [
        {
          value: '#0000E3',
          label: '蓝色'
        },
        {
          value: '#000',
          label: '黑色'
        },
        {
          value: '#fff',
          label: '白色'
        },
        {
          value: '#f00',
          label: '红色'
        },
        {
          value: '#ff0',
          label: '黄色'
        },
        {
          value: '#1d953f',
          label: '薄绿'
        },
        {
          value: '#ff6100',
          label: '赤橙色'
        },
        {
          value: '#8552a1',
          label: '紫色'
        },
        {
          value: '#ff00ff',
          label: '玫红色'
        }
      ],
      value: ''
    };
  },
  methods: {
    loadPrevEquip() { },
    loadNextEquip() { },
    loadPrevImg() { },
    loadNextImg() { },
    blurLabelChange(e) {
      this.sortValue = e.target.value;
      this.editor.handleLabelChange(e.target.value);
      this.editor.label_editing = false;
    },
    handleOnKeyDown(e) {
      // console.log(e.keyCode)
      if (this.editor && !this.editor.label_editing) {
        switch (e.keyCode) {
          case 33: // pageup
            e.preventDefault();
            this.loadPrevEquip();
            break;
          case 34: // pagedown
          case 83: // s
            e.preventDefault();
            this.loadNextEquip();
            e.preventDefault();
            break;
          case 48: // 0
          case 49: // 1
          case 50: // 2
          case 51: // 3
          case 52: // 4
          case 53: // 5
          case 54: // 6
          case 55: // 7
          case 56: // 8
          case 57: // 9
            if (this.currentBusinessId) {
              this.handleQuickMark(e.keyCode);
            }
            break;
          case 67: // C 拷贝
            if (e.ctrlKey) {
              if (this.editor && this.editor.shapes) {
                this.setState({
                  copiedData: this.editor.shapes.filter(item => item.isCompleted && !item.isDelete).map(item => ({ ...item, shape_id: null, isUpdate: false, selected: false }))
                });
              } else {
                this.tools.message('无数据可拷...', 'warning');
              }
            }
            break;
          case 86: // V 粘贴
            if (e.ctrlKey) {
              if (this.copiedData && this.editor && this.editor.img) {
                this.editor.shapes = [...this.editor.shapes.filter(item => item.isCompleted), ...this.copiedData].map((item, index) => ({ ...item, id: index }));
                this.editor.draw();
              }
            }
            break;
          default:
            break;
        }
        if (this.editor.img) {
          this.editor.onKeyDown(e);
        }
      }
    },

    handleOnKeyUp(e) {
      this.editor.onKeyUp(e);
    },
    loadImg(imgUrl){
        img.src =imgUrl;
    }
  },
  mounted() {
        console.log("2222");
    console.log(this.drawImg);
    let _this = this;

    document.onkeydown = this.handleOnKeyDown;
    document.onkeyup = this.handleOnKeyUp;
    let data = {
      shapes: [
        {
          color: '#ff0',
          label: 'SL',
          paintType: 5,
          points: [
            { x: 862.261338836413, y: 1337.6868326265537 },
            { x: 1472.1643132220797, y: 1230.8703465982028 },
            { x: 1434.2079589216946, y: 2044.2207958921695 },
            { x: 525.9666238767651, y: 2046.9319640564827 }
          ],
          shape_id: 3893,
          id: 0,
          isCompleted: true,
          'el-selected': false
        },
        {
          color: '#ff0',
          label: 'SL/RL',
          paintType: 5,
          points: [
            { x: 1447.7637997432607, y: 2049.643132220796 },
            { x: 1483.0089858793326, y: 1225.4480102695763 },
            { x: 1873.4172015404365, y: 1144.1129653401797 },
            { x: 2318.048780487805, y: 2052.354300385109 }
          ],
          shape_id: 3894,
          id: 1,
          isCompleted: true,
          'el-selected': false
        },
        {
          color: '#ff0',
          label: 'RA',
          paintType: 5,
          points: [
            { x: 2163.512195121951, y: 856.7291399229782 },
            { x: 2591.87676508344, y: 764.5494223363287 },
            { x: 2608.1437740693195, y: 1358.2952503209242 },
            { x: 2464.4107830551948, y: 1423.2644415917855 }
          ],
          shape_id: 3895,
          id: 2,
          isCompleted: true,
          'el-selected': false
        },
        {
          color: '#f00',
          label: 'C-SRL',
          paintType: 1,
          points: [
            { x: 1227.436747023236, y: 24.43697332227219 },
            { x: 1260.6341447440586, y: 24.43697332227219 },
            { x: 1260.6341447440586, y: 59.93974588481858 },
            { x: 1227.436747023236, y: 59.93974588481858 }
          ],
          shape_id: 3986,
          x: 1227.436747023236,
          y: 24.43697332227219,
          w: 33.197397720822664,
          h: 35.50277256254638,
          id: 3,
          isCompleted: true,
          'el-selected': false
        },
        {
          color: '#ff0',
          label: 'UA',
          paintType: 5,
          points: [
            { x: 2.711168164313222, y: 1407.0962772785622 },
            { x: 853.6883840042401, y: 1329.6593396272801 },
            { x: 515.1219512195122, y: 2049.643132220796 },
            { x: 8.133504492939666, y: 2044.2207958921695 }
          ],
          shape_id: 4015,
          id: 4,
          isCompleted: true,
          'el-selected': false
        },
        {
          color: '#ff0',
          label: 'SL/RL',
          paintType: 5,
          points: [
            { x: 2326.1822849807445, y: 2049.643132220796 },
            { x: 2586.4544287548138, y: 2052.354300385109 },
            { x: 2583.7432605905005, y: 1716.1694480102697 },
            { x: 2456.318356867779, y: 1445.0526315789475 },
            { x: 2082.1771501925546, y: 1553.4993581514764 }
          ],
          shape_id: 4250,
          id: 5,
          isCompleted: true,
          'el-selected': false
        },
        {
          color: '#ff0',
          label: 'SA',
          paintType: 3,
          points: [
            { x: 669.6585365853658, y: 300.93966623876764 },
            { x: 1564.3440308087293, y: 328.05134788189986 },
            { x: 1778.5263157894738, y: 797.0834403080873 },
            { x: 1070.9114249037227, y: 767.2605905006419 }
          ],
          shape_id: 4251,
          id: 6,
          isCompleted: true,
          'el-selected': false
        },
        {
          color: '#ff0',
          label: 'TA',
          paintType: 5,
          points: [
            { x: 5.4223363286264705, y: 924.5083440308088 },
            { x: 954.3311938382542, y: 645.258023106547 },
            { x: 1065.4890885750963, y: 778.1052631578948 },
            { x: 1800.2156611039795, y: 805.216944801027 },
            { x: 2155.3786906290115, y: 854.017971758665 },
            { x: 2448.1848523748395, y: 1445.0526315789475 },
            { x: 2087.599486521181, y: 1545.3658536585367 },
            { x: 1865.2836970474968, y: 1127.8459563543004 },
            { x: 886.5519897304237, y: 1317.6277278562259 },
            { x: 5.4223363286264465, y: 1398.9627727856225 }
          ],
          shape_id: 4252,
          id: 7,
          isCompleted: true,
          'el-selected': false
        }
      ]
    };
    const editor = new Editor({
      canvas: document.getElementById('canvas'),
      tools: {
        color: '#0000E3',
        mark_edit_tool: document.getElementById('mark_edit_tool')
      },
      config: {
      }
    });

    this.editor = editor;
    const container = document.getElementById('canvasContainer');


    img.src =this.drawImg;
    img.onload = function () {
      const w = img.width;
      const h = img.height;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight - 80;
      const ratioX = containerWidth / w;
      const ratioY = containerHeight / h;
      const min = Math.min(ratioX, ratioY, 1);
      const canvasWidth = w * min;
      const canvasHeight = h * min;

      editor.scaleSize = 1;
      editor.sourceX = 0;
      editor.sourceY = 0;
      editor.shapes = data.shapes;
      editor.scaleSize = min;
      editor.minScaleSize = min;
      editor.init(img, canvasWidth, canvasHeight);
      this.editable = true;
      editor.draw();
    }.bind(this);
    img.onerror = function () {
      _this.tools.message('设备图片失效，无法编辑！', 'error');
      editor.img = null;
    };
  }
};
</script>

<style lang="less" scoped>
#canvasContainer {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  button {
    width: 50px;
    i {
      margin-left: -2px;
    }
  }
  .button-icon {
    width: 50px;
    height: 30px;
  }
  .icon {
    width: 16px;
    height: 16px;
    margin-top: -3px;
    margin-left: 1px;
    display: block;
  }
  .icon-mouse {
    background: url("../assets/icon/mouse.png") no-repeat;
  }
  .icon-zfx {
    background: url("../assets/icon/zfx.png") no-repeat;
  }
  .icon-yx {
    background: url("../assets/icon/yx.png") no-repeat;
  }
  .icon-sbx {
    background: url("../assets/icon/sbx.png") no-repeat;
  }
  .icon-dw {
    background: url("../assets/icon/dw.png") no-repeat;
  }
  .icon-dbx {
    background: url("../assets/icon/dbx.png") no-repeat;
  }
}
</style>

