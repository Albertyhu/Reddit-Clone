
export const SortByBest = data => {
    return data; 
} 

export const SortByTop = data => {
    var arr = CalcVoteTotal(data);
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j].totalVotes > arr[i].totalVotes) {
                var obj = arr[j];
                arr[j] = arr[i];
                arr[i] = obj;

            }
        }
    }
    return arr;
} 

//This calculates the total votes based on upvotes - downvotes for each comment and thread 
//It then returns an array with the total votes for each object. 
export const CalcVoteTotal = Data => {
    var Arr = Data; 
    Arr.forEach(elem => {
        var voteArray = elem.votes; 
        var totalVote = 0; 
        voteArray.forEach(vote => {
            if (vote.upvote) {
                totalVote++; 
            }
            if (vote.downvote) {
                totalVote--; 
            }
        })
        elem.totalVotes = totalVote; 
    })

    return Arr; 
}

//calculate the total upvotes and downvotes for each element 
//This function is a supplement to sortByControversy 
export const CalcTotalUpvoteAndDownvote = Data => {
    var Arr = Data; 
    Arr.forEach(elem => {
        var upvoteTotal = 0; 
        var downvoteTotal = 0; 
        elem.votes.forEach(vote => {
            if (vote.upvote) {
                upvoteTotal++; 
            }
            if (vote.downvote) {
                downvoteTotal++; 
            }
        })
        elem.upvoteTotal = upvoteTotal;
        elem.downvoteTotal = downvoteTotal; 
    })
    return Arr; 
}


//Sort the comments by the ammount of controversy each on has
//Controversy is defined as having the near same number of upvotes and downvotes
export const SortByControversial = data => {
    var arr = CalcTotalUpvoteAndDownvote(data);

    //Controvery is measured by magnitude of each of the upvote and downvotes 
    //...and if the ratio of the upvote to downvotes is equal to 1
    const calcControversy = (upvote, downvote) => {
        //If there are no upvotes or downvotes, return 0
        if (upvote === 0 || downvote === 0) {
            return 0
        }
        var largerNum = Math.max(upvote, downvote); 
        var smallerNum = Math.min(upvote, downvote);
        //It has to be smallerNum/largerNum 
        //When two comments gets compared on controversy amount 
        //...the determines which controversy value is closer to 1 
        return (smallerNum / largerNum); 
    }

    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            var iControversy = calcControversy(arr[i].upvoteTotal, arr[i].downvoteTotal);
            var jControversy = calcControversy(arr[j].upvoteTotal, arr[j].downvoteTotal);
            if (jControversy > iControversy) {
                /*
                console.log("Switching " + arr[i].commentID + " with " + arr[j].commentID)
                console.log("iControversy: " + iControversy)
                console.log("jControversy: " + jControversy);
                */
                var obj = arr[j];
                arr[j] = arr[i];
                arr[i] = obj
            }
        }
    }
    return arr; 
} 


export const SortByNew = data => {
    var Arr = data; 
    for (var i = 0; i < Arr.length; i++) {
        for (var j = i + 1; j < Arr.length; j++) {
            if (Arr[i].timePosted < Arr[j].timePosted) {
                var obj = Arr[i]; 
                Arr[i] = Arr[j]; 
                Arr[j] = obj; 
            }
        }
    }

    return Arr; 
}

export const SortByOld = data => {
    var Arr = data;
    for (var i = 0; i < Arr.length; i++) {
        for (var j = i + 1; j < Arr.length; j++) {
            if (Arr[i].timePosted > Arr[j].timePosted) {
                var obj = Arr[i];
                Arr[i] = Arr[j];
                Arr[j] = obj;
            }
        }
    }
    return Arr;
}

export const SortByHot = data => {
    return data; 
}


//Function that decides how the comments should be sorted 
export function SortArray(arr, sortMethod) {
    var sortedArr = null;
    switch (sortMethod) {
        case "Top": {
            sortedArr = SortByTop(arr);
            return sortedArr;
        }
        case "Controversial": {
            sortedArr = SortByControversial(arr);
            return sortedArr;
        }
        case "New": {
            sortedArr = SortByNew(arr);
            return sortedArr;
        }
        case "Old": {
            sortedArr = SortByOld(arr); 
            return sortedArr;
        }
        case "Hot": {
            sortedArr = SortByHot(arr); 
            return sortedArr;
        }
        case "Best": {
            sortedArr = SortByBest(arr); 
            return sortedArr;
        }
        default:
            return [];
    }
}