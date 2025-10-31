import { component$ } from '@builder.io/qwik';
import { BrokenExample } from './examples/broken';
import { FixedExample } from './examples/fixed';
import { useProvideDemo } from './demoContext';
import { WorkingExample } from './examples/working';

export const ExamplesContainer = component$(() => {
  useProvideDemo();
  return (
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
  );
});
