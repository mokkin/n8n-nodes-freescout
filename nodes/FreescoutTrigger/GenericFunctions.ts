import { createHmac, timingSafeEqual } from 'crypto';

/**
 * FreeScout signs each webhook delivery with:
 *   X-FreeScout-Signature = base64( HMAC-SHA1( rawBody, secret ) )
 * where `secret` is the "Secret Key" shown in FreeScout under
 * Manage → API & Webhooks (internally `md5(APP_KEY . 'webhook_key')`).
 * The node uses that Secret Key value directly as the HMAC key.
 */
export function computeSignature(rawBody: string, secret: string): string {
	return createHmac('sha1', secret).update(rawBody, 'utf8').digest('base64');
}

export function verifySignature(
	rawBody: string,
	header: string | undefined,
	secret: string,
): boolean {
	// Verification disabled when no secret is configured.
	if (!secret) return true;
	if (!header) return false;
	const expected = computeSignature(rawBody, secret);
	const a = Buffer.from(expected);
	const b = Buffer.from(header);
	if (a.length !== b.length) return false;
	return timingSafeEqual(a, b);
}

/**
 * FreeScout webhooks cannot be limited to a mailbox when they are registered
 * (only `url` and `events` are accepted), so mailbox filtering happens on
 * delivery. Conversation payloads carry the mailbox as `mailboxId`.
 */
export function getPayloadMailboxId(payload: Record<string, unknown>): number | undefined {
	const embedded = payload._embedded as Record<string, unknown> | undefined;
	const mailbox = (payload.mailbox ?? embedded?.mailbox) as Record<string, unknown> | undefined;
	const raw = payload.mailboxId ?? mailbox?.id;
	const id = Number(raw);
	return raw === undefined || raw === null || raw === '' || Number.isNaN(id) ? undefined : id;
}

/**
 * Whether a delivery passes the mailbox filter. An empty selection means "all
 * mailboxes". Only conversation events (`convo.*`) belong to a mailbox; other
 * events such as `customer.created` always pass.
 */
export function matchesMailboxFilter(
	event: string,
	payload: Record<string, unknown>,
	mailboxIds: number[],
): boolean {
	if (mailboxIds.length === 0) return true;
	if (!event.startsWith('convo.')) return true;
	const id = getPayloadMailboxId(payload);
	return id !== undefined && mailboxIds.includes(id);
}
