export const colors = {
    blue: '#0000FF',
    red: '#FF0000',
    green: '#00FF00',
    yellow: '#FFFF00',
    white: '#FFFFFF',
    black: '#000000',
    orange: '#FFA500',
    purple: '#800080',
    gray: '#808080',
    brown: '#A52A2A',
    pink: '#FFC0CB',
    cyan: '#00FFFF',
    magenta: '#FF00FF',
    silver: '#C0C0C0',
    gold: '#FFD700',
    lime: '#00FF00',
    maroon: '#800000',
    navy: '#000080',
    olive: '#808000',
    teal: '#008080',
    violet: '#EE82EE',
    transparent: 'transparent',


    //default colors
    defaultBG: "#c4d8dd",
    defaultBG2: "#f6f6f6",
    defaultBG3: "#f6e5e5",
    defaultBG4: "#00FFD1",
    defaultBG4_Selected: "#198B76",
    defaultTC: "black",

    //theme colors
    darkTheme: {
        color: "#FFOOE5",
        color2: "#FFOOE5",
        bgColor: '#000',
        outline: "#c4d8dd",
        outline2: "#f6f6f6",
        textColor: '#fff'
    },

    lightTheme: {
        color: "#00FFD1",
        color2: "#00EAFF",
        bgColor: '#fff',
        outline: "#D7D7D7",
        outline2: "#E4E4E4",
        outline3: "#F6F6F6",
        textColor: '#000'
    }
};


export const themeData = {
    light: {
        appBG: "#c4d8dd",
        appBG2: "#ffffff",
        defaultColor: "#00FFD1",
        defaultColor2: "#00d9ff",
        textColor: "#000000",
    },
    dark: {
        appBG: "#c4d8dd",
        appBG2: "#000000",
        defaultColor: "#ff00fb",
        defaultColor2: "#9900ff",
        textColor: "#ffffff",
    }
}

export const images = {

    //
    logo: require("../images/Logo.png"),
    academia: require("../images/Academia3.png"),
    academia_white: require("../images/Academia4.png"),
    defaultProfile: require("../images/profileIcon.png"),
    cart: require("../images/Cart-white.png"),
    more: require("../images/othersIcon.png"),

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
        home: require("../images/HomeIcon-white.png"),
        add: require("../images/AddIcon-white.png"),
        settings: require("../images/SettingsIcon-white.png"),
        search: require("../images/SearchIcon-white.png"),
        cart: require("../images/Cart-white.png"),
    },

    //
    loading: require("../images/AppArt-Loading.png"),
    welcome: require("../images/AppArt-Openning.png"),
    chat: require("../images/AppArt-Chat.png"),
    follower: require("../images/AppArt-Follow.png"),
    following: require("../images/AppArt-Follow2.png"),
    confirmed: require("../images/AppArt-OrderConfirmed.png"),
    notification: require("../images/AppArt-Notification.png"),
    empty: require("../images/AppArt-Empty.png"),
    empty_cart: require("../images/AppArt-EmptyCart.png"),
    search: require("../images/AppArt-Search.png"),
    error: require("../images/AppArt-ServerDown.png"),
    analytics: require("../images/AppArt-Analytics.png"),
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

//Objects
export const User = {
    name: '',
    description: '',
    profilePicture: "https://firebasestorage.googleapis.com/v0/b/academia-c3d0e.appspot.com/o/Images%2FProfile%2FprofileIcon.png?alt=media&token=d0c063e1-d61e-4630-a6af-bba57f100d9d",
    followers: [],
    following: [],
    location: '',
    loginDetails: {
        email: '',
        password: '',
    },
    sellerInfo: {
        rating: 0,
        productList: [],
        orders: [],
        amountSelling: "0",
    },
    userInfo: {
        tags: [],
        cart: [],
        notifications: [],
        feed: {
            suggestedProducts: [],
            suggestedUsers: [],
            bestSellers: [],
            activity: [],
            newProducts: [],
            sales: [],
        },
        rating: 0,
        amountSpent: "0",
        savedList: [],
        recentlyViewed: [],
    },
    appInfo: {
        settings: {
            theme: "light",
            notifications: true,
            location: true,
            language: "English",
        },
    },
    chatList: [

    ],
    id: "0",
}


export const Product = {
    title: '',
    details: '',
    price: '',
    seller: '',
    sellersId: '',
    image: '',
    tags: [],
    amountAvailable: 0,
    sold: 0,
    ratings: 0,
    likes: 0,
    comments: [],
    discount: 0,
    views: [],
    id: "0",

}

export const Item = {
    product: Product,
    amountSellected: 0,
    id: "0"
}

export const Order = {
    user: '',
    date: "dd/mm/yr",
    products: [],
    id: "0",
}

export const Message = {
    sender: '',
    message: '',
    time: "mm:ss",
    id: "0",
}

export const Chat = {
    members: [],
    messages: [],
    id: "0"
}

export const List = {
    name: '',
    description: '',
    items: [],
    id: "0",
}

export const testUsers = [
    {
        name: "Brandon",
        description: "........",
        profilePicture: require("../images/profile1.jpg"),
        followers: [
            {
                name: "Joe",
                description: '',
                profilePicture: images.defaultProfile,
                followers: [],
                following: [],
                location: "----",
                loginDetails: {
                    email: '',
                    password: '',
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
                    settings: {
                        themeData: {
                            appBG: "#c4d8dd",
                            appBG2: "#ffffff",
                            defaultColor: "#00FFD1",
                            defaultColor2: "#00d9ff",
                            textColor: "#000000",
                        },
                    },
                },
                id: "4",
            },
            {
                name: "Dawn",
                description: '',
                profilePicture: images.defaultProfile,
                followers: [],
                following: [],
                location: "----",
                loginDetails: {
                    email: '',
                    password: '',
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
                    settings: {
                        themeData: {
                            appBG: "#c4d8dd",
                            appBG2: "#ffffff",
                            defaultColor: "#00FFD1",
                            defaultColor2: "#00d9ff",
                            textColor: "#000000",
                        },
                    },
                },
                id: "5",
            },
            {
                name: "Max",
                description: '',
                profilePicture: images.defaultProfile,
                followers: [],
                following: [],
                location: "----",
                loginDetails: {
                    email: '',
                    password: '',
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
                    settings: {
                        themeData: {
                            appBG: "#c4d8dd",
                            appBG2: "#ffffff",
                            defaultColor: "#00FFD1",
                            defaultColor2: "#00d9ff",
                            textColor: "#000000",
                        },
                    },
                },
                id: "6",
            }
        ],
        following: [
            {
                name: "Zoey",
                description: '',
                profilePicture: images.defaultProfile,
                followers: [],
                following: [],
                location: "----",
                loginDetails: {
                    email: '',
                    password: '',
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
                    settings: {
                        themeData: {
                            appBG: "#c4d8dd",
                            appBG2: "#ffffff",
                            defaultColor: "#00FFD1",
                            defaultColor2: "#00d9ff",
                            textColor: "#000000",
                        },
                    },
                },
                id: "7",
            },
            {
                name: "Jade",
                description: '',
                profilePicture: images.defaultProfile,
                followers: [],
                following: [],
                location: "----",
                loginDetails: {
                    email: '',
                    password: '',
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
                    settings: {
                        themeData: {
                            appBG: "#c4d8dd",
                            appBG2: "#ffffff",
                            defaultColor: "#00FFD1",
                            defaultColor2: "#00d9ff",
                            textColor: "#000000",
                        },
                    },
                },
                id: "8",
            },
            {
                name: "Bob",
                description: '',
                profilePicture: images.defaultProfile,
                followers: [],
                following: [],
                location: "----",
                loginDetails: {
                    email: '',
                    password: '',
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
                    settings: {
                        themeData: {
                            appBG: "#c4d8dd",
                            appBG2: "#ffffff",
                            defaultColor: "#00FFD1",
                            defaultColor2: "#00d9ff",
                            textColor: "#000000",
                        },
                    },
                },
                id: "9",
            }
        ],
        location: "----",
        loginDetails: {
            email: "durulego@gmail",
            password: "123456",
        },
        sellerInfo: {
            rating: 5,
            productList: [
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
            ],
            orders: [
                {
                    user: User,
                    date: "01/06/22",
                    products: [
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
                            title: "Oreo's",
                            description: "dark creamy chocolate biscuits, so sweat that you wont want anything else",
                            price: "100",
                            seller: "Nick",
                            image: require("../images/oreos.jpg"),
                            tags: ["chocolate", "biscuits", "sweat", "wont want anything else"],
                            id: "1",
                        },

                    ],
                    id: "0",
                },
                {
                    user: User,
                    date: "03/06/22",
                    products: [
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
                            title: "Pencil",
                            description: "Stationaries",
                            price: "50",
                            seller: "Rick",
                            image: require("../images/othersIcon.png"),
                            tags: ["stationaries", "pencil", "nataraj"],
                            id: "3",
                        },
                    ],
                    id: "1",
                }
            ],
            amountSelling: "4",
        },
        userInfo: {
            cart: [
                {
                    product: {
                        title: "Oreo's",
                        description: "dark creamy chocolate biscuits, so sweat that you wont want anything else",
                        price: "100",
                        seller: "Nick",
                        image: require("../images/oreos.jpg"),
                        tags: ["chocolate", "biscuits", "sweat", "wont want anything else"],
                        id: "1",
                    },
                    amountSellected: 0,
                    id: "0"
                },
                {
                    product: {
                        title: "Fanta",
                        description: "Orange flavored soda, with a sweet taste and incredible ",
                        price: "100",
                        seller: "----",
                        image: require("../images/fanta.jpg"),
                        tags: ["soda", "sweet", "orange", "sweet taste"],
                        id: "2",
                    },
                    amountSellected: 0,
                    id: "1"
                },
            ],
            rating: 0,
            amountSpent: "0",
            suggested: {
                suggestedProducts: [
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
                ],
                suggestedUsers: [
                    {
                        name: "Silly",
                        description: '',
                        profilePicture: images.defaultProfile,
                        followers: [],
                        following: [],
                        location: "----",
                        loginDetails: {
                            email: '',
                            password: '',
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
                            settings: {
                                themeData: {
                                    appBG: "#c4d8dd",
                                    appBG2: "#ffffff",
                                    defaultColor: "#00FFD1",
                                    defaultColor2: "#00d9ff",
                                    textColor: "#000000",
                                },
                            },
                        },
                        id: "10",
                    },
                    {
                        name: "Drake",
                        description: '',
                        profilePicture: images.defaultProfile,
                        followers: [],
                        following: [],
                        location: "----",
                        loginDetails: {
                            email: '',
                            password: '',
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
                            settings: {
                                themeData: {
                                    appBG: "#c4d8dd",
                                    appBG2: "#ffffff",
                                    defaultColor: "#00FFD1",
                                    defaultColor2: "#00d9ff",
                                    textColor: "#000000",
                                },
                            },
                        },
                        id: "11",
                    },
                    {
                        name: "Jr",
                        description: '',
                        profilePicture: images.defaultProfile,
                        followers: [],
                        following: [],
                        location: "----",
                        loginDetails: {
                            email: '',
                            password: '',
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
                            settings: {
                                themeData: {
                                    appBG: "#c4d8dd",
                                    appBG2: "#ffffff",
                                    defaultColor: "#00FFD1",
                                    defaultColor2: "#00d9ff",
                                    textColor: "#000000",
                                },
                            },
                        },
                        id: "12",
                    }
                ],
            },
            list: [],
        },
        appInfo: {
            settings: {
                themeData: {
                    appBG: "#c4d8dd",
                    appBG2: "#ffffff",
                    defaultColor: "#00FFD1",
                    defaultColor2: "#00d9ff",
                    textColor: "#000000",
                },
            },
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
    },
    {
        name: "Joe",
        description: '',
        profilePicture: images.defaultProfile,
        followers: [],
        following: [],
        location: "----",
        loginDetails: {
            email: '',
            password: '',
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
            settings: {
                themeData: {
                    appBG: "#c4d8dd",
                    appBG2: "#ffffff",
                    defaultColor: "#00FFD1",
                    defaultColor2: "#00d9ff",
                    textColor: "#000000",
                },
            },
        },
        id: "4",
    },
    {
        name: "Dawn",
        description: '',
        profilePicture: images.defaultProfile,
        followers: [],
        following: [],
        location: "----",
        loginDetails: {
            email: '',
            password: '',
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
            settings: {
                themeData: {
                    appBG: "#c4d8dd",
                    appBG2: "#ffffff",
                    defaultColor: "#00FFD1",
                    defaultColor2: "#00d9ff",
                    textColor: "#000000",
                },
            },
        },
        id: "5",
    },
    {
        name: "Max",
        description: '',
        profilePicture: images.defaultProfile,
        followers: [],
        following: [],
        location: "----",
        loginDetails: {
            email: '',
            password: '',
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
            settings: {
                themeData: {
                    appBG: "#c4d8dd",
                    appBG2: "#ffffff",
                    defaultColor: "#00FFD1",
                    defaultColor2: "#00d9ff",
                    textColor: "#000000",
                },
            },
        },
        id: "6",
    },
    {
        name: "Zoey",
        description: '',
        profilePicture: images.defaultProfile,
        followers: [],
        following: [],
        location: "----",
        loginDetails: {
            email: '',
            password: '',
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
            settings: {
                themeData: {
                    appBG: "#c4d8dd",
                    appBG2: "#ffffff",
                    defaultColor: "#00FFD1",
                    defaultColor2: "#00d9ff",
                    textColor: "#000000",
                },
            },
        },
        id: "7",
    },
    {
        name: "Jade",
        description: '',
        profilePicture: images.defaultProfile,
        followers: [],
        following: [],
        location: "----",
        loginDetails: {
            email: '',
            password: '',
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
            settings: {
                themeData: {
                    appBG: "#c4d8dd",
                    appBG2: "#ffffff",
                    defaultColor: "#00FFD1",
                    defaultColor2: "#00d9ff",
                    textColor: "#000000",
                },
            },
        },
        id: "8",
    },
    {
        name: "Bob",
        description: '',
        profilePicture: images.defaultProfile,
        followers: [],
        following: [],
        location: "----",
        loginDetails: {
            email: '',
            password: '',
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
            settings: {
                themeData: {
                    appBG: "#c4d8dd",
                    appBG2: "#ffffff",
                    defaultColor: "#00FFD1",
                    defaultColor2: "#00d9ff",
                    textColor: "#000000",
                },
            },
        },
        id: "9",
    },
    {
        name: "Silly",
        description: '',
        profilePicture: images.defaultProfile,
        followers: [],
        following: [],
        location: "----",
        loginDetails: {
            email: '',
            password: '',
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
            settings: {
                themeData: {
                    appBG: "#c4d8dd",
                    appBG2: "#ffffff",
                    defaultColor: "#00FFD1",
                    defaultColor2: "#00d9ff",
                    textColor: "#000000",
                },
            },
        },
        id: "10",
    },
    {
        name: "Drake",
        description: '',
        profilePicture: images.defaultProfile,
        followers: [],
        following: [],
        location: "----",
        loginDetails: {
            email: '',
            password: '',
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
            settings: {
                themeData: {
                    appBG: "#c4d8dd",
                    appBG2: "#ffffff",
                    defaultColor: "#00FFD1",
                    defaultColor2: "#00d9ff",
                    textColor: "#000000",
                },
            },
        },
        id: "11",
    },
    {
        name: "Jr",
        description: '',
        profilePicture: images.defaultProfile,
        followers: [],
        following: [],
        location: "----",
        loginDetails: {
            email: '',
            password: '',
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
            settings: {
                themeData: {
                    appBG: "#c4d8dd",
                    appBG2: "#ffffff",
                    defaultColor: "#00FFD1",
                    defaultColor2: "#00d9ff",
                    textColor: "#000000",
                },
            },
        },
        id: "12",
    },
];

//Category
export let testCategories = [
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