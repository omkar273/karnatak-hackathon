import { Table } from "antd";

const ManpowerPages = () => {
  const unitListColumns = [
    {
      title: "Names",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designations",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Thumbnails",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => (
        <img src={thumbnail} alt="Thumbnail" style={{ width: "50px" }} />
      ),
    },
  ];

  const statusIndicatorColumns = [
    {
      title: "Name of each unit",
      dataIndex: "unit_name",
      key: "unit_name",
    },
    {
      title: "Current status of each unit",
      dataIndex: "current_status",
      key: "current_status",
    },
    {
      title: "Visual cues",
      dataIndex: "visual_cues",
      key: "visual_cues",
    },
  ];

  const resourcesColumns = [
    {
      title: "Type of Force needed",
      dataIndex: "force_type",
      key: "force_type",
    },
    {
      title: "Nearby Force (Available)",
      dataIndex: "nearby_force",
      key: "nearby_force",
    },
    {
      title: "Current location of nearby force",
      dataIndex: "current_location",
      key: "current_location",
    },
    {
      title: "Time To reach the location",
      dataIndex: "time_to_reach",
      key: "time_to_reach",
    },
  ];

  const fleetManagementColumns = [
    {
      title: "Vehicle Unit",
      dataIndex: "vehicle_unit",
      key: "vehicle_unit",
    },
    {
      title: "Current status of each Vehicle (active, idle)",
      dataIndex: "current_status",
      key: "current_status",
    },
    {
      title: "Vehicle Occupied",
      dataIndex: "vehicle_occupied",
      key: "vehicle_occupied",
    },
    {
      title: "Time taken to reach the location",
      dataIndex: "time_to_reach",
      key: "time_to_reach",
    },
  ];

  const surveillanceColumns = [
    {
      title: "GPS markers",
      dataIndex: "gps_markers",
      key: "gps_markers",
    },
    {
      title: "Route information",
      dataIndex: "route_info",
      key: "route_info",
    },
    {
      title: "Any critical alerts or notifications",
      dataIndex: "alerts",
      key: "alerts",
    },
    {
      title: "Motion Detection Alert",
      dataIndex: "motion_alert",
      key: "motion_alert",
    },
    {
      title: "Visuals Of incident",
      dataIndex: "visuals",
      key: "visuals",
      render: () => (
        <iframe
          width="200"
          height="113"
          src="https://www.youtube.com/embed/CrvE8COeLDsz1ax8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ),
    },
  ];

  const reportingColumns = [
    {
      title: "Type of incident",
      dataIndex: "incident_type",
      key: "incident_type",
    },
    {
      title: "Unit that reported the incident",
      dataIndex: "reporting_unit",
      key: "reporting_unit",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Description of what happened",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Additional relevant details",
      dataIndex: "additional_details",
      key: "additional_details",
    },
  ];

  const deployedEmployeesColumns = [
    {
      title: "Unit name",
      dataIndex: "unit_name",
      key: "unit_name",
    },
    {
      title: "Total Number of members in unit",
      dataIndex: "total_members",
      key: "total_members",
    },
    {
      title: "Weapons wielded",
      dataIndex: "weapons",
      key: "weapons",
    },
    {
      title: "Live Tracking of unit",
      dataIndex: "live_tracking",
      key: "live_tracking",
    },
  ];

  // Sample data
  const sampleData = {
    unit_list: [
      {
        name: "Unit 1",
        designation: "Leader",
        thumbnail: "path/to/thumbnail1.jpg",
      },
      {
        name: "Unit 2",
        designation: "Member",
        thumbnail: "path/to/thumbnail2.jpg",
      },
    ],
    status_indicator: [
      { unit_name: "Unit 1", current_status: "Active", visual_cues: "Green" },
      { unit_name: "Unit 2", current_status: "Idle", visual_cues: "Red" },
    ],
    resources: [
      {
        force_type: "Type A",
        nearby_force: "Force 1",
        current_location: "Location 1",
        time_to_reach: "10 mins",
      },
      {
        force_type: "Type B",
        nearby_force: "Force 2",
        current_location: "Location 2",
        time_to_reach: "20 mins",
      },
    ],
    fleet_management: [
      {
        vehicle_unit: "Vehicle 1",
        current_status: "Active",
        vehicle_occupied: "Yes",
        time_to_reach: "5 mins",
      },
      {
        vehicle_unit: "Vehicle 2",
        current_status: "Idle",
        vehicle_occupied: "No",
        time_to_reach: "15 mins",
      },
    ],
    surveillance: [
      {
        gps_markers: "Marker 1",
        route_info: "Route A",
        alerts: "Alert 1",
        motion_alert: "None",
        visuals: "",
      },
      {
        gps_markers: "Marker 2",
        route_info: "Route B",
        alerts: "Alert 2",
        motion_alert: "Detected",
        visuals: "",
      },
    ],
    reporting: [
      {
        incident_type: "Type A",
        reporting_unit: "Unit 1",
        location: "Loc 1",
        description: "Desc 1",
        additional_details: "Details 1",
      },
      {
        incident_type: "Type B",
        reporting_unit: "Unit 2",
        location: "Loc 2",
        description: "Desc 2",
        additional_details: "Details 2",
      },
    ],
    deployed_employees: [
      {
        unit_name: "Unit 1",
        total_members: "10",
        weapons: "Weapon A",
        live_tracking: "Enabled",
      },
      {
        unit_name: "Unit 2",
        total_members: "5",
        weapons: "Weapon B",
        live_tracking: "Disabled",
      },
    ],
  };

  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100 ">
      <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
        {"Manpower Management"}
      </p>
      <div className="p-4 space-y-8">
        {/* Unit List */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p className="font-bold text-xl mb-4">Unit List</p>
          <Table
            dataSource={sampleData.unit_list}
            columns={unitListColumns}
            pagination={{
              total: sampleData.unit_list.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>

        {/* Status Indicator */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p className="font-bold text-xl mb-4">Status Indicator</p>
          <Table
            dataSource={sampleData.status_indicator}
            columns={statusIndicatorColumns}
            pagination={{
              total: sampleData.status_indicator.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>

        {/* Resources */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p className="font-bold text-xl mb-4">
            Resources (Rapid action force)
          </p>
          <Table
            dataSource={sampleData.resources}
            columns={resourcesColumns}
            pagination={{
              total: sampleData.resources.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>

        {/* Fleet Management */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p className="font-bold text-xl mb-4">Fleet Management</p>
          <Table
            dataSource={sampleData.fleet_management}
            columns={fleetManagementColumns}
            pagination={{
              total: sampleData.fleet_management.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>

        {/* Surveillance */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p className="font-bold text-xl mb-4">Surveillance</p>
          <Table
            dataSource={sampleData.surveillance}
            columns={surveillanceColumns}
            pagination={{
              total: sampleData.surveillance.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>

        {/* Reporting */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p className="font-bold text-xl mb-4">Reporting</p>
          <Table
            dataSource={sampleData.reporting}
            columns={reportingColumns}
            pagination={{
              total: sampleData.reporting.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>

        {/* Deployed Employees */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p className="font-bold text-xl mb-4">Deployed Employees</p>
          <Table
            dataSource={sampleData.deployed_employees}
            columns={deployedEmployeesColumns}
            pagination={{
              total: sampleData.deployed_employees.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default ManpowerPages;
