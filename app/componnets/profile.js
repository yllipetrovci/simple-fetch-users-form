import React, { useEffect, useState, memo } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import CustomInput from './custom-input';
import { COLORS } from '../constants/colors'
import { borderRadiusCalculation } from '../utilities/border-radius-calculation';

const Profile = ({ isDarkMode, user, onPressCloseModal }) => {
    const [borders] = useState(borderRadiusCalculation());
    const [windowWidth] = useState(Dimensions.get('window').width);
    const opacityAnimation = useSharedValue(0);
    const topAnimation = useSharedValue(0);
    const bottomAnimation = useSharedValue(-200);

    const avatarAnimationStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacityAnimation.value, {
                duration: 900
            }),
            top: withTiming(topAnimation.value, {
                duration: 1100
            })
        };
    });

    const inputsAnimation = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacityAnimation.value, {
                duration: 1300
            }),
            bottom: withTiming(bottomAnimation.value, {
                duration: 900
            })
        };
    });

    useEffect(() => {
        opacityAnimation.value = 1;
        topAnimation.value = -50;
        bottomAnimation.value = 0;
    }, []);

    return (
        <View style={[
            styles.container,
            { width: (windowWidth - 30) },
            borders.borderTop, borders.borderBottom, { backgroundColor: isDarkMode ? COLORS.pure.BLACK : COLORS.pure.WHITE }]}>
            <Animated.View style={avatarAnimationStyle}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
            </Animated.View>
            <View style={styles.header}>
                <View style={styles.space} />
                <Text style={{ ...styles.space, ...styles.profileTitle, color: isDarkMode ? COLORS.pure.WHITE : COLORS.pure.BLACK }}>Profile</Text>
                <TouchableOpacity style={{ ...styles.space, ...styles.buttonContainer }} onPress={() => { onPressCloseModal() }}>
                    <Image source={require('../assets/close.png')} style={{ tintColor: isDarkMode ? COLORS.pure.WHITE : COLORS.pure.BLACK }} />
                </TouchableOpacity>
            </View>
            <View style={styles.usernameContainer}>
                <Text style={[styles.username, { color: isDarkMode ? COLORS.pure.WHITE : COLORS.pure.BLACK }]}>{user.username}</Text>
            </View>
            <Animated.View style={[{ margin: 20, bottom: -200 }, inputsAnimation]}>
                <CustomInput isDarkMode={isDarkMode} value={user.username} lable="Full Name" />
                <CustomInput isDarkMode={isDarkMode} value={user.gender} lable="Gender" />
                <CustomInput isDarkMode={isDarkMode} value={user.dob} lable="Date of Birth" />
                <CustomInput isDarkMode={isDarkMode} value={user.email} lable="E-mail" />
                <CustomInput isDarkMode={isDarkMode} value={user.address} lable="Address" />
            </Animated.View>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        height: 500,
        marginTop: 140,
        marginLeft: 15,
        shadowColor: COLORS.pure.BLACK,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    header: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50
    },
    avatar: {
        borderWidth: 2,
        borderRadius: 50,
        borderColor: COLORS.pure.WHITE,
        position: 'absolute',
        left: 15,
        top: -50
    },
    space: {
        flex: 1
    },
    profileTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: COLORS.pure.WHITE,
        position: 'absolute',
        left: 15
    },
    buttonContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    usernameContainer: {
        marginTop: 5,
        marginLeft: 15,
        minWidth: 200
    },
    username: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'left',
        fontWeight: '500',
        width: 100,
        minWidth: 200
    }
});

export default memo(Profile);