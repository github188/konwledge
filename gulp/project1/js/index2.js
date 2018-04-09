//js
const mesage="root message is here !";
let a=1;
{
    let a=2;
    {
        let a=3;
    }
}

document.getElementById('root').innerHTML=mesage;