
export const SortByBest = data => { } 

//to be changed 
export const SortByTop = data => {
    var arr = data;
    /*
    console.log("sortedArr")
    console.log(arr)*/
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            var iVote = arr[i].dummyVote.upvote - arr[i].dummyVote.downvote; 
            var jVote = arr[j].dummyVote.upvote - arr[j].dummyVote.downvote; 
            if (jVote > iVote) {
                var obj = arr[j];
                arr = arr.filter(ele => ele.commentID !== obj.commentID)
                arr.splice(i, 0, obj);
                j--;
            }
        }
    }

 
    return arr; 
} 
export const SortByNew = data => {

} 
export const SortByOld = data => { } 

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
            var iControversy = calcControversy(arr[i].dummyVote.upvote, arr[i].dummyVote.downvote);
            var jControversy = calcControversy(arr[j].dummyVote.upvote, arr[j].dummyVote.downvote);
            if (jControversy > iControversy) {
                /*
                console.log("Switching " + arr[i].commentID + " with " + arr[j].commentID)
                console.log("iControversy: " + iControversy)
                console.log("jControversy: " + jControversy);
                */
                var obj = arr[j];
                arr = arr.filter(ele => ele.commentID !== obj.commentID)
                arr.splice(i, 0, obj);
                j--;
            }
        }
    }
    return arr; 
} 