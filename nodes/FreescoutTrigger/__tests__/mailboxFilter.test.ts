// No `vitest` import — globals are enabled via vitest.config.mjs (strict mode bans the import).
import { getPayloadMailboxId, matchesMailboxFilter } from '../GenericFunctions';

describe('getPayloadMailboxId', () => {
	it('reads a top-level mailboxId', () => {
		expect(getPayloadMailboxId({ mailboxId: 3 })).toBe(3);
	});
	it('coerces a string id', () => {
		expect(getPayloadMailboxId({ mailboxId: '7' })).toBe(7);
	});
	it('falls back to an embedded mailbox object', () => {
		expect(getPayloadMailboxId({ _embedded: { mailbox: { id: 5 } } })).toBe(5);
	});
	it('returns undefined when there is no mailbox', () => {
		expect(getPayloadMailboxId({ id: 1 })).toBeUndefined();
	});
});

describe('matchesMailboxFilter', () => {
	it('passes everything when no mailbox is selected', () => {
		expect(matchesMailboxFilter('convo.created', { mailboxId: 9 }, [])).toBe(true);
	});
	it('passes conversations from a selected mailbox', () => {
		expect(matchesMailboxFilter('convo.created', { mailboxId: 2 }, [1, 2])).toBe(true);
	});
	it('drops conversations from other mailboxes', () => {
		expect(matchesMailboxFilter('convo.created', { mailboxId: 9 }, [1, 2])).toBe(false);
	});
	it('drops conversation events whose mailbox cannot be determined', () => {
		expect(matchesMailboxFilter('convo.created', { id: 1 }, [1])).toBe(false);
	});
	it('always passes non-conversation events', () => {
		expect(matchesMailboxFilter('customer.created', { id: 1 }, [1])).toBe(true);
	});
});
