
    let arr = res.rows;
//	                    this.driver_number=0;
//	                    this.clerk_number=0;
    arr.forEach((el, index)=>{
        //if(el.status == 1) el.status = '已生效'
        el.status = ygbEmployeeStatus.statusGetMsg(el.status);
//	                    	if(el.type === 1)this.driver_number++;
//	                    	if(el.type === 2)this.clerk_number++;
        switch(this.productId){
            case 1:
                el.details = '60万死亡伤残+6万医疗+100元/天误工费+13种扩展保障'
                break;
            case 2:
                el.details = '20万死亡伤残+2万医疗+100元/天误工费+13种扩展保障+自费药保障'
                break;
            case 3:
                el.details = '40万死亡伤残+4万医疗+100元/天误工费+13种扩展保障+自费药保障+24小时意外'
                break;
            case 4:
                el.details = '60万死亡伤残+6万医疗+100元/天误工费+13种扩展保障+自费药保障+24小时意外+100元/天住院津贴'
                break;
            case 5:
                el.details = '详情请见合同约定'
        }
    })

    if(toexport == 'export') {
        let json = [];
        arr.forEach((ele, i) => {
            json[i] = {};
            json[i]['姓名'] = ele.name;
            json[i]['身份证'] = ele.idcard;
            json[i]['工作类型'] = ele.type==1?'司机、搬运等':'文员、调度等';
            json[i]['保费(元/人/年)'] = ele.price/100;
            json[i]['保障范围'] = ele.details;
            json[i]['生效日期'] = ele.effect_date.replace('T', ' ').slice(0, 19);
            json[i]['状态'] = ele.status;
        });
        console.log(json);
        let tmpDown; //导出的二进制对象
        function downloadExl(json, type) {
            var tmpdata = json[0];
            json.unshift({});
            var keyMap = []; //获取keys
            for (var k in tmpdata) {
                keyMap.push(k);
                json[0][k] = k;
            }
            var tmpdata = []; //用来保存转换好的json
            json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
                v: v[k],
                position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
            }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
                v: v.v
            });
            console.log(tmpdata)
            var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
            var tmpWB = {
                SheetNames: ['员工清单'], //保存的表标题
                Sheets: {
                    '员工清单': Object.assign({},
                        tmpdata, //内容
                        {
                            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                        })
                }
            };
            tmpDown = new Blob([s2ab(XLSX.write(tmpWB, {
                    bookType: (type == undefined ? 'xlsx' : type),
                    bookSST: false,
                    type: 'binary'
                } //这里的数据是用来定义导出的格式类型
            ))], {
                type: ""
            }); //创建二进制对象写入转换好的字节流
            var href = URL.createObjectURL(tmpDown); //创建对象超链接
            //window.open(href);
            document.getElementById("hf").href = href; //绑定a标签
            document.getElementById("hf").click(); //模拟点击实现下载
            setTimeout(function() { //延时释放
                URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
            }, 100);
        }
        function s2ab(s) { //字符串转字符流
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
        // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
        function getCharCol(n) {
            let temCol = '',
                s = '',
                m = 0
            while (n > 0) {
                m = n % 26 + 1
                s = String.fromCharCode(m + 64) + s
                n = (n - m) / 26
            }
            return s
        }
        downloadExl(json)
    }else{
        this.workers = arr;
        this.count = res.total;
    }
