import { useDemo } from '../../demoContext';

export const calculateRootData = () => {
  const { itemsMapSig, layout } = useDemo();
  const metadata = Array.from(itemsMapSig.value.values());
  const rootItems = metadata.sort((a, b) => {
    const indexA = layout.instanceOrder.indexOf(a.id);
    const indexB = layout.instanceOrder.indexOf(b.id);
    return indexB - indexA;
  });
  return rootItems;
};
