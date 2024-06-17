import { FirTypeCount } from "@/types/station_crime_count_type";
import { PieChart } from "@mui/x-charts/PieChart";

const CrimeRatePiechart = ({ data }: { data: FirTypeCount }) => {
  // Calculate the total sum of all categories
  const totalSum =
    data.Assault +
    data.Bribery +
    data.Burglary +
    data.Counterfeiting +
    data.Cybercrime;

  // Threshold to determine when to aggregate into "Others" category
  const threshold = 6; // Adjust as needed based on your data

  // Prepare data for the pie chart
  const pieChartData = [
    { value: data.Assault, label: "Assault", color: "#FF5733" },
    { value: data.Bribery, label: "Bribery", color: "#FFC300" },
    { value: data.Burglary, label: "Burglary", color: "#36A2EB" },
    { value: data.Counterfeiting, label: "Counterfeiting", color: "#4BC0C0" },
    { value: data.Cybercrime, label: "Cybercrime", color: "#9966FF" },
  ];

  // Calculate the sum of categories that are below the threshold
  let othersValue = 0;
  pieChartData.forEach((item) => {
    if (item.value < threshold) {
      othersValue += item.value;
    }
  });

  // Add "Others" category if needed
  if (othersValue > 0) {
    pieChartData.push({
      value: othersValue,
      label: "Others",
      color: "#888888",
    });
  }

  // Create legend data including the "Others" category
  const legendData = pieChartData.map((item) => ({
    value: item.label,
    color: item.color,
  }));

  return (
    <div>
      <PieChart
        series={[
          {
            data: pieChartData,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 2,
            cornerRadius: 5,
            valueFormatter: (s) => `${s.value} cases`,
            cx: 150,
            cy: 150,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: {
              innerRadius: 30,
              additionalRadius: -30,
              color: "gray",
            },
          },
        ]}
        slotProps={{
          legend: {
            direction: "column",
            position: { vertical: "bottom", horizontal: "right" },
            padding: 25,
            hidden: false, // Ensure the legend is visible
          },
        }}
        height={300}
      />
    </div>
  );
};

export default CrimeRatePiechart;
