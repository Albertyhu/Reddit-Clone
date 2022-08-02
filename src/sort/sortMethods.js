
export const SortByBest = data => {
    return data; 
} 

//to be changed 
export const SortByTop = data => {
    var arr = data;
    /*
    console.log("sortedArr")
    console.log(arr)*/
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            var iVote = arr[i].votes.upvote - arr[i].votes.downvote; 
            var jVote = arr[j].votes.upvote - arr[j].votes.downvote; 
            if (jVote > iVote) {
                var obj = arr[j];
                /*
                arr = arr.filter(ele => ele.commentID !== obj.commentID)
                arr.splice(i, 0, obj);*/

                arr[j] = arr[i];
                arr[i] = obj; 
              //  j--;
            }
        }
    }

    return arr; 
} 

//Sort the comments by the ammount of controversy each on has
//Controversy is defined as having the near same number of upvotes and downvotes
export const SortByControversial = data => {
    var arr = data;

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
            var iControversy = calcControversy(arr[i].votes.upvote, arr[i].votes.downvote);
            var jControversy = calcControversy(arr[j].votes.upvote, arr[j].votes.downvote);
            if (jControversy > iControversy) {
                /*
                console.log("Switching " + arr[i].commentID + " with " + arr[j].commentID)
                console.log("iControversy: " + iControversy)
                console.log("jControversy: " + jControversy);
                */
                var obj = arr[j];
                /*
                    arr = arr.filter(ele => ele.commentID !== obj.commentID)
                    arr.splice(i, 0, obj);
                    j--;
                 */
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
        case "Newest": {
            sortedArr = SortByNew(arr);
            return sortedArr;
        }
        case "Oldest": {
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