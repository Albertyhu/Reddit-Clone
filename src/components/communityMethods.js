export const gatherTopCommunity = (community, numOfTopCom) => {
    var Copy = [...community];
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
            communityTitle: Largest.communityTitle,
            communityImage: Largest.communityImage, 
            members: Largest.members,
        }
        Arr.push(obj)
    }

    return Arr;
}