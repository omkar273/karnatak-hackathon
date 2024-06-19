import { Table } from "antd";

const VehiclePage = () => {
  const vehicleData = [
    {
      key: "1",
      carName: "Toyota Camry",
      distanceTravel: "1200 km",
      modelNo: "CAM2021",
      colour: "Red",
      driverName: "John Doe",
      dateProvided: "2022-01-15",
      recentService: "2023-03-10",
    },
    {
      key: "2",
      carName: "Honda Accord",
      distanceTravel: "900 km",
      modelNo: "ACC2020",
      colour: "Blue",
      driverName: "Jane Smith",
      dateProvided: "2021-06-20",
      recentService: "2023-01-05",
    },
    {
      key: "3",
      carName: "Ford Focus",
      distanceTravel: "1500 km",
      modelNo: "FOC2019",
      colour: "Black",
      driverName: "Mike Johnson",
      dateProvided: "2020-10-10",
      recentService: "2022-12-15",
    },
  ];

  const vehicleColumns = [
    {
      title: "Car Name",
      dataIndex: "carName",
      key: "carName",
    },
    {
      title: "Distance Travel",
      dataIndex: "distanceTravel",
      key: "distanceTravel",
    },
    {
      title: "Model No.",
      dataIndex: "modelNo",
      key: "modelNo",
    },
    {
      title: "Colour",
      dataIndex: "colour",
      key: "colour",
      render: (colour) => (
        <span style={{ color: colour.toLowerCase() }}>{colour}</span>
      ),
    },
    {
      title: "Name of Driver",
      dataIndex: "driverName",
      key: "driverName",
    },
    {
      title: "Date Provided",
      dataIndex: "dateProvided",
      key: "dateProvided",
    },
    {
      title: "Recent Service Details",
      dataIndex: "recentService",
      key: "recentService",
    },
  ];

  const weaponsData = [
    {
      key: "1",
      weaponName: "Glock 19",
      weaponType: "Pistol",
      weaponWilder: "Officer A",
      servicingDate: "2023-04-01",
    },
    {
      key: "2",
      weaponName: "M4 Carbine",
      weaponType: "Rifle",
      weaponWilder: "Officer B",
      servicingDate: "2023-02-15",
    },
  ];

  const weaponsColumns = [
    {
      title: "Weapon Name",
      dataIndex: "weaponName",
      key: "weaponName",
    },
    {
      title: "Weapon Type",
      dataIndex: "weaponType",
      key: "weaponType",
    },
    {
      title: "Name of Weapon Wilder",
      dataIndex: "weaponWilder",
      key: "weaponWilder",
    },
    {
      title: "Servicing Date",
      dataIndex: "servicingDate",
      key: "servicingDate",
    },
  ];

  const requestData = [
    {
      key: "1",
      requesterName: "Alice Brown",
      requestDate: "2023-05-10",
      requestDetails: "Request for new uniforms",
      status: "Approved",
    },
    {
      key: "2",
      requesterName: "Bob White",
      requestDate: "2023-06-05",
      requestDetails: "Request for equipment maintenance",
      status: "Denied",
    },
  ];

  const requestColumns = [
    {
      title: "Requester Name",
      dataIndex: "requesterName",
      key: "requesterName",
    },
    {
      title: "Date of Request Made",
      dataIndex: "requestDate",
      key: "requestDate",
    },
    {
      title: "Request Details",
      dataIndex: "requestDetails",
      key: "requestDetails",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "Approved" ? "green" : "red" }}>
          {status}
        </span>
      ),
    },
  ];

  const weapon2Data = [
    {
      key: "1",
      weaponName: "AK-47",
      weaponType: "Assault Rifle",
      weaponPicture: "url_to_image",
      weaponIncharge: "Officer C",
      bulletPerMagazine: 30,
      magazineUsed: 5,
      serviceDate: "2023-03-20",
    },
    {
      key: "2",
      weaponName: "M9",
      weaponType: "Pistol",
      weaponPicture: "url_to_image",
      weaponIncharge: "Officer D",
      bulletPerMagazine: 15,
      magazineUsed: 3,
      serviceDate: "2023-05-10",
    },
  ];

  const weapon2Columns = [
    {
      title: "Weapon Name",
      dataIndex: "weaponName",
      key: "weaponName",
    },
    {
      title: "Weapon Type",
      dataIndex: "weaponType",
      key: "weaponType",
    },
    {
      title: "Weapon Picture",
      dataIndex: "weaponPicture",
      key: "weaponPicture",
      render: (url) => (
        <img src={url} alt="Weapon" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Name of Weapon Incharge",
      dataIndex: "weaponIncharge",
      key: "weaponIncharge",
    },
    {
      title: "No. of Bullet per Magazine",
      dataIndex: "bulletPerMagazine",
      key: "bulletPerMagazine",
    },
    {
      title: "No. of Magazine Used",
      dataIndex: "magazineUsed",
      key: "magazineUsed",
    },
    {
      title: "Date of Service",
      dataIndex: "serviceDate",
      key: "serviceDate",
    },
  ];

  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
      <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
        {"Vehicle Page"}
      </p>

      <div className="p-4">
        {/* Vehicle Details */}
        <div className="bg-white p-4 my-4 card">
          <p className="my-4 font-bold text-xl">Vehicle Details</p>
          <Table
            dataSource={vehicleData}
            columns={vehicleColumns}
            pagination={{
              total: vehicleData.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>

        {/* Weapons */}
        <div className="bg-white p-4 my-4 card">
          <p className="my-4 font-bold text-xl">Weapon Holdings Details</p>
          <Table
            dataSource={weaponsData}
            columns={weaponsColumns}
            pagination={{
              total: weaponsData.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>

        {/* Weapon 2 */}
        <div className="bg-white p-4 my-4 card">
          <p className="my-4 font-bold text-xl">Weapon Details</p>
          <Table
            dataSource={weapon2Data}
            columns={weapon2Columns}
            pagination={{
              total: weapon2Data.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: "max-content" }}
          />
        </div>

        {/* Requests */}
        <div className="bg-white p-4 my-4 card">
          <p className="my-4 font-bold text-xl">Requests</p>
          <Table
            dataSource={requestData}
            columns={requestColumns}
            pagination={{
              total: requestData.length,
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

export default VehiclePage;
