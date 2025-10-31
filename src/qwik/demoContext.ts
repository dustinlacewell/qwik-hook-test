import { createContextId, useContext, useContextProvider, useSignal, useStore, type Signal } from '@builder.io/qwik';
import type { Item } from '../qwik/Child';

export interface LayoutStore { instanceOrder: number[] }
export interface DemoContextValue {
  itemsMapSig: Signal<Map<number, Item>>;
  layout: LayoutStore;
}

export const DemoContext = createContextId<DemoContextValue>('demo.ctx');

export const useProvideDemo = () => {
  const itemsMapSig = useSignal<Map<number, Item>>(new Map());
  const layout = useStore<LayoutStore>({ instanceOrder: [] });
  useContextProvider(DemoContext, { itemsMapSig, layout });
  return { itemsMapSig, layout };
};

export const useDemo = () => useContext(DemoContext);
