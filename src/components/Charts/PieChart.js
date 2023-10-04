import React from "react";
import Chart from "react-google-charts";
import Skeleton from "react-loading-skeleton";

export const PieChart = ({data, title}) => {
    return (
        <Chart 
            chartType="PieChart" 
            width='500px'
            height='450px'
            loader={<Skeleton width='500px' height='450px' />}
            data={data}
            options={{
                title,
                is3D: true
            }}
        />
    );
}
