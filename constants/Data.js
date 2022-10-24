
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
    defaultBG4_Selected: "#198B76",
    defaultTC: "black",

};

const themeData = {
    dark: {
        appBG: "#c4d8dd",
        defaultColor: "#ff00fb",
        defaultColor2: "#9900ff",
        textColor: "white",
    },
    light: {
        appBG: "#c4d8dd",
        defaultColor: "#00FFD1",
        defaultColor2: "#00d9ff",
        textColor: "black",
    }
}

export const images = {

    //
    logo: require("../images/Logo.png"),
    academia: require("../images/Academia.png"),
    defaultProfile: require("../images/profileIcon.png"),
    cart: require("../images/Cart-white.png"),

    //
    stationary: require("../images/stationariesIcon.png"),
    homework: require("../images/homeworkIcon.png"),
    snacks: require("../images/sancksIcon.png"),
    home: require("../images/HomeIcon-colouured.png"),
    add: require("../images/AddIcon-coloured.png"),
    settings: require("../images/SettingsIcon-coloured.png"),


    //
    google: require("../images/GoogleIcon.png"),

    //
    icons: {
        home: require("../images/HomeIcon-colouured.png"),
        add: require("../images/AddIcon-coloured.png"),
        settings: require("../images/SettingsIcon-coloured.png"),
        search: require("../images/SearchIcon-coloured.png"),
        cart: require("../images/Cart-coloured.png"),
    },
};

export const fonts = {
    default: "Arial, Helvetica, sans-seri",
};

export const sizes = {
    Micro: 2.5,
    Mini: 5,
    ExtraSmall: 10,
    Small: 15,
    Medium: 20,
    Large: 30,
    ExtraLarge: 50,
};


export const settings = {
    currency: " naira",
    theme: themeData.light,
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
        orders: [],
        amountSelling: "0",
    },
    userInfo: {
        cart: [],
        rating: 0,
        amountSpent: "0",
        suggested: {
            suggestedProducts: [],
            suggestedUsers: [],
        },
        list: [],
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

export const Order = {
    user: User,
    date: "dd/mm/yr",
    products: [],
}

// Users
export const suggestedUsers = [];

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
        productList: testProducts,
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


//Category
export let categories = [
    {
        name: "Stationary",
        image: images.stationary,
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
    {
        title: "PS4 Controller",
        description: "Working PS4 Dualshock controller",
        price: "1,000",
        seller: "----",
        image: require("../images/ps4gamepad.png"),
        tags: ["game", "ps4", "console", "black controller"],
        id: "6",
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

export const InitialState = {
    currentUser: {},
};

export const appData = {
    users: [],
    products: [],
    categories: []
}
