import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import useGetCrimeRates from '../hooks/use_get_crime_rates';
import { GridLoader } from 'react-spinners';
import CrimeRatePiechart from './crime_rate_piechart';

interface Props {
    stationId: string | null | undefined;
}

const StationCrimRateChart: React.FC<Props> = ({ stationId }) => {

    const { loading, error, crimeRates } = useGetCrimeRates({ stationId, year: '2024' });

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <GridLoader
                    color="#0891B2"
                    size={25}
                />
            </div>
        )
    }


    if (error) {
        return (<div className="h-screen w-full flex justify-center items-center">
            {error}
        </div>)
    }




    const chartOptions: ApexOptions = {

        dataLabels: {
            enabled: false
        },
        chart: {
            height: 400,
            width: '50%',
            type: 'line',
            zoom: {
                enabled: true
            },

        },

        title: {
            text: 'Crime Record Trends by Month',
            align: 'left',
            style: {
                fontFamily: 'Fira Sans',
            }
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: crimeRates.map((crime) => crime.id)

        },
        stroke: {
            width: 2, // Set the width of the lines
            curve: 'monotoneCubic',

        }
    }
    const chartData = {
        series: [
            {
                name: "Theft",
                data: crimeRates.map(data => data.Theft)
            },
            {
                name: "Robbery Cases",
                data: crimeRates.map(data => data.Robbery)
            },
            // {
            //     name: "Assault Cases",
            //     data: crimeRates.map(data => data.Assault)
            // },
            {
                name: "Burglary Cases",
                data: crimeRates.map(data => data.Burglary)
            },
            {
                name: "Fraud Cases",
                data: crimeRates.map(data => data.Fraud)
            },
            // {
            //     name: "Murder Cases",
            //     data: crimeRates.map(data => data.Murder)
            // },
            // {
            //     name: "SexualAssault Cases",
            //     data: crimeRates.map(data => data.SexualAssault)
            // },
            // {
            //     name: "DrugTrafficking Cases",
            //     data: crimeRates.map(data => data.DrugTrafficking)
            // },
            // {
            //     name: "DrugTrafficking Cases",
            //     data: crimeRates.map(data => data.DrugTrafficking)
            // },
            // {
            //     name: "Cybercrime Cases",
            //     data: crimeRates.map(data => data.Cybercrime)
            // },
            // {
            //     name: "Kidnapping Cases",
            //     data: crimeRates.map(data => data.Kidnapping)
            // },
            // {
            //     name: "MoneyLaundering Cases",
            //     data: crimeRates.map(data => data.MoneyLaundering)
            // },
            // {
            //     name: "Bribery Cases",
            //     data: crimeRates.map(data => data.Bribery)
            // },
            // {
            //     name: "Stalking Cases",
            //     data: crimeRates.map(data => data.Stalking)
            // },
            // {
            //     name: "DomesticViolence Cases",
            //     data: crimeRates.map(data => data.DomesticViolence)
            // },
            // {
            //     name: "IdentityTheft Cases",
            //     data: crimeRates.map(data => data.IdentityTheft)
            // },
            // {
            //     name: "Counterfeiting Cases",
            //     data: crimeRates.map(data => data.Counterfeiting)
            // },
            // {
            //     name: "Harassment Cases",
            //     data: crimeRates.map(data => data.Harassment)
            // },

        ],
        options: chartOptions
    }



    return (
        <div className='p-4 bg-white rounded-lg my-4'>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={400} />
            </div>
            <div id="html-dist"></div>

            {/* piecharts */}
            <h1>Crime Trends</h1>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <CrimeRatePiechart data={crimeRates[crimeRates.length - 1]} />
                <CrimeRatePiechart data={crimeRates[crimeRates.length - 1]} />
            </div>

        </div>
    );
};

export default StationCrimRateChart;
