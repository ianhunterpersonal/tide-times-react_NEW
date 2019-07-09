import React, { Component } from 'react';

/*
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AppBar } from "@material-ui/core";
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { FormattedHTMLMessage } from 'react-intl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
*/

import { withStyles } from '@material-ui/core/styles';

import { withRouter } from 'react-router-dom';

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    root: {
        background: 'yellow',
        color: 'red'
    }
};

class Layout extends Component {

    state = {
        drawIsOpen: false,
        siteId: null,
    }

    openTheDrawer = () => {
        this.setState({ drawIsOpen: true })
    }

    closeTheDrawer = () => {
        this.setState({ drawIsOpen: false })
    }

    sideButtonClicked(newSiteId) {
        this.props.history.push("/?siteId=" + newSiteId);
    }

    render() {

        // const { classes } = this.props;

        // const sideList = (
        //     <div className={classes.list}>
        //         <List>
        //             {['salcombe', 'exmouth-dock', 'newquay'].map((text, index) => (
        //                 <ListItem button key={text}>
        //                     <button
        //                         type="button"
        //                         onClick={() => {this.sideButtonClicked(text)}}
        //                     >
        //                         {text}
        //                     </button>
        //                 </ListItem>
        //             ))}
        //         </List>
        //     </div>
        // );

        return (
            <div className={styles.root}>

                {/* <AppBar position="sticky">
                    <Toolbar>
                        {/* <IconButton className={styles.menuButton} color="inherit" aria-label="Menu" onClick={this.openTheDrawer}>
                            <MenuIcon />
                        </IconButton> }
                        <Typography variant="h6" color="inherit" className={styles.grow}>
                            <FormattedHTMLMessage id="App.title" defaultMessage="App.title" />
                        </Typography>
                    </Toolbar>
                </AppBar> */}

                {this.props.children}

                {/* <Drawer
                    open={this.state.drawIsOpen}
                    onClose={this.closeTheDrawer}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.closeTheDrawer}
                        onKeyDown={this.closeTheDrawer}
                    >
                        {sideList}
                    </div>
                </Drawer> */}

            </div>
        );
    }
}

export default withRouter((withStyles(styles)(Layout)));