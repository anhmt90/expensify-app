import React from 'react';
/**
 * BrowserRouter is used once to create a router, Route is then used for each URL
 */
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

/**
 * Use the history library instead of buit-in browser history of BrowserRouter
 * to access to browser history everywhere, not only inside the Components registered
 * with react-router.
 * So, we'll change to use <Router></Router> instead of <BrowserRouter></BrowserRouter>
 * in order to use the `history` property. We also export history to use it in other files
 */
export const history = createBrowserHistory();

/**
 * BrowserRouter can have either 0 or 1 child only -> use div or Switch
 * Route tells reactor router that whenever it matches this path it should render
 * `path` is optional
 */
const AppRouter = () => (
    // <BrowserRouter>
    <Router history={history}>
        <Switch>
            <PublicRoute path="/" component={LoginPage} exact={true} />
            <PrivateRoute path="/dashboard" component={DashboardPage}/>
            <PrivateRoute path="/create" component={AddExpensePage} />
            <PrivateRoute path="/edit/:id" component={EditExpensePage} />
            <PublicRoute component={NotFoundPage} />
        </Switch>
    </Router>
    // </BrowserRouter>
);

export default AppRouter;