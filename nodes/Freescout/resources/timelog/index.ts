import type { INodeProperties } from 'n8n-workflow';
import { timelogCreateDescription } from './create';
import { timelogGetAllDescription } from './getAll';

const show = { resource: ['timelog'] };

export const timelogDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [
			{ name: 'Create', value: 'create', action: 'Create a timelog', description: 'Add a finished time entry to a conversation (requires the Time Tracking module)' },
			{ name: 'Get Many', value: 'getAll', action: 'Get many timelogs', description: 'List timelogs across many conversations (requires the Time Tracking module)' },
		],
		default: 'getAll',
	},
	...timelogCreateDescription,
	...timelogGetAllDescription,
];
