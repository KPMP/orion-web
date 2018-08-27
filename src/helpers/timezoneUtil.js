import dateFormat from 'dateformat';

export const getLocalDateString = (timestampString) => {
	let ieFriendlyDate = getIEFriendlyDate(timestampString);
	return dateFormat(new Date(ieFriendlyDate), 'yyyy-mm-dd', false);
}

export const getLocalTimeString = (timestampString) => {
	let ieFriendlyDate = getIEFriendlyDate(timestampString);
	return dateFormat(new Date(ieFriendlyDate), 'h:MM TT', false);
}

export const getIEFriendlyDate = (timestampString) => {
	return timestampString.replace("+0000", "Z");
}