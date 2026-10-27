import type { INodeProperties } from 'n8n-workflow';

const show = { resource: ['report'], operation: ['get'] };

/** FreeScout expects report dates as Y-m-d. */
const dateOnly = '={{ String($value).substring(0, 10) }}';

export const reportGetDescription: INodeProperties[] = [
	{
		displayName: 'Report',
		name: 'reportName',
		type: 'options',
		required: true,
		default: 'conversations',
		displayOptions: { show },
		options: [
			{ name: 'Conversations', value: 'conversations' },
			{ name: 'Productivity', value: 'productivity' },
			{ name: 'Satisfaction', value: 'satisfaction' },
			{ name: 'Time', value: 'time' },
		],
		routing: {
			request: { method: 'GET', url: '=/reports/{{$value}}' },
		},
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show },
		options: [
			{ displayName: 'From', name: 'from', type: 'dateTime', default: '', description: 'Start of the report period. Defaults to one week before "To".', routing: { send: { type: 'query', property: 'filters[from]', value: dateOnly } } },
			{ displayName: 'Mailbox ID', name: 'mailbox', type: 'string', default: '', description: 'Restrict the report to a specific mailbox', routing: { send: { type: 'query', property: 'filters[mailbox]' } } },
			{ displayName: 'Tag ID', name: 'tag', type: 'string', default: '', description: 'Restrict the report to a specific tag (requires the Tags module)', routing: { send: { type: 'query', property: 'filters[tag]' } } },
			{ displayName: 'To', name: 'to', type: 'dateTime', default: '', description: 'End of the report period. Defaults to today.', routing: { send: { type: 'query', property: 'filters[to]', value: dateOnly } } },
			{ displayName: 'Type', name: 'type', type: 'options', options: [{ name: 'Chat', value: 'chat' }, { name: 'Email', value: 'email' }, { name: 'Phone', value: 'phone' }], default: 'email', description: 'Restrict the report to a conversation type', routing: { send: { type: 'query', property: 'filters[type]' } } },
			{ displayName: 'User ID', name: 'user', type: 'string', default: '', description: 'Restrict the report to a specific user (Productivity report only)', routing: { send: { type: 'query', property: 'filters[user]' } } },
		],
	},
	{
		displayName: 'Chart Options',
		name: 'chart',
		type: 'collection',
		placeholder: 'Add Chart Option',
		default: {},
		displayOptions: { show },
		options: [
			{
				displayName: 'Group By',
				name: 'groupBy',
				type: 'options',
				options: [{ name: 'Day', value: 'd' }, { name: 'Week', value: 'w' }, { name: 'Month', value: 'm' }],
				default: 'd',
				description: 'How to group the chart data',
				routing: { send: { type: 'query', property: 'chart[group_by]' } },
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Closed (Productivity)', value: 'closed' },
					{ name: 'Customers Helped (Productivity)', value: 'customers_helped' },
					{ name: 'Messages (Conversations)', value: 'messages' },
					{ name: 'New Conversations (Conversations)', value: 'new_conv' },
					{ name: 'Replies (Productivity)', value: 'replies' },
				],
				default: 'new_conv',
				description: 'Which chart dataset to return',
				routing: { send: { type: 'query', property: 'chart[type]' } },
			},
		],
	},
];
