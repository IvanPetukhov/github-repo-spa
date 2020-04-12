import * as React from 'react';
import { Header } from '../../components/header';
import { LayoutContainer } from '../layout-container';
import './root.css';

export const Root = ({ children }) => {
    return (
        <div className={ 'root' }>
            <div className={ 'root__top' }>
                <Header />
            </div>
            <div className={ 'root__content' }>
                <LayoutContainer>
                    { children }
                </LayoutContainer>
            </div>
            {/*<div className={ 'root__bottom' }>*/}
            {/*    Bottom*/}
            {/*</div>*/}
        </div>
    );
};
