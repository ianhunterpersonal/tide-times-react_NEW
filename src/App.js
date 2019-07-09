import React, { Component } from 'react';

import styles from './App.module.scss';

import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import orange from '@material-ui/core/colors/orange';

import { IntlProvider, addLocaleData, /* FormattedHTMLMessage */ } from "react-intl";

import messages from './messages';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import Layout from './hoc/Layout/Layout';
import TideTimes from './components/TideTimes/TideTimes';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

addLocaleData([...en, ...es]);

var locale = (navigator.languages && navigator.languages[0])
  || navigator.language
  || navigator.userLanguage
  || 'en-US';

// For testing
// locale = 'es-ES';

// const Home = (props) => {
//   console.log(props);
//   return (<h1>Home</h1>);
// }

class App extends Component {

  componentDidMount() {
    console.log("App.componentDidMount()")
  }

  componentDidUpdate(prevProps) {
    console.log("App.componentDidUpdate()")
  }

  componentWillReceiveProps(newProps) {
    console.log("App.componentWillReceiveProps()")
  }

  render() {

    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      palette: {
        primary: orange,
        background: {
          paper: "#ffffff",
          default: "#fafafa",
        }
      },
    });

    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <IntlProvider locale={locale} messages={messages[locale]}>
            <Router>
              <Layout>
                <Switch>
                  <Route path="/" exact component={TideTimes} />
                  <Route path="/?siteId=:siteId" exact component={TideTimes} />
                  <Route component={() => (<h1>No path in router</h1>)} /> {/* A default */}
                </Switch>
              </Layout>
            </Router>
          </IntlProvider>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

