import { comments } from '../helperTools/dummyData.js'; 
import { SortByTop, SortByControversial  } from '../sort/sortMethods.js'; 

//this will be outdated once Firebase is applied 
describe('Test SortByTop funciton', () => {
    it('Test basic. Array should be sorted in descending order', () => {
        var arr = SortByTop(comments)
        expect(arr[0].commentID).toBe('vsSVEVseF')
    })

})

//this will be outdated once Firebase is applied 
describe('test SortByControversial', () => {
    it('Sort comments by controversy', () => {
        var arr = SortByControversial(comments)
        expect(arr[0].commentID).toBe('vsSEFSFSE')
    })
})