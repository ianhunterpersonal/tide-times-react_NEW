import React, { Component } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import { injectIntl, FormattedMessage } from "react-intl";
import Typography from "@material-ui/core/Typography";
import queryString from "query-string";
import TideTimesLayout from "./TideTimesLayout/TideTimesLayout";

import moment from "moment";

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

class TideTimes extends Component {
  state = {
    loading: false,
    siteName: null,
    data: null
  };

  constructor(props) {
    super(props);

    console.log("TideTimes.constructor()");

    this.todayStr = moment()
      .format("YYYYMMDD")
      .toString();
    this.yesterdayStr = moment()
      .subtract(1, "day")
      .format("YYYYMMDD")
      .toString();
    this.tomorrowStr = moment()
      .add(1, "day")
      .format("YYYYMMDD")
      .toString();

    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    console.log("TideTimes.componentDidMount()");
    console.log(this.props);
    this.loadData(
      TideTimes.getSiteNameFromProps(this.props),
      [this.yesterdayStr, this.todayStr, this.tomorrowStr].join(",")
    );
  }

  componentDidUpdate() {
    // (prevProps, prevState)
    console.log("TideTimes.componentDidUpdate()");
    if (this.state.data === null) {
      this.loadData(
        this.state.siteName,
        [this.yesterdayStr, this.todayStr, this.tomorrowStr].join(",")
      );
    }
  }

  static getSiteNameFromProps(props) {
    const values = queryString.parse("/" + props.location.search);
    return values["siteId"] ? values["siteId"] : values["/?siteId"];
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("TideTimes.getDerivedStateFromProps()");
    var newSiteName = TideTimes.getSiteNameFromProps(nextProps);
    if (prevState.siteName !== newSiteName) {
      return {
        siteName: newSiteName,
        data: null,
        loading: true
      };
    }
    return null; // No state update necessary
  }

  setHighLowFlags(dataObj) {
    Object.keys(dataObj).forEach(siteId => {
      Object.keys(dataObj[siteId]).forEach(date => {
        var times = dataObj[siteId][date];
        var startLow = times[0]["height"] < times[1]["height"];
        times.forEach(times => {
          times["isLow"] = startLow;
          startLow = !startLow;
        });
      });
    });
  }

  decorateTideTimes(dataObj) {
    this.setHighLowFlags(dataObj);
  }

  loadData(siteIdCsv, dateStrCsv) {
    siteIdCsv = siteIdCsv ? siteIdCsv : "salcombe";
    dateStrCsv = dateStrCsv ? dateStrCsv : dateFormat(new Date(), "yyyymmdd");
    console.log(
      "TideTimes.loadData() siteId = " + siteIdCsv + " For " + dateStrCsv
    );
    axios
      .get(
        "https://opalescent-radiator.glitch.me?locationIds=" +
          siteIdCsv +
          "&dates=" +
          dateStrCsv,
        { crossdomain: true }
      )
      .then(response => {
        const jsonFromServer = response.data;
        this.decorateTideTimes(response.data["data"]);
        console.log(jsonFromServer);
        this.setState(jsonFromServer);
        this.setState({ loading: false });
      })
      .catch(error => {
        console.error("error: ", error);
        this.setState({ error: error });
      });
  }

  render() {
    console.log("TideTimes.render()");
    console.log(this.props);
    console.log(this.state);

    const { loading, error, data } = this.state;

    if (loading) {
      return (
        <Typography variant="h3">
          <FormattedMessage id="App.error.loading" />
        </Typography>
      );
    }

    if (!data || isEmpty(data)) {
      return (
        <Typography variant="h3">
          <FormattedMessage id="App.error.no_data_avail" />
        </Typography>
      );
    }

    if (error) {
      return (
        <Typography variant="h4">
          There was an error loading the repos.{" "}
          <button onClick={this.loadData}>Try again</button>
        </Typography>
      );
    }

    return (
      <TideTimesLayout
        key={this.props.location.pathname + this.props.location.search}
        siteData={this.state.data}
      />
    );
  }
}

export default injectIntl(TideTimes);
