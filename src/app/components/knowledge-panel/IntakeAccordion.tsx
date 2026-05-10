import { useMemo, useState } from 'react';
import {
  Award,
  Building2,
  Camera,
  ChevronDown,
  Code2,
  FileText,
  Globe,
  GraduationCap,
  Image as ImageIcon,
  Link as LinkIcon,
  MapPin,
  Newspaper,
  Plus,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  User,
  X,
} from 'lucide-react';
import { Field, GhostButton, PrimaryCTA, Select, TextArea, TextInput } from './glass';
import { IntakeData, SocialPlatform } from './types';
import { SchemaPreview } from './SchemaPreview';
import { AuthoritySources } from './AuthoritySources';
import { LiveSchemaPreview } from './LiveSchemaPreview';
import { buildSchema } from './buildSchema';

type SectionId =
  | 'identity'
  | 'location'
  | 'web'
  | 'social'
  | 'authority'
  | 'credentials'
  | 'press'
  | 'media';

type StepId = 'type' | 'identity' | 'web' | 'authority' | 'credentials' | 'review';

const STEPS: { id: StepId; label: string }[] = [
  { id: 'type', label: 'Type' },
  { id: 'identity', label: 'Identity' },
  { id: 'web', label: 'Web Presence' },
  { id: 'authority', label: 'Authority Sources' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'review', label: 'Review' },
];

export function IntakeAccordion({
  data,
  setData,
  onPublish,
  onSave,
}: {
  data: IntakeData;
  setData: (d: IntakeData) => void;
  onPublish: () => void;
  onSave: () => void;
}) {
  const [open, setOpen] = useState<Record<SectionId, boolean>>({
    identity: true,
    location: true,
    web: true,
    social: true,
    authority: true,
    credentials: true,
    press: true,
    media: true,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const update = <K extends keyof IntakeData>(key: K, value: IntakeData[K]) =>
    setData({ ...data, [key]: value });

  const toggle = (id: SectionId) => setOpen({ ...open, [id]: !open[id] });

  const currentStep: StepId = useMemo(() => {
    if (!data.entityCategory) return 'type';
    if (!data.fullName && !data.brandName) return 'identity';
    if (!data.url) return 'web';
    if (data.socials.every((s) => !s.url) && !data.bioMedium) return 'authority';
    if (data.credentials.length === 0 && data.press.length === 0) return 'credentials';
    return 'review';
  }, [data]);

  return (
    <div className="relative pb-32 lg:pb-10">
      {/* Step indicator */}
      <div className="sticky top-0 z-20 bg-[#0B0D10]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <StepIndicator current={currentStep} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 grid lg:grid-cols-[3fr_2fr] gap-6 lg:gap-8">
        {/* Left column — accordions */}
        <div className="space-y-4">
          {/* IDENTITY */}
          <Accordion
            id="identity"
            title="Identity"
            icon={<User size={14} />}
            open={open.identity}
            onToggle={toggle}
          >
            <div className="flex flex-col sm:flex-row gap-5">
              <PhotoUpload
                value={data.photoUrl}
                onChange={(v) => update('photoUrl', v)}
              />
              <div className="flex-1 grid sm:grid-cols-2 gap-4">
                <Field label="Full name">
                  <TextInput
                    placeholder="Jane Doe"
                    value={data.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                  />
                </Field>
                <Field label="Brand name">
                  <TextInput
                    placeholder="Jane Doe Studio"
                    value={data.brandName}
                    onChange={(e) => update('brandName', e.target.value)}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Tagline">
                    <TextInput
                      placeholder="One line that defines you"
                      value={data.tagline}
                      onChange={(e) => update('tagline', e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <BioField
                label="Short bio"
                hint="For social profiles"
                max={160}
                value={data.bioShort}
                onChange={(v) => update('bioShort', v)}
              />
              <BioField
                label="Medium bio"
                hint="For website / press"
                max={500}
                value={data.bioMedium}
                onChange={(v) => update('bioMedium', v)}
                rows={4}
              />
              <BioField
                label="Long bio"
                hint="For knowledge panel + Wikipedia"
                max={2000}
                value={data.bioLong}
                onChange={(v) => update('bioLong', v)}
                rows={6}
              />
            </div>
          </Accordion>

          {/* LOCATION */}
          <Accordion
            id="location"
            title="Location"
            icon={<MapPin size={14} />}
            open={open.location}
            onToggle={toggle}
          >
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Country">
                <TextInput
                  placeholder="United States"
                  value={data.country}
                  onChange={(e) => update('country', e.target.value)}
                />
              </Field>
              <Field label="State / Region">
                <TextInput
                  placeholder="Texas"
                  value={data.state}
                  onChange={(e) => update('state', e.target.value)}
                />
              </Field>
              <Field label="City">
                <TextInput
                  placeholder="Austin"
                  value={data.city}
                  onChange={(e) => update('city', e.target.value)}
                />
              </Field>
            </div>

            <div className="mt-5">
              <span className="block text-xs uppercase tracking-wider text-white/60 mb-3">
                Display preference
              </span>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {(
                  [
                    { v: 'full', l: 'Full (City, State, Country)' },
                    { v: 'city-state', l: 'City, State' },
                    { v: 'country', l: 'Country only' },
                    { v: 'hidden', l: 'Hidden' },
                  ] as const
                ).map((opt) => {
                  const checked = data.locationDisplay === opt.v;
                  return (
                    <label
                      key={opt.v}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                        checked
                          ? 'border-[#6EE7F5]/60 bg-[#6EE7F5]/[0.06] shadow-[0_0_20px_rgba(110,231,245,0.25)]'
                          : 'border-white/5 bg-[#16181D] hover:border-[#6EE7F5]/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="locDisplay"
                        className="sr-only"
                        checked={checked}
                        onChange={() => update('locationDisplay', opt.v)}
                      />
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          checked ? 'border-[#6EE7F5]' : 'border-white/30'
                        }`}
                      >
                        {checked && (
                          <span className="w-2 h-2 rounded-full bg-[#6EE7F5] shadow-[0_0_6px_#6EE7F5]" />
                        )}
                      </span>
                      <span className="text-sm text-white/80">{opt.l}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </Accordion>

          {/* WEB PRESENCE */}
          <Accordion
            id="web"
            title="Web Presence"
            icon={<Globe size={14} />}
            open={open.web}
            onToggle={toggle}
          >
            <div className="grid gap-5">
              <Field label="Official website">
                <TextInput
                  type="url"
                  placeholder="https://yourdomain.com"
                  value={data.url}
                  onChange={(e) => update('url', e.target.value)}
                />
              </Field>
              <Field label="Custom username" hint="Your public profile URL">
                <div className="flex items-stretch rounded-xl bg-[#16181D] border border-white/5 focus-within:border-[#6EE7F5]/50 focus-within:ring-2 focus-within:ring-[#6EE7F5]/30 transition-all overflow-hidden">
                  <span className="px-4 flex items-center text-white/40 text-sm border-r border-white/5">
                    graphlynk.com/
                  </span>
                  <input
                    placeholder="janedoe"
                    value={data.username}
                    onChange={(e) =>
                      update('username', e.target.value.replace(/[^a-z0-9-]/gi, '').toLowerCase())
                    }
                    className="flex-1 bg-transparent px-3 py-3 text-white placeholder-white/30 outline-none"
                  />
                </div>
                {data.username && (
                  <div className="mt-2 inline-flex items-center gap-2 text-xs text-[#6EE7F5]">
                    <LinkIcon size={12} />
                    graphlynk.com/{data.username}
                  </div>
                )}
              </Field>
            </div>
          </Accordion>

          {/* SOCIAL PROFILES */}
          <Accordion
            id="social"
            title="Social Profiles"
            icon={<LinkIcon size={14} />}
            open={open.social}
            onToggle={toggle}
          >
            <div className="space-y-3">
              {data.socials.map((s, i) => (
                <div key={i} className="grid grid-cols-[140px_1fr_auto] gap-2 items-center">
                  <Select
                    value={s.platform}
                    onChange={(e) => {
                      const next = [...data.socials];
                      next[i] = { ...s, platform: e.target.value as SocialPlatform };
                      update('socials', next);
                    }}
                  >
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">X / Twitter</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="facebook">Facebook</option>
                    <option value="github">GitHub</option>
                    <option value="spotify">Spotify</option>
                    <option value="website">Other</option>
                  </Select>
                  <TextInput
                    type="url"
                    placeholder="https://..."
                    value={s.url}
                    onChange={(e) => {
                      const next = [...data.socials];
                      next[i] = { ...s, url: e.target.value };
                      update('socials', next);
                    }}
                  />
                  <RemoveBtn
                    onClick={() => {
                      const next = data.socials.filter((_, idx) => idx !== i);
                      update('socials', next.length > 0 ? next : [{ platform: 'linkedin', url: '' }]);
                    }}
                  />
                </div>
              ))}
              <AddRowButton
                label="Add another profile"
                onClick={() =>
                  update('socials', [...data.socials, { platform: 'linkedin', url: '' }])
                }
              />
            </div>
          </Accordion>

          {/* AUTHORITY SOURCES */}
          <Accordion
            id="authority"
            title="Authority Sources"
            icon={<ShieldCheck size={14} />}
            open={open.authority}
            onToggle={toggle}
          >
            <AuthoritySources
              category={data.entityCategory}
              authority={data.authority}
              onChange={(a) => update('authority', a)}
            />
          </Accordion>

          {/* CREDENTIALS */}
          <Accordion
            id="credentials"
            title="Credentials"
            icon={<GraduationCap size={14} />}
            open={open.credentials}
            onToggle={toggle}
          >
            <div className="space-y-3">
              {data.credentials.length === 0 && (
                <EmptyHint>No credentials added yet — add education, awards, or certifications.</EmptyHint>
              )}
              {data.credentials.map((c, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/5 bg-[#16181D] p-4 grid sm:grid-cols-[140px_1fr_1fr_120px_auto] gap-3 items-center"
                >
                  <Select
                    value={c.type}
                    onChange={(e) => {
                      const next = [...data.credentials];
                      next[i] = { ...c, type: e.target.value as typeof c.type };
                      update('credentials', next);
                    }}
                  >
                    <option value="education">Education</option>
                    <option value="award">Award</option>
                    <option value="certification">Certification</option>
                  </Select>
                  <TextInput
                    placeholder="Title (e.g., MBA)"
                    value={c.title}
                    onChange={(e) => {
                      const next = [...data.credentials];
                      next[i] = { ...c, title: e.target.value };
                      update('credentials', next);
                    }}
                  />
                  <TextInput
                    placeholder="Issuer (e.g., Harvard)"
                    value={c.issuer}
                    onChange={(e) => {
                      const next = [...data.credentials];
                      next[i] = { ...c, issuer: e.target.value };
                      update('credentials', next);
                    }}
                  />
                  <TextInput
                    placeholder="Year"
                    value={c.year}
                    onChange={(e) => {
                      const next = [...data.credentials];
                      next[i] = { ...c, year: e.target.value };
                      update('credentials', next);
                    }}
                  />
                  <RemoveBtn
                    onClick={() =>
                      update(
                        'credentials',
                        data.credentials.filter((_, idx) => idx !== i)
                      )
                    }
                  />
                </div>
              ))}
              <AddRowButton
                label="Add credential"
                icon={<Award size={14} />}
                onClick={() =>
                  update('credentials', [
                    ...data.credentials,
                    { type: 'education', title: '', issuer: '', year: '' },
                  ])
                }
              />
            </div>
          </Accordion>

          {/* PRESS & MENTIONS */}
          <Accordion
            id="press"
            title="Press & Mentions"
            icon={<Newspaper size={14} />}
            open={open.press}
            onToggle={toggle}
          >
            <div className="space-y-3">
              {data.press.length === 0 && (
                <EmptyHint>Add publications, podcasts, or features that mention you.</EmptyHint>
              )}
              {data.press.map((p, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/5 bg-[#16181D] p-4 grid sm:grid-cols-[1fr_1.4fr_140px_auto] gap-3 items-center"
                >
                  <TextInput
                    placeholder="Outlet (e.g., Forbes)"
                    value={p.outlet}
                    onChange={(e) => {
                      const next = [...data.press];
                      next[i] = { ...p, outlet: e.target.value };
                      update('press', next);
                    }}
                  />
                  <TextInput
                    type="url"
                    placeholder="https://..."
                    value={p.url}
                    onChange={(e) => {
                      const next = [...data.press];
                      next[i] = { ...p, url: e.target.value };
                      update('press', next);
                    }}
                  />
                  <TextInput
                    type="date"
                    value={p.date}
                    onChange={(e) => {
                      const next = [...data.press];
                      next[i] = { ...p, date: e.target.value };
                      update('press', next);
                    }}
                  />
                  <RemoveBtn
                    onClick={() =>
                      update(
                        'press',
                        data.press.filter((_, idx) => idx !== i)
                      )
                    }
                  />
                </div>
              ))}
              <AddRowButton
                label="Add press mention"
                icon={<FileText size={14} />}
                onClick={() => update('press', [...data.press, { outlet: '', url: '', date: '' }])}
              />
            </div>
          </Accordion>

          {/* MEDIA ASSETS */}
          <Accordion
            id="media"
            title="Media Assets"
            icon={<ImageIcon size={14} />}
            open={open.media}
            onToggle={toggle}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <DropZone
                title="Headshots"
                hint="JPG / PNG · up to 6 images"
                icon={<Camera size={20} />}
              />
              <DropZone
                title="Press kit"
                hint="PDF or ZIP · max 50 MB"
                icon={<FileText size={20} />}
              />
            </div>
          </Accordion>

          {/* Footer actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6">
            <GhostButton onClick={onSave}>
              <Save size={16} /> Save Progress
            </GhostButton>
            <PrimaryCTA onClick={onPublish} className="w-full sm:w-auto">
              <Sparkles size={16} /> Generate My Knowledge Graph Package
            </PrimaryCTA>
          </div>
        </div>

        {/* Right column — sticky preview (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-4">
            <SchemaPreview data={data} />
            <LiveSchemaPreview schema={buildSchema(data)} />
          </div>
        </aside>
      </div>

      {/* Mobile bottom drawer */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30">
        <div
          className={`bg-[#0B0D10]/95 backdrop-blur-xl border-t border-[#6EE7F5]/20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 ${
            drawerOpen ? 'max-h-[75vh]' : 'max-h-[64px]'
          } overflow-hidden`}
        >
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="w-full px-4 py-3 flex items-center justify-between"
          >
            <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#6EE7F5]">
              <Code2 size={14} /> Live JSON-LD Preview
            </span>
            <ChevronDown
              size={18}
              className={`text-white/60 transition-transform ${drawerOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {drawerOpen && (
            <div className="px-4 pb-4 overflow-y-auto max-h-[calc(75vh-64px)] space-y-4">
              <SchemaPreview data={data} />
              <LiveSchemaPreview schema={buildSchema(data)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Sub-components ---------- */

function StepIndicator({ current }: { current: StepId }) {
  const currentIdx = STEPS.findIndex((s) => s.id === current);
  return (
    <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
      {STEPS.map((s, i) => {
        const active = i === currentIdx;
        const done = i < currentIdx;
        return (
          <div key={s.id} className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                active
                  ? 'border-[#6EE7F5]/60 bg-[#6EE7F5]/10 text-white shadow-[0_0_20px_rgba(110,231,245,0.4)]'
                  : done
                  ? 'border-[#6EE7F5]/25 bg-white/[0.03] text-white/80'
                  : 'border-white/5 bg-white/[0.02] text-white/40'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center ${
                  active
                    ? 'bg-gradient-to-br from-[#0b3d84] to-[#6EE7F5] text-white'
                    : done
                    ? 'bg-[#6EE7F5]/20 text-[#6EE7F5]'
                    : 'bg-white/5 text-white/40'
                }`}
              >
                {i + 1}
              </span>
              <span className="text-xs hidden sm:inline">{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={`w-4 sm:w-8 h-px ${
                  done ? 'bg-[#6EE7F5]/40' : 'bg-white/5'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Accordion({
  id,
  title,
  icon,
  open,
  onToggle,
  children,
}: {
  id: SectionId;
  title: string;
  icon: React.ReactNode;
  open: boolean;
  onToggle: (id: SectionId) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#6EE7F5]/20 bg-white/[0.04] backdrop-blur-xl overflow-hidden">
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between gap-3 px-5 sm:px-6 py-4 hover:bg-white/[0.02] transition-colors"
      >
        <span className="flex items-center gap-2 uppercase tracking-[0.18em] text-[11px] text-[#6EE7F5]/90">
          <span className="text-[#6EE7F5]">{icon}</span>
          <span className="text-white/80">{title}</span>
        </span>
        <ChevronDown
          size={18}
          className={`text-white/50 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-6 pt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

function PhotoUpload({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col items-center sm:items-start">
      <span className="block text-xs uppercase tracking-wider text-white/60 mb-2">Photo</span>
      <label className="group relative w-28 h-28 rounded-2xl bg-[#16181D] border border-dashed border-[#6EE7F5]/30 flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#6EE7F5]/60 hover:shadow-[0_0_25px_rgba(110,231,245,0.25)] transition-all">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-white/50">
            <Upload size={20} className="mx-auto mb-1 text-[#6EE7F5]" />
            <span className="text-[10px] uppercase tracking-wider">Upload</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onChange(URL.createObjectURL(f));
          }}
        />
      </label>
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="mt-2 text-[11px] text-white/50 hover:text-white inline-flex items-center gap-1"
        >
          <X size={11} /> Remove
        </button>
      )}
    </div>
  );
}

function BioField({
  label,
  hint,
  max,
  value,
  onChange,
  rows = 2,
}: {
  label: string;
  hint?: string;
  max: number;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  const remaining = max - value.length;
  const overLimit = remaining < 0;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-xs uppercase tracking-wider text-white/60">{label}</span>
        <span
          className={`text-[11px] ${
            overLimit ? 'text-red-400' : remaining < 30 ? 'text-amber-300' : 'text-white/40'
          }`}
        >
          {value.length} / {max}
        </span>
      </div>
      <TextArea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <span className="block mt-1.5 text-[11px] text-white/40">{hint}</span>}
    </div>
  );
}

function AddRowButton({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#6EE7F5]/30 bg-[#6EE7F5]/[0.03] text-[#6EE7F5] py-3 hover:bg-[#6EE7F5]/[0.08] hover:border-[#6EE7F5]/60 transition-all text-sm"
    >
      {icon ?? <Plus size={14} />} {label}
    </button>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-9 h-9 rounded-lg border border-white/5 bg-[#16181D] text-white/50 hover:text-red-400 hover:border-red-400/30 transition-all flex items-center justify-center"
      aria-label="Remove"
    >
      <Trash2 size={14} />
    </button>
  );
}

function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-white/50">
      {children}
    </div>
  );
}

function DropZone({
  title,
  hint,
  icon,
}: {
  title: string;
  hint: string;
  icon: React.ReactNode;
}) {
  return (
    <label className="group flex flex-col items-center justify-center text-center rounded-xl border border-dashed border-[#6EE7F5]/25 bg-[#6EE7F5]/[0.02] py-10 px-5 cursor-pointer hover:border-[#6EE7F5]/60 hover:bg-[#6EE7F5]/[0.05] hover:shadow-[0_0_30px_rgba(110,231,245,0.2)] transition-all">
      <span className="w-12 h-12 rounded-2xl bg-[#16181D] border border-[#6EE7F5]/20 flex items-center justify-center text-[#6EE7F5] mb-3 group-hover:scale-105 transition-transform">
        {icon}
      </span>
      <span className="text-white text-sm">{title}</span>
      <span className="text-white/40 text-[11px] mt-1">{hint}</span>
      <span className="mt-3 text-[11px] uppercase tracking-wider text-[#6EE7F5]/80">
        Drop files or click to upload
      </span>
      <input type="file" className="sr-only" multiple />
    </label>
  );
}
