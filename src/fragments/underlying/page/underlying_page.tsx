import dummyUserData from "@/fragments/user_management/data/underlying_data"
import { ExportOutlined } from "@ant-design/icons"
import { Table } from "antd"
import { Link } from "react-router-dom"

const UnderlyingDataPage = () => {

    const underlyingTableColumns = [
        {
            title: 'View',
            dataIndex: 'id',
            key: 'id',
            render: (id: string) => (<Link to={`/fir_details?id=${id}`}>
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
            title: 'post',
            dataIndex: 'post',
            key: 'post',
        },
        {
            title: 'Current Posting',
            dataIndex: 'currentPosting',
            key: 'currentPosting',
        },
        {
            title: 'Solved Cases',
            dataIndex: 'solvedCases',
            key: 'solvedCases',
        },
    ]

    return (
        <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
            <p className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
                {"Underlying management"}
            </p>
            <div className="p-4">
                <div className="card">
                    <div className="bg-white p-4 my-4 card">

                        <p className="my-4 font-bold text-xl">
                            Underlyings
                        </p>

                        <Table
                            dataSource={dummyUserData}
                            columns={underlyingTableColumns}
                            pagination={{
                                total: dummyUserData.length,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,

                            }}
                            scroll={{ x: 'max-content' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UnderlyingDataPage