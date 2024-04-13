import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { stationData } from '../data/station';

const CrimeLineChart = () => {
    const [chartData] = useState({
        series: [
            {
                name: "Theft Cases",
                data: stationData.crimeRecord.map(data => data.theft_cases)
            },
            {
                name: "Assault Cases",
                data: stationData.crimeRecord.map(data => data.assult_cases) // Note: Corrected typo in 'assault'
            },
            {
                name: "Violence Cases",
                data: stationData.crimeRecord.map(data => data.violence_cases)
            }
        ],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },

            title: {
                text: 'Crime Record Trends by Month',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: stationData.crimeRecord.map(data => data.month_year)
            }
        }
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default CrimeLineChart;
