type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

/** Renderiza um ou mais blocos JSON-LD para schema.org. */
export default function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
