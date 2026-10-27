import type { INodeProperties } from 'n8n-workflow';
import { userCreateDescription } from './create';
import { userGetDescription } from './get';
import { userGetAllDescription } from './getAll';
import { userDeleteDescription } from './delete';
import { userGetMeDescription } from './getMe';

const show = { resource: ['user'] };

export const userDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [
			{ name: 'Create', value: 'create', action: 'Create a user' },
			{ name: 'Delete', value: 'delete', action: 'Delete a user' },
			{ name: 'Get', value: 'get', action: 'Get a user' },
			{ name: 'Get Current User', value: 'getMe', action: 'Get the current user', description: 'The user that owns the API key' },
			{ name: 'Get Many', value: 'getAll', action: 'Get many users' },
		],
		default: 'create',
	},
	...userCreateDescription,
	...userGetDescription,
	...userGetAllDescription,
	...userDeleteDescription,
	...userGetMeDescription,
];
