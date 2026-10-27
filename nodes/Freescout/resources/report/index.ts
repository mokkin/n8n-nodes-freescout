import type { INodeProperties } from 'n8n-workflow';
import { reportGetDescription } from './get';

const show = { resource: ['report'] };

export const reportDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a report',
				description: 'Metrics, chart data and tables of a report (requires the Reports module)',
			},
		],
		default: 'get',
	},
	...reportGetDescription,
];
