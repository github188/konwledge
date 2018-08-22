function generateText() {
    var element = document.createElement('h2');
    element.innerHTML = "Hello h2 world h2 --- change";
    return element;
}
module.exports = generateText;