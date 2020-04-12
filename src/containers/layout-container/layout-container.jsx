import * as React from 'react';
import './layout-container.css';

export const LayoutContainer = ({
    children
}) => {
    return (
        <div className={ 'layoutContainer' }>
            { children }
        </div>
    );
}