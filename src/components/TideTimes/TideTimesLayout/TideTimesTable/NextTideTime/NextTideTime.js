import React from 'react';

import { Typography } from '@material-ui/core';

import moment from 'moment'

class NextTideTime extends React.Component {

    state = {
        tideInfo: null
    }

    componentDidMount() {

        console.log("NextTideTime.componentDidMount()")
        console.log(this.props);

        var now = moment();

        var nextHighTime = null; //moment().add(1, 'hour');
        var nextLowTime = null; //moment().add(2, 'hour');

        var tideMoments = [];
        Object.keys(this.props.data).forEach((dateStr) => {
            this.props.data[dateStr].forEach((tideInfo) => {
                var tideTimeMoment = moment(dateStr + " " + tideInfo.time, 'YYYYMMDD hh:mm');
                tideMoments.push({ time: tideTimeMoment, isLow: tideInfo.isLow });
            });
        });

        tideMoments.some((tideMoment, index) => {
            if (index > 0) {
                if (now.isBetween(tideMoments[index - 1].time, tideMoment.time)) {
                    if (tideMoment.isLow) {
                        nextLowTime = tideMoment.time;
                        nextHighTime = tideMoments[index + 1].time;
                    } else {
                        nextHighTime = tideMoment.time;
                        nextLowTime = tideMoments[index + 1].time;
                    }
                    return true;
                }
            }
            return false;
        });

        this.setState(
            {
                tideInfo: this.props.data,
                nextHighTime: (nextHighTime) ? nextHighTime : null,
                nextLowTime: (nextLowTime) ? nextLowTime : null,
            }
        );

    }

    render() {

        console.log("NextTideTime.render()")
        console.log(this.state);
        if (!this.state.tideInfo) return null;

        var now = moment();
        var nextHighMoment = this.state.nextHighTime;
        var nextLowMoment = this.state.nextLowTime;

        var durationToNextHigh = nextHighMoment ? moment.duration(nextHighMoment.diff(now)) : moment.duration();
        var durationToNextLow = nextLowMoment ? moment.duration(nextLowMoment.diff(now)) : moment.duration();

        var highTideFirst = (
            <div>
                <Typography variant="body1">
                    Next High Tide : @ {
                        (nextHighMoment) ?
                            nextHighMoment.format("HH:mm") + " (in " + durationToNextHigh.get('hours') + "hr " + durationToNextHigh.get('minutes') + "min)" :
                            'N/A'
                    }
                </Typography>
                <Typography variant="body1">
                    Next Low Tide : @ {
                        (nextLowMoment) ?
                            nextLowMoment.format("HH:mm") + " (in " + durationToNextLow.get('hours') + "hr " + durationToNextLow.get('minutes') + "min)" :
                            'N/A'
                    }
                </Typography>
            </div>
        );

        var lowTideFirst = (
            <div>
                <Typography variant="body1">
                    Next Low Tide : @ {
                        (nextLowMoment) ?
                            nextLowMoment.format("HH:mm") + " (in " + durationToNextLow.get('hours') + "hr " + durationToNextLow.get('minutes') + "min)" :
                            'N/A'
                    }
                </Typography>
                <Typography variant="body1">
                    Next High Tide : @ {
                        (nextHighMoment) ?
                            nextHighMoment.format("HH:mm") + " (in " + durationToNextHigh.get('hours') + "hr " + durationToNextHigh.get('minutes') + "min)" :
                            'N/A'
                    }
                </Typography>
            </div>
        );

        return (durationToNextHigh.asMilliseconds() < durationToNextLow.asMilliseconds()) ? highTideFirst : lowTideFirst;

    }

}

export default NextTideTime;