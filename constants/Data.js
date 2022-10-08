export const colors = {
    //
    black: "black",
    white: "white",
    blue: "blue",
    red: "red",
    green: "green",
    purple: "purple",
    pink: "pink",
    yellow: "yellow",
    grey: "grey",
    gold: "gold",
    darkCyan: "darkcyan",
    darkblue: "darkblue",
    darkslategray: "darkslategray",
    mediumslateblue: "mediumslateblue",

    //
    defaultBG: "#c4d8dd",
    defaultBG2: "#f6f6f6",
    defaultBG3: "#f6e5e5",
    defaultBG4: "#00FFD1",
    defaultTC: "black",
};

export const images = {
    logo: require("../images/AppArt3.png"),
    academia: require("../images/Academia.png"),
    defaultProfile: require("../images/profileIcon.png"),
    cartBlack: require("../images/ShopingCartBlackIcon.png"),
    cartWhite: require("../images/ShopingCartWhiteIcon.png"),
    stationaries: require("../images/stationariesIcon.png"),
    homework: require("../images/homeworkIcon.png"),
    snacks: require("../images/sancksIcon.png"),
    home: require("../images/HomeIcon-white.png"),
    add: require("../images/AddIcon-white.png"),
    settings: require("../images/SettingsIcon-white.png")
};

export const fonts = {
    default: "Arial, Helvetica, sans-seri",
};

export const sizes = {
    ExtraSmall: 10,
    Small: 15,
    Medium: 20,
    Large: 30,
    ExtraLarge: 50,
};


export const settings = {
    currency: " naira",
};



//Objects
export const User = {
    name: "",
    description: "",
    profilePicture: images.defaultProfile,
    followers: [],
    following: [],
    location: "----",
    loginDetails: {
        email: "",
        password: "",
    },
    sellerInfo: {
        rating: 0,
        productList: [],
        amountSelling: "0",
    },
    appInfo: {
        settings: settings,
    },
    id: "0",
}

export const Category = {
    name: "",
    description: "",
    image: "",
    id: "0",
}

export const Product = {
    title: "",
    description: "",
    price: "",
    seller: "",
    image: "",
    tags: [],
    amountAvailable: 0,
    ratings: 0,
    id: "0",
}



// Users
export let users = [];

export const testUsers = [
    {
    name: "Brandon",
    description: "........",
    profilePicture: require("../images/profile1.jpg"),
    loginDetails: {
        email: "durulego@gmail",
        password: "123456",
    },
    followers: "1M",
    following: [
        "Nicky", "Ricky", "Dicky", "Dawn", "Amy"
    ],
    location: "----",
    sellerInfo: {
        rating: 5,
        productList: suggestedProducts,
        amountSelling: "500",
    },
    id: "1",
},
{
    name: "Nick",
    description: "Game Developer and UI designer",
    profilePicture: require("../images/profile2.png"),
    loginDetails: {
        email: "example@gmail.com",
        password: "example",
    },
    followers: "10K",
    following: [
        "Nicky", "Ricky", "Dicky", "Dawn", "Amy"
    ],
    location: "----",
    sellerInfo: {
        rating: 5,
        productList: suggestedProducts,
        amountSelling: "500",
    },
    id: "2",
},
{
    name: "Amy",
    description: "School supplies distributor",
    profilePicture: require("../images/profile2.jpg"),
    loginDetails: {
        email: "----",
        password: "----",
    },
    followers: "1K",
    location: "----",
    sellerInfo: {
        rating: 5,
        productList: [
            {
                title: "Pens",
                description: "Stationaries",
                price: "50",
                seller: "----",
                image: require("../images/othersIcon.png"),
                id: "1",
            },
            {
                title: "Ruller",
                description: "Stationaries",
                price: "100",
                seller: "----",
                image: require("../images/othersIcon.png"),
                id: "2",
            },
        ],
        amountSelling: "500",
    },
    id: "3",
}
];

export const suggestedUsers = [];


//Category
export const categories = [
    {
        name: "Stationaries",
        image: images.stationaries,
        id: "1",
    },

    {
        name: "Snacks",
        image: images.snacks,
        id: "2",
    },

    {
        name: "Homework",
        image: images.homework,
        id: "3",
    },

    {
        name: "Drinks",
        image: images.homework,
        id: "4",
    },

    {
        name: "Books",
        image: images.homework,
        id: "5",
    },

    {
        name: "Games",
        image: images.homework,
        id: "6",
    },
];


//Products
export const products = []
export const testProducts = [
    {
        title: "Oreo's",
        description: "dark creamy chocolate biscuits, so sweat that you wont want anything else",
        price: "100",
        seller: "Nick",
        image: require("../images/oreos.jpg"),
        tags: ["chocolate", "biscuits", "sweat", "wont want anything else"],
        id: "1",
    },

    {
        title: "Fanta",
        description: "Orange flavored soda, with a sweet taste and incredible ",
        price: "100",
        seller: "----",
        image: require("../images/fanta.jpg"),
        tags: ["soda", "sweet", "orange", "sweet taste"],
        id: "2",
    },
    {
        title: "Pencil",
        description: "Stationaries",
        price: "50",
        seller: "Rick",
        image: require("../images/othersIcon.png"),
        tags: ["stationaries", "pencil", "nataraj"],
        id: "3",
    },
    {
        title: "Coke",
        description: "Snacks",
        price: "150",
        seller: "----",
        image: require("../images/coke.png"),
        tags: ["snacks", "coke", "sweet"],
        id: "4",
    },
    {
        title: "PS4 Controller",
        description: "Working PS4 Dualshock controller",
        price: "1,000",
        seller: "----",
        image: require("../images/ps4gamepad.png"),
        tags: ["game", "ps4", "console", "black controller"],
        id: "5",
    },
];

export const suggestedProducts = [
    testProducts[0],
    testProducts[3],
    testProducts[1],
    testProducts[2],
    testProducts[4],
]

export const topSellers = [
    {
        title: "Coke",
        description: "Snacks",
        price: "150",
        color: "black",
        seller: "----",
        image: require("../images/coke.png"),
        tags: ["snacks", "coke", "sweet"],
        id: "1",
    },

    {
        title: "Fanta",
        description: "Snacks",
        price: "150",
        color: "orange",
        seller: "----",
        image: require("../images/coke.png"),
        tags: ["snacks", "coke", "sweet"],
        id: "2",
    },

    {
        title: "Pencil",
        description: "Stationaries",
        price: "150",
        color: "darkblue",
        seller: "----",
        image: require("../images/coke.png"),
        tags: ["snacks", "coke", "sweet"],
        id: "3",
    },

]


export const cart = [];

export const orders = [
    [products[0], products[2], products[3]], [products[1], products[4], products[5]]
];



export const InitialState = {
    currentUser: users[0],
    setting: settings,

};

export const dataObject = {
    users: users,
    products: [products, suggestedProducts],
    categories: categories,
    cart: cart,
    settings: settings,
};