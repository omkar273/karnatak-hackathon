import { FilePdfOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";

const WitnessManagementPages = () => {
  const overviewColumns = [
    {
      title: "Victim",
      dataIndex: "victim",
      key: "victim",
    },
    {
      title: "Accused",
      dataIndex: "accused",
      key: "accused",
    },
    {
      title: "Interrogation",
      dataIndex: "interrogation",
      key: "interrogation",
      render: () => <FilePdfOutlined />,
    },
    {
      title: "Evidence reports",
      dataIndex: "evidenceReports",
      key: "evidenceReports",
      render: () => <FilePdfOutlined />,
    },
    {
      title: "Case resolution rates(%)",
      dataIndex: "firResolutionRates",
      key: "firResolutionRates",
    },
    {
      title: "Status updates",
      dataIndex: "statusUpdates",
      key: "statusUpdates",
      render: () => <Button>Status</Button>,
    },
  ];

  const techCaseManagementColumns = [
    {
      title: "Follow of investigation",
      dataIndex: "followOfInvestigation",
      key: "followOfInvestigation",
    },
    {
      title: "Cold cases(unsolved / pending)",
      dataIndex: "coldCases",
      key: "coldCases",
    },
    {
      title: "Jurisdiction Reports",
      dataIndex: "jurisdictionReports",
      key: "jurisdictionReports",
      render: () => <FilePdfOutlined />,
    },
  ];

  const wantedListColumns = [
    {
      title: "Wanted List",
      dataIndex: "wantedList",
      key: "wantedList",
    },
    {
      title: "Criminal records",
      dataIndex: "criminalRecords",
      key: "criminalRecords",
    },
  ];

  const chargesheetDetailsColumns = [
    {
      title: "Chargesheet Details",
      dataIndex: "chargesheetDetails",
      key: "chargesheetDetails",
    },
    {
      title: "Chargesheet Registration Done",
      dataIndex: "chargesheetRegistration",
      key: "chargesheetRegistration",
    },
  ];

  const dummyData = [
    {
      key: "1",
      victim: "John Doe",
      accused: "Jane Smith",
      interrogation: "",
      evidenceReports: "",
      firResolutionRates: "85%",
      statusUpdates: "",
      followOfInvestigation: "In progress",
      coldCases: "None",
      jurisdictionReports: "",
      wantedList: "None",
      criminalRecords: "Clean",
      chargesheetDetails: "Filed",
      chargesheetRegistration: "Yes",
    },
    // Add more dummy data as needed
  ];

  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
      <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
        {"FIR Details"}
      </p>
      <div className="p-4">
        <div className="bg-white p-4 my-4 card">
          <p className="my-4 font-bold text-xl">Overview</p>
          <Table
            dataSource={dummyData}
            columns={overviewColumns}
            pagination={false}
            scroll={{ x: "max-content" }}
          />
        </div>

        <div className="bg-white p-4 my-4 card">
          <p className="my-4 font-bold text-xl">
            Technological Case Management
          </p>
          <Table
            dataSource={dummyData}
            columns={techCaseManagementColumns}
            pagination={false}
            scroll={{ x: "max-content" }}
          />
        </div>

        <div className="bg-white p-4 my-4 card">
          <p className="my-4 font-bold text-xl">Wanted List</p>
          <Table
            dataSource={dummyData}
            columns={wantedListColumns}
            pagination={false}
            scroll={{ x: "max-content" }}
          />
        </div>

        <div className="bg-white p-4 my-4 card">
          <p className="my-4 font-bold text-xl">Chargesheet Details</p>
          <Table
            dataSource={dummyData}
            columns={chargesheetDetailsColumns}
            pagination={false}
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
      .<br />
      <br />
    </div>
  );
};

export default WitnessManagementPages;
