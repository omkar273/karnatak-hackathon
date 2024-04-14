import { VSpacer } from "@/common/components/spacer";
import { ExportOutlined } from "@ant-design/icons";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { PieChart } from "@mui/x-charts/PieChart";
import { Collapse, Table } from "antd";
import { Link } from "react-router-dom";
import { manpowerMappingData } from "./data/manpower_mapping";

const Manpower = () => {

  const rapidActionsColumns = [
    {
      title: 'View',
      dataIndex: 'Name',
      key: 'Name',
      render: () => (<Link to={``}>
        <span className="mr-2 font-bold">view</span> <ExportOutlined />
      </Link>)
    },

    {
      title: 'Resource ID',
      dataIndex: 'resource_id',
      key: 'resource_id',
    },
    {
      title: 'Type of Force needed',
      dataIndex: 'type_of_force_needed',
      key: 'type_of_force_needed',
      render: (forces: string) => (<span className="font-semibold text-base">{forces}</span>)
    },
    {
      title: 'Name',
      dataIndex: 'nearby_force_available',
      key: 'nearby_force_available',
    },
    {
      title: 'Current location of nearby force',
      dataIndex: 'current_location_of_nearby_force',
      key: 'current_location_of_nearby_force',
    },
    {
      title: 'Time to react',
      dataIndex: 'time_to_reach_location',
      key: 'time_to_reach_location',
      render: (time: string) => (<span className="font-semibold text-base">{time}</span>)
    },

  ]

  const skillsTableColumns = [
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
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (<span className="font-semibold text-base">{name}</span>)
    },
    {
      "title": "rank",
      "dataIndex": "rank",
      "key": "rank",
      render: (name: string) => (<span className="font-semibold text-base">{name}</span>)
    },
    {
      "title": "training_status",
      "dataIndex": "training_status",
      "key": "training_status"
    },
    {
      "title": "certification_expiration",
      "dataIndex": "certification_expiration",
      "key": "certification_expiration",
      render: ((data: {
        basic_training: string,
        firearms_proficiency: string,
        first_aid_cpr: string
      }) => (
        <div>
          <p>Basic Training : {data.basic_training}</p>
          <p>Firearms proficiency Training : {data.firearms_proficiency}</p>
          <p>First aid Training : {data.basic_training}</p>
        </div>
      ))
    },

    {
      "title": "new_training_opportunities",
      "dataIndex": "new_training_opportunities",
      "key": "new_training_opportunities",
      render: ((data: string[]) => (<div>
        {data.map((value) => (<div>{value}</div>))}
      </div>))
    },
  ]

  const departmentDetails = [
    {
      "dept_name": "Cyber Crime",
      "no_people": 40
    },
    {
      "dept_name": "Traffic",
      "no_people": 50
    },
    {
      "dept_name": "Narcotics",
      "no_people": 30
    },
    {
      "dept_name": "Forensics",
      "no_people": 20
    },
    {
      "dept_name": "Patrol",
      "no_people": 75
    },
    {
      "dept_name": "K9 Unit",
      "no_people": 15
    },
    {
      "dept_name": "Public Affairs",
      "no_people": 10
    }
  ]

  const movingTableColumns = [
    {
      "title": "unit_id",
      "dataIndex": "unit_id",
      "key": "unit_idt"
    },
    {
      "title": "name",
      "dataIndex": "name",
      "key": "name"
    },
    {
      "title": "suspicious_activity_response",
      "dataIndex": "suspicious_activity_response",
      "key": "suspicious_activity_response"
    },
    {
      "title": "action_taken",
      "dataIndex": "action_taken",
      "key": "action_taken"
    },
    {
      "title": "alert",
      "dataIndex": "alert",
      "key": "alert"
    },
    {
      "title": "designation",
      "dataIndex": "designation",
      "key": "designation"
    },
    {
      "title": "thumbnail",
      "dataIndex": "thumbnail",
      "key": "thumbnail"
    },
  ]


  const chartSettings = {
    yAxis: [
      {
        label: 'Number of People',
      },
    ],
    width: 600,
    height: 400,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };

  const forensicTableColumns = [
    {
      "title": "unit_id",
      "dataIndex": "unit_id",
      "key": "unit_id"
    },
    {
      "title": "status",
      "dataIndex": "status",
      "key": "status"
    },
    {
      "title": "visual_cue",
      "dataIndex": "visual_cue",
      "key": "visual_cue"
    },
  ]

  const pieChartData = departmentDetails.map((d) => ({ 'id': d.dept_name, 'value': d.no_people, 'label': d.dept_name }))

  const valueFormatter = (value: number | null) => `${value} people`;

  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
      <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
        {"Manpower mapping"}
      </p>

      {/* analytics */}
      <div className="card grid md:grid-cols-2 grid-cols-1 bg-white">

        <div className="flex flex-col w-full h-full justify-between items-center">
          <p className="text-xl my-3">Crime percentage in this last month</p>
          <PieChart

            series={[
              {
                data: pieChartData,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              },
            ]}
            title="Crime percentage in this last"
            height={300}
            width={600}
          />
        </div>
        <div className="">
          <BarChart
            dataset={departmentDetails}
            xAxis={[
              {
                scaleType: 'band',
                dataKey: 'dept_name',
                label: 'No of people alloted in different departments'
              }]}
            series={[{
              dataKey: 'no_people',
              label: 'Number of People',
              valueFormatter
            }]}
            {...chartSettings}
          />
        </div>
      </div>


      <div className="p-4">
        <div className="card bg-white my-4">
          <Collapse defaultActiveKey={['1']} items={[
            {
              key: '1',
              label: 'Show on map',
              children: (<iframe className="w-full min-h-[500px]" src="https://maps.google.com/maps?q=14.51475,75.80687&amp;hl=es;z=14&amp;output=embed" title="" ></iframe>)
            }
          ]}
          />
        </div>

        {/* <div className="card bg-white my-4">
          <Collapse defaultActiveKey={['1']} items={[
            {
              key: '1',
              label: 'Show on map',
              children: (<ManpowerMappingMap />)
            }
          ]}
          />
        </div> */}

        <div className="bg-white p-4 my-4 card">

          <p className="my-4 font-bold text-xl">
            Skills and training details
          </p>

          <Table
            dataSource={manpowerMappingData.skillsAndTraining}
            columns={skillsTableColumns}
            pagination={{
              total: manpowerMappingData.skillsAndTraining.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,

            }}
            scroll={{ x: 'max-content' }}
          />
        </div>

        <div className="bg-white p-4 my-4 card">

          <p className="my-4 font-bold text-xl">
            Rapid Action Forces
          </p>

          <Table
            dataSource={manpowerMappingData.rapid_action_force_resources}
            columns={rapidActionsColumns}
            pagination={{
              total: manpowerMappingData.rapid_action_force_resources.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,

            }}
            scroll={{ x: 'max-content' }}
          />
        </div>

        <div className="bg-white p-4 my-4 card">

          <p className="my-4 font-bold text-xl">
            Forensic Unit
          </p>

          <Table
            dataSource={manpowerMappingData.forensic_unit_status}
            columns={forensicTableColumns}
            pagination={{
              total: manpowerMappingData.forensic_unit_status.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,

            }}
            scroll={{ x: 'max-content' }}
          />
        </div>

        <div className="bg-white p-4 my-4 card">

          <p className="my-4 font-bold text-xl">
            Moving Unit
          </p>

          <Table
            dataSource={manpowerMappingData.moving_unit_response}
            columns={movingTableColumns}
            pagination={{
              total: manpowerMappingData.moving_unit_response.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,

            }}
            scroll={{ x: 'max-content' }}
          />
        </div>

        <VSpacer height={200} />
      </div>
    </div>
  );
};

export default Manpower;
