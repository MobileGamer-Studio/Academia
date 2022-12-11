import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { colors } from '../constants/Data';

const theme = colors.lightTheme;
function ChatListScreen(props) {
    return (
        <View style={styles.container}>

        </View>
    );
}

export default ChatListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor,
    }
})