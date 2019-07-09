import React from 'react';

import { Typography } from '@material-ui/core';

const TideTime = ({ tideTimeDate }) => {

    var text = ((!tideTimeDate) || (!tideTimeDate.time)) ? "---" : tideTimeDate.time;

    return (<Typography variant="h6">{text}</Typography>);
}

export default TideTime;