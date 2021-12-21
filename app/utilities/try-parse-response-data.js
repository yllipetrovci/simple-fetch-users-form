export const tryParseResponseData = (data) => {
    if (!data) return data;

    if (typeof data === 'string' || data instanceof String) {
        try {
            const parsedData = JSON.parse(data);
            return parsedData;
        } 
        catch (error) {
            console.error('Cannot parse response body', error);
        };

        return data;
    };
};