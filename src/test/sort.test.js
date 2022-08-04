import { comments } from '../helperTools/dummyData.js'; 
import { SortByTop, SortByControversial, SortByNew, SortByOld  } from '../sort/sortMethods.js'; 
import { formatTotalNumber } from '../thread/sidebar.js'; 
import { SampleCommunity } from '../helperTools/dummyData.js'; 

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


export function RenderTimePosted(timePosted, laterTime) {
    //var currentTime = new Date(Date.now());
    var difference = (laterTime.getTime() - timePosted.getTime())
    var totalSeconds = Math.round(difference / 1000);
    var totalMinutes = Math.round(totalSeconds / 60);
    var totalHours = Math.round(totalMinutes / 60);
    var totalDays = Math.round(totalHours / 24);
    var totalWeeks = Math.round(totalDays / 7);
    var totalMonths = Math.round(totalWeeks / 4);
    var totalYears = Math.round(totalMonths / 12); 
    if (totalYears !== 0) {
        if (totalYears > 1)
            return `${totalYears} years ago`;
        else
            return `1 year ago`;
    }

    if (totalMonths !== 0) {
        if (totalMonths > 1)
            return `${totalMonths} months ago`;
        else
            return `1 month ago`;
    }
    if (totalWeeks !== 0) {
        if (totalWeeks > 1)
            return `${totalWeeks} weeks ago`;
        else
            return `1 week ago`;
    }
    if (totalDays !== 0) {
        if (totalDays > 1) {
            return `${totalDays} days ago`;
        }
        else
            return `1 day ago`;
    }
    if (totalHours !== 0) {
        if (totalHours > 1)
            return `${totalHours} hours ago`;
        else
            return `1 hour ago`
    }
    if (totalMinutes !== 0) {
        if (totalMinutes > 1)
            return `${totalMinutes} minutes ago`;
        else
            return "1 minute ago"
    }
    if (totalSeconds !== 0) {
        if (totalSeconds > 1)
            return `${totalSeconds} seconds ago`;
        else
            return "1 second ago"
    }
}

const DateA = new Date(2022, 8, 1, 17, 45, 20); 
const LaterDateA = new Date(2022, 8, 1, 17, 46, 20)
const DateOneMonthLater = new Date(2022, 9, 1, 17, 46, 20)

const DateB = new Date(2022, 7, 1, 16, 21, 20); 

describe("Test the modified function RenderTimePosted", () => {
    it("Test with DateA and LaterDateA", () => {
        const message = RenderTimePosted(DateA, LaterDateA); 
        expect(message).toEqual("1 minute ago")
    })

    it("Test with DateA and DateOneMonthLater", () => {
        const message = RenderTimePosted(DateA, DateOneMonthLater);
        expect(message).toEqual("1 month ago")
    })
    it.skip("Test with DateA and DateOneMonthLater", () => {
        var currentTime = new Date(Date.now());
        console.log("currentTime: " + currentTime); 
        console.log("DateB: " + DateB); 
        const message = RenderTimePosted(DateB, currentTime);
        expect(message).toEqual("2 hours ago")
    })
})


const gatherTopCommunity = (community, numOfTopCom) => {
    var Copy = community; 
    const Arr = [];

    const FindLargest = () => {
        var Largest = Copy[0];
        var largestInd = 0
        Copy.forEach((item, ind) => {
            if (Largest.members < item.members) {
                Largest = item; 
                largestInd = ind; 
            }
        })
           Copy.splice(largestInd, 1)
          return Largest
        } 

        while (Arr.length < numOfTopCom) {
            var Largest = FindLargest(Copy)
            var obj = {
                title: Largest.communityTitle,
                members: Largest.members,
            }
            Arr.push(obj) 
        }
    
    return Arr;
}

describe("Text the functionality of gatherTopCommunity ", () => {
    it("Test it with current dummy data", () => {
        var topCom = gatherTopCommunity(SampleCommunity, 5)
        console.log(topCom)
    })

})