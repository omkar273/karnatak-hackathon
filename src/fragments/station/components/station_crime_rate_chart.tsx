import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { GridLoader } from "react-spinners";
import useGetCrimeRates from "../hooks/use_get_crime_rates";
import CrimeRatePiechart from "./crime_rate_piechart";

interface Props {
  stationId: string | null | undefined;
}

const StationCrimRateChart: React.FC<Props> = ({ stationId }) => {
  const { loading, error, crimeRates } = useGetCrimeRates({
    stationId,
    year: "2024",
  });

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <GridLoader color="#0891B2" size={25} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        {error}
      </div>
    );
  }

  const chartOptions: ApexOptions = {
    dataLabels: {
      enabled: false,
    },
    chart: {
      height: 400,
      width: "50%",
      type: "line",
      zoom: {
        enabled: true,
      },
    },

    title: {
      text: "Crime Record Trends by Month",
      align: "left",
      style: {
        fontFamily: "Fira Sans",
      },
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: crimeRates.map((crime) => crime.id),
    },
    stroke: {
      width: 2, // Set the width of the lines
      curve: "monotoneCubic",
    },
  };

  const chartData = {
    series: [
      {
        name: "Theft",
        data: crimeRates.map((data) => data.Theft),
      },
      {
        name: "Robbery Cases",
        data: crimeRates.map((data) => data.Robbery),
      },
      {
        name: "Burglary Cases",
        data: crimeRates.map((data) => data.Burglary),
      },
      {
        name: "Fraud Cases",
        data: crimeRates.map((data) => data.Fraud),
      },
    ],
    options: chartOptions,
  };

  return (
    <div className="p-4 bg-white rounded-lg my-4">
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={400}
        />
      </div>
      <div id="html-dist"></div>

      {/* piecharts */}
      <h1>Crime Trends</h1>
      <div className="grid grid-cols-1 gap-4">
        <div className="border p-4">
          <CrimeRatePiechart data={crimeRates[crimeRates.length - 2]} />
          <div className="text-center mt-2">Previous Year</div>
        </div>
        <div className="border p-4">
          <CrimeRatePiechart data={crimeRates[crimeRates.length - 1]} />
          <div className="text-center mt-2">Current Year</div>
        </div>
      </div>
    </div>
  );
};

export default StationCrimRateChart;
