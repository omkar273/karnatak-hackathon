import { ExportOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { law_and_order_data } from "../../../data/law_order_data";

const LawOrderPage = () => {
  const incidentReportingColumns = [
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Nature of the Incident",
      dataIndex: "nature",
      key: "nature",
    },
    {
      title: "Involved Parties",
      dataIndex: "involved_parties",
      key: "involved_parties",
    },
    {
      title: "Actions Taken",
      dataIndex: "actions_taken",
      key: "actions_taken",
    },
  ];

  const riotManagementColumns = [
    {
      title: "Locations of Disturbances",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Crowd Sizes (In number)",
      dataIndex: "crowd_size",
      key: "crowd_size",
    },
    {
      title: "Movement Patterns",
      dataIndex: "movement_patterns",
      key: "movement_patterns",
    },
    {
      title: "Potential Hotspots",
      dataIndex: "potential_hotspots",
      key: "potential_hotspots",
    },
  ];

  const trafficManagementColumns = [
    {
      title: "Traffic Condition",
      dataIndex: "traffic_condition",
      key: "traffic_condition",
    },
    {
      title: "Congestion Levels",
      dataIndex: "congestion_levels",
      key: "congestion_levels",
    },
    {
      title: "Traffic Incidents",
      dataIndex: "traffic_incidents",
      key: "traffic_incidents",
    },
    {
      title: "Road Closures",
      dataIndex: "road_closures",
      key: "road_closures",
    },
    {
      title: "Construction Zones",
      dataIndex: "construction_zones",
      key: "construction_zones",
    },
  ];

  const crowdManagementColumns = [
    {
      title: "Crowd Size",
      dataIndex: "crowd_size",
      key: "crowd_size",
    },
    {
      title: "Density",
      dataIndex: "density",
      key: "density",
    },
    {
      title: "Movement Patterns",
      dataIndex: "movement_patterns",
      key: "movement_patterns",
    },
    {
      title: "Potential Areas of Concern",
      dataIndex: "potential_areas_of_concern",
      key: "potential_areas_of_concern",
    },
  ];

  const vipSecurityColumns = [
    {
      title: "Name of VIP",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Personal Details",
      dataIndex: "personal_details",
      key: "personal_details",
    },
    {
      title: "Contact Information",
      dataIndex: "contact_information",
      key: "contact_information",
    },
    {
      title: "Travel Itineraries",
      dataIndex: "travel_itineraries",
      key: "travel_itineraries",
    },
    {
      title: "Security Preferences",
      dataIndex: "security_preferences",
      key: "security_preferences",
    },
  ];

  const publicEventsColumns = [
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
      title: "Location (Time)",
      dataIndex: "location_time",
      key: "location_time",
    },
    {
      title: "Permission (Approved/Rejected)",
      dataIndex: "permission",
      key: "permission",
    },
  ];

  // Sample data
  const sampleData = {
    incident_reporting: [
      {
        location: "Location 1",
        time: "10:00 AM",
        nature: "Theft",
        involved_parties: "Person A, Person B",
        actions_taken: "Reported to Police",
      },
      {
        location: "Location 2",
        time: "02:00 PM",
        nature: "Accident",
        involved_parties: "Car 1, Car 2",
        actions_taken: "Ambulance Called",
      },
    ],
    riot_management: [
      {
        location: "Area 1",
        crowd_size: 500,
        movement_patterns: "North to South",
        potential_hotspots: "Market Area",
      },
      {
        location: "Area 2",
        crowd_size: 300,
        movement_patterns: "East to West",
        potential_hotspots: "City Square",
      },
    ],
    traffic_management: [
      {
        traffic_condition: "Heavy",
        congestion_levels: "High",
        traffic_incidents: "Accident",
        road_closures: "Main St",
        construction_zones: "Broadway",
      },
      {
        traffic_condition: "Moderate",
        congestion_levels: "Medium",
        traffic_incidents: "Breakdown",
        road_closures: "2nd Ave",
        construction_zones: "Elm St",
      },
    ],
    crowd_management: [
      {
        crowd_size: 1000,
        density: "High",
        movement_patterns: "Circle",
        potential_areas_of_concern: "Stage Area",
      },
      {
        crowd_size: 700,
        density: "Medium",
        movement_patterns: "Line",
        potential_areas_of_concern: "Entrance",
      },
    ],
    vip_security: [
      {
        name: "VIP 1",
        personal_details: "Detail 1",
        contact_information: "1234567890",
        travel_itineraries: "Itinerary 1",
        security_preferences: "High",
      },
      {
        name: "VIP 2",
        personal_details: "Detail 2",
        contact_information: "0987654321",
        travel_itineraries: "Itinerary 2",
        security_preferences: "Medium",
      },
    ],
    public_events: [
      {
        event_details: "Event 1",
        police_forces_demand: "High",
        location_time: "Location A (12:00 PM)",
        permission: "Approved",
      },
      {
        event_details: "Event 2",
        police_forces_demand: "Medium",
        location_time: "Location B (04:00 PM)",
        permission: "Rejected",
      },
    ],
  };
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
        <div className="my-4">
          {/* Incident Reporting */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="font-bold text-xl mb-4">Incident Reporting</p>
            <Table
              dataSource={sampleData.incident_reporting}
              columns={incidentReportingColumns}
              pagination={{
                total: sampleData.incident_reporting.length,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `Showing ${range[0]}-${range[1]} of ${total} items`,
              }}
              scroll={{ x: "max-content" }}
            />
          </div>

          {/* Riot Management */}
          <div className="bg-white p-4 my-4 rounded-lg shadow-lg">
            <p className="font-bold text-xl mb-4">Riot Management</p>
            <Table
              dataSource={sampleData.riot_management}
              columns={riotManagementColumns}
              pagination={{
                total: sampleData.riot_management.length,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `Showing ${range[0]}-${range[1]} of ${total} items`,
              }}
              scroll={{ x: "max-content" }}
            />
          </div>

          {/* Traffic Management */}
          <div className="bg-white p-4 my-4 rounded-lg shadow-lg">
            <p className="font-bold text-xl mb-4">Traffic Management</p>
            <Table
              dataSource={sampleData.traffic_management}
              columns={trafficManagementColumns}
              pagination={{
                total: sampleData.traffic_management.length,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `Showing ${range[0]}-${range[1]} of ${total} items`,
              }}
              scroll={{ x: "max-content" }}
            />
          </div>

          {/* Crowd Management */}
          <div className="bg-white p-4 my-4 rounded-lg shadow-lg">
            <p className="font-bold text-xl mb-4">Crowd Management</p>
            <Table
              dataSource={sampleData.crowd_management}
              columns={crowdManagementColumns}
              pagination={{
                total: sampleData.crowd_management.length,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `Showing ${range[0]}-${range[1]} of ${total} items`,
              }}
              scroll={{ x: "max-content" }}
            />
          </div>

          {/* VIP Security */}
          <div className="bg-white p-4 my-4 rounded-lg shadow-lg">
            <p className="font-bold text-xl mb-4">VIP Security</p>
            <Table
              dataSource={sampleData.vip_security}
              columns={vipSecurityColumns}
              pagination={{
                total: sampleData.vip_security.length,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `Showing ${range[0]}-${range[1]} of ${total} items`,
              }}
              scroll={{ x: "max-content" }}
            />
          </div>

          {/* Public Events */}
          <div className="bg-white p-4 my-4 rounded-lg shadow-lg">
            <p className="font-bold text-xl mb-4">Public Events</p>
            <Table
              dataSource={sampleData.public_events}
              columns={publicEventsColumns}
              pagination={{
                total: sampleData.public_events.length,
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
    </div>
  );
};

export default LawOrderPage;
