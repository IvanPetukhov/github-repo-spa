import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { RepoList } from './containers/repo-list'
import { Repo } from './containers/repo';
import { Root } from './containers/root';
import { createBrowserHistory } from 'history';
import configureStore from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Router history={history}>
            <Root>
                <Switch>
                    <Route
                        path='/'
                        exact
                        component={ RepoList }
                    />
                    <Route
                        path='/:owner/:repoName'
                        component={ Repo }
                    />
                    <Redirect to="/" />
                </Switch>
            </Root>
        </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
