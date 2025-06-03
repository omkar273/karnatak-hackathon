import React, { useState, useEffect } from 'react';
import { Table, Tag, Card, Button } from 'antd';
import { UserOutlined, EyeOutlined, FileTextOutlined } from '@ant-design/icons';
import fakePersonnelData from '@/data/json/fake_fir_personnel.json';
import { Link, useSearchParams } from 'react-router-dom';

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

const FIRTaskTable: React.FC = () => {
    const [tasks, setTasks] = useState<FIRTask[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const personnelId = searchParams.get('personnel');

    useEffect(() => {
        // Load FIR tasks from localStorage
        const loadTasks = () => {
            try {
                const savedTasks = localStorage.getItem('firTasks');
                if (savedTasks) {
                    const tasks = JSON.parse(savedTasks) as FIRTask[];
                    // reverse the tasks to show newest first
                    const orderedTasks = tasks.reverse();

                    // Filter tasks by personnel if URL parameter is present
                    const filteredTasks = personnelId
                        ? orderedTasks.filter(task => task.assignedTo === personnelId)
                        : orderedTasks;

                    setTasks(filteredTasks);
                }
            } catch (error) {
                console.error('Error loading FIR tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTasks();

        // Listen for storage changes to update tasks in real-time
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'firTasks' && e.newValue) {
                const tasks = JSON.parse(e.newValue) as FIRTask[];
                // reverse the tasks to show newest first
                const orderedTasks = tasks.reverse();

                // Filter tasks by personnel if URL parameter is present
                const filteredTasks = personnelId
                    ? orderedTasks.filter(task => task.assignedTo === personnelId)
                    : orderedTasks;

                setTasks(filteredTasks);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [personnelId]);

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
            title: 'Description',
            dataIndex: 'taskDescription',
            key: 'taskDescription',
            render: (text: string) => (
                <div style={{ maxWidth: '200px' }}>
                    {text.length > 50 ? `${text.substring(0, 50)}...` : text}
                </div>
            ),
        },
        {
            title: 'Assigned To',
            dataIndex: 'assignedToName',
            key: 'assignedToName',
            render: (text: string, record: FIRTask) => {
                const person = fakePersonnelData.find(p => p.id === record.assignedTo);
                return (
                    <div>
                        <div className="flex items-center">
                            <UserOutlined className="mr-2" />
                            <div>
                                <div className="font-medium">{text}</div>
                                <div className="text-sm text-gray-500">{person?.post}</div>
                                <div className="text-xs text-gray-400">{person?.specialization}</div>
                            </div>
                        </div>
                    </div>
                );
            },
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
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            render: (date: string) => date ? new Date(date).toLocaleDateString() : 'N/A',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: FIRTask) => (
                <Button
                    type="link"
                    icon={<EyeOutlined />}
                    onClick={() => {
                        // You can implement task details view here
                        console.log('View task details:', record);
                    }}
                >
                    View
                </Button>
            ),
        },
    ];

    // Get personnel name for filtered view
    const getPersonnelName = () => {
        if (personnelId) {
            const person = fakePersonnelData.find(p => p.id === personnelId);
            return person ? person.name : 'Unknown Personnel';
        }
        return null;
    };

    if (tasks.length === 0 && !loading) {
        const personnelName = getPersonnelName();
        return (
            <Card className="text-center p-8">
                <div className="text-gray-500">
                    <FileTextOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                    <h3>
                        {personnelName
                            ? `No FIR Tasks Found for ${personnelName}`
                            : 'No FIR Tasks Found'
                        }
                    </h3>
                    <p>
                        {personnelName
                            ? `${personnelName} has no assigned tasks currently.`
                            : 'Create your first FIR task to get started.'
                        }
                    </p>
                    <Link to="/fir/task-assignment">
                        <Button type="primary" className="mt-4">
                            {personnelName ? 'Manage FIR Tasks' : 'Create FIR Task'}
                        </Button>
                    </Link>
                    {personnelName && (
                        <Link to="/tasks">
                            <Button className="mt-4 ml-2">
                                View All Tasks
                            </Button>
                        </Link>
                    )}
                </div>
            </Card>
        );
    }

    const personnelName = getPersonnelName();

    return (
        <Card
            title={personnelName ? `FIR Tasks - ${personnelName}` : "FIR Tasks"}
            className="shadow-md"
        >
            <div className="mb-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                    {personnelName && (
                        <div className="mb-2">
                            <Tag color="blue">Filtered by: {personnelName}</Tag>
                        </div>
                    )}
                    Total FIR Tasks: <strong>{tasks.length}</strong>
                    {personnelName && (
                        <Link to="/tasks" className="ml-4 text-blue-500">
                            View All Tasks
                        </Link>
                    )}
                </div>
                <Link to="/fir/task-assignment">
                    <Button type="primary">
                        Manage FIR Tasks
                    </Button>
                </Link>
            </div>

            <Table
                columns={columns}
                dataSource={tasks}
                rowKey="id"
                loading={loading}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} tasks`
                }}
                scroll={{ x: 1200 }}
            />
        </Card>
    );
};

export default FIRTaskTable; 