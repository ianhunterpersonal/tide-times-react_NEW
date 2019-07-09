import React from 'react';
import { Typography } from '@material-ui/core';

import moment from 'moment'

import { withStyles } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import { injectIntl } from 'react-intl';

// call this function, passing-in your date
function formatDate( myDate, i18 ) {

    var fromNow = moment( myDate ).fromNow();

    // ensure the date is displayed with today and yesterday
    return moment( myDate ).calendar( null, {
        // when the date is closer, specify custom values
        lastWeek: '[Last] dddd',
        lastDay:  '[' + i18.formatMessage({id: 'App.text.yesterday'}) + ']',
        sameDay:  '[' + i18.formatMessage({id: 'App.text.today'}) + ']',
        nextDay:  '[' + i18.formatMessage({id: 'App.text.tomorrow'}) + ']',
        nextWeek: 'dddd',
        sameElse: function () { // when date is further away, use from-now 
            return "[" + fromNow + "]";
        }
    });

}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit,
        overflowX: 'auto',
    },
    table: {
        width: "100%",
        minWidth: 0,
        colWidth: '2rem',
        tableLayout: 'fixed',
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid'
    },
    tideLevelLow: {
        backgroundColor: blue[100],
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid'
    },
    tideLevelHigh: {
        backgroundColor: blue[200],
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        textColor: 'yellow'
    },
    columnHeader: {
        backgroundColor: 'orange',
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid'
    },
    todayColumnHeader: {
        backgroundColor: 'darkOrange',
        borderWidth: 2,
        borderColor: 'black',
        borderStyle: 'solid'
    },
    todayColumnTideLevelLow: {
        backgroundColor: blue[300],
        borderWidth: 2,
        borderColor: 'black',
        borderStyle: 'solid'
    },
    todayColumnTideLevelHigh: {
        backgroundColor: blue[500],
        borderWidth: 2,
        borderColor: 'black',
        borderStyle: 'solid'
    },
    timeInFuture: {
        backgroundColor: green[500],
        borderWidth: 2,
        borderColor: 'black',
        borderStyle: 'dashed'
    }
});

const TideTimesDataColumnHeader = (props) => { // A moment is passed here
    return ( <Typography variant="body1">{formatDate(props.theDate, props.intl)}</Typography> );
}
 
export default injectIntl(withStyles(styles)(TideTimesDataColumnHeader));
