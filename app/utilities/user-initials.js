
const _getFirstLetter = (data) => (data.substr(0, 1));

export const getUserInitials = (first, last) => (_getFirstLetter(first) + _getFirstLetter(last));
