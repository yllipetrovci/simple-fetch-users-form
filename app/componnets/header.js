import React, { memo, useMemo } from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS } from '../constants/colors';

const Header = ({ isDarkMode, title }) => {
    const currentColor = useMemo(() => isDarkMode ? COLORS.pure.WHITE : COLORS.pure.BLACK, [isDarkMode]);

    return (
        <View style={[styles.container]}>
            <View style={{ width: 100 }} />
            <Text style={[styles.title, { color: currentColor }]}>{title}</Text>
            <View style={{ width: 100, alignItems: 'flex-end', marginRight: 5 }}>
                <Image tintColor="#fff" source={require('../assets/search.png')} style={[styles.icon, { tintColor: currentColor }]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600"
    },
    icon: {
        justifyContent: 'flex-end',
        width: 20,
        height: 20
    }
});

export default memo(Header);
