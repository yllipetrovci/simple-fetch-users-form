import React, { useEffect, memo, useMemo } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { FETCH_STATUSES } from '../constants/statuses';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import User from './user';
import { COLORS } from '../constants/colors';

const Users = ({ isDarkMode, status, users, onEndReached, onPressUser }) => {
    const opacityAnimation = useSharedValue(0);

    const renderItem = ({ item }) => (
        <User isDarkMode={isDarkMode} onPress={(user) => { onPressUser(user) }} item={item} />
    );

    const statusesAnimation = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacityAnimation.value, {
                duration: 1300
            })
        };
    });

    useEffect(() => {
        opacityAnimation.value = 1;
    }, []);

    const currentColor = useMemo(() => isDarkMode ? COLORS.pure.WHITE : COLORS.pure.BLACK, [isDarkMode]);

    return (
        <>
            {status === FETCH_STATUSES.PENDING &&
                <Animated.View style={[styles.singleMessageContainer, statusesAnimation]}>
                    <Text style={{ ...styles.singleMessageText, color: currentColor }}>Loading...</Text>
                </Animated.View>
            }
            {status === FETCH_STATUSES.FAILED &&
                <Animated.View style={[styles.singleMessageContainer, statusesAnimation]}>
                    <Text style={{ ...styles.singleMessageText, color: 'red' }}>Failed to fetch Users</Text>
                </Animated.View>
            }
            {status === FETCH_STATUSES.SUCCESS &&
                <Animated.View style={[statusesAnimation]}>
                    {!!users?.length ? <FlatList
                        data={users}
                        renderItem={renderItem}
                        keyExtractor={item => item.login.uuid}
                        onEndReached={onEndReached}
                    /> :
                        <View style={styles.singleMessageContainer}>
                            <Text style={{ ...styles.singleMessageText, color: currentColor }}>Users Not Found</Text>
                        </View>}
                </Animated.View>
            }
        </>
    )
};

const styles = StyleSheet.create({
    singleMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    singleMessageText: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default memo(Users);