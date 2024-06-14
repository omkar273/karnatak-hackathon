import { Table } from "antd";
import React from "react";

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
    <div>
      <h2>Public Notices</h2>
      <Table
        dataSource={dummyNoticeData}
        columns={columns}
        pagination={false}
      />

      <h2 style={{ marginTop: "20px" }}>Confidential Notices</h2>
      <Table dataSource={emptyData} columns={columns} pagination={false} />
    </div>
  );
};

export default NoticeTable;
