import type { INodeProperties } from 'n8n-workflow';

const show = { resource: ['timelog'], operation: ['create'] };

export const timelogCreateDescription: INodeProperties[] = [
	{
		displayName: 'Conversation ID',
		name: 'conversationId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show },
		routing: { request: { method: 'POST', url: '=/conversations/{{$value}}/timelogs' } },
	},
	{
		displayName: 'Duration (Seconds)',
		name: 'duration',
		type: 'number',
		default: 0,
		required: true,
		typeOptions: { minValue: 1 },
		displayOptions: { show },
		description: 'Duration of the finished time entry in seconds',
		routing: { send: { type: 'body', property: 'duration' } },
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		default: 0,
		displayOptions: { show },
		description:
			'User the timelog is created for. Defaults to the owner of the API key. Required with the Global API Key; logging time for another user needs an admin-owned key. Leave 0 to use the default.',
		routing: {
			send: { type: 'body', property: 'userId', value: '={{ $value || undefined }}' },
		},
	},
];
