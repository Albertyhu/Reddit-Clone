import { comments } from '../helperTools/dummyData.js'; 
import { SortByTop, SortByControversial  } from '../sort/sortMethods.js'; 
import { formatTotalNumber } from '../sidebar/sidebar.js'; 
//this will be outdated once Firebase is applied 
describe('Test SortByTop funciton', () => {
    it.skip('Test basic. Array should be sorted in descending order', () => {
        var arr = SortByTop(comments)
        expect(arr[0].commentID).toBe('vsSVEVseF')
    })

})

//this will be outdated once Firebase is applied 
describe('test SortByControversial', () => {
    it.skip('Sort comments by controversy', () => {
        var arr = SortByControversial(comments)
        expect(arr[0].commentID).toBe('vsSEFSFSE')
    })
})


describe('Test formatTotalNumber() method from sidebar.js', () => {
    const sampleString = "Quck brown fox  \n jumped over the watering hole"
    it('0', () => {
        var num = 0
        expect(formatTotalNumber(num)).toEqual(0)
    })
    it('100', () => {
        var num = 100
        expect(formatTotalNumber(num)).toEqual(100)
    })
    it('1000', () => {
        var num = 1000
        expect(formatTotalNumber(num)).toEqual('1.0k')
    })
    it('1m', () => {
        var num = 1000000
        expect(formatTotalNumber(num)).toEqual('1.0m')
    })
    it('1 billion', () => {
        var num = 1000000000
        expect(formatTotalNumber(num)).toEqual('1.0x10^9')
    })
    it('2.35 billion', () => {
        var num = 2350000000
        expect(formatTotalNumber(num)).toEqual('2.4x10^9')
    })
    it('9.235k', () => {
        var num = 9235
        expect(formatTotalNumber(num)).toEqual('9.2k')
    })
})