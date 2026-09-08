/**
 * The closing words of a sentence in the signature's serif italic. Takes the last `words` words so
 * it works with whatever the Studio holds, without markup in the content.
 */
export function Highlight({ text, words = 3 }: { text: string; words?: number }) {
  const parts = text.trim().split(/\s+/);
  const head = parts.slice(0, -words).join(" ");
  const tail = parts.slice(-words).join(" ");
  return (
    <>
      {head}
      {head ? " " : ""}
      <em className="emphasis">{tail}</em>
    </>
  );
}
