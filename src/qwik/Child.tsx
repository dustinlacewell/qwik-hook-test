import { component$ } from '@builder.io/qwik';

export interface Item {
  id: number;
  label: string;
  order: number;
}

interface ChildProps {
  items: Item[];
}

export const Child = component$<ChildProps>(({ items }) => {
  // Trace renders of the child component
  console.log('[Child] render. items.length =', items.length, 'items =', items.map(i => `${i.label}(${i.order})`));

  return (
    <div class="rounded border border-neutral-700 p-3">
      <h3 class="font-bold mb-2">Child (Derived Items)</h3>
      <ol class="list-decimal pl-5 space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            {item.label} — order: {item.order}
          </li>
        ))}
      </ol>
    </div>
  );
});
