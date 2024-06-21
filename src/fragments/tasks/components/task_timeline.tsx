// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import Timeline, {DateHeader, SidebarHeader, TimelineHeaders} from 'react-calendar-timeline'

const groups = [{id: 1, title: 'group 1'}, {id: 2, title: 'group 2'}]

const items = [
	{
		id: 1,
		group: 1,
		title: 'item 1',
		start_time: moment(),
		end_time: moment().add(1, 'hour')
	},
	{
		id: 2,
		group: 2,
		title: 'item 2',
		start_time: moment().add(-0.5, 'hour'),
		end_time: moment().add(0.5, 'hour')
	},
	{
		id: 3,
		group: 1,
		title: 'item 3',
		start_time: moment().add(2, 'hour'),
		end_time: moment().add(3, 'hour')
	}, {
		id: 4,
		group: 1,
		title: 'item 3',
		start_time: moment().add(5, 'hour'),
		end_time: moment().add(9, 'day')
	}
]


const TaskTimeline = () => {
	return (
		<div className={'p-4 bg-white rounded-md'}>
			<Timeline
				groups={groups}
				items={items}
				defaultTimeStart={moment().add(-2, 'day')}
				defaultTimeEnd={moment().add(1, 'day')}
			>
				<TimelineHeaders>
					<SidebarHeader>
						{({getRootProps}) => {
							return <div {...getRootProps()}
							            className={'flex w-full justify-center items-center text-lg text-white font-semibold'}>Police
								officers</div>
						}}
					</SidebarHeader>
					<DateHeader unit="primaryHeader"/>
					
					<DateHeader />
				
				</TimelineHeaders>
			
			</Timeline>
		</div>
	)
}
export default TaskTimeline
