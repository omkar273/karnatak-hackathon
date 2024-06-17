import { VSpacer } from "@/common/components/spacer";
import { ExportOutlined, FileTextOutlined } from "@ant-design/icons";
import { Radio, Table, TablePaginationConfig } from 'antd';
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import useGetAllStations from "../hooks/use_get_all_stations";

const StationsTable = ({ reload = true }: { reload: boolean }) => {
    const [timeFrame, setTimeFrame] = useState<"thisMonth" | "lastMonth" | "thisYear" | "all">("thisMonth");
    const { documents, fetchStations, loading, error } = useGetAllStations({ timeFrame });
    
    useEffect(() => {
        fetchStations().catch(console.error);
    }, [timeFrame, reload]);
    
    const handleTableChange = (pagination: TablePaginationConfig) => {
        const { current } = pagination;
        fetchStations(current === 1);
    };
    
    const columns = [
        {
            title: 'View',
            dataIndex: 'id',
            key: 'id',
            render: (id: string) => (<a href={`/fir/${id}`}>
                <span className="mr-2">View</span> <ExportOutlined />
            </a>)
        },
        {
            title: 'Station Name',
            dataIndex: 'station_name',
            key: 'station_name',
        },
        {
            title: 'Station Incharge Name',
            dataIndex: 'station_incharge_name',
            key: 'station_incharge_name',
        },
        {
            title: 'District',
            dataIndex: 'district',
            key: 'district',
        },
        {
            title: 'Zone Name',
            dataIndex: 'zone_name',
            key: 'zone_name',
        },
        {
            title: 'Zone Code',
            dataIndex: 'zone_code',
            key: 'zone_code',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        // {
        //     title: 'Crime Rate',
        //     dataIndex: 'crime_rate',
        //     key: 'crime_rate',
        // },
        // {
        //     title: 'Crime Clearance Rate',
        //     dataIndex: 'crime_clearance_rate',
        //     key: 'crime_clearance_rate',
        // },
    ];
    
    return (
        <div className="card">
            {/* heading */}
            <div className="md:flex justify-between items-center">
                <p className="font-semibold text-xl">
                    <FileTextOutlined /> {"Station Details"}
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
                <div className="w-full flex flex-col justify-center items-center py-16 gap-4">
                    <FadeLoader
                        color="#00edff"
                        loading
                    />
                    <p className="font-semibold">Loading the station details</p>
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
        </div>
    );
}

export default StationsTable;
