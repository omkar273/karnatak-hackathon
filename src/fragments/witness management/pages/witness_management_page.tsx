import { ExportOutlined } from "@ant-design/icons"
import { Table } from "antd"
import { Link } from "react-router-dom"
import { witnessManagementData } from "../data/witness_management_data"

const WitnessManagementPage = () => {
    const witnessTableColumns = [
        {
            title: 'View',
            dataIndex: 'Name',
            key: 'Name',
            render: () => (<Link to={``}>
                <span className="mr-2 font-bold">view</span> <ExportOutlined />
            </Link>)
        },
        {
            "title": "witness_id",
            "dataIndex": "witness_id",
            "key": "witness_id"
        },
        {
            "title": "name",
            "dataIndex": "name",
            "key": "name",
            render: (forces: string) => (<span className="font-semibold text-base">{forces}</span>)
        },
        {
            "title": "designation",
            "dataIndex": "designation",
            "key": "designation"
        },
        {
            "title": "unit",
            "dataIndex": "unit",
            "key": "unit"
        },
        {
            "title": "contact_information",
            "dataIndex": "contact_information",
            "key": "contact_information",
            render: ((data: {
                phone: string,
                email: string,
                address: string,
            }) => (<div>
                <div>Phone : {data.phone}</div>
                <div>Email : {data.email}</div>
                <div>Address : {data.address}</div>
            </div>))
        },

        {
            "title": "statements",
            "dataIndex": "statements",
            "key": "statements",
            render: ((data: string[]) => (<div>
                {data.map((value) => (<div>{value}</div>))}
            </div>))
        },
        {
            "title": "availability_for_court",
            "dataIndex": "availability_for_court",
            "key": "availability_for_court",
            render: ((data: boolean) => (<div>{data ? 'Available' : 'Unavailable'}</div>))
        }
    ]
    return (
        <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
            <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
                {"FIR Details"}
            </p>
            <div className="p-4">
                <div className="bg-white p-4 my-4 card">

                    <p className="my-4 font-bold text-xl">
                        Witness management
                    </p>

                    <Table
                        dataSource={witnessManagementData}
                        columns={witnessTableColumns}
                        pagination={{
                            total: witnessManagementData.length,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,

                        }}
                        scroll={{ x: 'max-content' }}
                    />
                </div>

            </div>
        </div>
    )
}

export default WitnessManagementPage