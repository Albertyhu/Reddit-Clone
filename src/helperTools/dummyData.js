import NewsLogo from './assets/newsCommunity.png'; 
import FunnyLogo from './assets/funnyCommunity.png';
import LosAnglesCommunityLogo from './assets/LosAnglesCommunityLogo.png';

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

export const sampleUser = [{
    userName: "Murphy", 
    userID: 'AGSFExvsefFSE33SFGe', 
    password: 'password', 
    avatar: '', 
    comments: [], 
    posts: [], 
    upvoted: [], 
    downvoted: [], 
    recentPosts: [], 
    saved: [], 
    communitiesJoined: ['NHKGjwewr', 'EBKPIsd'], 
    Karma: 2354, 
    dateJoined: "2001-01-03",
}]

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
        votes: {
            upvote: 1000,
            downvote: 33,
        },
        timePosted: new Date(2022, 6, 28, 14, 39, 7), 
        parentComment: null,
        grandParents: [],
        replies: ['GefseEFsf', 'EFEFSesfse'], 
    },
    {
        authorID: 'OswaldCobblesworth',
        threadID: 'SGASEFxgs423',
        commentID: 'GefseEFsf',
        bodyText: "Replying to Pikachu",
        votes: {
            upvote: 900,
            downvote: 33,
        },
        timePosted: new Date(2022, 6, 29, 12, 15, 7), 
        parentComment: "Gesre",
        grandParents: ['Gesre'],
    },
    {
        authorID: 'GearCloud',
        threadID: 'SGASEFxgs423',
        commentID: 'EFEFSesfse',
        bodyText: "Replying to OswaldCobblesworth",
        votes: {
            upvote: 9990,
            downvote: 33,
        },
        timePosted: new Date(2022, 6, 29, 14, 25, 7), 
        parentComment: 'GefseEFsf',
        grandParents: ['GefseEFsf'],
    },
    {
        authorID: 'AmazonOrders',
        threadID: 'SGASEFxgs423',
        commentID: 'wywgvWE',
        bodyText: "Amazing work you have here.",
        votes: {
            upvote: 241,
            downvote: 33,
        },
        timePosted: new Date(2022, 6, 26, 23, 39, 7), 
        parentComment: null,
        grandParents: [],
    },
    {
        authorID: 'Rockworth',
        threadID: 'SGASEFxgs423',
        commentID: 'gegseeF',
        bodyText: "I'd love to see a video of how it works.",
        votes: {
            upvote: 200,
            downvote: 33,
        },
        timePosted: new Date(2022, 6, 29, 17, 39, 7), 
        parentComment: null,
        grandParents: [],
    },
    {
        authorID: 'Terraform',
        threadID: 'SGASEFxgs423',
        commentID: 'ktjygn',
        bodyText: "Navigation, typography, colours, work. Fabulous, friend.",
        votes: {
            upvote: 1270,
            downvote: 33,
        },
        timePosted: new Date(2022, 6, 28, 8, 30, 7), 
        parentComment: null,
        grandParents: [],
    },
    {
        authorID: 'HenryTownsend',
        threadID: 'SGASEFxgs423',
        commentID: 'GsesgPO',
        bodyText: "Replying to Rockworth",
        votes: {
            upvote: 70,
            downvote: 33,
        },
        timePosted: new Date(2022, 6, 30, 14, 41, 7), 
        parentComment: "gegseeF",
        grandParents: ["gegseeF"],
    },
    {
        authorID: 'MickeyBrown',
        threadID: 'SGASEFxgs423',
        commentID: 'Avweerge',
        bodyText: "Replying to HenryTownsend",
        votes: {
            upvote: 400,
            downvote: 45,
        },
        timePosted: new Date(2022, 6, 30, 14, 59, 7), 
        parentComment: "GsesgPO",
        grandParents: ["GsesgPO"],
    },
    {
        authorID: 'WellingtonMans',
        threadID: 'SGASEFxgs423',
        commentID: 'BBvwegsefe',
        bodyText: "Replying to HenryTownsend",
        votes: {
            upvote: 780,
            downvote: 45,
        },
        timePosted: new Date(2022, 6, 30, 15, 25, 7), 
        parentComment: "GsesgPO",
        grandParents: ["GsesgPO"],
    },
    {
        authorID: 'WellingtonMans',
        threadID: 'SGASEFxgs423',
        commentID: 'B89wegsefe',
        bodyText: "Replying to HenryTownsend2",
        votes: {
            upvote: 320,
            downvote: 45,
        },
        timePosted: new Date(2022, 6, 30, 23, 5, 7), 
        parentComment: "GsesgPO",
        grandParents: ["GsesgPO"],
    },
    {
        authorID: 'MathDamon',
        threadID: 'SGASEFxgs423',
        commentID: 'Bee9wgasefe',
        bodyText: "Replying to WellingtonMans",
        votes: {
            upvote: 30,
            downvote: 5,
        },
        timePosted: new Date(2022, 6, 30, 23, 15, 7), 
        parentComment: "B89wegsefe",
        grandParents: ["B89wegsefe"],
    },
    {
        authorID: 'ngjftHFTHftHFTh',
        threadID: 'SEsegseE',
        commentID: 'vsSEFSFSE',
        bodyText: "I want to learn this kind of pattern! Teach me.",
        votes: {
            upvote: 1553,
            downvote: 1522,
        },
        timePosted: new Date(2022, 6, 30, 20, 41, 7), 
        parentComment: null,
        grandParents: [],
    },
    {
        authorID: 'ryrbDB',
        threadID: 'SEsegseE',
        commentID: 'vsSVEVseF',
        bodyText: "My 64 year old grandson rates this boldness very exquisite dude",
        votes: {
            upvote: 2000,
            downvote: 423,
        },
        timePosted: new Date(2022, 6, 28, 11, 39, 7), 
        parentComment: null,
        grandParents: [],
    },
    {
        authorID: 'FangoMars',
        threadID: 'SEsegseE',
        commentID: 'GSAefseete',
        bodyText: "This man is a saint! We need something like this to happen at EA and Ubisoft!",
        votes: {
            upvote: 333,
            downvote: 43,
        },
        timePosted: new Date(2022, 6, 28, 15, 39, 7), 
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
        communityID: 'EBKPIsd',
        flair: 'placehoder',
        title: 'Where the wild things are.',
        restricted: false,
        authorID: 'author',
        authorName: "LeroyJenkins53", 
        awards: [],
        content: 'This is a test thread.', 
        dateCreated: '',
        timePosted: new Date(2022, 6, 28, 14, 39, 7), 
        textBody: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
        commentNumber: 23, 
    },
    {
        threadID: 'SEsegseE',
        votes: {
            upvote: 564,
            downvote: 34, 
        },
        community: 'funny',
        communityID: 'NHKGjwewr',
        flair: 'placehoder',
        title: 'John Cena is here',
        restricted: false,
        authorID: 'author',
        authorName: "HectorTheWellEndowed", 
        awards: [],
        content: 'This is a test thread.',
        dateCreated: '', 
        timePosted: new Date(2022, 6, 30, 7, 25, 10), 
        textBody: 'Sed augue lacus viverra vitae congue eu consequat. Lacus viverra vitae congue eu consequat ac felis donec et. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Aliquam faucibus purus in massa. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper. Quis eleifend quam adipiscing vitae proin. Neque viverra justo nec ultrices dui sapien eget mi proin. Cursus risus at ultrices mi tempus. Vitae proin sagittis nisl rhoncus mattis. Tristique senectus et netus et malesuada fames ac. Elementum sagittis vitae et leo duis ut diam. Porttitor rhoncus dolor purus non enim. Purus in massa tempor nec feugiat nisl pretium fusce id. Habitasse platea dictumst quisque sagittis purus sit amet volutpat. Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Proin sagittis nisl rhoncus mattis. Urna porttitor rhoncus dolor purus non enim praesent. Aliquet eget sit amet tellus cras.',
        commentNumber: 56,
    },
    {
        threadID: 'PJlksf',
        votes: {
            upvote: 352,
            downvote: 343,
        },
        community: 'funny',
        communityID: 'NHKGjwewr',
        flair: 'placehoder',
        title: 'It\'s just a bunch of people dancing',
        restricted: false,
        authorID: 'author',
        authorName: "HectorTheWellEndowed",
        awards: [],
        content: 'This is a test thread.',
        dateCreated: '',
        timePosted: new Date(2022, 6, 30, 15, 12, 10), 
        textBody: 'Sed augue lacus viverra vitae congue eu consequat. Lacus viverra vitae congue eu consequat ac felis donec et. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Aliquam faucibus purus in massa. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper. Quis eleifend quam adipiscing vitae proin. Neque viverra justo nec ultrices dui sapien eget mi proin. Cursus risus at ultrices mi tempus. Vitae proin sagittis nisl rhoncus mattis. Tristique senectus et netus et malesuada fames ac. Elementum sagittis vitae et leo duis ut diam. Porttitor rhoncus dolor purus non enim. Purus in massa tempor nec feugiat nisl pretium fusce id. Habitasse platea dictumst quisque sagittis purus sit amet volutpat. Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Proin sagittis nisl rhoncus mattis. Urna porttitor rhoncus dolor purus non enim praesent. Aliquet eget sit amet tellus cras.',
        commentNumber: 12,
    },
    {
        threadID: 'oisgseg',
        votes: {
            upvote: 524,
            downvote: 134,
        },
        community: 'funny',
        communityID: 'NHKGjwewr',
        flair: 'placehoder',
        title: 'There is actually a debate about this',
        restricted: false,
        authorID: 'author',
        authorName: "HectorTheWellEndowed",
        awards: [],
        content: 'This is a test thread.',
        dateCreated: '',
        timePosted: new Date(2022, 6, 29, 23, 11, 7), 
        textBody: 'Sed augue lacus viverra vitae congue eu consequat. Lacus viverra vitae congue eu consequat ac felis donec et. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Aliquam faucibus purus in massa. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper. Quis eleifend quam adipiscing vitae proin. Neque viverra justo nec ultrices dui sapien eget mi proin. Cursus risus at ultrices mi tempus. Vitae proin sagittis nisl rhoncus mattis. Tristique senectus et netus et malesuada fames ac. Elementum sagittis vitae et leo duis ut diam. Porttitor rhoncus dolor purus non enim. Purus in massa tempor nec feugiat nisl pretium fusce id. Habitasse platea dictumst quisque sagittis purus sit amet volutpat. Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Proin sagittis nisl rhoncus mattis. Urna porttitor rhoncus dolor purus non enim praesent. Aliquet eget sit amet tellus cras.',
        commentNumber: 34,
    },
    {
        threadID: 'aefaseflk',
        votes: {
            upvote: 447,
            downvote: 31,
        },
        community: 'funny',
        communityID: 'NHKGjwewr',
        flair: 'placehoder',
        title: 'It needs more salsa',
        restricted: false,
        authorID: 'author',
        authorName: "HectorTheWellEndowed",
        awards: [],
        content: 'This is a test thread.',
        dateCreated: '',
        timePosted: new Date(2022, 6, 28, 12, 30, 7), 
        textBody: 'Sed augue lacus viverra vitae congue eu consequat. Lacus viverra vitae congue eu consequat ac felis donec et. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Aliquam faucibus purus in massa. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper. Quis eleifend quam adipiscing vitae proin. Neque viverra justo nec ultrices dui sapien eget mi proin. Cursus risus at ultrices mi tempus. Vitae proin sagittis nisl rhoncus mattis. Tristique senectus et netus et malesuada fames ac. Elementum sagittis vitae et leo duis ut diam. Porttitor rhoncus dolor purus non enim. Purus in massa tempor nec feugiat nisl pretium fusce id. Habitasse platea dictumst quisque sagittis purus sit amet volutpat. Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Proin sagittis nisl rhoncus mattis. Urna porttitor rhoncus dolor purus non enim praesent. Aliquet eget sit amet tellus cras.',
        commentNumber: 67,
    },
    {
        threadID: 'gsfsesefse',
        votes: {
            upvote: 942,
            downvote: 634,
        },
        community: 'funny',
        communityID: 'NHKGjwewr',
        flair: 'placehoder',
        title: 'It\s just a phase, mom!',
        restricted: false,
        authorID: 'author',
        authorName: "HectorTheWellEndowed",
        awards: [],
        content: 'This is a test thread.',
        dateCreated: '',
        timePosted: new Date(2022, 6, 28, 12, 25, 7), 
        textBody: 'Sed augue lacus viverra vitae congue eu consequat. Lacus viverra vitae congue eu consequat ac felis donec et. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Aliquam faucibus purus in massa. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper. Quis eleifend quam adipiscing vitae proin. Neque viverra justo nec ultrices dui sapien eget mi proin. Cursus risus at ultrices mi tempus. Vitae proin sagittis nisl rhoncus mattis. Tristique senectus et netus et malesuada fames ac. Elementum sagittis vitae et leo duis ut diam. Porttitor rhoncus dolor purus non enim. Purus in massa tempor nec feugiat nisl pretium fusce id. Habitasse platea dictumst quisque sagittis purus sit amet volutpat. Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Proin sagittis nisl rhoncus mattis. Urna porttitor rhoncus dolor purus non enim praesent. Aliquet eget sit amet tellus cras.',
        commentNumber: 14,
    },
    {
        threadID: 'werbcbcvb',
        votes: {
            upvote: 354,
            downvote: 78,
        },
        community: 'funny',
        communityID: 'NHKGjwewr',
        flair: 'placehoder',
        title: 'They ran out of glue',
        restricted: false,
        authorID: 'author',
        authorName: "HectorTheWellEndowed",
        awards: [],
        content: 'This is a test thread.',
        dateCreated: '',
        timePosted: new Date(2022, 6, 27, 14, 39, 7), 
        textBody: 'Sed augue lacus viverra vitae congue eu consequat. Lacus viverra vitae congue eu consequat ac felis donec et. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Aliquam faucibus purus in massa. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper. Quis eleifend quam adipiscing vitae proin. Neque viverra justo nec ultrices dui sapien eget mi proin. Cursus risus at ultrices mi tempus. Vitae proin sagittis nisl rhoncus mattis. Tristique senectus et netus et malesuada fames ac. Elementum sagittis vitae et leo duis ut diam. Porttitor rhoncus dolor purus non enim. Purus in massa tempor nec feugiat nisl pretium fusce id. Habitasse platea dictumst quisque sagittis purus sit amet volutpat. Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Proin sagittis nisl rhoncus mattis. Urna porttitor rhoncus dolor purus non enim praesent. Aliquet eget sit amet tellus cras.',
        commentNumber: 41,
    },
    {
        threadID: 'myvbrtec',
        votes: {
            upvote: 812,
            downvote: 423,
        },
        community: 'funny',
        communityID: 'NHKGjwewr',
        flair: 'placehoder',
        title: 'A rare kind of potato',
        restricted: false,
        authorID: 'author',
        authorName: "HectorTheWellEndowed",
        awards: [],
        content: 'This is a test thread.',
        dateCreated: '',
        timePosted: new Date(2022, 6, 26, 14, 39, 7), 
        textBody: 'Sed augue lacus viverra vitae congue eu consequat. Lacus viverra vitae congue eu consequat ac felis donec et. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Aliquam faucibus purus in massa. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper. Quis eleifend quam adipiscing vitae proin. Neque viverra justo nec ultrices dui sapien eget mi proin. Cursus risus at ultrices mi tempus. Vitae proin sagittis nisl rhoncus mattis. Tristique senectus et netus et malesuada fames ac. Elementum sagittis vitae et leo duis ut diam. Porttitor rhoncus dolor purus non enim. Purus in massa tempor nec feugiat nisl pretium fusce id. Habitasse platea dictumst quisque sagittis purus sit amet volutpat. Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Proin sagittis nisl rhoncus mattis. Urna porttitor rhoncus dolor purus non enim praesent. Aliquet eget sit amet tellus cras.',
        commentNumber: 43,
    },
    {
        threadID: 'rnvnvbfdgrdg',
        votes: {
            upvote: 667,
            downvote: 456,
        },
        community: 'funny',
        communityID: 'NHKGjwewr',
        flair: 'placehoder',
        title: 'There was a door that was opened here',
        restricted: false,
        authorID: 'author',
        authorName: "HectorTheWellEndowed",
        awards: [],
        content: 'This is a test thread.',
        dateCreated: '',
        timePosted: new Date(2022, 6, 30, 10, 45, 7), 
        textBody: 'Sed augue lacus viverra vitae congue eu consequat. Lacus viverra vitae congue eu consequat ac felis donec et. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Aliquam faucibus purus in massa. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper. Quis eleifend quam adipiscing vitae proin. Neque viverra justo nec ultrices dui sapien eget mi proin. Cursus risus at ultrices mi tempus. Vitae proin sagittis nisl rhoncus mattis. Tristique senectus et netus et malesuada fames ac. Elementum sagittis vitae et leo duis ut diam. Porttitor rhoncus dolor purus non enim. Purus in massa tempor nec feugiat nisl pretium fusce id. Habitasse platea dictumst quisque sagittis purus sit amet volutpat. Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Proin sagittis nisl rhoncus mattis. Urna porttitor rhoncus dolor purus non enim praesent. Aliquet eget sit amet tellus cras.',
        commentNumber: 71,
    },
]

export const SampleCommunity = [
    {
        communityTitle: 'news',
        communityID: 'EBKPIsd',  
        communityImage: NewsLogo, 
        members: 12000, 
        customNamedMembers: '', 
        onlineMembers: 150, 
        dateCreated: "2008-01-25", 
        CommunityTheme: {
            headerBackgroundColor: "#1c1c38",
            headerTextColor: "#ffffff",
            ButtonBackgroundColor: "#ffffff",
            ButtonBackgroundHoverColor: "#ececec",
            ButtonTextColor: "#1c1c38", 
            ButtonBorder: "1px solid #1c1c38", 
            InvertedButtonBackgroundColor: "#1c1c38",
            InvertedButtonBackgroundHoverColor: "#34346d", 
            InvertedButtonTextColor: "#ffffff",
            panelBackgroudColor: "#DAE0E6", 
        },
        description: "The place for news articles about current events in the United States and the rest of the world. Discuss it all here.",
        rules: [
            {
                title: "Submissions must be articles about a specific news event", 
                description: "A story that is over a week old, does not properly report a story, or is not noteworthy, or is not in English. Self-posts and meta-posts without moderator approval (live update threads, major breaking news, and megathreads are usually exempt) are not allowed. Articles must be about a specific news event.",
            },
            {
                title: "No opinion/analysis or advocacy pieces", 
                description: "Opinion and analysis should go in /r/Foodforthought or another relevant subreddit. This includes articles with editorial opinion, personal conjecture, or otherwise. Press releases with an editorial slant, and analysis of news events (rather than reporting on the event itself) are not allowed. Both articles and domains regarding advocacy for a certain point of view or ideology rather than objective reporting should be reviewed under this rule.",
            },
            {
                title: "Articles must not be primarily concerning politics",
                description: "Articles must not be primarily concerning politics. To meet our requirements, a definitive outcome needs to have been reached. Political posturing, such as a politician making remarks, are not allowed. Political procedure, such as a bill being introduced for legislative review, are not allowed. A piece of legislation being signed into law or the results of an election being finalized are both examples of definitive outcomes which would be permitted.",

            },
            {
                title: "No editorialized titles; Title must match article title", 
                description: "Editorialized titles, written by the posting user or the domain, are not allowed. Titles should be unbiased and strictly factual. When the article itself is titled appropriately, the submission title should be directly sourced from either the title OR lede of the linked article, but not both. \n\nDon't plug other subreddits in the title; adding cross-post references is not suitable for /r/news.",
            },
            {
                title: "No paywalls/blogspam that steals content",
                description: "Domains which require the user to purchase a subscription or register an account in order to read the full article are not allowed in /r/news. All users should be able to access the article. Domains which are stealing or reposting content from other news sites, or simply rehash another article without adding substance, are not allowed, and users are encouraged to post the original source instead.",
            },
            {
                title: "No posts covering an already submitted story",
                description: "This rule is in relation to already submitted stories which are being rehashed on multiple domains. If a popular story is being submitted while the same event is covered in another post on the front page, or one with sufficient upvotes at an earlier date, it may be subject to removal. If a story was already submitted but did not become popular, then the rule is not applicable. Spamming a story until it reaches the front page is in violation of reddit's sitewide rules and is not allowed.",
            },
            {
                title: "Do not be racist, sexist, vitriolic, or overly crude",
                description: "Comments containing racist, sexist or bigoted slurs are subject to removal. Comments which promote racism, sexism or bigotry (including a viewpoint in relation to those) are subject to removal, and users whom engage in posting such comments may be banned at the mods' discretion. Overly crude comments which add nothing to discussion are also subject to removal/ban. These include inappropriate or inflammatory comments, personal attacks, etc.", 
            },
            {
                title: "Do not be unnecessarily rude or provocative", 
                description: "In conjunction with vitriolic and crude comments, a comment that is unnecessarily rude (inflammatory comments, personal attacks) or purposefully provocative (baiting) are subject to removal/ban.\n\nAdvocating for or celebrating the death of another human being is grounds for a permanent ban from r/news. Regardless of what you think about a person, this type of discourse is unwelcome on r/news and we will not hesitate to remove you for it."
            },
            {
                title: "No Cheap or distracting jokes or memes",
                description: "Jokes, memes, puns, and overall low quality comments are subject to removal, especially in the top-level comments.",
            },
            {
                title: "No witchhunting.Follow the Reddit Content Policy.", 
                description: "Any thread which violates reddit's site-wide rules or invokes a witch-hunt is not allowed in /r/news.\n\nContact information publicly advertised by the person or organization in question is allowed so long as it is not being used to incite personal harassment, and doesn't contain personal contact information (home phone number, information of non-public family members, etc.) To ensure that such comments aren't removed, provide a link to the official page where this information is contained.",
            }, 
            {
                title: "Do not advocate or celebrate death", 
                description: "While civil criticism of others is allowed (whether living or deceased), advocating or celebrating the death of others, including public figures, is not.", 

            }, 
            {
                title: "No bots/Novelty accounts",
                description: "Bots and novelty accounts are not allowed",
            },
        ], 
        moderators: [
            {
                userName: "AngelFire",
                userID: "segaigaSGGEex", 
            }, 
            {
                userName: "CrowdSource",
                userID: "fawsgsegsfsef",
            }, 
        ] 
    },
    {
        communityTitle: 'funny',
        communityID: 'NHKGjwewr',
        communityImage: FunnyLogo, 
        members: 5000,
        customNamedMembers: 'jokers', 
        onlineMembers: 429,
        dateCreated: "2008-01-25",
        description: "Welcome to r/Funny, Reddit's largest humour depository.",
        communityTheme: {

        }, 
        rules: [
            {
                title: "All posts must make an attempt at humor.", 
                description: "Humor is subjective, but all posts must at least make an attempt at humor. Posts which are intentionally disruptive, inane, or nonsensical will be removed.",
            }, 
            {
                title: "No memes, HIFW, MRW, MeIRL, DAE, or similar posts.",
                description: "Memes of any sort are expressly forbidden. This includes any variety of memetic image or video format, any footage or photographs of memes in real-world or virtual settings (as with \"challenges\" and other imitated behaviors), and any derivation or adaptation of memetic content. HIFW, MRW, TFW, MeIRL, demotivationals, eCards, and DAE posts are similarly disallowed. Non-memetic image macros are allowed.",
            },
            {
                title: "No reposts.", 
                description: "If a given piece of content has appeared on /r/Funny before, do not post it. Sites like KarmaDecay and TinEye can help to determine the uniqueness of a given submission, but since neither site is 100% accurate, original content is strongly preferred. Serial reposters will be banned.",
            },
            {
                title: "No personal info, no hate speech, no harassment.",
                description: "No personally identifying information, including anything hosted on platforms making that information public. Posts encouraging the harassment of any individual, group, community, or subreddit will be removed and may result in a ban. If necessary, a report will be made to the site administration. In accordance with Reddit's policies, there is zero tolerance for this.", 
            },
            {
                title: "No politics or political figures.",
                description: "Anything which involves or includes politics or a political figure – even if they are not the focus of the post – may not be posted here. ", 
            }, 
            {
                title: "No forbidden titles, low-effort titles, or posts about Reddit cakedays.\", titles which circumvent other rules, and titles comprising", 
                description: "No asking for upvotes (in any form), no “Cake Day” posts, and no posts to communicate with another Redditor. Posts with titles such as \"I got banned from / r / ___\" or \"This got removed from / r / ___\" are not allowed. For an inclusive list, please read the complete rules page. Low-effort titles, memetic titles,excessive or disruptive emojis are similarly disallowed.",
            },
            {
                title: "No gore or pornography.",
                description: "Gore, pornography, and sexually graphic images are not allowed. Try /r/NSFWfunny. All other NSFW content must be tagged as such.", 
            },
            {
                title: "No unoriginal comics.",
                description: "Comics may only be posted on Wednesdays and Sundays (measured using Pacific Time), and only by their original artists.", 
            },
            {
                title: "No pictures of just text.", 
                description: "Image-based submissions in which the humor can be conveyed via text alone are not allowed. This includes pictures of text with images that don't add necessary context, transcriptions of standup comedy (as with /r/standupshots), and screenshots of jokes. Here are some examples. Text posts using Reddit's native system are allowed.", 
            },
            {
                title: "No electronic messaging or social media content (including Reddit).", 
                description: "Social media content of any kind is not allowed. This includes anything from any form of \"comments section\" on the Internet, as well as content accompanied by text from those platforms. Screenshots of electronic messages of any variety are not allowed. Images with added Snapchat text are allowed, as long as all UI elements have been removed.", 
            },
        ],
        moderators: [
            {
                userName: "AngelFire",
                userID: "segaigaSGGEex",
            },
            {
                userName: "CrowdSource",
                userID: "fawsgsegsfsef",
            },
        ]
    },
    {
        communityTitle: 'jokes',
        communityID: 'Pkndhksdhf',
        communityImage: FunnyLogo,
        members: 200,
        customNamedMembers: 'jokers',
        onlineMembers: 120,
        dateCreated: "2008-01-25",
        description: "Welcome to r/Jokes, Reddit's largest humor depository.",
        communityTheme: {

        },
        rules: [
            {
                title: "All posts must make an attempt at humor.",
                description: "Humor is subjective, but all posts must at least make an attempt at humor. Posts which are intentionally disruptive, inane, or nonsensical will be removed.",
            },
            {
                title: "No memes, HIFW, MRW, MeIRL, DAE, or similar posts.",
                description: "Memes of any sort are expressly forbidden. This includes any variety of memetic image or video format, any footage or photographs of memes in real-world or virtual settings (as with \"challenges\" and other imitated behaviors), and any derivation or adaptation of memetic content. HIFW, MRW, TFW, MeIRL, demotivationals, eCards, and DAE posts are similarly disallowed. Non-memetic image macros are allowed.",
            },
            {
                title: "No reposts.",
                description: "If a given piece of content has appeared on /r/Funny before, do not post it. Sites like KarmaDecay and TinEye can help to determine the uniqueness of a given submission, but since neither site is 100% accurate, original content is strongly preferred. Serial reposters will be banned.",
            },
            {
                title: "No personal info, no hate speech, no harassment.",
                description: "No personally identifying information, including anything hosted on platforms making that information public. Posts encouraging the harassment of any individual, group, community, or subreddit will be removed and may result in a ban. If necessary, a report will be made to the site administration. In accordance with Reddit's policies, there is zero tolerance for this.",
            },
            {
                title: "No politics or political figures.",
                description: "Anything which involves or includes politics or a political figure – even if they are not the focus of the post – may not be posted here. ",
            },
            {
                title: "No forbidden titles, low-effort titles, or posts about Reddit cakedays.\", titles which circumvent other rules, and titles comprising",
                description: "No asking for upvotes (in any form), no “Cake Day” posts, and no posts to communicate with another Redditor. Posts with titles such as \"I got banned from / r / ___\" or \"This got removed from / r / ___\" are not allowed. For an inclusive list, please read the complete rules page. Low-effort titles, memetic titles,excessive or disruptive emojis are similarly disallowed.",
            },
            {
                title: "No gore or pornography.",
                description: "Gore, pornography, and sexually graphic images are not allowed. Try /r/NSFWfunny. All other NSFW content must be tagged as such.",
            },
            {
                title: "No unoriginal comics.",
                description: "Comics may only be posted on Wednesdays and Sundays (measured using Pacific Time), and only by their original artists.",
            },
            {
                title: "No pictures of just text.",
                description: "Image-based submissions in which the humor can be conveyed via text alone are not allowed. This includes pictures of text with images that don't add necessary context, transcriptions of standup comedy (as with /r/standupshots), and screenshots of jokes. Here are some examples. Text posts using Reddit's native system are allowed.",
            },
            {
                title: "No electronic messaging or social media content (including Reddit).",
                description: "Social media content of any kind is not allowed. This includes anything from any form of \"comments section\" on the Internet, as well as content accompanied by text from those platforms. Screenshots of electronic messages of any variety are not allowed. Images with added Snapchat text are allowed, as long as all UI elements have been removed.",
            },
        ],
        moderators: [
            {
                userName: "AngelFire",
                userID: "segaigaSGGEex",
            },
            {
                userName: "CrowdSource",
                userID: "fawsgsegsfsef",
            },
        ]
    },
    {
        communityTitle: 'ContagiousLaughter',
        communityID: 'OPyucjde',
        communityImage: FunnyLogo,
        members: 303,
        customNamedMembers: 'jokers',
        onlineMembers: 4,
        dateCreated: "2008-01-25",
        description: "Welcome to r/ContagiousLaughter, Reddit's largest humour depository.",
        communityTheme: {

        },
        rules: [
            {
                title: "All posts must make an attempt at humor.",
                description: "Humor is subjective, but all posts must at least make an attempt at humor. Posts which are intentionally disruptive, inane, or nonsensical will be removed.",
            },
            {
                title: "No memes, HIFW, MRW, MeIRL, DAE, or similar posts.",
                description: "Memes of any sort are expressly forbidden. This includes any variety of memetic image or video format, any footage or photographs of memes in real-world or virtual settings (as with \"challenges\" and other imitated behaviors), and any derivation or adaptation of memetic content. HIFW, MRW, TFW, MeIRL, demotivationals, eCards, and DAE posts are similarly disallowed. Non-memetic image macros are allowed.",
            },
            {
                title: "No reposts.",
                description: "If a given piece of content has appeared on /r/Funny before, do not post it. Sites like KarmaDecay and TinEye can help to determine the uniqueness of a given submission, but since neither site is 100% accurate, original content is strongly preferred. Serial reposters will be banned.",
            },
            {
                title: "No personal info, no hate speech, no harassment.",
                description: "No personally identifying information, including anything hosted on platforms making that information public. Posts encouraging the harassment of any individual, group, community, or subreddit will be removed and may result in a ban. If necessary, a report will be made to the site administration. In accordance with Reddit's policies, there is zero tolerance for this.",
            },
            {
                title: "No politics or political figures.",
                description: "Anything which involves or includes politics or a political figure – even if they are not the focus of the post – may not be posted here. ",
            },
            {
                title: "No forbidden titles, low-effort titles, or posts about Reddit cakedays.\", titles which circumvent other rules, and titles comprising",
                description: "No asking for upvotes (in any form), no “Cake Day” posts, and no posts to communicate with another Redditor. Posts with titles such as \"I got banned from / r / ___\" or \"This got removed from / r / ___\" are not allowed. For an inclusive list, please read the complete rules page. Low-effort titles, memetic titles,excessive or disruptive emojis are similarly disallowed.",
            },
            {
                title: "No gore or pornography.",
                description: "Gore, pornography, and sexually graphic images are not allowed. Try /r/NSFWfunny. All other NSFW content must be tagged as such.",
            },
            {
                title: "No unoriginal comics.",
                description: "Comics may only be posted on Wednesdays and Sundays (measured using Pacific Time), and only by their original artists.",
            },
            {
                title: "No pictures of just text.",
                description: "Image-based submissions in which the humor can be conveyed via text alone are not allowed. This includes pictures of text with images that don't add necessary context, transcriptions of standup comedy (as with /r/standupshots), and screenshots of jokes. Here are some examples. Text posts using Reddit's native system are allowed.",
            },
            {
                title: "No electronic messaging or social media content (including Reddit).",
                description: "Social media content of any kind is not allowed. This includes anything from any form of \"comments section\" on the Internet, as well as content accompanied by text from those platforms. Screenshots of electronic messages of any variety are not allowed. Images with added Snapchat text are allowed, as long as all UI elements have been removed.",
            },
        ],
        moderators: [
            {
                userName: "AngelFire",
                userID: "segaigaSGGEex",
            },
            {
                userName: "CrowdSource",
                userID: "fawsgsegsfsef",
            },
        ]
    },
    {
        communityTitle: 'Amusing',
        communityID: 'pganselrk',
        communityImage: FunnyLogo,
        members: 4200,
        customNamedMembers: 'amusers',
        onlineMembers: 429,
        dateCreated: "2008-01-25",
        description: "Welcome to r/Amusing, Reddit's largest humour depository.",
        communityTheme: {

        },
        rules: [
            {
                title: "All posts must make an attempt at humor.",
                description: "Humor is subjective, but all posts must at least make an attempt at humor. Posts which are intentionally disruptive, inane, or nonsensical will be removed.",
            },
            {
                title: "No memes, HIFW, MRW, MeIRL, DAE, or similar posts.",
                description: "Memes of any sort are expressly forbidden. This includes any variety of memetic image or video format, any footage or photographs of memes in real-world or virtual settings (as with \"challenges\" and other imitated behaviors), and any derivation or adaptation of memetic content. HIFW, MRW, TFW, MeIRL, demotivationals, eCards, and DAE posts are similarly disallowed. Non-memetic image macros are allowed.",
            },
            {
                title: "No reposts.",
                description: "If a given piece of content has appeared on /r/Funny before, do not post it. Sites like KarmaDecay and TinEye can help to determine the uniqueness of a given submission, but since neither site is 100% accurate, original content is strongly preferred. Serial reposters will be banned.",
            },
            {
                title: "No personal info, no hate speech, no harassment.",
                description: "No personally identifying information, including anything hosted on platforms making that information public. Posts encouraging the harassment of any individual, group, community, or subreddit will be removed and may result in a ban. If necessary, a report will be made to the site administration. In accordance with Reddit's policies, there is zero tolerance for this.",
            },
            {
                title: "No politics or political figures.",
                description: "Anything which involves or includes politics or a political figure – even if they are not the focus of the post – may not be posted here. ",
            },
            {
                title: "No forbidden titles, low-effort titles, or posts about Reddit cakedays.\", titles which circumvent other rules, and titles comprising",
                description: "No asking for upvotes (in any form), no “Cake Day” posts, and no posts to communicate with another Redditor. Posts with titles such as \"I got banned from / r / ___\" or \"This got removed from / r / ___\" are not allowed. For an inclusive list, please read the complete rules page. Low-effort titles, memetic titles,excessive or disruptive emojis are similarly disallowed.",
            },
            {
                title: "No gore or pornography.",
                description: "Gore, pornography, and sexually graphic images are not allowed. Try /r/NSFWfunny. All other NSFW content must be tagged as such.",
            },
            {
                title: "No unoriginal comics.",
                description: "Comics may only be posted on Wednesdays and Sundays (measured using Pacific Time), and only by their original artists.",
            },
            {
                title: "No pictures of just text.",
                description: "Image-based submissions in which the humor can be conveyed via text alone are not allowed. This includes pictures of text with images that don't add necessary context, transcriptions of standup comedy (as with /r/standupshots), and screenshots of jokes. Here are some examples. Text posts using Reddit's native system are allowed.",
            },
            {
                title: "No electronic messaging or social media content (including Reddit).",
                description: "Social media content of any kind is not allowed. This includes anything from any form of \"comments section\" on the Internet, as well as content accompanied by text from those platforms. Screenshots of electronic messages of any variety are not allowed. Images with added Snapchat text are allowed, as long as all UI elements have been removed.",
            },
        ],
        moderators: [
            {
                userName: "AngelFire",
                userID: "segaigaSGGEex",
            },
            {
                userName: "CrowdSource",
                userID: "fawsgsegsfsef",
            },
        ]
    },
    {
        communityTitle: 'hilarious',
        communityID: 'bwkerwkje',
        communityImage: FunnyLogo,
        members: 3200,
        customNamedMembers: 'jokers',
        onlineMembers: 429,
        dateCreated: "2008-01-25",
        description: "Welcome to r/Hilaious, Reddit's largest humour depository.",
        communityTheme: {

        },
        rules: [
            {
                title: "All posts must make an attempt at humor.",
                description: "Humor is subjective, but all posts must at least make an attempt at humor. Posts which are intentionally disruptive, inane, or nonsensical will be removed.",
            },
            {
                title: "No memes, HIFW, MRW, MeIRL, DAE, or similar posts.",
                description: "Memes of any sort are expressly forbidden. This includes any variety of memetic image or video format, any footage or photographs of memes in real-world or virtual settings (as with \"challenges\" and other imitated behaviors), and any derivation or adaptation of memetic content. HIFW, MRW, TFW, MeIRL, demotivationals, eCards, and DAE posts are similarly disallowed. Non-memetic image macros are allowed.",
            },
            {
                title: "No reposts.",
                description: "If a given piece of content has appeared on /r/Funny before, do not post it. Sites like KarmaDecay and TinEye can help to determine the uniqueness of a given submission, but since neither site is 100% accurate, original content is strongly preferred. Serial reposters will be banned.",
            },
            {
                title: "No personal info, no hate speech, no harassment.",
                description: "No personally identifying information, including anything hosted on platforms making that information public. Posts encouraging the harassment of any individual, group, community, or subreddit will be removed and may result in a ban. If necessary, a report will be made to the site administration. In accordance with Reddit's policies, there is zero tolerance for this.",
            },
            {
                title: "No politics or political figures.",
                description: "Anything which involves or includes politics or a political figure – even if they are not the focus of the post – may not be posted here. ",
            },
            {
                title: "No forbidden titles, low-effort titles, or posts about Reddit cakedays.\", titles which circumvent other rules, and titles comprising",
                description: "No asking for upvotes (in any form), no “Cake Day” posts, and no posts to communicate with another Redditor. Posts with titles such as \"I got banned from / r / ___\" or \"This got removed from / r / ___\" are not allowed. For an inclusive list, please read the complete rules page. Low-effort titles, memetic titles,excessive or disruptive emojis are similarly disallowed.",
            },
            {
                title: "No gore or pornography.",
                description: "Gore, pornography, and sexually graphic images are not allowed. Try /r/NSFWfunny. All other NSFW content must be tagged as such.",
            },
            {
                title: "No unoriginal comics.",
                description: "Comics may only be posted on Wednesdays and Sundays (measured using Pacific Time), and only by their original artists.",
            },
            {
                title: "No pictures of just text.",
                description: "Image-based submissions in which the humor can be conveyed via text alone are not allowed. This includes pictures of text with images that don't add necessary context, transcriptions of standup comedy (as with /r/standupshots), and screenshots of jokes. Here are some examples. Text posts using Reddit's native system are allowed.",
            },
            {
                title: "No electronic messaging or social media content (including Reddit).",
                description: "Social media content of any kind is not allowed. This includes anything from any form of \"comments section\" on the Internet, as well as content accompanied by text from those platforms. Screenshots of electronic messages of any variety are not allowed. Images with added Snapchat text are allowed, as long as all UI elements have been removed.",
            },
        ],
        moderators: [
            {
                userName: "AngelFire",
                userID: "segaigaSGGEex",
            },
            {
                userName: "CrowdSource",
                userID: "fawsgsegsfsef",
            },
        ]
    },
    {
        communityTitle: 'LosAngles',
        communityID: 'LOSAngeleserwtwer',
        communityImage: LosAnglesCommunityLogo,
        members: 6451,
        customNamedMembers: 'LA natives',
        onlineMembers: 1800,
        dateCreated: "2008-04-14",
        description: "The official subreddit of Los Angeles, California! The international epicenter of entertainment and home of the Dodgers, Lakers, Kings, Rams, Giltinis, Sparks, LAFC, Clippers, Galaxy, Angel City FC, and Chargers! We also have wildfires, earthquakes, movie stars, television studios, music, world-class food, beaches, mountains, traffic jams, museums, theme parks, and the most beautiful Redditors of all time. This is LA!",
        communityTheme: {

        },
        rules: [
            {
                title: "All posts must make an attempt at humor.",
                description: "Humor is subjective, but all posts must at least make an attempt at humor. Posts which are intentionally disruptive, inane, or nonsensical will be removed.",
            },
            {
                title: "No memes, HIFW, MRW, MeIRL, DAE, or similar posts.",
                description: "Memes of any sort are expressly forbidden. This includes any variety of memetic image or video format, any footage or photographs of memes in real-world or virtual settings (as with \"challenges\" and other imitated behaviors), and any derivation or adaptation of memetic content. HIFW, MRW, TFW, MeIRL, demotivationals, eCards, and DAE posts are similarly disallowed. Non-memetic image macros are allowed.",
            },
            {
                title: "No reposts.",
                description: "If a given piece of content has appeared on /r/Funny before, do not post it. Sites like KarmaDecay and TinEye can help to determine the uniqueness of a given submission, but since neither site is 100% accurate, original content is strongly preferred. Serial reposters will be banned.",
            },
            {
                title: "No personal info, no hate speech, no harassment.",
                description: "No personally identifying information, including anything hosted on platforms making that information public. Posts encouraging the harassment of any individual, group, community, or subreddit will be removed and may result in a ban. If necessary, a report will be made to the site administration. In accordance with Reddit's policies, there is zero tolerance for this.",
            },
            {
                title: "No politics or political figures.",
                description: "Anything which involves or includes politics or a political figure – even if they are not the focus of the post – may not be posted here. ",
            },
            {
                title: "No forbidden titles, low-effort titles, or posts about Reddit cakedays.\", titles which circumvent other rules, and titles comprising",
                description: "No asking for upvotes (in any form), no “Cake Day” posts, and no posts to communicate with another Redditor. Posts with titles such as \"I got banned from / r / ___\" or \"This got removed from / r / ___\" are not allowed. For an inclusive list, please read the complete rules page. Low-effort titles, memetic titles,excessive or disruptive emojis are similarly disallowed.",
            },
            {
                title: "No gore or pornography.",
                description: "Gore, pornography, and sexually graphic images are not allowed. Try /r/NSFWfunny. All other NSFW content must be tagged as such.",
            },
            {
                title: "No unoriginal comics.",
                description: "Comics may only be posted on Wednesdays and Sundays (measured using Pacific Time), and only by their original artists.",
            },
            {
                title: "No pictures of just text.",
                description: "Image-based submissions in which the humor can be conveyed via text alone are not allowed. This includes pictures of text with images that don't add necessary context, transcriptions of standup comedy (as with /r/standupshots), and screenshots of jokes. Here are some examples. Text posts using Reddit's native system are allowed.",
            },
            {
                title: "No electronic messaging or social media content (including Reddit).",
                description: "Social media content of any kind is not allowed. This includes anything from any form of \"comments section\" on the Internet, as well as content accompanied by text from those platforms. Screenshots of electronic messages of any variety are not allowed. Images with added Snapchat text are allowed, as long as all UI elements have been removed.",
            },
        ],
        moderators: [
            {
                userName: "AngelFire",
                userID: "segaigaSGGEex",
            },
            {
                userName: "CrowdSource",
                userID: "fawsgsegsfsef",
            },
        ]
    },
]