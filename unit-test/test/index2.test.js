import Index2 from '../src/index2'

console.log('开始测试')
// console.log(Index2)
describe('index.js2的测试', function () {
    it('1应该是数字', function () {
        // expect(isNum(1)).to.be.true
        Index2.isNum(1).should.equal(true)
    })
    it('index.js2的测试2 "1" 应该是字符', function () {
        // expect(isString('1')).to.be.true
        Index2.isString('1').should.equal(true)
    })
})

