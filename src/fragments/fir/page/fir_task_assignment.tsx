import React, { useState, useEffect } from 'react';
import { Button, Card, Input, Select, Form, Table, Tag, Space, Modal, message } from 'antd';
import { PlusOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import fakePersonnelData from '@/data/json/fake_fir_personnel.json';

const { TextArea } = Input;
const { Option } = Select;

interface FIRTask {
    id: string;
    taskName: string;
    taskDescription: string;
    assignedTo: string;
    assignedToName: string;
    taskStatus: 'Pending' | 'In Progress' | 'Completed' | 'On Hold';
    taskPriority: 'Low' | 'Medium' | 'High' | 'Critical';
    createdDate: string;
    dueDate?: string;
    firNumber?: string;
    caseType?: string;
}

const FIRTaskAssignment: React.FC = () => {
    const [form] = Form.useForm();
    const [tasks, setTasks] = useState<FIRTask[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // Load tasks from localStorage on component mount
    useEffect(() => {
        const savedTasks = localStorage.getItem('firTasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        } else {
            // Initialize with some fake tasks
            const initialTasks: FIRTask[] = [
                {
                    id: 'task_001',
                    taskName: 'Investigate Theft Case',
                    taskDescription: 'Investigate the theft reported at MG Road. Collect evidence and interview witnesses.',
                    assignedTo: 'fir_001',
                    assignedToName: 'Inspector Rajesh Kumar',
                    taskStatus: 'In Progress',
                    taskPriority: 'High',
                    createdDate: new Date().toISOString(),
                    firNumber: 'FIR/2024/001',
                    caseType: 'Theft',
                },
                {
                    id: 'task_002',
                    taskName: 'Cybercrime Investigation',
                    taskDescription: 'Investigate online fraud case reported by victim. Track digital footprints.',
                    assignedTo: 'fir_004',
                    assignedToName: 'Constable Anjali Patel',
                    taskStatus: 'Pending',
                    taskPriority: 'Medium',
                    createdDate: new Date().toISOString(),
                    firNumber: 'FIR/2024/002',
                    caseType: 'Cybercrime',
                },
                {
                    id: 'task_003',
                    taskName: 'Drug Case Follow-up',
                    taskDescription: 'Follow up on the drug seizure case. Coordinate with forensics for sample analysis.',
                    assignedTo: 'fir_006',
                    assignedToName: 'Sub-Inspector Meera Joshi',
                    taskStatus: 'Completed',
                    taskPriority: 'Critical',
                    createdDate: new Date().toISOString(),
                    firNumber: 'FIR/2024/003',
                    caseType: 'Drug Related',
                }
            ];
            setTasks(initialTasks);
            localStorage.setItem('firTasks', JSON.stringify(initialTasks));
        }
    }, []);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('firTasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const assignedPerson = fakePersonnelData.find(person => person.id === values.assignedTo);

            const newTask: FIRTask = {
                id: `task_${Date.now()}`,
                taskName: values.taskName,
                taskDescription: values.taskDescription,
                assignedTo: values.assignedTo,
                assignedToName: assignedPerson?.name || 'Unknown',
                taskStatus: values.taskStatus || 'Pending',
                taskPriority: values.taskPriority,
                createdDate: new Date().toISOString(),
                dueDate: values.dueDate,
                firNumber: values.firNumber,
                caseType: values.caseType,
            };

            setTasks(prevTasks => [...prevTasks, newTask]);
            form.resetFields();
            setIsModalVisible(false);
            message.success('FIR Task created successfully!');
        } catch (error) {
            message.error('Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'green';
            case 'In Progress': return 'blue';
            case 'Pending': return 'orange';
            case 'On Hold': return 'red';
            default: return 'default';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Critical': return 'red';
            case 'High': return 'orange';
            case 'Medium': return 'blue';
            case 'Low': return 'green';
            default: return 'default';
        }
    };

    const columns = [
        {
            title: 'FIR Number',
            dataIndex: 'firNumber',
            key: 'firNumber',
            render: (text: string) => text || 'N/A',
        },
        {
            title: 'Task Name',
            dataIndex: 'taskName',
            key: 'taskName',
            render: (text: string) => <strong>{text}</strong>,
        },
        {
            title: 'Assigned To',
            dataIndex: 'assignedToName',
            key: 'assignedToName',
            render: (text: string, record: FIRTask) => (
                <div>
                    <UserOutlined /> {text}
                    <br />
                    <small style={{ color: '#666' }}>
                        {fakePersonnelData.find(p => p.id === record.assignedTo)?.post}
                    </small>
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'taskStatus',
            key: 'taskStatus',
            render: (status: string) => (
                <Tag color={getStatusColor(status)}>{status}</Tag>
            ),
        },
        {
            title: 'Priority',
            dataIndex: 'taskPriority',
            key: 'taskPriority',
            render: (priority: string) => (
                <Tag color={getPriorityColor(priority)}>{priority}</Tag>
            ),
        },
        {
            title: 'Case Type',
            dataIndex: 'caseType',
            key: 'caseType',
            render: (text: string) => text || 'General',
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
    ];

    return (
        <div className="max-h-screen overflow-y-scroll overflow-hidden bg-gray-100">
            <div className="bg-white p-3 border-b-2 border font-open-sans font-semibold flex justify-between items-center text-base sticky top-0 z-[100]">
                <p className="font-semibold text-xl">
                    <FileTextOutlined /> FIR Task Assignment
                </p>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                >
                    Create New Task
                </Button>
            </div>

            <div className="p-4">
                {/* Personnel Overview Cards */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Available FIR Personnel</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {fakePersonnelData.map((person) => (
                            <Card
                                key={person.id}
                                size="small"
                                className="border-l-4 border-l-blue-500 cursor-pointer hover:shadow-md transition-shadow"
                                onClick={() => {
                                    // Open filtered tasks in new tab
                                    const url = `/tasks?personnel=${person.id}`;
                                    window.open(url, '_blank');
                                }}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold text-blue-600">{person.name}</h4>
                                        <p className="text-sm text-gray-600">{person.post}</p>
                                        <p className="text-xs text-gray-500">{person.specialization}</p>
                                        <p className="text-xs text-gray-500">Badge: {person.badge_number}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs">
                                            <span className="text-green-600">Solved: {person.solved_cases}</span>
                                            <br />
                                            <span className="text-orange-600">Active: {person.active_cases}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 text-xs text-gray-400 italic">
                                    Click to view assigned tasks →
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Tasks Table */}
                <Card title="FIR Tasks" className="shadow-md">
                    <Table
                        columns={columns}
                        dataSource={tasks}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 800 }}
                    />
                </Card>
            </div>

            {/* Create Task Modal */}
            <Modal
                title="Create New FIR Task"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={800}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            name="firNumber"
                            label="FIR Number"
                        >
                            <Input placeholder="Enter FIR Number (e.g., FIR/2024/004)" />
                        </Form.Item>

                        <Form.Item
                            name="caseType"
                            label="Case Type"
                        >
                            <Select placeholder="Select Case Type">
                                <Option value="Theft">Theft</Option>
                                <Option value="Burglary">Burglary</Option>
                                <Option value="Assault">Assault</Option>
                                <Option value="Cybercrime">Cybercrime</Option>
                                <Option value="Drug Related">Drug Related</Option>
                                <Option value="Financial Crime">Financial Crime</Option>
                                <Option value="Domestic Violence">Domestic Violence</Option>
                                <Option value="Other">Other</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="taskName"
                        label="Task Name"
                        rules={[{ required: true, message: 'Please enter task name' }]}
                    >
                        <Input placeholder="Enter task name" />
                    </Form.Item>

                    <Form.Item
                        name="taskDescription"
                        label="Task Description"
                        rules={[{ required: true, message: 'Please enter task description' }]}
                    >
                        <TextArea rows={3} placeholder="Enter detailed task description" />
                    </Form.Item>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            name="assignedTo"
                            label="Assigned To"
                            rules={[{ required: true, message: 'Please select personnel' }]}
                        >
                            <Select placeholder="Select Personnel">
                                {fakePersonnelData.map((person) => (
                                    <Option key={person.id} value={person.id}>
                                        {person.name} - {person.post}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="taskPriority"
                            label="Priority"
                            rules={[{ required: true, message: 'Please select priority' }]}
                        >
                            <Select placeholder="Select Priority">
                                <Option value="Low">Low</Option>
                                <Option value="Medium">Medium</Option>
                                <Option value="High">High</Option>
                                <Option value="Critical">Critical</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            name="taskStatus"
                            label="Status"
                        >
                            <Select placeholder="Select Status" defaultValue="Pending">
                                <Option value="Pending">Pending</Option>
                                <Option value="In Progress">In Progress</Option>
                                <Option value="On Hold">On Hold</Option>
                                <Option value="Completed">Completed</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="dueDate"
                            label="Due Date"
                        >
                            <Input type="datetime-local" />
                        </Form.Item>
                    </div>

                    <Form.Item className="mb-0">
                        <Space className="w-full justify-end">
                            <Button onClick={() => setIsModalVisible(false)}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Create Task
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default FIRTaskAssignment; 