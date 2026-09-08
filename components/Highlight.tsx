/**
 * Marker swipe under the closing words of a sentence — the same gesture as
 * annotating a screen, turned on his own copy. Takes the last `words` words so
 * it works with whatever the Studio holds, without markup in the content.
 */
export function Highlight({ text, words = 2 }: { text: string; words?: number }) {
  const parts = text.trim().split(" ");
  if (parts.length <= words) return <span className="highlight">{text}</span>;

  const head = parts.slice(0, -words).join(" ");
  const tail = parts.slice(-words).join(" ");

  return (
    <>
      {head} <span className="highlight">{tail}</span>
    </>
  );
}
