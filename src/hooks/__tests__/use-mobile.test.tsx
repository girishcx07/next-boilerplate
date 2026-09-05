import { act, renderHook } from '@testing-library/react';

import { useIsMobile } from '@/hooks/use-mobile';

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth;
  const addEventListener = jest.fn();
  const removeEventListener = jest.fn();

  beforeEach(() => {
    addEventListener.mockClear();
    removeEventListener.mockClear();
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: () => ({ addEventListener, removeEventListener }),
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalInnerWidth });
  });

  it('reports whether the viewport is below the mobile breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 600 });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
    expect(addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('updates when the media query changes and removes the listener on unmount', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1000 });
    const { result, unmount } = renderHook(() => useIsMobile());
    const onChange = addEventListener.mock.calls[0]?.[1] as () => void;

    expect(result.current).toBe(false);

    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 700 });
    act(() => onChange());

    expect(result.current).toBe(true);
    unmount();
    expect(removeEventListener).toHaveBeenCalledWith('change', onChange);
  });
});
