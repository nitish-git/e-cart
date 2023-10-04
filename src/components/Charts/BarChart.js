import React from "react";
import Chart from "react-google-charts";
import Skeleton from 'react-loading-skeleton';

export const BarChart = ({data, title, horizontalAxisTitle,verticalAxisTitle}) => {
    return (
        <Chart 
            chartType="BarChart" 
            width='500px'
            height='450px'
            loader={<Skeleton width='500px' height='450px' />} 
            data={data}
            options={{
                title,
                chartArea: { width: '50%' },
                hAxis: {
                  title: horizontalAxisTitle,
                  minValue: 0,
                },
                vAxis: {
                  title: verticalAxisTitle,
                },
              }}
        />
    );
}
