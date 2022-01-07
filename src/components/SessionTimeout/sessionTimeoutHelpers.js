export const getSessionLength = (sessionStart) => {
    return Date.now() - sessionStart;
};

export const minutesToMilliseconds = (minutes) => {
    return minutes * 60 * 1000;
};

export const millisecondsToMinutes = (milliseconds) => {
    return (milliseconds / 60000);
};