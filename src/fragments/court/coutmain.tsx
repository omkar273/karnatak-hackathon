import { Table, Tag } from "antd";
import React from "react";

interface CaseData {
  key: React.Key;
  caseNumber: string;
  natureOfOffence: string;
  ipcSection: string;
  judgeName: string;
  caseStatus: "Investigation" | "In Hearing" | "In Progress";
  nextDateOfHearing: string;
}

interface WitnessData {
  key: React.Key;
  witnessDetails: string;
  contactInformation: {
    phone: string;
    email: string;
    address: string;
  };
  statements: string[];
  availabilityForCourt: boolean;
}

interface CasePreparationData {
  key: React.Key;
  caseNumber: string;
  typeOfCrime: string;
  date: string;
  location: string;
  suspects: string;
}

const CourtMainPage: React.FC = () => {
  const caseStatusColumns = [
    {
      title: "Case Number",
      dataIndex: "caseNumber",
      key: "caseNumber",
    },
    {
      title: "Nature of Offence",
      dataIndex: "natureOfOffence",
      key: "natureOfOffence",
    },
    {
      title: "IPC Section",
      dataIndex: "ipcSection",
      key: "ipcSection",
    },
    {
      title: "Judge Name",
      dataIndex: "judgeName",
      key: "judgeName",
    },
    {
      title: "Case Status",
      dataIndex: "caseStatus",
      key: "caseStatus",
      render: (status: CaseData["caseStatus"]) => {
        let color;
        let text;
        switch (status) {
          case "Investigation":
            color = "red";
            text = "Investigation Stage";
            break;
          case "In Hearing":
            color = "green";
            text = "In Hearing";
            break;
          case "In Progress":
            color = "orange";
            text = "In Progress";
            break;
          default:
            color = "gray";
            text = status;
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Next Date of Hearing",
      dataIndex: "nextDateOfHearing",
      key: "nextDateOfHearing",
    },
  ];

  const witnessManagementColumns = [
    {
      title: "Witness Details",
      dataIndex: "witnessDetails",
      key: "witnessDetails",
    },
    {
      title: "Contact Information",
      dataIndex: "contactInformation",
      key: "contactInformation",
      render: (contactInfo: WitnessData["contactInformation"]) => (
        <div>
          <div>Phone: {contactInfo.phone}</div>
          <div>Email: {contactInfo.email}</div>
          <div>Address: {contactInfo.address}</div>
        </div>
      ),
    },
    {
      title: "Statements",
      dataIndex: "statements",
      key: "statements",
      render: (statements: string[]) => (
        <ul>
          {statements.map((statement, index) => (
            <li key={index}>{statement}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Availability For Court",
      dataIndex: "availabilityForCourt",
      key: "availabilityForCourt",
      render: (available: boolean) => (
        <Tag color={available ? "green" : "red"}>
          {available ? "Available" : "Unavailable"}
        </Tag>
      ),
    },
  ];

  const casePreparationColumns = [
    {
      title: "Case Number",
      dataIndex: "caseNumber",
      key: "caseNumber",
    },
    {
      title: "Type of Crime",
      dataIndex: "typeOfCrime",
      key: "typeOfCrime",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Suspects",
      dataIndex: "suspects",
      key: "suspects",
    },
  ];

  const dummyCaseData: CaseData[] = [
    {
      key: "1",
      caseNumber: "12345",
      natureOfOffence: "Theft",
      ipcSection: "379",
      judgeName: "Judge A",
      caseStatus: "Investigation",
      nextDateOfHearing: "2024-07-01",
    },
    {
      key: "2",
      caseNumber: "67890",
      natureOfOffence: "Assault",
      ipcSection: "323",
      judgeName: "Judge B",
      caseStatus: "In Hearing",
      nextDateOfHearing: "2024-07-05",
    },
    {
      key: "3",
      caseNumber: "11223",
      natureOfOffence: "Fraud",
      ipcSection: "420",
      judgeName: "Judge C",
      caseStatus: "In Progress",
      nextDateOfHearing: "2024-07-10",
    },
  ];

  const dummyWitnessData: WitnessData[] = [
    {
      key: "1",
      witnessDetails: "John Doe",
      contactInformation: {
        phone: "123-456-7890",
        email: "john.doe@example.com",
        address: "123 Main St, City, Country",
      },
      statements: ["Statement 1", "Statement 2"],
      availabilityForCourt: true,
    },
    {
      key: "2",
      witnessDetails: "Jane Smith",
      contactInformation: {
        phone: "987-654-3210",
        email: "jane.smith@example.com",
        address: "456 Oak Ave, Town, Country",
      },
      statements: ["Statement 3", "Statement 4"],
      availabilityForCourt: false,
    },
  ];

  const dummyCasePreparationData: CasePreparationData[] = [
    {
      key: "1",
      caseNumber: "12345",
      typeOfCrime: "Theft",
      date: "2024-06-15",
      location: "City A",
      suspects: "John Doe, Jane Smith",
    },
    {
      key: "2",
      caseNumber: "67890",
      typeOfCrime: "Assault",
      date: "2024-06-16",
      location: "City B",
      suspects: "Mike Johnson",
    },
  ];

  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
      <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
        {"Court Case Management"}
      </p>
      <div className="p-4">
        <div className="bg-white p-4 my-4 card">
          <p className="my-4 font-bold text-xl">Case Status</p>
          <Table
            dataSource={dummyCaseData}
            columns={caseStatusColumns}
            pagination={{
              total: dummyCaseData.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>

        <div className="bg-white p-4 my-4 card">
          <p className="my-4 font-bold text-xl">Witness Management</p>
          <Table
            dataSource={dummyWitnessData}
            columns={witnessManagementColumns}
            pagination={{
              total: dummyWitnessData.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>

        <div className="bg-white p-4 my-4 card">
          <p className="my-4 font-bold text-xl">Case Preparation</p>
          <Table
            dataSource={dummyCasePreparationData}
            columns={casePreparationColumns}
            pagination={{
              total: dummyCasePreparationData.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CourtMainPage;
