import { VSpacer } from "@/common/components/spacer";
import { ExportOutlined, FileTextOutlined } from "@ant-design/icons";
import { Radio, Table, TablePaginationConfig } from 'antd';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import useGetAllFIRs from "../hooks/use_getall_fir";

const FirDetailsTable = ({ reload = true, stationId }: {
    reload?: boolean,
    stationId: string | undefined | null
}) => {



    const [timeFrame, setTimeFrame] = useState<"thisMonth" | "lastMonth" | "thisYear" | "all">("thisMonth");
    const { documents, fetchFIRs, loading, error } = useGetAllFIRs({
        timeFrame, stationId
    });

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
            render: (id: string) => (<Link to={`/fir_details?id=${id}`}>
                <span className="mr-2">view</span> <ExportOutlined />
            </Link>)
        },
        {
            title: 'Fir Status',
            dataIndex: 'fir_status',
            key: 'fir_status',
        },
        {
            title: 'Victim Village Area',
            dataIndex: 'Village_Area_Name',
            key: 'Village_Area_Name',
        },
        {
            title: 'Unit Name',
            dataIndex: 'UnitName',
            key: 'UnitName',
        },
        {
            title: 'Incharge Officer',
            dataIndex: 'IOName',
            key: 'IOName',
        },
        // {
        //     title: 'Present Address',
        //     dataIndex: 'presentAddress',
        //     key: 'presentAddress',
        // },
        // {
        //     title: 'Date of Incident',
        //     dataIndex: 'dateOfIncident',
        //     key: 'dateOfIncident',
        // },
        // {
        //     title: 'Time of Incident',
        //     dataIndex: 'timeOfIncident',
        //     key: 'timeOfIncident',
        // },
        // {
        //     title: 'Place of Incident',
        //     dataIndex: 'placeOfIncident',
        //     key: 'placeOfIncident',
        // },
        // {
        //     title: 'Details of Incident',
        //     dataIndex: 'detailsOfIncident',
        //     key: 'detailsOfIncident',
        // },
    ];

    return (
        <div className="card bg-white">

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
