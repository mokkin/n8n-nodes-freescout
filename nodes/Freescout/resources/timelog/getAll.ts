import type { INodeProperties } from 'n8n-workflow';
import { embeddedPostReceive } from '../../GenericFunctions';
import { paginationFields } from '../shared';

const show = { resource: ['timelog'], operation: ['getAll'] };

export const timelogGetAllDescription: INodeProperties[] = [
	...paginationFields('timelog', 'getAll'),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show },
		options: [
			{ displayName: 'Conversation ID', name: 'conversationId', type: 'string', default: '', routing: { send: { type: 'query', property: 'conversationId' } } },
			{ displayName: 'From', name: 'from', type: 'dateTime', default: '', description: 'Only entries created on or after this date', routing: { send: { type: 'query', property: 'from' } } },
			{ displayName: 'To', name: 'to', type: 'dateTime', default: '', description: 'Only entries created on or before this date', routing: { send: { type: 'query', property: 'to' } } },
			{ displayName: 'User ID', name: 'userId', type: 'string', default: '', routing: { send: { type: 'query', property: 'userId' } } },
		],
	},
	{
		displayName: 'Operation Routing',
		name: 'getAllRouting',
		type: 'hidden',
		default: '',
		displayOptions: { show },
		routing: {
			request: { method: 'GET', url: '/timelogs' },
			output: { postReceive: [embeddedPostReceive('timelogs')] },
		},
	},
];
