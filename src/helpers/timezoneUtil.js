import dateFormat from 'dateformat';

export const getLocalDateString = (timestampString) => {
	return dateFormat(new Date(timestampString), 'yyyy-mm-dd', false);
}

export const getLocalTimeString = (timestampString) => {
	return dateFormat(new Date(timestampString), 'h:MM TT', false);
}