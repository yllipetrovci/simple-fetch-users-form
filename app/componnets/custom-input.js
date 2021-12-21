import React, { memo, useMemo } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants/colors';

const CustomInput = ({ isDarkMode, lable, value }) => {
    const currentColor = useMemo(() => isDarkMode ? COLORS.md.WHITE : 'rgb(136,137,151)', [isDarkMode]);
    
    return (
        <View style={styles.container}>
            <Text style={{ color: currentColor, marginBottom: 5 }}>{lable}</Text>
            <TextInput
                style={[styles.input, {
                    borderWidth: 1,
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgb(230,229,232)',
                    color: isDarkMode ? 'rgba(255,255,255,0.8)' : 'rgb(119,119,130)'
                }]}
                value={value}
                editable={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    input: {
        borderRadius: 5,
        height: 40,
        padding: 10,
        fontSize: 18,
    }
})
export default memo(CustomInput);