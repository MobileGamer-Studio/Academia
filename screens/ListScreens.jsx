import react, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList } from 'react-native';
import { colors, sizes, images } from '../constants/Data';
import { Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { Header, Loading, Button, ProductHorizontal, ProductVertical, SectionHeader, SearchBar} from '../constants/Components';

const theme = colors.lightTheme;
function ListScreens({route, navigation}) {
    const userId = route.params.id;
    const list = route.params.list;
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [optionsAct, setOptionsAct] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const usersSub = onSnapshot(collection(firestore, "Users"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            setUsers(data)
        });

        const productsSub = onSnapshot(collection(firestore, "Products"), querySnapshot => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            setProducts(data)
        });

        const userSub = onSnapshot(doc(firestore, "Users", userId), (item) => {
            setUser(item.data())

            if (user !== {}) {
                setLoading(false)
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