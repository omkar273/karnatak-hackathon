import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { stationData } from '../data/station';
const CrimeLineChart = () => {
    const chartOptions: ApexOptions = {

        dataLabels: {
            enabled: false
        },
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: true
            }
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
    const chartData = {
        series: [
            {
                name: "Theft Cases",
                data: stationData.crimeRecord.map(data => data.theft_cases)
            },
            {
                name: "Assault Cases",
                data: stationData.crimeRecord.map(data => data.assult_cases)
            },
            {
                name: "Violence Cases",
                data: stationData.crimeRecord.map(data => data.violence_cases)
            }
        ],
        options: chartOptions
    }

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
