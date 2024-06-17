import { FirTypeCount } from "@/types/station_crime_count_type";
import { PieChart } from "@mui/x-charts/PieChart";

const CrimeRatePiechart = ({ data }: { data: FirTypeCount }) => {
  return (
    <div>
      <PieChart
        series={[
          {
            data: [
              {
                value: data.Assault,
                label: "Assault",
              },
              {
                value: data.Bribery,
                label: "Bribery",
              },
              {
                value: data.Burglary,
                label: "Burglary",
              },
              {
                value: data.Counterfeiting,
                label: "Counterfeiting",
              },
              {
                value: data.Cybercrime,
                label: "Cybercrime",
              },
            ],
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
