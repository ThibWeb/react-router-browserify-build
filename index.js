import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

const App = React.createClass({
  render() {
    return <div>Hello, React Router!</div>
  }
});

// This will get envified correctly.
window.alert(process.env.NODE_ENV !== 'production');

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('app'))
