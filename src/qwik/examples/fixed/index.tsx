import { component$, $ } from '@builder.io/qwik';
import { Child, type Item } from '../../Child';
import { calculateRootData } from './calculateRootData';
import { useDemo } from '../../demoContext';
import fixedSource from './index.tsx?raw';
import fixedCalcSource from './calculateRootData.ts?raw';

export const FixedExample = component$(() => {
  const { itemsMapSig, layout } = useDemo();

  const rootItems = calculateRootData();
  
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
    <div class="space-y-2 rounded border border-yellow-700 p-3">
      <h2 class="font-bold text-yellow-400">Fixed</h2>
      <p style={{ fontSize: '1rem' }}>
        Exact same code as broken example, simply rename `useCalculateDataBroken` to `calculateRootData`.
      </p>
      <p style={{ fontSize: '1rem' }}>
        What the hell???
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
        <h3 class="font-bold mb-2">Source: examples/fixed/index.tsx</h3>
        <pre class="text-xs overflow-auto"><code>{fixedSource}</code></pre>
      </div>
      <div class="rounded border border-neutral-700 p-3">
        <h3 class="font-bold mb-2">Source: examples/fixed/calculateRootData.ts</h3>
        <pre class="text-xs overflow-auto"><code>{fixedCalcSource}</code></pre>
      </div>
    </div>
  );
});
