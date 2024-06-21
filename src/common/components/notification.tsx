import React from 'react'
import {NotificationData} from '../utils/send_notification'
import {User} from "lucide-react";

interface Props {
	data: NotificationData
}

const Notification: React.FC<Props> = ({data}) => {
	return (
		<div className='p-4 rounded-md border min-w-[300px]'>
			<div className={'font-semibold flex gap-4 items-center'}>
				<span className={'size-4 text-xs'}>
					<User/>
				</span>
				<p className={'text-base'}>
					{data.sender_name}
				</p>
			</div>
			<h1 className='pt-4'>
				{data.message}
			</h1>
		
		</div>
	)
}

export default Notification
