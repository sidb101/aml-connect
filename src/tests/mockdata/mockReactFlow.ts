/**
 * React Flow needs to measure nodes in order to render edges and for that
 * relies on rendering DOM elements.
 *
 * If you are using Jest, you need to mock some features in order to be able to
 * run your tests. You can do that by adding this file to your project. Calling
 * mockReactFlow() in a setupTests file (or inside a beforeEach) will trigger
 * the necessary overrides.
 *
 * Source: https://reactflow.dev/docs/guides/testing/
 */

// To make sure that the tests are working, it's important that you are using
// this implementation of ResizeObserver and DOMMatrixReadOnly
class ResizeObserver {
	callback: globalThis.ResizeObserverCallback;

	constructor(callback: globalThis.ResizeObserverCallback) {
		this.callback = callback;
	}

	observe(target: Element) {
		this.callback([{ target } as globalThis.ResizeObserverEntry], this);
	}

	unobserve() {}

	disconnect() {}
}

class DOMMatrixReadOnly {
	m22: number;
	constructor(transform: string) {
		const scale = transform?.match(/scale\(([1-9.])\)/)?.[1];
		this.m22 = scale !== undefined ? +scale : 1;
	}
}

// Only run the shim once when requested
let init = false;

export const mockReactFlow = () => {
	if (init) return;
	init = true;

	global.ResizeObserver = ResizeObserver;

	// @ts-ignore
	global.DOMMatrixReadOnly = DOMMatrixReadOnly;

	Object.defineProperties(global.HTMLElement.prototype, {
		offsetHeight: {
			get() {
				return parseFloat(this.style.height) || 1;
			},
		},
		offsetWidth: {
			get() {
				return parseFloat(this.style.width) || 1;
			},
		},
	});

	(global.SVGElement as any).prototype.getBBox = () => ({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});
};
