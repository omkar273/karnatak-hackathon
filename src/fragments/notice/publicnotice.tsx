import { Table } from "antd";
import React from "react";

interface PublicNoticeData {
  key: React.Key;
  title: string;
  type: string;
  issuedBy: string;
  date: string;
}

const PublicNoticeTable: React.FC = () => {
  // Dummy data for the Public Notice Table by Police
  const dummyPublicNoticeData: PublicNoticeData[] = [
    {
      key: "1",
      title: "Community Safety Meeting",
      type: "Meeting",
      issuedBy: "Local Police Department",
      date: "2023-05-15",
    },
    {
      key: "2",
      title: "Road Closure Notice",
      type: "Traffic",
      issuedBy: "City Police",
      date: "2023-06-01",
    },
    {
      key: "3",
      title: "Public Awareness Campaign",
      type: "Awareness",
      issuedBy: "Police Department",
      date: "2023-06-10",
    },
    {
      key: "4",
      title: "Crime Prevention Tips",
      type: "Informational",
      issuedBy: "Neighborhood Police",
      date: "2023-06-20",
    },
  ];

  // Columns definition for the Public Notice Table by Police
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type Of Notice",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Issued By",
      dataIndex: "issuedBy",
      key: "issuedBy",
    },
    {
      title: "Date Of Notice",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
      <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
        {"Public Notices"}
      </p>
      <div className="p-4">
        <div className={"p-1 bg-white card my-4"}>
          <h1 className="font-bold md:text-2xl text-base p-2">
            Public Notices by Police
          </h1>
          <Table
            dataSource={dummyPublicNoticeData}
            columns={columns}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default PublicNoticeTable;
