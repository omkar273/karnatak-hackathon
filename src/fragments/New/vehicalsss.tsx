import { Table } from "antd";

const VehiclesPagess = () => {
  const vehicleData = [
    {
      key: "1",
      vehicleName: "Ford Explorer",
      vehicleType: "SUV",
      vehiclePicture: "url_to_image",
      vehicleIncharge: "Officer X",
      seats: 5,
      serviceDate: "2023-03-20",
      topSpeed: "120 mph",
      fuelType: "Gasoline",
      mileage: "25 mpg",
      yearSinceInDepartment: "10 years",
      additionalAlotted: "Officer A",
    },
    {
      key: "2",
      vehicleName: "Harley Davidson",
      vehicleType: "Motorcycle",
      vehiclePicture: "url_to_image",
      vehicleIncharge: "Officer Y",
      seats: 2,
      serviceDate: "2023-05-10",
      topSpeed: "100 mph",
      fuelType: "Gasoline",
      mileage: "45 mpg",
      yearSinceInDepartment: "8 years",
      additionalAlotted: "Officer B",
    },
  ];

  const vehicleColumns = [
    {
      title: "Vehicle Name",
      dataIndex: "vehicleName",
      key: "vehicleName",
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicleType",
      key: "vehicleType",
    },
    {
      title: "Vehicle Picture",
      dataIndex: "vehiclePicture",
      key: "vehiclePicture",
      render: (url) => (
        <img src={url} alt="Vehicle" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Name of Vehicle Incharge",
      dataIndex: "vehicleIncharge",
      key: "vehicleIncharge",
    },
    {
      title: "No. of Seats",
      dataIndex: "seats",
      key: "seats",
    },
    {
      title: "Date of Service",
      dataIndex: "serviceDate",
      key: "serviceDate",
    },
  ];

  const vehicleViewData = [
    {
      key: "1",
      label: "Vehicle Name",
      value: "Ford Explorer",
    },
    {
      key: "2",
      label: "Vehicle Type",
      value: "SUV",
    },
    {
      key: "3",
      label: "Top Speed",
      value: "120 mph",
    },
    {
      key: "4",
      label: "Fuel Type",
      value: "Gasoline",
    },
    {
      key: "5",
      label: "Mileage",
      value: "25 mpg",
    },
    {
      key: "6",
      label: "Year Since Vehicle In Department",
      value: "10 years",
    },
  ];

  const vehicleViewColumns = [
    {
      title: "",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
      <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
        {"Vehicle Details"}
      </p>

      <div className="p-4">
        {/* Summary Section */}
        <div className="flex justify-between bg-white p-4 mb-4 rounded-lg shadow-md">
          <div className="w-1/2 pr-2">
            <p className="text-lg font-medium">
              No. of officers previously allotted Vehicle:{" "}
              <span className="font-bold">992</span>
            </p>
          </div>
          <div className="w-1/2 pl-2 text-right">
            <p className="text-lg font-medium">
              No. of people currently allotted this Vehicle:{" "}
              <span className="font-bold">2400</span>
            </p>
          </div>
        </div>

        {/* Vehicle View */}
        <div className="bg-white p-4 my-4 card">
          <p className="my-4 font-bold text-xl">Vehicle View</p>
          <div className="flex">
            {/* Left side for image */}
            <div className="w-2/5 p-4">
              <img src="url_to_image" alt="Vehicle" className="w-full" />
            </div>
            {/* Right side for table */}
            <div className="w-3/5 p-4">
              <Table
                dataSource={vehicleViewData}
                columns={vehicleViewColumns}
                pagination={false}
                showHeader={false}
              />
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default VehiclesPagess;
