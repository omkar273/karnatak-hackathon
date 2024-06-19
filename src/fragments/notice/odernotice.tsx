import { Table } from "antd";
import React from "react";
import CasePreparationTable from "./caseprep";

interface NoticeData {
  key: React.Key;
  name: string;
  type: string;
  date: string;
}

const NoticeTable: React.FC = () => {
  // Dummy data for the Notice Table
  const dummyNoticeData: NoticeData[] = [
    {
      key: "1",
      name: "Important Update",
      type: "Informational",
      date: "2023-05-15",
    },
    {
      key: "2",
      name: "Holiday Announcement",
      type: "General",
      date: "2023-06-01",
    },
    {
      key: "3",
      name: "Policy Change",
      type: "Regulatory",
      date: "2023-06-10",
    },
  ];

  // Columns definition for the Notice Table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type Of Notice",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date Of Notice",
      dataIndex: "date",
      key: "date",
    },
  ];

  // Empty data for the Confidential Table
  const emptyData: NoticeData[] = [];

  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
      <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
        {"Notices"}
      </p>
      <div className="p-4">
        <div className={"p-1 bg-white card my-4"}>
          <h1 className="font-bold md:text-2xl text-base p-2">
            Public Notices
          </h1>
          <Table
            dataSource={dummyNoticeData}
            columns={columns}
            pagination={false}
          />
        </div>

        <div className={"p-1 bg-white card my-4"}>
          <h1 className="font-bold md:text-2xl text-base p-2">
            Confidential Notices
          </h1>
          <Table dataSource={emptyData} columns={columns} pagination={false} />
        </div>
      </div>
    </div>
  );
};

export default NoticeTable;
