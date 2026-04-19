import { PortableText as PT } from '@portabletext/react'

const components = {
  block: {
    normal: ({ children }: any) => <p>{children}</p>,
    h2:     ({ children }: any) => <h2>{children}</h2>,
    h3:     ({ children }: any) => <h3>{children}</h3>,
    blockquote: ({ children }: any) => <blockquote>{children}</blockquote>,
  },
  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em:     ({ children }: any) => <em>{children}</em>,
    code:   ({ children }: any) => <code>{children}</code>,
    link:   ({ value, children }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">{children}</a>
    ),
  },
  list: {
    bullet:   ({ children }: any) => <ul>{children}</ul>,
    number:   ({ children }: any) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  types: {
    code: ({ value }: any) => (
      <pre data-language={value?.language}>
        <code>{value?.code}</code>
      </pre>
    ),
    image: ({ value }: any) => (
      <img src={value?.asset?.url} alt={value?.alt ?? ''} loading="lazy" />
    ),
  },
}

export default function PortableText({ value }: { value: any[] }) {
  return <PT value={value} components={components} />
}
