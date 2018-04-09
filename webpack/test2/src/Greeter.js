// var config = require('./config.json');
// module.exports = function() {
//     var greet = document.createElement('div');
//     greet.textContent = config.greetText;
//     return greet;
// };

//Greeter,js
import React, {Component} from 'react'
import config from './config.json';
import styles from './Greeter.css';//导入
import styles2 from './test.scss'

class Greeter extends Component{
    render() {
        return (
            <div>
                <div className={styles.root}>
                    {config.greetText}
                </div>
                <div className={styles.box}>
                    {config.testText}
                </div>
                <div className={styles2.box2}>
                    {config.sassText}
                </div>
            </div>

        );
    }
}

export default Greeter