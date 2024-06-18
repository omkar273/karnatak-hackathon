import { Progress } from "antd";
import React from "react";

interface PriorityMeterProps {
  caseNumber: string;
  typeOfCrime: string;
  officerInCharge: string;
  color: string;
  level: number; // New prop for analog pin level (percentage)
}

const PriorityMeter: React.FC<PriorityMeterProps> = ({
  caseNumber,
  typeOfCrime,
  officerInCharge,
  color,
  level,
}) => {
  return (
    <div className="bg-white p-4 my-4 card flex">
      <div className="w-1/2">
        <p>
          <strong>Case Number:</strong> {caseNumber}
        </p>
        <p>
          <strong>Type Of Crime:</strong> {typeOfCrime}
        </p>
        <p>
          <strong>Officer In Charge:</strong> {officerInCharge}
        </p>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div style={{ width: "80%", textAlign: "center" }}>
          <Progress
            type="dashboard"
            percent={level}
            format={() => <span style={{ color: color }}>●</span>}
            strokeColor={color}
          />
        </div>
      </div>
    </div>
  );
};

export default PriorityMeter;
