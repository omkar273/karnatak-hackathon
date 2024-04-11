import { VSpacer } from "@/common/components/spacer";
import { FileTextOutlined } from "@ant-design/icons";
import { Radio, Table } from 'antd';
import { useEffect, useState } from "react";
import useFIRs from "../hooks/use_get_fir";

const FirDetailsTable = () => {
    const [timeFrame, setTimeFrame] = useState<"thisMonth" | "lastMonth" | "thisYear" | "all">("thisMonth");
    const { documents, fetchFIRs, loading, error, hasMore } = useFIRs(timeFrame);

    useEffect(() => {
        fetchFIRs().catch(console.error);
    }, [timeFrame]);

    const columns = [
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
            <Table
                dataSource={documents}
                columns={columns}
                pagination={false} // Disable default pagination
                scroll={{ x: 'max-content' }} // Adjust the width as needed
            />

            <button type="button"
                onClick={() => console.log(documents)}>
                Print
            </button>

        </div >
    );
}

export default FirDetailsTable;
