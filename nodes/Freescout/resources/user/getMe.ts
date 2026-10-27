import type { INodeProperties } from 'n8n-workflow';

const show = { resource: ['user'], operation: ['getMe'] };

export const userGetMeDescription: INodeProperties[] = [
	{
		displayName: 'Works only with a per-user API key. The Global API Key returns an error.',
		name: 'getMeNotice',
		type: 'notice',
		default: '',
		displayOptions: { show },
	},
	{
		displayName: 'Operation Routing',
		name: 'getMeRouting',
		type: 'hidden',
		default: '',
		displayOptions: { show },
		routing: { request: { method: 'GET', url: '/users/me' } },
	},
];
