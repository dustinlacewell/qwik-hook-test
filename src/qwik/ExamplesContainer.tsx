import { component$, useSignal } from '@builder.io/qwik';
import { BrokenExample } from './examples/broken';
import { FixedExample } from './examples/fixed';
import { useProvideDemo } from './demoContext';
import { WorkingExample } from './examples/working';
import demoContextSource from './demoContext.ts?raw';
import childSource from './Child.tsx?raw';

export const ExamplesContainer = component$(() => {
  useProvideDemo();
  const remarks = useSignal('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <section>
        <p style={{ fontSize: '3rem' }}>
          A parent calculates some data and passes it to a child component.
        </p>
      </section>

      <section>
        <h2 class="font-bold mb-2">Context: src/qwik/demoContext.ts</h2>
        <p style={{ fontSize: '1rem' }}>
          The context is a signal that holds a map of items and a layout store.
        </p>
        <pre class="text-xs overflow-auto"><code class="language-ts">{demoContextSource}</code></pre>
      </section>

      <section>
        <h2 class="font-bold mb-2">Child: src/qwik/Child.tsx</h2>
        <p style={{ fontSize: '1rem' }}>
          The child component receives the data and renders it.
        </p>
        <pre class="text-xs overflow-auto"><code class="language-tsx">{childSource}</code></pre>
      </section>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 420px', minWidth: '360px' }}>
          <WorkingExample />
        </div>
        <div style={{ flex: '1 1 420px', minWidth: '360px' }}>
          <BrokenExample />
        </div>
        <div style={{ flex: '1 1 420px', minWidth: '360px' }}>
          <FixedExample />
        </div>
      </div>
    </div>
  );
});
