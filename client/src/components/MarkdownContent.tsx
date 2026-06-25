import type { ReactNode } from "react";

interface MarkdownContentProps {
  content: string;
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      nodes.push(<strong key={`strong-${match.index}`}>{match[2]}</strong>);
    } else if (match[3] && match[4]) {
      const href = match[4];
      const isExternal = /^https?:\/\//.test(href);

      nodes.push(
        <a
          key={`link-${match.index}`}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {match[3]}
        </a>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const text = paragraph.join(" ").trim();
    blocks.push(<p key={`p-${blocks.length}`}>{renderInline(text)}</p>);
    paragraph = [];
  };

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`}>
        {listItems.map((item, index) => (
          <li key={`${item}-${index}`}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  lines.forEach(line => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();

      const level = heading[1].length;
      const children = renderInline(heading[2]);
      const key = `h-${blocks.length}`;

      if (level === 1) blocks.push(<h1 key={key}>{children}</h1>);
      if (level === 2) blocks.push(<h2 key={key}>{children}</h2>);
      if (level === 3) blocks.push(<h3 key={key}>{children}</h3>);
      if (level === 4) blocks.push(<h4 key={key}>{children}</h4>);
      if (level === 5) blocks.push(<h5 key={key}>{children}</h5>);
      if (level === 6) blocks.push(<h6 key={key}>{children}</h6>);
      return;
    }

    const unorderedListItem = trimmed.match(/^[-*+]\s+(.+)$/);
    if (unorderedListItem) {
      flushParagraph();
      listItems.push(unorderedListItem[1]);
      return;
    }

    flushList();
    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();

  return <>{blocks}</>;
}
