import { Badge, Dropdown, Menu } from 'antd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useFetchNotifications from '../hooks/use_fetch_notifications';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Notification from './notification';

const NotificationsModal = () => {
    const { currentUser } = useSelector((s: RootState) => s.auth);

    const { error, notifications } = useFetchNotifications({ userId: currentUser?.user.uid });

    // Construct notification list
    const notificationList = notifications.map(notification => ({
        label: <Notification data={notification} />,
        key: notification.id,
    }));

    if (error) {
        return;
    }

    return (
        <Dropdown
            overlay={<Menu>{notificationList.map(item => <Menu.Item key={item.key}>{item.label}</Menu.Item>)}</Menu>}
            placement="bottomRight"
            trigger={['click']}
            arrow={true}
        >
            <Badge count={notifications.length} overflowCount={9}>
                <NotificationsIcon className="text-white" />
            </Badge>
        </Dropdown>
    );
};

export default NotificationsModal;
