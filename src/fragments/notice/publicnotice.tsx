import { FilePdfOutlined } from "@ant-design/icons"; // Import the PDF icon
import { Table } from "antd";
import React from "react";

interface PublicNoticeData {
  key: React.Key;
  title: string;
  type: string;
  issuedBy: string;
  date: string;
  pdfLink?: string; // Add an optional pdfLink property for the PDF file URL
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
      pdfLink: "/path/to/pdf1.pdf",
    },
    {
      key: "2",
      title: "Road Closure Notice",
      type: "Traffic",
      issuedBy: "City Police",
      date: "2023-06-01",
      pdfLink: "/path/to/pdf2.pdf",
    },
    {
      key: "3",
      title: "Public Awareness Campaign",
      type: "Awareness",
      issuedBy: "Police Department",
      date: "2023-06-10",
      pdfLink: "/path/to/pdf3.pdf",
    },
    {
      key: "4",
      title: "Crime Prevention Tips",
      type: "Informational",
      issuedBy: "Neighborhood Police",
      date: "2023-06-20",
      pdfLink: "/path/to/pdf4.pdf",
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
    {
      title: "View",
      key: "pdf",
      render: (text: any, record: PublicNoticeData) => (
        <a href={record.pdfLink} target="_blank" rel="noopener noreferrer">
          <FilePdfOutlined style={{ fontSize: "20px", color: "#d9534f" }} />
        </a>
      ),
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
