import React from "react";
import { PieChart } from "react-native-chart-kit";
import { SocialIcon } from "@rneui/base";

import CardComponent from "./CardComponent";

class PieChartComponent extends React.Component<any, any> {

  render() {
    const { data, loading } = this.props;

    if (loading) {
      return (
        <CardComponent height={220}>
          <SocialIcon loading={true} />
        </CardComponent>
      );
    } else {
      return (
        <CardComponent>
          <PieChart data={data.despesas}
                    width={360}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={"total"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
          />
        </CardComponent>
      );
    }
  }
}

const chartConfig = {
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

export default PieChartComponent;
