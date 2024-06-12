import React from 'react'
import { NotificationData } from '../utils/send_notification'

interface Props {
    data: NotificationData
}

const Notification: React.FC<Props> = ({ data }) => {
    return (
        <div className='p-2 '>
            <h1 className=''>
                {data.sender_name ?? 'Someone'}{' has alloted new task to you'}
            </h1>
            <p>
                {data.notification_type}
            </p>
        </div>
    )
}

export default Notification