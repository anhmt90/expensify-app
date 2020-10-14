import React from 'react';
//BrowserRouter is used once to create a router, Route is then used for each URL
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import DashboardPage from '../components/DashboardPage';
import Header from '../components/Header';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

// BrowserRouter can have either 0 or 1 child only -> use div or Switch
// Route tells reactor router that whenever it matches this path it should render*
// `path` is optional
const AppRouter = () => (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route path="/" component={DashboardPage} exact={true} /> 
            <Route path="/create" component={AddExpensePage} />
            <Route path="/edit/:id" component={EditExpensePage} />
            <Route path="/help" component={HelpPage} />
            <Route component={NotFoundPage}/>  
        </Switch>
    </BrowserRouter>
);

export default AppRouter;