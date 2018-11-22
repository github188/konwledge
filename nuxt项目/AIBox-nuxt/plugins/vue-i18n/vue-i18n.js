import Vue from 'vue'
import zh from '../../assets/lang/zh/index'
import en from '../../assets/lang/en/index'

const i18n = {
    install (Vue, options) {
        Vue.prototype.$i18n = {
            locale: 'zh',
            language: {
               'zh': zh,
               'en': en
            }
        }
        
        Vue.prototype.$t = (txt) => {
            let vue = new Vue()
            let localeCopy = JSON.parse(JSON.stringify(vue.$i18n.language[vue.$i18n.locale]))
            let result = txt.split('.').every(item => {
                if (localeCopy[item]) {
                    localeCopy = localeCopy[item]
                    return true
                } else {
                    return false
                }
            });
            
            return result ? localeCopy : new Error(`${txt} is undefined !`)
        }
    }
}

Vue.use(i18n)



// import VueI18n from 'vue-i18n'
// Vue.use(VueI18n)
// const i18n = new VueI18n({
//     locale: 'zh', // 语言识别
//     messages: {
//         'zh': require('./assets/lang/zh'),
//         'en': require('./assets/lang/en')
//     }
// })