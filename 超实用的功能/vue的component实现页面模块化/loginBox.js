Vue.component("login",{
    template:"<div class=\"loginBox\" v-show=\"isShow\">\n" +
    "        <div class=\"PopUp_box\">\n" +
    "            <div class=\"pop_conditionBox\">\n" +
    "                <h5>您好欢迎登录聚保服务平台</h5>\n" +
    "                <div class=\"infor3\">\n" +
    "                    <span class=\"clearfix\">\n" +
    "                        <label for=\"txt_number\">手机号&nbsp;&nbsp;&nbsp;&nbsp;</label>\n" +
    "                        <input type=\"text\" id=\"txt_number\" v-model=\"username\" >\n" +
    "                    </span>\n" +
    "\n" +
    "                    <span class=\"clearfix\">\n" +
    "                        <label for=\"txt_startaddress\">密码&nbsp;&nbsp;&nbsp;&nbsp;</label>\n" +
    "                        <input type=\"password\" id=\"txt_startaddress\"  v-model=\"password\" @keyup.enter=\"login\">\n" +
    "                    </span>\n" +
    "                    <p  class=\"addErrorTips\">\n" +
    "                        {{addErrorTips}}\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "                <div class=\"login_button\">\n" +
    "                    <a class=\"Lsmit\" href=\"javascript:;\">\n" +
    "                        <input id=\"login_btn\" type=\"button\" style=\"cursor:pointer;\" value=\"登录\" @click=\"login\"></a>\n" +
    "                    <router-link class=\"forget\" to=\"/recover\">忘记密码</router-link>\n" +
    "                    <router-link class=\"go_re\"  to=\"/register\">注册</router-link>\n" +
    "                </div>\n" +
    "                <span class=\"aa aaRepeat\" @click=\"isShow = false;\">\n" +
    "                        <img src=\"./aa.jpg\" width=\"14\" height=\"13\">\n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"fullbg\" style=\"z-index: 888;;width: 100%; height:300px; display: block;\"></div>\n" +
    "    </div>"
    ,
    data:function(){
        return {
            isShow:true,
            username:'',
            password:'',
            addErrorTips:''
        }
    },
    methods: {
        setCookie:function(name,value){
            var hours = 2;  //单位小时
            var exp = new Date();
            exp.setTime(exp.getTime() + hours*60*60*1000);
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
        },
        login:function(){
            console.log("login启动");
            var _this=this;
            if(!this.username){
                this.addErrorTips='请输入手机号！';
                return false;
            }else if(!this.$store.state.reg_phone.test(this.username)){
                this.addErrorTips='请输入正确手机号！';
                return false;
            }else if(!this.password){
                this.addErrorTips='请输入密码！';
                return false;
            }else {
                console.log("login--验证通过")
                this.$store.state.axios({
                    method:"POST",
                    url:this.$store.state.cmnUrl+'/v1/cmn/user/login',
                    data:{
                        "mobile":this.username,
                        "password":this.password
                    },
                }).then(function(response){
                    console.log(response.data,"login--取得返还值")
                    if(response.data.err_code==1010){
                        _this.addErrorTips='您的手机尚未注册，请先前往注册！';
                    }else if(response.data.err_code==1004){
                        _this.addErrorTips = '密码错误！';
                    }else if(response.data.err_code==0){
                        _this.setCookie(_this.$store.state.jubao_user,response.data.data.access_token);
//                            document.cookie = _this.$store.state.jubao_user+'=' + response.data.data.access_token;
                        _this.$store.state.isLogin = true;
                        _this.isShow = false;
                        _this.$alert('登录成功,请继续提交!');
                        _this.$emit('loginSuccess')
                    }
                })
            }
        }
    }
});