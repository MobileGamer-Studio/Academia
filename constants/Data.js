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

    combination: [
        {
            1: '#0000FF',
            2: '#FF0000',
        },
        {
            1: '#00FF00',
            2: '#FFFF00',
        },

    ],


    //default colors
    defaultBG: "#c4d8dd",
    defaultBG2: "#f6f6f6",
    defaultBG3: "#f6e5e5",
    defaultBG4: "#00FFD1",
    defaultBG4_Selected: "#198B76",
    defaultTC: "black",

    //theme colors
    darkTheme: {
        name: 'dark',
        color: "#FF00D6",
        color2: "#BD00FF",
        bgColor: '#000',
        outline: "#D7D7D7",
        outline2: "#E4E4E4",
        outline3: "#F6F6F6",
        textColor: '#fff'
    },

    lightTheme: {
        name: 'light',
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
    academia_light: require("../images/Academia3.png"),
    academia_dark: require("../images/Academia5.png"),
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

export const currency = {
    rupee: "₹",
    dollar: "$",
    pound: "£",
    euro: "€",
    yen: "¥",
    yuan: "¥",
    won: "₩",
    bitcoin: "₿",
    ethereum: "Ξ",
    litecoin: "Ł",
    ripple: "XRP",
    tether: "USDT",
    bitcoinCash: "BCH",
    cardano: "ADA",
    stellar: "XLM",
    monero: "XMR",
    tron: "TRX",
    dash: "DASH",
    neo: "NEO",
    naira: "₦",
}



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
        amountSold: "0",
        info: {
            status: false,
            trial: false,
            lastPaymentDate: '',
            nextPaymentDate: '',
            bank: '',
        }
    },
    userInfo: {
        tags: [],
        cart: [],
        orders: [],
        liked: [],
        disliked: [],
        savedList: [],
        recentlyViewed: [],
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
        searchHistory: [],
        
    },
    appInfo: {
        settings: {
            theme: "light",
            notifications: true,
            location: true,
            language: "English",
            currency: currency.naira,
        },
    },
    chatList: [

    ],
    overallRating : 0,
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
    dislikes: 0,
    comments: [],
    discount: 0,
    views: [],
    id: "0",

}

export const Deal = {
    title: '',
    details: '',
    colors: {
        color1: '',
        color2: '',
    },
    tags: [],
    discount: 0,
    expiryDate: "dd/mm/yr",
    numAvailable: 0,
    id: "0",
}

export const Item = {
    product: '',
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

export const Comment = {
    user: '',
    comment: '',
    time: "mm:ss",
    likes: 0,
    id: "0",
}

export const Notification = {
    user: '',
    message: '',
    time: "mm:ss",
    id: "0",
}
