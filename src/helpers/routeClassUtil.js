export const applyRouteClass = () => {
    removeClassFromSelector('#root', 'with-route-[^ ]*');
    let newLocation = window.location.pathname.toString().replace(/\//gi, '');
    if(newLocation !== undefined && newLocation.length > 0) {
        addClassToSelector('#root', 'with-route-' + newLocation);
    }
}

export const addClassToSelector = (selector, addClassName) => {
    let elements = Array.prototype.slice.call(document.querySelectorAll(selector));
    elements.map((e) => {
        e.className += ' ' + addClassName;
        return false;
    });
};

export const removeClassFromSelector = (selector, className) => {
    let elements = Array.prototype.slice.call(document.querySelectorAll(selector));
    elements.map((e) => {
        if(e.className !== undefined && e.className.length > 0) {
            e.className = e.className.replace(new RegExp(className, 'gi'), '');
        }
        return false;
    });
};
