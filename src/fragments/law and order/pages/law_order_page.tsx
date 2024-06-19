import { ExportOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { law_and_order_data } from "../../../data/law_order_data";

const LawOrderPage = () => {
  const trafficMnagamentColumns = [
    {
      title: "View",
      dataIndex: "Name",
      key: "Name",
      render: () => (
        <Link to={``}>
          <span className="mr-2 font-bold">view</span> <ExportOutlined />
        </Link>
      ),
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
      render: (location: string) => (
        <span className="font-semibold text-base">{location}</span>
      ),
    },
    {
      title: "traffic_condition",
      dataIndex: "traffic_condition",
      key: "traffic_condition",
    },
    {
      title: "congestion_level",
      dataIndex: "congestion_level",
      key: "congestion_level",
    },
    {
      title: "traffic_incidents",
      dataIndex: "traffic_incidents",
      key: "traffic_incidents",
      render: (
        data: {
          type: string;
          description: string;
        }[]
      ) => (
        <div>
          {data.map((value) => (
            <div>
              <div>{value.type}</div>
              <div>{value.description}</div>
            </div>
          ))}
        </div>
      ),
    },

    {
      title: "road_closures",
      dataIndex: "road_closures",
      key: "road_closures",
      render: (
        data: {
          location: string;
          status: string;
        }[]
      ) => (
        <div>
          {data.map((value) => (
            <div>
              <div>{value.status}</div>
              <div>{value.location}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "construction_zones",
      dataIndex: "construction_zones",
      key: "construction_zones",
      render: (
        data: {
          location: string;
          status: string;
        }[]
      ) => (
        <div>
          {data.map((value) => (
            <div>
              <div>{value.status}</div>
              <div>{value.location}</div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const riotsTableColumns = [
    {
      title: "View",
      dataIndex: "Name",
      key: "Name",
      render: () => (
        <Link to={``}>
          <span className="mr-2 font-bold">view</span> <ExportOutlined />
        </Link>
      ),
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
      render: (location: string) => (
        <span className="font-semibold text-base">{location}</span>
      ),
    },
    {
      title: "disturbance_location",
      dataIndex: "disturbance_location",
      key: "disturbance_location",
    },
    {
      title: "crowd_size",
      dataIndex: "crowd_size",
      key: "crowd_size",
      render: (location: string) => (
        <span className="font-semibold text-base">{location}</span>
      ),
    },

    {
      title: "movement_pattern",
      dataIndex: "movement_patterns",
      key: "movement_patterns",
      render: (data: string[]) => (
        <div>
          {data.map((value) => (
            <div>{value}</div>
          ))}
        </div>
      ),
    },
    {
      title: "potential_hotspots",
      dataIndex: "potential_hotspots",
      key: "potential_hotspots",
      render: (data: string[]) => (
        <div>
          {data.map((value) => (
            <div>{value}</div>
          ))}
        </div>
      ),
    },
  ];

  const incidentTableColumns = [
    {
      title: "type_of_incident",
      dataIndex: "type_of_incident",
      key: "type_of_incident",
    },
    {
      title: "reporting_unit",
      dataIndex: "reporting_unit",
      key: "reporting_unit",
    },
    {
      title: "location",
      dataIndex: "locationt",
      key: "locationt",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "additional_details",
      dataIndex: "additional_details",
      key: "additional_details",
    },
  ];

  const eventTableColumns = [
    {
      title: "Event Details",
      dataIndex: "event_details",
      key: "event_details",
    },
    {
      title: "Police Forces Demand",
      dataIndex: "police_forces_demand",
      key: "police_forces_demand",
    },
    {
      title: "Event Purpose",
      dataIndex: "event_purpose",
      key: "event_purpose",
    },
    {
      title: "Location Time",
      dataIndex: "location_time",
      key: "location_time",
    },

    {
      title: "Permission",
      dataIndex: "permission",
      key: "permission",
    },
  ];
  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
      <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
        {"Law and Order"}
      </p>

      <div className="p-4">
        {/* public events */}
        <div className="bg-white p-4 my-4 card">
          <p className="my-4 font-bold text-xl">Public events management</p>

          <Table
            dataSource={law_and_order_data.public_events}
            columns={eventTableColumns}
            pagination={{
              total: law_and_order_data.public_events.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>

        {/* traffic */}

        {/* riots */}
        <div className="bg-white p-4 my-4 card">
          <p className="my-4 font-bold text-xl">Traffic Management</p>

          <Table
            dataSource={law_and_order_data.riots}
            columns={riotsTableColumns}
            pagination={{
              total: law_and_order_data.riots.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>

        {/* incidents */}
        <div className="bg-white p-4 my-4 card">
          <p className="my-4 font-bold text-xl">Incident Reporting</p>

          <Table
            dataSource={law_and_order_data.incident_reports}
            columns={incidentTableColumns}
            pagination={{
              total: law_and_order_data.incident_reports.length,
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
  );
};

export default LawOrderPage;
