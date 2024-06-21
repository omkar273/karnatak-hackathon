import StaticMap from "@/common/components/static_map.tsx";
import { BellOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import React from "react";

interface Props {
  lat: number;
  lng: number;
  station_name?: string;
  station_id: string;
}

interface CourtOrderData {
  key: React.Key;
  issuedDate: string;
  typeOfOrder: string;
  orderStatus: string;
  judgeName: string;
  coordinatesAndLocation: string;
  reports: string[];
}

interface AlertZoneData {
  key: React.Key;
  areaName: string;
  typeOfIncident: string;
  liveCCTV: string;
  dispatchedTeamName: string;
}

interface TaskBarData {
  key: React.Key;
  officerName: string;
  natureOfTask: string;
  caseNumber: string;
  taskDetails: string;
  taskStatus: string;
}

const CourtOrders: React.FC<Props> = ({
  lat,
  lng,
  station_id,
  station_name,
}) => {
  const courtOrderColumns = [
    {
      title: "Court Order Issued Date",
      dataIndex: "issuedDate",
      key: "issuedDate",
    },
    {
      title: "Type Of Order",
      dataIndex: "typeOfOrder",
      key: "typeOfOrder",
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Judge Name Of Order Issued by",
      dataIndex: "judgeName",
      key: "judgeName",
    },
    {
      title: "Coordinates and Location Of Area",
      dataIndex: "coordinatesAndLocation",
      key: "coordinatesAndLocation",
    },
    {
      title: "Reports",
      dataIndex: "reports",
      key: "reports",
      render: (text: string[]) => (
        <Space size="middle">
          {text.map((item, index) => (
            <a
              href={item}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <FilePdfOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
            </a>
          ))}
        </Space>
      ),
    },
  ];

  const dummyCourtOrderData: CourtOrderData[] = [
    {
      key: "1",
      issuedDate: "2023-06-01",
      typeOfOrder: "Arrest Order",
      orderStatus: "Pending",
      judgeName: "Judge John Doe",
      coordinatesAndLocation: "40.7128° N, 74.0060° W",
      reports: ["https://example.com/report1.pdf"],
    },
    {
      key: "2",
      issuedDate: "2023-05-15",
      typeOfOrder: "Restraining Order",
      orderStatus: "Completed",
      judgeName: "Judge Jane Smith",
      coordinatesAndLocation: "34.0522° N, 118.2437° W",
      reports: ["https://example.com/report2.pdf"],
    },
  ];

  const alertZoneColumns = [
    {
      title: "Area Name",
      dataIndex: "areaName",
      key: "areaName",
    },
    {
      title: "Type of Incident",
      dataIndex: "typeOfIncident",
      key: "typeOfIncident",
    },
    {
      title: "Live CCTV",
      dataIndex: "liveCCTV",
      key: "liveCCTV",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          Live Feed
        </a>
      ),
    },
    {
      title: "Dispatched Team Name",
      dataIndex: "dispatchedTeamName",
      key: "dispatchedTeamName",
    },
  ];

  const dummyAlertZoneData: AlertZoneData[] = [
    {
      key: "1",
      areaName: "Central Park",
      typeOfIncident: "Theft",
      liveCCTV: "https://example.com/live_cctv1",
      dispatchedTeamName: "Team Alpha",
    },
    {
      key: "2",
      areaName: "Times Square",
      typeOfIncident: "Assault",
      liveCCTV: "https://example.com/live_cctv2",
      dispatchedTeamName: "Team Bravo",
    },
  ];

  const taskBarColumns = [
    {
      title: "Name Of Officer (Post)",
      dataIndex: "officerName",
      key: "officerName",
    },
    {
      title: "Nature of Task",
      dataIndex: "natureOfTask",
      key: "natureOfTask",
    },
    {
      title: "FIR/Case Number",
      dataIndex: "caseNumber",
      key: "caseNumber",
    },
    {
      title: "Details About Task",
      dataIndex: "taskDetails",
      key: "taskDetails",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          <FilePdfOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
        </a>
      ),
    },
    {
      title: "Status Of Task",
      dataIndex: "taskStatus",
      key: "taskStatus",
      render: (status: string) => {
        let color;
        switch (status) {
          case "Update Needed":
            color = "gold";
            break;
          case "Task Due":
            color = "orange";
            break;
          case "Incomplete":
            color = "red";
            break;
          case "Task Complete":
            color = "blue";
            break;
          case "In Progress":
            color = "lightblue";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const dummyTaskBarData: TaskBarData[] = [
    {
      key: "1",
      officerName: "Officer A (Sergeant)",
      natureOfTask: "Investigation",
      caseNumber: "FIR123456",
      taskDetails: "https://example.com/task_details1.pdf",
      taskStatus: "Update Needed",
    },
    {
      key: "2",
      officerName: "Officer B (Inspector)",
      natureOfTask: "Surveillance",
      caseNumber: "FIR654321",
      taskDetails: "https://example.com/task_details2.pdf",
      taskStatus: "Task Due",
    },
    {
      key: "3",
      officerName: "Officer C (Constable)",
      natureOfTask: "Patrol",
      caseNumber: "FIR987654",
      taskDetails: "https://example.com/task_details3.pdf",
      taskStatus: "Incomplete",
    },
    {
      key: "4",
      officerName: "Officer D (Lieutenant)",
      natureOfTask: "Arrest",
      caseNumber: "FIR123789",
      taskDetails: "https://example.com/task_details4.pdf",
      taskStatus: "Task Complete",
    },
    {
      key: "5",
      officerName: "Officer E (Captain)",
      natureOfTask: "Report Writing",
      caseNumber: "FIR321654",
      taskDetails: "https://example.com/task_details5.pdf",
      taskStatus: "In Progress",
    },
  ];

  return (
    <div className="bg-gray-100">
      <div className="p-4">
        <div className="bg-white p-4 my-4 card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Court Orders</h2>
            <BellOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
          </div>
          <Table
            dataSource={dummyCourtOrderData}
            columns={courtOrderColumns}
            pagination={{
              total: dummyCourtOrderData.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>
        <div className={"bg-white p-4 my-4 card"}>
          <h2 className="text-lg font-semibold">AlertZone</h2>
          <div className="flex gap-4">
            <div className="w-1/2 py-2 max-h-[20px]">
              <div className="w-fullpy-2 max-h-[200px] overflow-hidden">
                <StaticMap
                  station_id={station_id}
                  lng={lng}
                  lat={lat}
                  station_name={station_name}
                />
              </div>
            </div>
            <div className="w-1/2">
              <Table
                dataSource={dummyAlertZoneData}
                columns={alertZoneColumns}
                pagination={{
                  total: dummyAlertZoneData.length,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) =>
                    `Showing ${range[0]}-${range[1]} of ${total} items`,
                }}
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 my-4 card">
          <h2 className="text-lg font-semibold">TaskBar</h2>
          <Table
            dataSource={dummyTaskBarData}
            columns={taskBarColumns}
            pagination={{
              total: dummyTaskBarData.length,
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

export default CourtOrders;
