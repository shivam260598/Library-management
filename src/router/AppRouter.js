import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../page-components/Home';
import './styles.css';
import Header from '../page-components/Header';
import BookList from '../page-components/BookList';
import MyCart from '../page-components/MyCart';
import AuthorList from '../page-components/AuthorList';
import Login from '../page-components/Login';

const AppRouter = () => {
  return (
    <BrowserRouter>
        <div className="main-content">
            <Header />

            <Switch>
                <Route component={Home} path="/home" exact={true} />
                <Route component={BookList} path="/books" />
                <Route component={AuthorList} path="/authors" />
                <Route component={MyCart} path="/my-cart" />
                <Route component={Login} path="/login" />
                <Route component={() => <Redirect to="/home" />} />
            </Switch>
        </div>
    </BrowserRouter>
  );
};

export default AppRouter;
