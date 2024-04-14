import { VSpacer } from "@/common/components/spacer";
import { ExportOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Calendar, Clock9, MapPinned, Phone, UserRound } from "lucide-react";
import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { Link } from "react-router-dom";
import { chargesheetData } from "./data/chargesheet_data";

const getStatusColorFromStatus = (status: string) => {
  let color = ''
  switch (status) {
    case 'Ongoing':
      color = '#FF0000 '
      break;
    case 'Pending':
      color = '#FF5733'
      break;
    case 'Under Review':
      color = '#FFA500'
      break;
    case 'Closed - Charges filed':
      color = '#FFFF00'
      break;
    case 'Under Investigation':
      color = '#FFFF00'
      break;
    case 'Closed - Warning issued':
      color = '#ADFF2F'
      break;
    case 'Closed - Arrest made':
      color = '#00FF00'
      break;
    default:
      break;
  }
  return (<div className={`size-4 rounded-full border`} style={{ backgroundColor: color }} ></div>)
}

const CourtTwo: React.FC = () => {
  const chargesheetColumns = [
    {
      title: 'View',
      dataIndex: 'Name',
      key: 'Name',
      render: () => (<Link to={``}>
        <span className="mr-2">view</span> <ExportOutlined />
      </Link>)
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      render: (name: string) => (<span className="font-semibold text-base">{name}</span>)
    },
    {
      title: 'Age',
      dataIndex: 'Age',
      key: 'Age',
    },
    {
      title: 'Nationality',
      dataIndex: 'Nationality',
      key: 'Nationality',
    },
    {
      title: 'Evidence',
      dataIndex: 'Evidence',
      key: 'Evidence',
    },
    {
      title: 'Officer Incharge',
      dataIndex: 'Officer_Incharge',
      key: 'Officer_Incharge',
    },
    {
      title: 'Investigation staus',
      dataIndex: 'Investigation_Status',
      key: 'Investigation_Status',
      render: (status: string) => (
        <span className="flex gap-3 font-semibold items-center">
          {getStatusColorFromStatus(status)}{status}
        </span>
      )
    },

  ]

  return (
    <div className="bg-gray-200">
      <div className="bg-gray-50">
        <div className="w-full h-12 bg-blue-300">
          <p className="p-3 font-semibold">Court Monitoring</p>
        </div>
        <h1 className="px-4 py-2 text-xl font-bold">Case Preparation</h1>

        {/* chargeet copies */}
        <div className="card bg-white">
          <p className="text-2xl my-3 font-semibold">All chargesheet</p>
          <Table
            dataSource={chargesheetData}
            columns={chargesheetColumns}
            pagination={{
              total: chargesheetData.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,

            }}
            scroll={{ x: 'max-content' }}
          />
        </div>

        <VSpacer height={25} />

        <div className="flex space-x-5 mx-4 rounded-lg">
          {/* First box */}
          <div className="flex-1 shadow-md bg-white rounded-lg p-5">
            <p className="text-lg font-bold">Case Name (Number)</p>
          </div>
          <div className="flex-1 shadow-md bg-white rounded-lg p-5 flex items-center justify-center">
            <p className="text-lg font-bold text-blue-500">
              Case Progress Meter
            </p>
          </div>
        </div>
        <VSpacer height={25} />

        <div className="md:flex gap-8 w-full">

          {/* case basic data */}
          <div className="card bg-white flex-grow p-8 flex-1">
            <p className="font-semibold text-xl">
              Fir No :
              <span className="font-medium">1369</span>
            </p>


            <p className="font-medium  text-base">status : Investigation</p>
            <VSpacer height={30} />
            <div className="w-full flex flex-col gap-4">
              <span className="flex gap-2"><Calendar /> Date : 14/04/2024 </span>
              <span className="flex gap-2"><MapPinned />Place : Petrol pump</span>
              <span className="flex gap-2"><UserRound />Father name : Rajiv yadav </span>
              <span className="flex gap-2"><Phone />Phone : +91 xxxxxxxxxx</span>
              <span className="flex gap-2"><Clock9 />Time of incident : 4 PM noon</span>
            </div>
          </div>

          <div className="card bg-white flex-grow flex-1 justify-between items-center w-full flex flex-col">
            <p className="font-semibold text-2xl mb-1">
              Case Progress meter
            </p>
            <VSpacer height={30} />
            <ReactSpeedometer
              minValue={0}
              maxValue={100}
              needleTransitionDuration={2000}
              value={Math.floor(Math.random() * 101)}
              // fluidWidth={true}
              currentValueText="Case progress percentage"
            />
          </div>
        </div>
        <VSpacer height={25} />

        <div className="flex space-x-5 mx-4 my-4">
          {/* First box */}

          <div className="flex-1 bg-white rounded-lg p-5"></div>
        </div>

      </div>
      <br />
      <br />
      <br />
      <br />

    </div>
  );
};

export default CourtTwo;
