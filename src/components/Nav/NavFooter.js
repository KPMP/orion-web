import React, { Component } from 'react';

class NavFooter extends Component {
    render() {
        return (
            <div id="footer" className="fixed-bottom px-1 py-1">
                <div>
                <a className="text-light small"
                   href="https://kpmp.org" target="_blank"  rel="noopener noreferrer"
                >&copy; Cure Glomerulonephropathy Network</a>
                </div>
                <div>
                <a className="text-light small"
                   href="/privacy"
                >Privacy Statement</a>
                </div>
            </div>
        );
    }
}

export default NavFooter;