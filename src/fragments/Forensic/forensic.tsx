import { FilePdfOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";
import React from "react";

interface ForensicData {
  key: React.Key;
  firNumber: string;
  photographsAndEvidence: string[];
  ftkAccessData: string;
  autopsy: string;
  forensicOfficerInCharge: string;
}

const Forensic: React.FC = () => {
  const forensicColumns = [
    {
      title: "FIR Number",
      dataIndex: "firNumber",
      key: "firNumber",
    },
    {
      title: "Photographs and Evidence",
      dataIndex: "photographsAndEvidence",
      key: "photographsAndEvidence",
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
    {
      title: "Access Data Forensic Toolkit (FTK)",
      dataIndex: "ftkAccessData",
      key: "ftkAccessData",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          <FilePdfOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
        </a>
      ),
    },
    {
      title: "Autopsy",
      dataIndex: "autopsy",
      key: "autopsy",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          <FilePdfOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
        </a>
      ),
    },
    {
      title: "Forensic Officer In-charge",
      dataIndex: "forensicOfficerInCharge",
      key: "forensicOfficerInCharge",
    },
  ];

  const dummyForensicData: ForensicData[] = [
    {
      key: "1",
      firNumber: "12345",
      photographsAndEvidence: [
        "https://example.com/photograph1.pdf",
        "https://example.com/evidence1.pdf",
      ],
      ftkAccessData: "https://example.com/ftk_report.pdf",
      autopsy: "https://example.com/autopsy_report.pdf",
      forensicOfficerInCharge: "Dr. John Doe",
    },
    {
      key: "2",
      firNumber: "67890",
      photographsAndEvidence: [
        "https://example.com/photograph2.pdf",
        "https://example.com/evidence2.pdf",
      ],
      ftkAccessData: "https://example.com/ftk_report.pdf",
      autopsy: "https://example.com/autopsy_report.pdf",
      forensicOfficerInCharge: "Dr. Jane Smith",
    },
  ];

  const youtubeColumns = [
    {
      title: "YouTube Video",
      dataIndex: "youtubeVideo",
      key: "youtubeVideo",
      render: () => (
        <iframe
          width="200"
          height="150"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ),
    },
    {
      title: "Forensic Details",
      dataIndex: "forensicDetails",
      key: "forensicDetails",
      render: (_text: any, record: ForensicData) => (
        <div>
          <p>
            <strong>FIR Number:</strong> {record.firNumber}
          </p>
          <p>
            <strong>Photographs and Evidence:</strong>{" "}
            {record.photographsAndEvidence.map((item, index) => (
              <a
                href={item}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                {index + 1}
              </a>
            ))}
          </p>
          <p>
            <strong>Access Data Forensic Toolkit (FTK):</strong>{" "}
            <a
              href={record.ftkAccessData}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FilePdfOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
            </a>
          </p>
          <p>
            <strong>Autopsy:</strong>{" "}
            <a href={record.autopsy} target="_blank" rel="noopener noreferrer">
              <FilePdfOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
            </a>
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
      <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
        {"Forensic Data"}
      </p>
      <div className="p-4">
        <div className="bg-white p-4 my-4 card">
          <h2 className="text-lg font-semibold">Forensic Data Table</h2>
          <Table
            dataSource={dummyForensicData}
            columns={forensicColumns}
            pagination={{
              total: dummyForensicData.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>
        <div className="bg-white p-4 my-4 card">
          <h2 className="text-lg font-semibold"></h2>
          <Table
            dataSource={dummyForensicData}
            columns={youtubeColumns}
            pagination={{
              total: 1, // Since there's only one row for YouTube videos
              showSizeChanger: false,
              showQuickJumper: false,
              hideOnSinglePage: true,
            }}
          />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Forensic;
