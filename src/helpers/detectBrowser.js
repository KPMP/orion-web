import Bowser from "bowser";
import {toast} from "react-toastify";

toast.configure();

const shouldDoPopup = () => {
    const browserName = Bowser.getParser(window.navigator.userAgent).getBrowserName();
    console.log('+++ shouldDoPopup.browserName: ', browserName);
    return browserName.toUpperCase().match("INTERNET EXPLORER");
}

const notifyIESupport = () => {
    toast("You may have a degraded experience while using IE; please consider using Chrome or Firefox.");
}

const detectIEAndNotify = () => {
    if(shouldDoPopup()) notifyIESupport();
}

export default detectIEAndNotify;