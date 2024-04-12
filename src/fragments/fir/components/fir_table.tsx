import { VSpacer } from "@/common/components/spacer";
import { ExportOutlined, FileTextOutlined } from "@ant-design/icons";
import { Radio, Table, TablePaginationConfig } from 'antd';
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import useGetAllFIRs from "../hooks/use_getall_fir";

const FirDetailsTable = ({ reload = true }: { reload?: boolean }) => {



    const [timeFrame, setTimeFrame] = useState<"thisMonth" | "lastMonth" | "thisYear" | "all">("thisMonth");
    const { documents, fetchFIRs, loading, error } = useGetAllFIRs(timeFrame);

    useEffect(() => {
        fetchFIRs().catch(console.error);
    }, [timeFrame, reload]);



    const handleTableChange = (pagination: TablePaginationConfig,) => {
        const { current } = pagination;
        fetchFIRs(current === 1);
    };

    const columns = [
        {
            title: 'View',
            dataIndex: 'id',
            key: 'id',
            render: (id: string) => (<a href={`/fir/details?id=${id}`}>
                <span className="mr-2">view</span> <ExportOutlined />
            </a>)
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Father Name',
            dataIndex: 'fatherName',
            key: 'fatherName',
        },
        {
            title: 'Mobile No',
            dataIndex: 'mobileNo',
            key: 'mobileNo',
        },
        {
            title: 'Email Address',
            dataIndex: 'emailAddress',
            key: 'emailAddress',
        },
        {
            title: 'Present Address',
            dataIndex: 'presentAddress',
            key: 'presentAddress',
        },
        {
            title: 'Date of Incident',
            dataIndex: 'dateOfIncident',
            key: 'dateOfIncident',
        },
        {
            title: 'Time of Incident',
            dataIndex: 'timeOfIncident',
            key: 'timeOfIncident',
        },
        {
            title: 'Place of Incident',
            dataIndex: 'placeOfIncident',
            key: 'placeOfIncident',
        },
        {
            title: 'Details of Incident',
            dataIndex: 'detailsOfIncident',
            key: 'detailsOfIncident',
        },
    ];

    return (
        <div className="card">

            {/* heading */}
            <div className="md:flex justify-between items-center">
                <p className="font-semibold text-xl">
                    <FileTextOutlined /> {"FIR Details"}
                </p>
                <Radio.Group defaultValue="thisMonth" buttonStyle="solid"
                    onChange={(e) => setTimeFrame(e.target.value)}>
                    <Radio.Button value="thisMonth">This Month</Radio.Button>
                    <Radio.Button value="lastMonth">Last Month</Radio.Button>
                    <Radio.Button value="thisYear">This Year</Radio.Button>
                    <Radio.Button value="all">All</Radio.Button>
                </Radio.Group>
            </div>

            <VSpacer height={50} />

            {loading &&
                <div className="w-full flex flex-col justify-center items-center py-16 gap-4" >
                    <FadeLoader
                        color="#00edff"
                        loading
                    />
                    <p className="font-semibold">Loading the fir details</p>
                </div>
            }

            {!loading && <Table
                dataSource={documents}
                columns={columns}
                pagination={{
                    total: documents.length,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,

                }}
                loading={loading}
                onChange={handleTableChange}
                scroll={{ x: 'max-content' }}
            />}

            {error && <div>Error: {error.message}</div>}

        </div >
    );
}

export default FirDetailsTable;
