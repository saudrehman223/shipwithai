import type { ComponentProps } from "react";
import Link from "next/link";

/**
 * Custom renderers for MDX article content. Keeps article typography
 * consistent without the author writing any classNames in markdown.
 * Edit styles here to restyle every article at once.
 */

function H2(props: ComponentProps<"h2">) {
  return (
    <h2
      {...props}
      className="prose-anchor mt-12 mb-4 text-2xl font-bold tracking-tight text-ink-900 first:mt-0"
    />
  );
}

function H3(props: ComponentProps<"h3">) {
  return (
    <h3
      {...props}
      className="prose-anchor mt-8 mb-3 text-xl font-semibold tracking-tight text-ink-900"
    />
  );
}

function P(props: ComponentProps<"p">) {
  return <p {...props} className="my-5 leading-7 text-ink-700" />;
}

function A(props: ComponentProps<"a">) {
  const href = props.href ?? "";
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:decoration-brand-600"
      />
    );
  }
  return (
    <Link
      href={href}
      className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:decoration-brand-600"
    >
      {props.children}
    </Link>
  );
}

function Blockquote(props: ComponentProps<"blockquote">) {
  return (
    <blockquote
      {...props}
      className="my-6 border-l-4 border-brand-300 bg-brand-50/60 py-1 pr-4 pl-5 text-ink-700 italic [&>p]:my-3"
    />
  );
}

function Ul(props: ComponentProps<"ul">) {
  return (
    <ul
      {...props}
      className="my-5 list-disc space-y-2 pl-6 text-ink-700 marker:text-brand-500"
    />
  );
}

function Ol(props: ComponentProps<"ol">) {
  return (
    <ol
      {...props}
      className="my-5 list-decimal space-y-2 pl-6 text-ink-700 marker:font-medium marker:text-brand-600"
    />
  );
}

function Code(props: ComponentProps<"code">) {
  return (
    <code
      {...props}
      className="rounded bg-ink-900/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-ink-900"
    />
  );
}

function Pre(props: ComponentProps<"pre">) {
  return (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-xl bg-ink-950 p-5 font-mono text-sm leading-6 text-zinc-100 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit"
    />
  );
}

function Table(props: ComponentProps<"table">) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-line">
      <table {...props} className="w-full border-collapse text-sm" />
    </div>
  );
}

function Th(props: ComponentProps<"th">) {
  return (
    <th
      {...props}
      className="border-b border-line bg-paper-soft px-4 py-3 text-left font-semibold text-ink-900"
    />
  );
}

function Td(props: ComponentProps<"td">) {
  return (
    <td
      {...props}
      className="border-b border-line px-4 py-3 align-top text-ink-700 last:border-b-0"
    />
  );
}

function Hr(props: ComponentProps<"hr">) {
  return <hr {...props} className="my-10 border-line" />;
}

function Img(props: ComponentProps<"img">) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt ?? ""}
      className="my-6 rounded-xl border border-line"
      loading="lazy"
    />
  );
}

export const mdxComponents = {
  h2: H2,
  h3: H3,
  p: P,
  a: A,
  blockquote: Blockquote,
  ul: Ul,
  ol: Ol,
  code: Code,
  pre: Pre,
  table: Table,
  th: Th,
  td: Td,
  hr: Hr,
  img: Img,
};
