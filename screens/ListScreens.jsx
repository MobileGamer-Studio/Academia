import react, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList } from 'react-native';
import { colors, sizes, images } from '../constants/Data';
import { Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { Header, Loading, Button, ProductHorizontal, ProductVertical, SectionHeader, SearchBar} from '../constants/Components';

const theme = colors.lightTheme;
function ListScreens({route, navigation}) {
    const userId = route.params.id;
    const list = route.params.list;
    const [user, set_user] = useState({})
    const [users, set_users] = useState([])
    const [products, setProducts] = useState([])
    const [optionsAct, setOptionsAct] = useState(false)
    const [loading, set_loading] = useState(true)

    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            set_users(data)
        });

        const productsSub = onSnapshot(collection(firestore, "Products"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            setProducts(data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (item) => {
            set_user(item.data())

            if (user !== {}) {
                set_loading(false)
            }

        });
    });

        
    if (loading === true) {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.bgColor}
                />
                <Header method={() => navigation.goBack()} text={'Cart'} />
                <Loading />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Header method={() => navigation.goBack()} text={'Cart'} />
                <SearchBar />

                <View>

                </View>
            </View>
        )
    }
}

export default ListScreens;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor
    },
})