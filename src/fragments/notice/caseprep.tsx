import { Table } from "antd";
import React from "react";

interface CasePreparationData {
  key: React.Key;
  caseId: string;
  checklist: string;
  detailedPhotosVideos: string;
  forensicReports: string;
  interviewWitnesses: string;
  arrestWarrantsOrders: string;
  courtDocuments: string;
}

const CasePreparationTable: React.FC = () => {
  // Dummy data for the Case Preparation Table
  const dummyCaseData: CasePreparationData[] = [
    {
      key: "1",
      caseId: "CP-001",
      checklist: "Checklist 1",
      detailedPhotosVideos: "Photos and Videos 1",
      forensicReports: "Forensic Report 1",
      interviewWitnesses: "Interview 1",
      arrestWarrantsOrders: "Arrest Warrant 1",
      courtDocuments: "Court Document 1",
    },
    {
      key: "2",
      caseId: "CP-002",
      checklist: "Checklist 2",
      detailedPhotosVideos: "Photos and Videos 2",
      forensicReports: "Forensic Report 2",
      interviewWitnesses: "Interview 2",
      arrestWarrantsOrders: "Arrest Warrant 2",
      courtDocuments: "Court Document 2",
    },
    {
      key: "3",
      caseId: "CP-003",
      checklist: "Checklist 3",
      detailedPhotosVideos: "Photos and Videos 3",
      forensicReports: "Forensic Report 3",
      interviewWitnesses: "Interview 3",
      arrestWarrantsOrders: "Arrest Warrant 3",
      courtDocuments: "Court Document 3",
    },
  ];

  // Columns definition for the Case Preparation Table
  const columns = [
    {
      title: "Case ID",
      dataIndex: "caseId",
      key: "caseId",
    },
    {
      title: "Checklist",
      dataIndex: "checklist",
      key: "checklist",
    },
    {
      title: "Detailed Photos & Videos of Scene",
      dataIndex: "detailedPhotosVideos",
      key: "detailedPhotosVideos",
    },
    {
      title: "Forensic Reports (If Any)",
      dataIndex: "forensicReports",
      key: "forensicReports",
    },
    {
      title: "Interview Witnesses and Record Statement",
      dataIndex: "interviewWitnesses",
      key: "interviewWitnesses",
    },
    {
      title: "Arrest Warrants / Orders",
      dataIndex: "arrestWarrantsOrders",
      key: "arrestWarrantsOrders",
    },
    {
      title: "Court Documents",
      dataIndex: "courtDocuments",
      key: "courtDocuments",
    },
  ];

  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden ">
      <p className=" p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
        {/*"Case Preparation"*/}
      </p>
      <div className="p-4">
        <div className={"p-1 bg-white card my-4"}>
          <h1 className="font-bold md:text-2xl text-base p-2">
            Case Preparation
          </h1>
          <Table
            dataSource={dummyCaseData}
            columns={columns}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CasePreparationTable;
