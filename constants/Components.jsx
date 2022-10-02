import React from 'react';
import {FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {colors, images, sizes} from "./Data"


export function RoundButton(props) {
    return (
        <TouchableOpacity
            style={{
                borderRadius: sizes.ExtraLarge,
                backgroundColor: props.color,
                height: props.height,
                width: props.width,
                alignItems: "center",
            }}
            onPress={props.method}
        >
            <View style={{
                height: props.height,
                width: props.width,
                alignItems: "center",
            }}>
                <Image
                    source={props.image}
                    style={{
                        height: props.height,
                        width: props.width,
                        flex: 1,
                        borderRadius: sizes.ExtraLarge,
                    }}
                    resizeMode="contain"
                />
            </View>
        </TouchableOpacity>
    );
}

export const ImageButton = (props) => {
    return (
        <TouchableOpacity

            onPress={props.method}
        >
            <View style={{
                height: props.height,
                width: props.width,
                alignItems: "center",
            }}>
                <Image
                    source={props.image}
                    style={{
                        height: props.height,
                        width: props.width,
                        flex: 1,
                    }}
                    resizeMode="contain"
                />
            </View>
        </TouchableOpacity>
    );
}

export const SearchBar = (props) => {
    return (
        <View>
            <TextInput
                onChangeText={props.method}
                style={{
                    borderRadius: sizes.ExtraSmall,
                    borderWidth: 1,
                    marginHorizontal: sizes.ExtraSmall,
                    paddingHorizontal: sizes.Small,
                    backgroundColor: colors.white,
                    height: 40,
                    borderColor: "transparent",
                }}
                placeholder="snacks, assignments, stationaries..."
            />
        </View>
    );
}

export const Header = ({navigation}) => {
    return (
        <View style={styles.header}>
            <View>

            </View>
        </View>
    );
}

export const ProfilePicture = (props) => {
    return (
        <View style={{
            backgroundColor: props.color,
            height: 100,
            width: 100,
            borderRadius: sizes.ExtraLarge,
            marginEnd: sizes.ExtraSmall,
            alignItems: "center",
            alignSelf: "center",
        }}>
            <Image
                source={props.image}
                style={{
                    height: 100,
                    width: 100,
                    flex: 1,
                    borderRadius: sizes.ExtraLarge,
                }}
                resizeMode="contain"
            />
        </View>
    );
}

export function ProductMax(props) {
    return (
        <TouchableOpacity
            style={styles.productMax}
            onPress={props.method}>
            <View styles={{
                flexDirection: "row",
                justifyContent: "space-between",
            }}>
                <Text style={{
                    fontSize: sizes.Medium,
                }}>{props.title}</Text>
                <Text style={{
                    fontSize: sizes.Small,
                }}>{props.price + " naira"}</Text>
            </View>
            <View style={{
                height: sizes.ExtraLarge,
                width: sizes.ExtraLarge,
                alignSelf: "center",
                justifyContent: "center",
            }}>
                <Image
                    style={{
                        flex: 1,
                        alignSelf: "center",
                    }}
                    resizeMode="contain"
                    source={props.image}/>
            </View>
            <View style={{
                justifyContent: "flex-end",
                marginTop: sizes.ExtraSmall,
            }}>
                <Text style={{
                    fontSize: sizes.ExtraSmall,
                }}>{"Sold by " + props.seller}</Text>
            </View>
        </TouchableOpacity>
    );
}

export const ProductMin = (props) => {
    return (
        <TouchableOpacity
            style={styles.productMin}
            onPress={props.method}
        >
            <View style={{
                borderRadius: sizes.ExtraLarge,
                height: 70,
                width: 70,
                backgroundColor: colors.defaultBG2,
                margin: sizes.ExtraSmall,
                alignItems: "center",

            }}>
                <Image
                    style={{
                        flex: 1,
                    }}
                    resizeMode="contain"
                    source={props.image}/>
            </View>
            <View style={{
                alignItems: "flex-start",
            }}>
                <Text style={{
                    fontSize: sizes.Medium,
                }}>{props.title}</Text>
                <Text style={{
                    fontSize: sizes.Small,
                }}>{props.price + " Naira"}</Text>
            </View>
        </TouchableOpacity>
    );
}

export const ProductCategory = (props) => {
    return (
        <TouchableOpacity
            style={styles.productCategory}
            onPress={props.method}>
            <View
                style={{
                    marginHorizontal: 10,
                    height: 25,
                }}
            >
                <Text style={{
                    color: colors.white,
                    fontSize: sizes.Small + 2,
                }}>{"#" + props.text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export function CartItem(props) {
    return (
        <View style={{
            elevation: sizes.ExtraSmall,
            marginVertical: sizes.ExtraSmall,
        }}>
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    backgroundColor: colors.white,
                    borderRadius: sizes.Small,
                    height: 150,
                    alignItems: 'center',
                    justifyContent: "flex-start",
                    padding: 5,
                }}

                onPress={props.method}
            >
                <View style={{
                    height: 100,
                    alignSelf: "center",
                    justifyContent: "center",
                }}>
                    <Image
                        style={{
                            flex: 1,
                            alignSelf: "center",
                        }}
                        resizeMode="contain"
                        source={props.image}/>
                </View>
                <View>
                    <Text>{props.title}</Text>
                    <Text>{props.description}</Text>
                </View>
                <View>
                    <TouchableOpacity style={{
                        backgroundColor: colors.grey,
                        padding: 5,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Text style={{
                            fontSize: sizes.Small,
                        }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: colors.black,
                        padding: 5,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Text style={{
                            color: colors.white,
                            fontSize: sizes.Small,
                        }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    )
}


export const UserProfileMin = (props) => {
    const user = props.user
    return (
        <View style={styles.userProfileMin}>
            <TouchableOpacity
                onPress={props.method}
            >
                <ProfilePicture color={colors.white} image={props.image}/>
            </TouchableOpacity>
            <View style={{
                alignItems: "center",
            }}>
                <Text style={{
                    fontSize: sizes.Medium,
                }}>{user.name}</Text>
                <Text>{user.followers + " followers"}</Text>
            </View>
            <View>
                <TouchableOpacity style={{
                    borderRadius: sizes.ExtraLarge,
                }}>

                </TouchableOpacity>
            </View>
        </View>
    )
}


export const SearchResult = (props) => {
    return (
        <View>
            <FlatList
                Vertical
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                data={props.data}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.white,

                            }}
                        >
                            <View style={{
                                height: 100,
                            }}>
                                <Image
                                    style={{
                                        flex: 1,
                                    }}
                                    resizeMode="contain"
                                    source={item.image}/>
                            </View>
                            <View>
                                <Text>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

export const NavBar = (props) => {
  return(
      <View style={styles.navBar} >
        <View style={styles.navItem}>
            <TouchableOpacity
                onPress={props.home}
            >
                <Image
                    source={images.home}
                    style={styles.navImages}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
        <View style={styles.navItem}>
            <TouchableOpacity
                onPress={props.add}
            >
                <Image
                    source={images.add}
                    style={styles.navImages}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
        <View style={styles.navItem}>
            <TouchableOpacity
                onPress={props.settings}
            >
                <Image
                    source={images.settings}
                    style={styles.navImages}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    SearchBar: {
        borderRadius: sizes.ExtraSmall,
        borderWidth: 1,
        marginHorizontal: sizes.Small,
        paddingHorizontal: sizes.Small,
        backgroundColor: colors.white,
        height: 40,
        borderColor: "transparent",
    },

    productMax: {
        flexDirection: "column",
        backgroundColor: colors.white,
        padding: sizes.ExtraSmall,
        borderRadius: sizes.Medium,
        margin: sizes.Small,
        width: 150,
        justifyContent: "space-between"
    },

    productMin: {
        flexDirection: "row",
        backgroundColor: colors.white,
        padding: sizes.ExtraSmall,
        borderRadius: sizes.Medium,
        margin: sizes.Small,
        width: 350,
        alignItems: 'center',
    },

    productCategory: {
        backgroundColor: colors.defaultBG4,
        borderRadius: sizes.Medium,
        margin: sizes.ExtraSmall,
    },

    userProfileMin: {
        alignItems: "center",
        margin: sizes.Small,
    },

    navBar: {
        backgroundColor: colors.black,
        borderRadius: sizes.ExtraLarge,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        alignSelf: "flex-end"
    },

    navItem: {
        
    },

    navImages :{
        height: sizes.Small,
        width: sizes.Small,
        flex: 1,
    }

})



