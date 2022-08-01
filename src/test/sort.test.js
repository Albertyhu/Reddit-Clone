import { comments } from '../helperTools/dummyData.js'; 
import { SortByTop, SortByControversial, SortByNew, SortByOld  } from '../sort/sortMethods.js'; 
import { formatTotalNumber } from '../thread/sidebar.js'; 
import { RenderTimePosted} from '../components/renderTimePosted'

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

var arr1 = [
    {
        name: "A",
        timePosted: new Date(2022, 6, 29, 23, 5, 7),
    },
    {
        name: "B",
        timePosted: new Date(2022, 6, 30, 2, 5, 7),
    },
    {
        name: "C",
        timePosted: new Date(2022, 6, 27, 23, 5, 7),
    },

]; 

//array where time is only different by hours 
var arr2 = [
    {
        name: "A",
        timePosted: new Date(2022, 6, 30, 4, 5, 8),
    },
    {
        name: "B",
        timePosted: new Date(2022, 6, 30, 1, 5, 8),
    },
    {
        name: "C",
        timePosted: new Date(2022, 6, 30, 5, 5, 8),
    },
    {
        name: "D",
        timePosted: new Date(2022, 6, 30, 6, 5, 8),
    },
    {
        name: "E",
        timePosted: new Date(2022, 6, 30, 4, 5, 8),
    },

]; 


var Arr3 = [
    {
        name: "A",
        timePosted: new Date(2022, 6, 30, 4, 5, 8),
    },
    {
        name: "B",
        timePosted: new Date(2022, 6, 29, 1, 5, 8),
    },
    {
        name: "C",
        timePosted: new Date(2022, 6, 30, 23, 5, 8),
    },
    {
        name: "D",
        timePosted: new Date(2022, 6, 30, 23, 10, 8),
    },
    {
        name: "E",
        timePosted: new Date(2022, 6, 26, 21, 5, 8),
    },

];

//If Arr3 was sorted by newest dates 
var SortedByNew_Arr3 = [
    {
        name: "D",
        timePosted: new Date(2022, 6, 30, 23, 10, 8),
    },
    {
        name: "C",
        timePosted: new Date(2022, 6, 30, 23, 5, 8),
    },
    {
        name: "A",
        timePosted: new Date(2022, 6, 30, 4, 5, 8),
    },
    {
        name: "B",
        timePosted: new Date(2022, 6, 29, 1, 5, 8),
    },
    {
        name: "E",
        timePosted: new Date(2022, 6, 26, 21, 5, 8),
    },

];


//If Arr3 was sorted by oldest dates 
var SortedByOld_Arr3 = [
    {
        name: "E",
        timePosted: new Date(2022, 6, 26, 21, 5, 8),
    },
    {
        name: "B",
        timePosted: new Date(2022, 6, 29, 1, 5, 8),
    },
    {
        name: "A",
        timePosted: new Date(2022, 6, 30, 4, 5, 8),
    },
    {
        name: "C",
        timePosted: new Date(2022, 6, 30, 23, 5, 8),
    },
    {
        name: "D",
        timePosted: new Date(2022, 6, 30, 23, 10, 8),
    },
];

describe("Test SortByNew Method", () => {
    it("Test with Arr1", () => {
        var arr = SortByNew(arr1)
        expect(arr[0].name).toBe("B")
    })
    it("Test with Arr2", () => {
        var arr = SortByNew(arr2)
        expect(arr[0].name).toBe("D")
    })
    it("Test with Arr3", () => {
        var arr = SortByNew(Arr3)
        expect(arr).toEqual(SortedByNew_Arr3)
    })
})

describe("Test SortByOld Method", () => {
    it("Test with Arr1", () => {
        var arr = SortByOld(arr1)
        expect(arr[0].name).toBe("C")
    })
    it("Test with Arr2", () => {
        var arr = SortByOld(arr2)
        expect(arr[0].name).toBe("B")
    })
    it("Test with Arr3", () => {
        var arr = SortByOld(Arr3)
        expect(arr).toEqual(SortedByOld_Arr3)
    })
})
