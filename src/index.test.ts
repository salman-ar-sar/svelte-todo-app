import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Header from './routes/Header.svelte';

describe('Tests Header', () => {
	it('mounts', () => {
		const { container } = render(Header);
		expect(container).toBeTruthy();
		expect(container.innerHTML).toMatchSnapshot();
	});
});
