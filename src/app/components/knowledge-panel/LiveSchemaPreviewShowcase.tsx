import { LiveSchemaPreview } from './LiveSchemaPreview';

const SAMPLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jane Doe',
  alternateName: 'AI Visibility Strategist',
  description:
    'Jane Doe is a strategist helping brands appear in Google, ChatGPT, and Perplexity search results.',
  url: 'https://janedoe.com',
  image: 'https://cdn.graphlynk.com/headshots/janedoe.jpg',
  email: 'hello@janedoe.com',
  sameAs: [
    'https://linkedin.com/in/janedoe',
    'https://twitter.com/janedoe',
    'https://en.wikipedia.org/wiki/Jane_Doe',
  ],
  identifier: 'Q12345',
  worksFor: {
    '@type': 'Organization',
    name: 'Graphlynk',
    url: 'https://graphlynk.com',
  },
  knowsAbout: ['SEO', 'Knowledge Graphs', 'AI Search'],
};

export function LiveSchemaPreviewShowcase() {
  return (
    <div className="min-h-full bg-[#0B0D10] relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-[#0b3d84]/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-[480px] h-[480px] bg-[#6EE7F5]/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#6EE7F5]/30 bg-[#6EE7F5]/5 text-[10px] uppercase tracking-[0.18em] text-[#6EE7F5] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7F5] shadow-[0_0_6px_#6EE7F5]" />
            Component Showcase
          </div>
          <h1 className="text-3xl text-white mb-2">Live Schema Preview</h1>
          <p className="text-white/60 max-w-xl">
            Reusable, dark-mode glassmorphism component. Drop it into any screen with a{' '}
            <code className="text-[#6EE7F5]">schema</code> or{' '}
            <code className="text-[#6EE7F5]">json</code> prop.
          </p>
        </div>

        <LiveSchemaPreview schema={SAMPLE_SCHEMA} />

        <div className="mt-8 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#6EE7F5] mb-3">Usage</div>
          <pre className="text-[12px] leading-relaxed font-mono text-white/70 whitespace-pre-wrap">
{`import { LiveSchemaPreview } from './knowledge-panel/LiveSchemaPreview';

<LiveSchemaPreview schema={mySchemaObject} />
// or
<LiveSchemaPreview json={alreadySerializedString} maxHeight={520} />`}
          </pre>
        </div>
      </div>
    </div>
  );
}
