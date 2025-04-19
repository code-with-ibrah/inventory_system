import React from "react";
import Chart from "react-apexcharts";

interface Props {
    labels: string[];
    series: {
        name: string;
        data: number []
    }[]
}
const TlaChart: React.FC<Props> = ({ labels, series }) => {
    const options: ApexCharts.ApexOptions = {
        chart: {
            type: 'pie',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 5,
                borderRadiusApplication: 'end'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: labels
        },
        yaxis: {
            title: {
                text: 'Total'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: (val: any) => val
            }
        }
    }

    return  <Chart options={options} series={series} type="bar"/>
}

export default TlaChart
