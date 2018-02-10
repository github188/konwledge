var Dialog = {
    template: '<transition name="dialog-show">\n' +
    '    <div class="Dialog" v-show="isShow">\n' +
    '      <div class="dialog-bg"></div>\n' +
    '      <div class="body">\n' +
    '        <div class="title" v-if="title">{{title}}</div>\n' +
    '        <div class="main">\n' +
    '          <slot></slot>\n' +
    '        </div>\n' +
    '        <div class="footer" v-if="showBtn">\n' +
    '          <div class="btn cancel" @click="cancel" v-show="showCancelBtn">{{cancelBtn}}</div>\n' +
    '          <div class="btn" @click="success">{{successBtn}}</div>\n' +
    '        </div>\n' +
    '        <div class="close" @click="cancel">\n' +
    '          <img src="./close.jpg" width="14" height="13">\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </transition>',

};
var vuePay = new Vue({
    el:".pay",
    components:{
        "vue-dialog":Dialog
    },
    data(){
        return {
            msg:"检测vuePay是否运行"
        }
    }

});
