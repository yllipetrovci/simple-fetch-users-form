
import { USER_BG_CIRCLE_COLORS } from '../constants/user-circle.colors';

export const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
    return `#${randomColor}`;
};

export const generateVariationOfColors = () => (USER_BG_CIRCLE_COLORS.get(Math.floor(Math.random()*7)));
