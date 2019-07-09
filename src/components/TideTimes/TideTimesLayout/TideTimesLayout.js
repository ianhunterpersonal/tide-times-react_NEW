import React from 'react';

import { withRouter } from 'react-router-dom';

import { Tab, Tabs, Typography, Paper } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import TideTimesTable from './TideTimesTable/TideTimesTable';
import NextTideTime from './TideTimesTable/NextTideTime/NextTideTime';

const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {
      borderBottom: '2px solid #e8e8e8',
    },
    tabsIndicator: {
      backgroundColor: 'orange', // '#1890ff',
      height: '2px'
    },
    tabRoot: {
      textTransform: 'initial',
      minWidth: 96,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing.unit,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        color: '#40a9ff',
        opacity: 1,
      },
      '&$tabSelected': {
        //color: '#1890ff',
        color: 'blue',
        backgroundColor : 'lightBlue',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: '#40a9ff',
      },
    },
    tabSelected: { },
    typography: {
      padding: theme.spacing.unit,
    },
  });

class TideTimesLayout extends React.Component {

    siteNames = {
        "salcombe": "Salcombe",
        "newquay": "Newquay",
        "exmouth-dock": "Exmouth",
    };

    state = {
        siteToDisplay: '',
        siteDate: {}
    }

    componentDidMount() {
        console.log(this.props);
        this.setState({ siteData: this.props.siteData, siteToDisplay: Object.keys(this.props.siteData)[0] });
    }

    componentWillReceiveProps(newProps) {
        //console.log(newProps);
        this.setState({ siteData: newProps.siteData, siteToDisplay: Object.keys(newProps.siteData)[0] });
    }

    handleTabChange = (event, site) => {
        if (this.mouseDownTstamp != null) {
            const diff = event.timeStamp - this.mouseDownTstamp;
            console.log("Diff = " + diff);
            if ((diff) > 1000) { // 1000 msecs
                event.stopPropagation();                
            } else {
                this.props.history.push("/?siteId=" + site);
            }
        }
        this.mouseDownTstamp = null;
    };

    handleMouseUp = (event) => {
        console.log("Mouse Up " + event.timeStamp);
    }

    handleMouseDown = (event) => {
        console.log("Mouse Down " + event.timeStamp);
        this.mouseDownTstamp = event.timeStamp;
    }

    mouseDownTstamp = null;

    render() {

        const { classes } = this.props;

        const { siteData, siteToDisplay } = this.state;

        if (!siteData) {
            return <Typography variant="h3">No Data</Typography>;
        }

        return (
            <div className={classes.root}>
                <Tabs value={siteToDisplay}
                    onChange={this.handleTabChange}
                    indicatorColor="secondary"
                    textColor="primary"
                    fullWidth
                    classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                >
                    {
                        Object.keys(this.siteNames).map((key, index) => {
                            return (<Tab
                                disableRipple label={this.siteNames[key]}
                                key={key}
                                value={key}
                                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                onMouseDown={this.handleMouseDown}
                                onMouseUp={this.handleMouseUp}
                            />);
                        })
                    }
                </Tabs>
                {
                    (siteToDisplay === '')
                        ? <div>Nothing to see</div>
                        : (
                        <Paper>
                            <TideTimesTable data={siteData[siteToDisplay]} />
                            <NextTideTime   data={siteData[Object.keys(siteData)[0]]} />
                        </Paper>)
                }
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(TideTimesLayout));