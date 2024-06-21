import { Table } from "antd";

const WeaponsPage = () => {
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
      fireRate: "600 rounds/min",
      bulletMM: "7.62mm",
      noOfRoundsInMagazine: 30,
      yearSinceInDepartment: "10 years",
      additionalAlotted: "Officer A",
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
      fireRate: "1000 rounds/min",
      bulletMM: "9mm",
      noOfRoundsInMagazine: 15,
      yearSinceInDepartment: "8 years",
      additionalAlotted: "Officer B",
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

  const weaponViewData = [
    {
      key: "1",
      label: "Weapon Name",
      value: "AK-47",
    },
    {
      key: "2",
      label: "Weapon Type",
      value: "Assault Rifle",
    },
    {
      key: "3",
      label: "Fire Rate",
      value: "600 rounds/min",
    },
    {
      key: "4",
      label: "Bullet MM",
      value: "7.62mm",
    },
    {
      key: "5",
      label: "No. Of Rounds in Magazine",
      value: 30,
    },
    {
      key: "6",
      label: "Year Since Gun In Department",
      value: "10 years",
    },
  ];

  const weaponViewColumns = [
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
        {"Weapon Details"}
      </p>

      <div className="p-4">
        {/* Summary Section */}
        <div className="flex justify-between bg-white p-4 mb-4 rounded-lg shadow-md">
          <div className="w-1/2 pr-2">
            <p className="text-lg font-medium">
              No. of officers previously allotted Gun:{" "}
              <span className="font-bold">89</span>
            </p>
          </div>
          <div className="w-1/2 pl-2 text-right">
            <p className="text-lg font-medium">
              No. of people currently allotted this Gun:{" "}
              <span className="font-bold">100</span>
            </p>
          </div>
        </div>

        {/* Weapon View */}
        <div className="bg-white p-4 my-4 card">
          <p className="my-4 font-bold text-xl">Weapon View</p>
          <div className="flex">
            {/* Left side for image */}
            <div className="w-2/5 p-4">
              <img src="url_to_image" alt="Weapon" className="w-full" />
            </div>
            {/* Right side for table */}
            <div className="w-3/5 p-4">
              <Table
                dataSource={weaponViewData}
                columns={weaponViewColumns}
                pagination={false}
                showHeader={false}
              />
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default WeaponsPage;
