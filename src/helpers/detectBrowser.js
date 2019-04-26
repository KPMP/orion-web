import Bowser from "bowser";
import {toast} from "react-toastify";

toast.configure({
    autoClose: 10000,
    bodyClassName: 'text-dark'
});

const shouldDoPopup = () => {
    const browserName = Bowser.getParser(window.navigator.userAgent).getBrowserName();
    console.log('+++ shouldDoPopup.browserName: ', browserName);
    return browserName.toUpperCase().match("INTERNET EXPLORER");
}

const notifyIESupport = () => {
    toast("You may have a degraded experience while using Internet Explorer. After uploading a package, refresh your screen to see your latest upload.");
}

const detectIEAndNotify = () => {
    if(shouldDoPopup()) notifyIESupport();
}

export default detectIEAndNotify;