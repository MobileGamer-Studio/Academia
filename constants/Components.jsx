import React from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {colors, images, sizes} from "./Data";
import {MaterialIcons} from "@expo/vector-icons";


const theme = colors.lightTheme;    

//Buttons, Input, Images
export const Button = (props) => {

    return(
        <TouchableOpacity style = {props.style} onPress = {props.method}>
            <View style = {{flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style = {props.textStyle}>{props.text}</Text>
                <MaterialIcons name={props.icon} size={props.iconSize} color={props.iconColor} style = {{marginHorizontal: 5}}/>
            </View>
        </TouchableOpacity>
    );
}

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
                    source={{uri: props.image}}
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

export const InfoInput = (props) => {
    return (
        <View>
            <TextInput
                style={{
                    borderRadius: sizes.ExtraSmall,
                    borderWidth: 1,
                    margin: sizes.ExtraSmall,
                    paddingHorizontal: sizes.Small,
                    backgroundColor: theme.bgColor,
                    height: 50,
                    width: 350,
                    borderColor: theme.outline,
                }}
                onChangeText={props.method}
                placeholder={props.placeholder}
                value={props.value}
                keyboardType={props.keyboardType}
            />
        </View>
    );
}

export const SearchBar = (props) => {
    return (
        <View>
            <TextInput
                onChangeText={props.method}
                style={{
                    borderRadius: sizes.ExtraLarge,
                    marginHorizontal: 2.5,
                    paddingHorizontal: sizes.Small,
                    backgroundColor: theme.bgColor,
                    height: 40,
                    borderColor: theme.color2,
                    borderWidth: 1,
                }}
                placeholder="snacks, assignments, stationaries..."
                value = {props.value}
            />
        </View>
    );
}

export const ProfilePicture = (props) => {
    return (
        <View
            style={{
                borderRadius: sizes.ExtraLarge,
                backgroundColor: props.color,
                height: props.height,
                width: props.width,
                alignItems: "center",
            }}
        >
            <View style={{
                height: props.height,
                width: props.width,
                alignItems: "center",
            }}>
                <Image
                    source={{ uri: props.image }}
                    style={{
                        height: props.height,
                        width: props.width,
                        flex: 1,
                        borderRadius: sizes.ExtraLarge,
                    }}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
}

//Products and Users
export function ProductHorizontal(props) {
    return (
        <TouchableOpacity style={{
            backgroundColor: theme.bgColor,
            borderRadius: sizes.ExtraSmall,
            flexDirection: 'row',
            margin: 5,
            elevation: 2,
            width: 250,
        }}

            onPress={props.method}>
            <View style={{
                height: 100,
                width: 100,
                alignSelf: "center",
                alignItems: "center",
                backgroundColor: theme.bgColor,
                borderRadius: sizes.ExtraSmall,
                margin: 5,
                padding: 5,
            }}>
                <Image
                    style={{
                        flex: 1,
                        height: 70,
                        width: 70,
                    }}
                    resizeMode="contain"
                    source={{ uri: props.image }} />
            </View>
            <View style={{
                marginHorizontal: 10,
                marginVertical: 5,
            }}>
                {
                    props.title.length < 10 ? (
                        <Text style={{ fontSize: sizes.Small, color: theme.color2 }}>{props.title}</Text>
                    ) : (
                            <Text style={{ fontSize: sizes.Small, color: theme.color2 }}>{props.title.slice(0, 10) + '...'}</Text>
                    )
                }
                <Text style={{ color: theme.color2, fontSize: sizes.ExtraSmall }}>{props.rating + " star"}</Text>
                {
                    props.discount === 0 ? (
                        <View>
                            <Text style={{ color: theme.color2, fontSize: 12 }}>{props.price + ' Naira'}</Text>
                        </View>
                    ) : (
                        <View>
                                <Text style={{ color: theme.color2, fontSize: 12, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{props.price + ' Naira'}</Text>
                                <Text style={{ color: theme.color2, fontSize: 12 }}>{(props.price - (props.discount / 100 * props.price)) + ' Naira'}</Text>

                            <View style={{
                                backgroundColor: theme.color2,
                                alignItems: 'center',
                                borderRadius: sizes.ExtraSmall,
                                paddingHorizontal: 5,
                            }}>
                                <Text style={{color: theme.bgColor}}>{'-' + props.discount + '% discount'}</Text>
                            </View>
                        </View>
                    )
                }
            </View>
        </TouchableOpacity>
    )
}


export function ProductVertical(props) {
    return (
        <TouchableOpacity style={{
            backgroundColor: theme.bgColor,
            borderRadius: sizes.ExtraSmall,
            width: 150,
            height: 200,
            padding: 5,
            marginVertical: 5,
            marginHorizontal: 10,
            elevation: 1,
        }} onPress={props.method}>
            <View style={{
                height: 100,
                width: 100,
                alignSelf: "center",
                alignItems: "center",
            }}>
                <Image
                    style={{
                        flex: 1,
                        height: 70,
                        width: 70,
                    }}
                    resizeMode="contain"
                    source={{ uri: props.image }} />
            </View>
            <View style={{
                margin: 5,
                height: 80,
                justifyContent: "center",
            }}>
                {
                    props.title.length < 15 ? (
                        <Text style={{ fontSize: sizes.Small }}>{props.title}</Text>
                    ) : (
                        <Text style={{ fontSize: sizes.Small }}>{props.title.slice(0, 15) + '...'}</Text>
                    )
                }
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: sizes.ExtraSmall }}>{props.rating + " star"}</Text>
                    <Text style={{ fontSize: 12 }}>{props.price + ' Naira'}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


export const UserProfile = (props) => {
    const user = props.user
    return (
        <View style={styles.userProfile}>
            <TouchableOpacity
                onPress={props.method}
            >
                <ProfilePicture color={theme.bgColor} image={props.image} height = {100} width = {100}/>
            </TouchableOpacity>
            <View style={{
                alignItems: "center",
            }}>
                <Text style={{
                    fontSize: sizes.Medium,
                }}>{user.name}</Text>
                <Text>{user.followers.length + " followers"}</Text>
            </View>
            <View>
                <Button
                    style = {styles.button}
                    textStyle = {styles.textStyle}
                    method = {() => console.log("clicked")}
                    text = {"Follow"}
                />
            </View>
        </View>
    )
}


//Other Components
export const NavBar = (props) => {
  return(
      <View style={styles.navContainer}>
          <View style={styles.navBar} >
              <View style={styles.navItem}>
                  <TouchableOpacity
                      onPress={props.home}
                  >
                      <Image
                          source={images.icons.home}
                          style={styles.navImages}
                          resizeMode="contain"
                      />
                  </TouchableOpacity>
              </View>

              <View style={styles.navItem}>
                  <TouchableOpacity
                      onPress={props.search}
                  >
                      <Image
                          source={images.icons.search}
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
                          source={images.icons.add}
                          style={styles.navImages}
                          resizeMode="contain"
                      />
                  </TouchableOpacity>
              </View>

              <View style={styles.navItem}>
                  <TouchableOpacity
                      onPress={props.cart}
                  >
                      <Image
                          source={images.icons.cart}
                          style={styles.navImages}
                          resizeMode="contain"
                      />
                  </TouchableOpacity>
              </View>

              <View style = {styles.navItem}>
                  <TouchableOpacity
                      onPress={props.profile}  
                      style={{
                          backgroundColor: theme.bgColor,
                          borderRadius: sizes.ExtraLarge,
                          height: sizes.Large,
                          width: sizes.Large,
                      }}

                    onLongPress = {props.method}
                  >
                      <Image
                          source={{uri: props.image}}
                          style={{
                              height: sizes.Large,
                              width: sizes.Large,
                            borderRadius: sizes.ExtraLarge,
                          }}
                          resizeMode="contain"
                      />
                  </TouchableOpacity>
              </View>
          </View>
      </View>
  );
}

export function Header(props) {
    return(
        <View style = {styles.header}>
            <View style= {{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name="arrow-back-ios" size={24} color={theme.bgColor} style={{ marginLeft: 20, marginRight: 10 }} onPress={props.method} />
                <Text style={{ fontSize: 24, color: theme.bgColor }}>{props.text}</Text>
            </View>
        </View>
    )
}

export function Loading(props) {
    return(
        <View style={styles.loading}>
            <View style={{
                height: 300,
                width: 300,
                alignItems: "center",
            }}>
                <Image
                    source={images.loading}
                    style={{
                        height: 300,
                        width: 300,
                        flex: 1,
                    }}
                    resizeMode="contain"
                />
            </View>
            <ActivityIndicator size={sizes.ExtraLarge} color={theme.color} />
            <Text>{props.message}</Text>
        </View>
    )
}

//StyleSheets
const styles = StyleSheet.create({
    SearchBar: {
        borderRadius: sizes.ExtraSmall,
        borderWidth: 1,
        marginHorizontal: sizes.Small,
        paddingHorizontal: sizes.Small,
        backgroundColor: theme.bgColor,
        height: 40,
        borderColor: "transparent",
    },

    product_vertical: {
        flexDirection: "column",
        backgroundColor: theme.bgColor,
        padding: sizes.ExtraSmall,
        borderRadius: sizes.Medium,
        margin: sizes.Small,
        width: 150,
        justifyContent: "space-between",
        // borderRightWidth: 1,
        // borderLeftWidth: 1,
        // borderColor: colors.defaultBG4,
    },

    product_horizontal: {
        flexDirection: "row",
        backgroundColor: theme.bgColor,
        padding: sizes.ExtraSmall,
        borderRadius: sizes.Medium,
        margin: sizes.Small,
        width: 350,
        alignItems: 'center',
    },

    productCategory: {
        backgroundColor: theme.color,
        borderRadius: sizes.Medium,
        margin: sizes.ExtraSmall,
    },

    userProfile: {
        alignItems: "center",
        margin: sizes.Small,
        
    },

    navContainer: {
        position: "absolute",
        bottom: 0,
        alignItems: "center",
        alignSelf: "center",
        // elevation: 5,
    },

    navBar: {
        backgroundColor: theme.color,
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: "center",
        alignSelf: "center",
        paddingVertical: 7,
        width: "100%",
        borderTopLeftRadius: sizes.Large,
        borderTopRightRadius: sizes.Large,
    },

    navImages :{
        height: sizes.Large,
        width: sizes.Large,
        flex: 1,
        marginVertical: 5,
    },

    navItem: {

    },

    button: {
        borderRadius: sizes.ExtraLarge,
        padding: 5,
        backgroundColor: theme.bgColor,
        marginHorizontal: 5,
        marginTop: 5,
        width: 150,
        alignItems: "center",
    },

    textStyle: {
        fontSize: sizes.Medium,
    },

    header: {
        width: "100%",
        padding: 10,
        paddingTop: 40,
        backgroundColor: theme.color,
        justifyContent: 'flex-start',
        flexDirection: "row",
    },

    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.bgColor,
        width: "100%",
    }
})



