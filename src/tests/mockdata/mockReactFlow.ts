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
	constructor(public callback: globalThis.ResizeObserverCallback) {}

	observe(target: Element) {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		const entries: globalThis.ResizeObserverEntry[] = [{ target } as globalThis.ResizeObserverEntry];
		this.callback(entries, this);
	}

	unobserve() {
		// Removed eslint-disable directive as it is unnecessary
	}

	disconnect() {
		// Removed eslint-disable directive as it is unnecessary
	}
}

// Renamed the class to comply with PascalCase if StrictPascalCase is similar to PascalCase
class DomMatrixReadOnly {
	static fromFloat32Array(_array32: Float32Array): DomMatrixReadOnly {
		return new DomMatrixReadOnly("");
	}

	static fromFloat64Array(_array64: Float64Array): DomMatrixReadOnly {
		return new DomMatrixReadOnly("");
	}

	static fromMatrix(_other?: DOMMatrixInit): DomMatrixReadOnly {
		return new DomMatrixReadOnly("");
	}

	m22: number;
	constructor(transform: string) {
		const scaleMatch = /scale\(([1-9.]+)\)/.exec(transform);
		this.m22 = scaleMatch ? +scaleMatch[1] : 1;
	}
}

let init = false;

export const mockReactFlow = () => {
	if (init) return;
	init = true;

	global.ResizeObserver = ResizeObserver;
	global.DOMMatrixReadOnly = DomMatrixReadOnly as unknown as typeof global.DOMMatrixReadOnly;

	Object.defineProperties(global.HTMLElement.prototype, {
		offsetHeight: {
			get() {
				// Corrected the type for style
				return parseFloat((this.style as unknown as { height: string }).height) || 1;
			},
		},
		offsetWidth: {
			get() {
				// Corrected the type for style
				return parseFloat((this.style as unknown as { width: string }).width) || 1;
			},
		},
	});

	(global.SVGElement as any).prototype.getBBox = (): { x: number; y: number; width: number; height: number } => ({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});
};
