import React, { memo, useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getUserInitials } from '../utilities/user-initials';
import { generateVariationOfColors } from '../utilities/generate-colors';
import { COLORS } from '../constants/colors';
import { borderRadiusCalculation } from '../utilities/border-radius-calculation';

const User = ({ isDarkMode, item, onPress }) => {
    const [borders] = useState(borderRadiusCalculation());
    const randomColor = useMemo(() => generateVariationOfColors(), [item.login.uuid]);
    const meomizedCurrentColor = useMemo(() => isDarkMode ? COLORS.pure.WHITE : COLORS.pure.BLACK, [isDarkMode]);

    const onPressUser = useCallback(() => {
        const { login, location, picture, name } = item;
        const user = {
            avatar: picture?.medium,
            uuid: login?.uuid,
            username: login?.username,
            dob: new Date(item?.dob?.date).toDateString(),
            email: item?.email,
            fullName: `${name?.first} ${name?.last}`,
            gender: item?.gender,
            address: `${location?.country || ''}, ${location?.street?.name || ''}`
        };

        onPress(user);
    }, [item.login.uuid]);

    return (
        <View style={[styles.container, borders.borderBottom, borders.borderTop,
        { backgroundColor: isDarkMode ? COLORS.md.WHITE : COLORS.pure.WHITE },
        { borderColor: isDarkMode ? COLORS.md.WHITE : COLORS.md.BLACK }
        ]} onPress={onPress}>
            {!!item?.picture.thumbnail ?
                <Image style={styles.avatarImg} source={{ uri: item?.picture.thumbnail }} /> :
                <View style={[styles.avatarImg, { backgroundColor: randomColor }]}>
                    <Text style={styles.avatarInitials}>{getUserInitials(item?.name?.first, item?.name.last)}</Text>
                </View>}
            <View style={styles.detailsContainer}>
                <Text style={[styles.detailsContainerFullName, { color: meomizedCurrentColor }]}>
                    {item?.name?.title}. {item?.name?.first} {item?.name?.last}
                </Text>
                <Text style={[styles.detailsContainerPhone, { color: isDarkMode ? COLORS.sm.WHITE : COLORS.sm.BLACK }]}>{item?.phone}</Text>
            </View>
            <TouchableOpacity onPress={() => { onPressUser() }}>
                <Image source={require('../assets/arrow-right.png')} style={[styles.icon, { tintColor: meomizedCurrentColor }]} />
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
    },
    avatarImg: {
        width: 49,
        height: 49,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarInitials: {
        fontWeight: 'bold',
        fontSize: 18
    },
    detailsContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 20,
        width: '70%'
    },
    detailsContainerFullName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgb(60,64,73)'
    },
    detailsContainerPhone: {
        marginTop: 5,
    },
    icon: {
        width: 18,
        height: 18
    }
});

export default memo(User);