import React from "react";
const DashboardContext = React.createContext();

class DashboardProvider extends React.Component {
  state = {
    detailsShown: false,
    dashboardDetail: "",
  };

  setDetailsShown = (detailsShown) => {
    this.setState({ detailsShown });
  };

  setDashboardDetails = (dashboardDetail) => {
    this.setState({ dashboardDetail });
  };

  render() {
    return (
      <DashboardContext.Provider
        values={{
          detailsShown: this.state.detailsShown,
          dashboardDetail: this.state.dashboardDetail,
        }}
      ></DashboardContext.Provider>
    );
  }
}

export { DashboardProvider, DashboardContext };
