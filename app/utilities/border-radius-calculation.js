export const borderRadiusCalculation = () => {
    const radiusValue = 10;
    const borderBottom = { borderBottomEndRadius: radiusValue, borderBottomStartRadius: radiusValue };
    const borderTop = { borderTopEndRadius: radiusValue, borderTopStartRadius: radiusValue };
    return { borderBottom, borderTop }
};
