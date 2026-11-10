import { useId } from "react";

// Deliberately composed layers: an open, asymmetric network rather than a brain silhouette.
const layers: [number, number][][] = [
  [[70, 250], [84, 358], [107, 435]],
  [[149, 158], [157, 256], [166, 347], [182, 457]],
  [[239, 111], [227, 200], [247, 299], [242, 390], [264, 486]],
  [[327, 91], [319, 170], [334, 260], [319, 351], [349, 438], [337, 512]],
  [[416, 138], [398, 225], [426, 314], [407, 402], [430, 478]],
  [[482, 191], [498, 280], [491, 370], [510, 440]],
  [[548, 239], [544, 338]],
];
const nodes = layers.flat();
const connections = layers.slice(0, -1).flatMap((layer, column) => {
  const next = layers[column + 1];
  if (!next) return [];
  return layer.flatMap(([x, y], row) => {
    const closest = next.map(([nx, ny], index) => ({ nx, ny, index, distance: Math.abs(ny - y) }))
      .sort((a, b) => a.distance - b.distance).slice(0, 2);
    return closest.map(({ nx, ny, index }) => ({
      d: `M${x},${y} C${x + (nx - x) * 0.48},${y + (row % 2 ? 16 : -16)} ${nx - (nx - x) * 0.48},${ny} ${nx},${ny}`,
      key: `${column}-${row}-${index}`,
    }));
  });
});
const pulseIndices = [8, 25, 39];

export function NeuralNetwork() {
  const id = useId().replace(/:/g, "");
  return (
    <svg className="neural-network" viewBox="0 0 600 600" role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>Абстрактная нейронная сеть: узлы и связи</title>
      <defs>
        <linearGradient id={`${id}-flow`} x1="0" y1="0" x2="1" y2="0">
          <stop className="network-blue" offset="0" />
          <stop className="network-violet" offset="1" />
        </linearGradient>
      </defs>
      <g className="network-connections" stroke={`url(#${id}-flow)`} fill="none">
        {connections.map(({ d, key }) => <path className="network-line" key={key} d={d} pathLength={1} />)}
      </g>
      <g className="network-signals" fill="none">
        {pulseIndices.map((index) => {
          const connection = connections[index];
          return connection ? <path key={index} className="network-signal" d={connection.d} pathLength={1} /> : null;
        })}
      </g>
      <g className="network-nodes">
        {nodes.map(([x, y], index) => (
          <g className="network-node" key={`${x}-${y}`}>
            <circle className="network-node-halo" cx={x} cy={y} r={index % 5 === 0 ? 13 : 8} />
            <circle className="network-node-ring" cx={x} cy={y} r={index % 5 === 0 ? 6 : 3.8} />
            <circle className="network-node-core" cx={x} cy={y} r={index % 5 === 0 ? 3 : 1.8} />
          </g>
        ))}
      </g>
    </svg>
  );
}