import React from 'react';
import { Table, TableRow, TableHead, TableBody, TableCell, Typography } from '@material-ui/core';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';

import moment from 'moment'

import TideTimeTableCell from './TideTimeTableCell/TideTimeTableCell'
import TideTimesDateColumnHeader from './TideTimesDateColumnHeader/TideTimesDateColumnHeader'

import classNames from 'classnames';


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
        textColor: 'red',
    }
});

function isToday(date) {
    return (date.isSame(moment(), 'day'));
}

const TideTimesGrid = (props) => {

    const { classes } = props;

    const dates = [];

    if (!props['data']) {
        return (<Typography variant="h6">No Data for Site</Typography>)
    }

    Object.keys(props['data']).forEach((dateStr, index) => {
        var theDate = moment(dateStr, "YYYYMMDD");
        dates.push(theDate);
    });

    const transformedData = [[], [], [], []];
    for (let x in [0, 1, 2, 3]) {
        Object.keys(props['data']).forEach((dateStr) => {

            const timesData = props['data'][dateStr];
            const isFuture = moment(dateStr, "YYYYMMDD").isAfter(moment());
            const isToday = moment(dateStr, "YYYYMMDD").isSame(moment(), 'day');
            if (timesData) {
                if (timesData[x]) {
                    timesData[x].isFuture = isFuture;
                    timesData[x].isToday = isToday;
                } else {
                    timesData[x] = { isFuture: isFuture, isToday: isToday }
                }
            }
            transformedData[x].push(timesData[x]);

        });
    }

    return (

        <Table className={classes.table}>
            <TableHead className={classes.columnHeader}>
                <TableRow>
                    { // Header
                        dates.map((date) => {
                            var thisClassName = (isToday(date)) ? classes.todayColumnHeader : classes.inherit;
                            return (
                                <TableCell key={date} className={classNames(thisClassName)}>
                                    <TideTimesDateColumnHeader theDate={date} />
                                </TableCell>
                            );
                        })
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                { // Each row
                    transformedData.map((data, indexOuter) => {
                        return (
                            <TableRow key={indexOuter}>
                                {
                                    data.map((timeData, indexInner) => {
                                        //console.log(timeData);
                                        var clsNames = [];
                                        if (timeData) {
                                            if (timeData.isLow) {
                                                clsNames.push(classes.tideLevelLow);
                                                if (timeData.isToday) {
                                                    clsNames.push(classes.todayColumnTideLevelLow);
                                                }
                                            } else {
                                                clsNames.push(classes.tideLevelHigh);
                                                if (timeData.isToday) {
                                                    clsNames.push(classes.todayColumnTideLevelHigh);
                                                }
                                            }
                                            if (timeData.isFuture) {
                                                clsNames.push(classes.timeInFuture);
                                            }
                                        }
                                        return (
                                            <TableCell
                                                key={indexOuter + indexInner}
                                                className={classNames(clsNames)}
                                            >
                                                <TideTimeTableCell tideTimeDate={timeData} />
                                            </TableCell>
                                        );
                                    })
                                }
                            </TableRow>
                        );
                    })
                }
            </TableBody>
        </Table>
    )
}

TideTimesGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TideTimesGrid);
