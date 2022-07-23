import { comments } from '../helperTools/dummyData.js'; 
import { SortByTop, SortByControversial  } from '../sort/sortMethods.js'; 
import { makeList } from '../components/replyTextArea.js';

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


describe('Tes the functionality of the makeList method', () => {
    const sampleString = "Quck brown fox  \n jumped over the watering hole"
    it('Test the string', () => {

    })
})