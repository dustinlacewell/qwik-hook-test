import { component$, $ } from '@builder.io/qwik';
import { Child, type Item } from '../../Child';
import { useDemo } from '../../demoContext';
import { useCalculateDataBroken } from './useCalculateDataBroken';
import brokenSource from './index.tsx?raw';
import brokenHookSource from './useCalculateDataBroken.ts?raw';

export const BrokenExample = component$(() => {
  const { itemsMapSig, layout } = useDemo();

  const rootItems = useCalculateDataBroken();

  console.log('[BrokenExample] render. mapSize=', itemsMapSig.value.size, 'order=', layout.instanceOrder, 'derived.len=', rootItems.length);

  const load = $(() => {
    const m = new Map<number, Item>();
    m.set(10, { id: 10, label: 'Alpha', order: 1 });
    m.set(20, { id: 20, label: 'Beta', order: 2 });
    m.set(30, { id: 30, label: 'Gamma', order: 0 });
    itemsMapSig.value = m;
    layout.instanceOrder = [30, 20, 10];
  });

  const add = $(() => {
    const id = Math.floor(Math.random() * 1000) + 1;
    const m = new Map(itemsMapSig.value);
    m.set(id, { id, label: `Item ${id}`, order: Math.floor(Math.random() * 5) });
    itemsMapSig.value = m;
    layout.instanceOrder = [id, ...layout.instanceOrder];
  });

  const shuffleLayout = $(() => {
    const arr = [...layout.instanceOrder];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    layout.instanceOrder = arr;
  });

  const clear = $(() => {
    itemsMapSig.value = new Map();
    layout.instanceOrder = [];
  });

  return (
    <div class="space-y-2 rounded border border-red-800 p-3">
      <h2 class="font-bold text-red-400">Broken</h2>
      <p style={{ fontSize: '1rem' }}>
        The parent component calculates some data using a "hook"(??) and passes it to a child component.
      </p>
      <div class="flex gap-2">
        <button class="px-2 py-1 border rounded" onClick$={load}>Load</button>
        <button class="px-2 py-1 border rounded" onClick$={add}>Add</button>
        <button class="px-2 py-1 border rounded" onClick$={shuffleLayout}>Shuffle Layout</button>
        <button class="px-2 py-1 border rounded" onClick$={clear}>Clear</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="rounded border border-neutral-700 p-3">
          <h3 class="font-bold mb-2">State</h3>
          <pre class="text-sm">{JSON.stringify({ size: itemsMapSig.value.size, order: layout.instanceOrder }, null, 2)}</pre>
        </div>
        <Child items={rootItems} />
      </div>
      <div class="rounded border border-neutral-700 p-3">
        <h3 class="font-bold mb-2">Source: examples/broken/index.tsx</h3>
        <pre class="text-xs overflow-auto"><code>{brokenSource}</code></pre>
      </div>
      <div class="rounded border border-neutral-700 p-3">
        <h3 class="font-bold mb-2">Source: examples/broken/useCalculateDataBroken.ts</h3>
        <pre class="text-xs overflow-auto"><code>{brokenHookSource}</code></pre>
      </div>
    </div>
  );
});
