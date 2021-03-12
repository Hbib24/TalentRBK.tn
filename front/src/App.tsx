import React, { useEffect, useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AccountRegistration from './components/AccountRegistration';
import StudentList from './components/StudentList';
import CompanyList from './components/CompanyList';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className='App'>
          <Switch>
            <Route path='/' exact component={LoginForm} />
            <Route path='/admin/student/:offset' component={StudentList} />
            <Route path='/admin/company' component={CompanyList} />
            <Route path='/register/:user_id' component={AccountRegistration} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
