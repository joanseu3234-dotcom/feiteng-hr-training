import type { Block } from "@/lib/types";
import Callout from "./Callout";

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-tc max-w-none">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return <p key={i}>{block.text}</p>;

          case "heading":
            return block.level === 2 ? (
              <h2 key={i}>{block.text}</h2>
            ) : (
              <h3 key={i}>{block.text}</h3>
            );

          case "list":
            return block.ordered ? (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            ) : (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );

          case "table":
            return (
              <div key={i} className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      {block.headers.map((h, j) => (
                        <th key={j} className="text-left">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td key={k}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "callout":
            return (
              <Callout
                key={i}
                variant={block.variant}
                title={block.title}
                text={block.text}
              />
            );

          case "code":
            return (
              <pre
                key={i}
                className="bg-gray-900 text-gray-100 text-sm p-4 rounded-lg overflow-x-auto my-4"
              >
                <code>{block.text}</code>
              </pre>
            );

          case "image":
            return (
              <figure key={i} className="my-4">
                <a
                  href={`/files/${encodeURIComponent(block.src)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/files/${encodeURIComponent(block.src)}`}
                    alt={block.alt}
                    className="w-full max-w-xl rounded-lg border border-gray-200"
                    loading="lazy"
                  />
                </a>
                {block.caption && (
                  <figcaption className="text-sm text-gray-500 mt-2">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
