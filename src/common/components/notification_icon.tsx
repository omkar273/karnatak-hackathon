import { Badge, Dropdown, Menu } from 'antd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useFetchNotifications from '../hooks/use_fetch_notifications';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect, useState } from 'react';
import { useSpeech } from 'react-text-to-speech';
import { toast } from 'react-toastify';
import Notification from './notification';

const NotificationsModal = () => {
	const { currentUser } = useSelector((s: RootState) => s.auth);
	
	const { error, notifications } = useFetchNotifications({ userId: currentUser?.user.uid });
	const [speechText, setSpeechText] = useState('');
	
	const {
		// Text,
		// speechStatus,
		// isInQueue,
		start,
		// pause,
		// stop,
	} = useSpeech({ text: speechText });
	
	// Construct notification list
	const notificationList = notifications.map(notification => ({
		label: <Notification data={notification} />,
		key: notification.id,
	}));
	
	useEffect(() => {
		notifications.forEach(value => {
			if (value.notification_type === 'emergency' && !value.isRead) {
				setSpeechText(`Notification from ${value.sender_name}`);
				start();
				toast.success(`Notification from ${value.sender_name}`);
			}
		});
	}, [notifications]);
	
	if (error) {
		return null; // Proper error handling should be implemented here
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
