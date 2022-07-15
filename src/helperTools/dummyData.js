
const sampleVote = [{
    upvote: true, 
    userID: 'placeholder', 
    timeVoted: 'firebase timestampe', 
}]

const sampleThread = [{
    threadID: 'placeholder', 
    votes: [], 
    comments: [],
    community: 'placeholder',
    flair: 'placehoder', 
    title: 'placeholder',
    restricted: false,
    authorID: 'placeholder',
    awards: [], 
    content: '', 
}]

const sampleUser = {
    userName: "Murphy", 
    userID: 'AGSFExvsefFSE33SFGe', 
    avatar: '', 
}

const sampleComment = {
    authorID: 'SGSAERxsrear',
    bodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    threadID: 'SGASEFxgs423',
    vote: {
        upvote: 200,
        downvote: 33,
    },

    //parentComment is the comment that the current comment is responding to
    parentComment: null,

    //the grandParents array keeps track of all the comments; this may not be necessary
    //This is used to store the dispatch function for toggling the display
    //When the corresponding thread line is clicked, the corresponding dispatch function gets activated 
    //this will unlikely be stored in the firestore because the reference to the functions may get lost
    grandParents: [], 

    //
    rootParent: null, 
    //isRoot indicates whether the comment is the first comment in a comment chain; meaning that it doesn't have any anscestors 
    isRoot: false, 
}

export const comments= [
    {
        authorID: 'Pikachu',
        threadID: 'SGASEFxgs423',
        commentID: 'Gesre',
        bodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat le a pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        dummyVote: {
            upvote: 1000,
            downvote: 33,
        },
        parentComment: null,
        grandParents: [],
        replies: ['GefseEFsf', 'EFEFSesfse'], 
    },
    {
        authorID: 'OswaldCobblesworth',
        threadID: 'SGASEFxgs423',
        commentID: 'GefseEFsf',
        bodyText: "Replying to Pikachu",
        dummyVote: {
            upvote: 900,
            downvote: 33,
        },
        parentComment: "Gesre",
        grandParents: ['Gesre'],
    },
    {
        authorID: 'GearCloud',
        threadID: 'SGASEFxgs423',
        commentID: 'EFEFSesfse',
        bodyText: "Replying to OswaldCobblesworth",
        dummyVote: {
            upvote: 9990,
            downvote: 33,
        },
        parentComment: 'GefseEFsf',
        grandParents: ['GefseEFsf'],
    },
    {
        authorID: 'AmazonOrders',
        threadID: 'SGASEFxgs423',
        commentID: 'wywgvWE',
        bodyText: "Amazing work you have here.",
        dummyVote: {
            upvote: 241,
            downvote: 33,
        },
        parentComment: null,
        grandParents: [],
    },
    {
        authorID: 'Rockworth',
        threadID: 'SGASEFxgs423',
        commentID: 'gegseeF',
        bodyText: "I'd love to see a video of how it works.",
        dummyVote: {
            upvote: 200,
            downvote: 33,
        },
        parentComment: null,
        grandParents: [],
    },
    {
        authorID: 'Terraform',
        threadID: 'SGASEFxgs423',
        commentID: 'ktjygn',
        bodyText: "Navigation, typography, colours, work. Fabulous, friend.",
        dummyVote: {
            upvote: 1270,
            downvote: 33,
        },
        parentComment: null,
        grandParents: [],
    },
    {
        authorID: 'HenryTownsend',
        threadID: 'SGASEFxgs423',
        commentID: 'GsesgPO',
        bodyText: "Replying to Rockworth",
        dummyVote: {
            upvote: 70,
            downvote: 33,
        },
        parentComment: "gegseeF",
        grandParents: ["gegseeF"],
    },
    {
        authorID: 'MickeyBrown',
        threadID: 'SGASEFxgs423',
        commentID: 'Avweerge',
        bodyText: "Replying to HenryTownsend",
        dummyVote: {
            upvote: 400,
            downvote: 45,
        },
        parentComment: "GsesgPO",
        grandParents: ["GsesgPO"],
    },
    {
        authorID: 'WellingtonMans',
        threadID: 'SGASEFxgs423',
        commentID: 'BBvwegsefe',
        bodyText: "Replying to HenryTownsend",
        dummyVote: {
            upvote: 780,
            downvote: 45,
        },
        parentComment: "GsesgPO",
        grandParents: ["GsesgPO"],
    },
    {
        authorID: 'WellingtonMans',
        threadID: 'SGASEFxgs423',
        commentID: 'B89wegsefe',
        bodyText: "Replying to HenryTownsend2",
        dummyVote: {
            upvote: 320,
            downvote: 45,
        },
        parentComment: "GsesgPO",
        grandParents: ["GsesgPO"],
    },
    {
        authorID: 'MathDamon',
        threadID: 'SGASEFxgs423',
        commentID: 'Bee9wgasefe',
        bodyText: "Replying to WellingtonMans",
        dummyVote: {
            upvote: 30,
            downvote: 5,
        },
        parentComment: "B89wegsefe",
        grandParents: ["B89wegsefe"],
    },
    {
        authorID: 'ngjftHFTHftHFTh',
        threadID: 'SEsegseE',
        commentID: 'vsSEFSFSE',
        bodyText: "I want to learn this kind of pattern! Teach me.",
        dummyVote: {
            upvote: 1553,
            downvote: 1522,
        },
        parentComment: null,
        grandParents: [],
    },
    {
        authorID: 'ryrbDB',
        threadID: 'SEsegseE',
        commentID: 'vsSVEVseF',
        bodyText: "My 64 year old grandson rates this boldness very exquisite dude",
        dummyVote: {
            upvote: 2000,
            downvote: 423,
        },
        parentComment: null,
        grandParents: [],
    },
    {
        authorID: 'FangoMars',
        threadID: 'SEsegseE',
        commentID: 'GSAefseete',
        bodyText: "This man is a saint! We need something like this to happen at EA and Ubisoft!",
        dummyVote: {
            upvote: 333,
            downvote: 43,
        },
        parentComment: "vsSVEVseF",
        grandParents: ["vsSVEVseF" ],
    },
]

export const threads = [
    {
        threadID: 'SGASEFxgs423',
        votes: {
            upvote: 234,
            downvote: 53, 
        },
        community: 'news',
        flair: 'placehoder',
        title: 'Where the wild things are.',
        restricted: false,
        authorID: 'author',
        authorName: "LeroyJenkins53", 
        awards: [],
        content: 'This is a test thread.', 
        timePosted: '',
        textBody: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
    },
    {
        threadID: 'SEsegseE',
        votes: {
            upvote: 564,
            downvote: 34, 
        },
        community: 'funny',
        flair: 'placehoder',
        title: 'John Cena is here',
        restricted: false,
        authorID: 'author',
        authorName: "HectorTheWellEndowed", 
        awards: [],
        content: 'This is a test thread.',
        timePosted: '', 
        textBody: 'Sed augue lacus viverra vitae congue eu consequat. Lacus viverra vitae congue eu consequat ac felis donec et. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Aliquam faucibus purus in massa. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper. Quis eleifend quam adipiscing vitae proin. Neque viverra justo nec ultrices dui sapien eget mi proin. Cursus risus at ultrices mi tempus. Vitae proin sagittis nisl rhoncus mattis. Tristique senectus et netus et malesuada fames ac. Elementum sagittis vitae et leo duis ut diam. Porttitor rhoncus dolor purus non enim. Purus in massa tempor nec feugiat nisl pretium fusce id. Habitasse platea dictumst quisque sagittis purus sit amet volutpat. Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Proin sagittis nisl rhoncus mattis. Urna porttitor rhoncus dolor purus non enim praesent. Aliquet eget sit amet tellus cras.',
    }
]

