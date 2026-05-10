import { Plus, Trash2 } from 'lucide-react';
import { Field, Select, TextInput } from './glass';
import { AuthorityFields, EntityCategory } from './types';

export function AuthoritySources({
  category,
  authority,
  onChange,
}: {
  category: EntityCategory | null;
  authority: AuthorityFields;
  onChange: (a: AuthorityFields) => void;
}) {
  const set = <K extends keyof AuthorityFields>(key: K, value: AuthorityFields[K]) =>
    onChange({ ...authority, [key]: value });

  if (!category) {
    return (
      <div className="rounded-xl border border-dashed border-[#6EE7F5]/25 bg-[#6EE7F5]/[0.03] p-6 text-center text-white/60 text-sm">
        Select an entity type in Step 1 to unlock authority source fields.
      </div>
    );
  }

  switch (category) {
    case 'personal-brand':
      return <PersonalBrandFields authority={authority} set={set} />;
    case 'musician':
      return <MusicianFields authority={authority} set={set} />;
    case 'author':
      return <AuthorFields authority={authority} set={set} />;
    case 'founder':
      return <FounderFields authority={authority} set={set} />;
    case 'public-figure':
      return <PublicFigureFields authority={authority} set={set} />;
    case 'organization':
      return <OrganizationFields authority={authority} set={set} />;
  }
}

type SetFn = <K extends keyof AuthorityFields>(key: K, value: AuthorityFields[K]) => void;

/* ------------------------- PERSONAL BRAND ------------------------- */

function PersonalBrandFields({ authority, set }: { authority: AuthorityFields; set: SetFn }) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Wikipedia URL">
          <TextInput
            type="url"
            placeholder="https://en.wikipedia.org/wiki/..."
            value={authority.wikipediaUrl}
            onChange={(e) => set('wikipediaUrl', e.target.value)}
          />
        </Field>
        <Field label="Wikidata Q-ID" hint="e.g. Q42">
          <ValidatedInput
            value={authority.wikidataQid}
            onChange={(v) => set('wikidataQid', v)}
            validate={(v) => !v || /^Q\d+$/.test(v)}
            placeholder="Q12345"
            errorText="Must start with Q followed by digits"
          />
        </Field>
        <Field label="Crunchbase (Person)">
          <TextInput
            type="url"
            placeholder="https://crunchbase.com/person/..."
            value={authority.crunchbasePerson}
            onChange={(e) => set('crunchbasePerson', e.target.value)}
          />
        </Field>
        <Field label="LinkedIn (personal)">
          <TextInput
            type="url"
            placeholder="https://linkedin.com/in/..."
            value={authority.linkedinPersonal}
            onChange={(e) => set('linkedinPersonal', e.target.value)}
          />
        </Field>
      </div>

      <RepeaterStrings
        label="Industry directories"
        hint="Trade associations, expert directories, speaker bureaus"
        values={authority.industryDirectories}
        onChange={(v) => set('industryDirectories', v)}
        placeholder="https://..."
      />
    </div>
  );
}

/* ----------------------------- MUSICIAN ---------------------------- */

function MusicianFields({ authority, set }: { authority: AuthorityFields; set: SetFn }) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Spotify Artist URL">
          <ValidatedInput
            value={authority.spotifyArtist}
            onChange={(v) => set('spotifyArtist', v)}
            validate={(v) => !v || /open\.spotify\.com\/artist\//.test(v)}
            placeholder="https://open.spotify.com/artist/..."
            errorText="Must be a Spotify artist URL"
          />
        </Field>
        <Field label="Apple Music Artist URL">
          <ValidatedInput
            value={authority.appleMusicArtist}
            onChange={(v) => set('appleMusicArtist', v)}
            validate={(v) => !v || /music\.apple\.com\/.+\/artist\//.test(v)}
            placeholder="https://music.apple.com/.../artist/..."
            errorText="Must be an Apple Music artist URL"
          />
        </Field>
        <Field label="MusicBrainz Artist ID" hint="UUID">
          <ValidatedInput
            value={authority.musicbrainzId}
            onChange={(v) => set('musicbrainzId', v)}
            validate={(v) =>
              !v || /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v)
            }
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            errorText="Invalid MusicBrainz UUID"
          />
        </Field>
        <Field label="Bandsintown URL">
          <TextInput
            type="url"
            placeholder="https://bandsintown.com/a/..."
            value={authority.bandsintown}
            onChange={(e) => set('bandsintown', e.target.value)}
          />
        </Field>
        <Field label="AllMusic URL">
          <TextInput
            type="url"
            placeholder="https://allmusic.com/artist/..."
            value={authority.allmusic}
            onChange={(e) => set('allmusic', e.target.value)}
          />
        </Field>
        <Field label="Discogs URL">
          <TextInput
            type="url"
            placeholder="https://discogs.com/artist/..."
            value={authority.discogs}
            onChange={(e) => set('discogs', e.target.value)}
          />
        </Field>
        <Field label="SoundCloud URL">
          <TextInput
            type="url"
            placeholder="https://soundcloud.com/..."
            value={authority.soundcloud}
            onChange={(e) => set('soundcloud', e.target.value)}
          />
        </Field>
        <Field label="Bandcamp URL">
          <TextInput
            type="url"
            placeholder="https://....bandcamp.com"
            value={authority.bandcamp}
            onChange={(e) => set('bandcamp', e.target.value)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Record label">
            <TextInput
              placeholder="Independent / Sony Music / ..."
              value={authority.recordLabel}
              onChange={(e) => set('recordLabel', e.target.value)}
            />
          </Field>
        </div>
      </div>

      <MultiTagInput
        label="Genres"
        hint="Press Enter to add"
        values={authority.genres}
        onChange={(v) => set('genres', v)}
        placeholder="Add a genre"
      />

      <RepeaterRecord
        label="Discography"
        addLabel="Add release"
        items={authority.discography}
        onChange={(v) => set('discography', v)}
        empty={{ title: '', type: 'Album', releaseDate: '' }}
        renderRow={(row, update) => (
          <>
            <TextInput
              placeholder="Title"
              value={row.title}
              onChange={(e) => update({ ...row, title: e.target.value })}
            />
            <Select value={row.type} onChange={(e) => update({ ...row, type: e.target.value })}>
              <option>Album</option>
              <option>EP</option>
              <option>Single</option>
              <option>Mixtape</option>
              <option>Live</option>
            </Select>
            <TextInput
              type="date"
              value={row.releaseDate}
              onChange={(e) => update({ ...row, releaseDate: e.target.value })}
            />
          </>
        )}
        cols="grid-cols-1 sm:grid-cols-[1.4fr_140px_160px_auto]"
      />
    </div>
  );
}

/* ------------------------------ AUTHOR ----------------------------- */

function AuthorFields({ authority, set }: { authority: AuthorityFields; set: SetFn }) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Amazon Author Central">
          <TextInput
            type="url"
            placeholder="https://amazon.com/author/..."
            value={authority.amazonAuthor}
            onChange={(e) => set('amazonAuthor', e.target.value)}
          />
        </Field>
        <Field label="Goodreads Author URL">
          <TextInput
            type="url"
            placeholder="https://goodreads.com/author/..."
            value={authority.goodreadsAuthor}
            onChange={(e) => set('goodreadsAuthor', e.target.value)}
          />
        </Field>
        <Field label="Google Books URL">
          <TextInput
            type="url"
            placeholder="https://books.google.com/..."
            value={authority.googleBooks}
            onChange={(e) => set('googleBooks', e.target.value)}
          />
        </Field>
        <Field label="LibraryThing URL">
          <TextInput
            type="url"
            placeholder="https://librarything.com/author/..."
            value={authority.libraryThing}
            onChange={(e) => set('libraryThing', e.target.value)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Publisher">
            <TextInput
              placeholder="Penguin / Self-published / ..."
              value={authority.publisher}
              onChange={(e) => set('publisher', e.target.value)}
            />
          </Field>
        </div>
      </div>

      <MultiTagInput
        label="Genres"
        hint="Press Enter to add"
        values={authority.authorGenres}
        onChange={(v) => set('authorGenres', v)}
        placeholder="Add a genre"
      />

      <RepeaterRecord
        label="Books"
        addLabel="Add book"
        items={authority.books}
        onChange={(v) => set('books', v)}
        empty={{ title: '', isbn: '', publicationDate: '', format: 'Hardcover' }}
        renderRow={(row, update) => (
          <>
            <TextInput
              placeholder="Title"
              value={row.title}
              onChange={(e) => update({ ...row, title: e.target.value })}
            />
            <ValidatedInput
              value={row.isbn}
              onChange={(v) => update({ ...row, isbn: v })}
              validate={(v) => !v || /^[\d-]{10,17}$/.test(v)}
              placeholder="ISBN"
              errorText="Invalid ISBN"
            />
            <TextInput
              type="date"
              value={row.publicationDate}
              onChange={(e) => update({ ...row, publicationDate: e.target.value })}
            />
            <Select value={row.format} onChange={(e) => update({ ...row, format: e.target.value })}>
              <option>Hardcover</option>
              <option>Paperback</option>
              <option>eBook</option>
              <option>Audiobook</option>
            </Select>
          </>
        )}
        cols="grid-cols-1 sm:grid-cols-[1.4fr_1fr_160px_140px_auto]"
      />
    </div>
  );
}

/* ----------------------------- FOUNDER ----------------------------- */

function FounderFields({ authority, set }: { authority: AuthorityFields; set: SetFn }) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="LinkedIn (personal)">
          <TextInput
            type="url"
            placeholder="https://linkedin.com/in/..."
            value={authority.linkedinPersonal}
            onChange={(e) => set('linkedinPersonal', e.target.value)}
          />
        </Field>
        <Field label="Crunchbase (Person)">
          <TextInput
            type="url"
            placeholder="https://crunchbase.com/person/..."
            value={authority.crunchbasePerson}
            onChange={(e) => set('crunchbasePerson', e.target.value)}
          />
        </Field>
        <Field label="Company name">
          <TextInput
            value={authority.companyName}
            onChange={(e) => set('companyName', e.target.value)}
          />
        </Field>
        <Field label="Company Crunchbase URL">
          <TextInput
            type="url"
            placeholder="https://crunchbase.com/organization/..."
            value={authority.crunchbaseCompany}
            onChange={(e) => set('crunchbaseCompany', e.target.value)}
          />
        </Field>
        <Field label="Company website">
          <TextInput
            type="url"
            placeholder="https://..."
            value={authority.companyWebsite}
            onChange={(e) => set('companyWebsite', e.target.value)}
          />
        </Field>
        <Field label="AngelList / Wellfound">
          <TextInput
            type="url"
            placeholder="https://wellfound.com/..."
            value={authority.angellist}
            onChange={(e) => set('angellist', e.target.value)}
          />
        </Field>
        <Field label="Funding stage">
          <Select
            value={authority.fundingStage}
            onChange={(e) => set('fundingStage', e.target.value)}
          >
            <option value="">Select…</option>
            <option>Bootstrapped</option>
            <option>Pre-seed</option>
            <option>Seed</option>
            <option>Series A</option>
            <option>Series B</option>
            <option>Series C+</option>
            <option>Public</option>
            <option>Acquired</option>
          </Select>
        </Field>
      </div>

      <MultiTagInput
        label="Industries"
        hint="Press Enter to add"
        values={authority.industries}
        onChange={(v) => set('industries', v)}
        placeholder="SaaS, Fintech, AI…"
      />
    </div>
  );
}

/* --------------------------- PUBLIC FIGURE -------------------------- */

function PublicFigureFields({ authority, set }: { authority: AuthorityFields; set: SetFn }) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="IMDb URL">
          <ValidatedInput
            value={authority.imdbUrl}
            onChange={(v) => set('imdbUrl', v)}
            validate={(v) => !v || /imdb\.com\/name\/nm\d+/.test(v)}
            placeholder="https://imdb.com/name/nm0000000"
            errorText="Must be an IMDb /name/ URL"
          />
        </Field>
        <Field label="Wikipedia URL">
          <TextInput
            type="url"
            placeholder="https://en.wikipedia.org/wiki/..."
            value={authority.wikipediaUrl}
            onChange={(e) => set('wikipediaUrl', e.target.value)}
          />
        </Field>
        <Field label="Wikidata Q-ID">
          <ValidatedInput
            value={authority.wikidataQid}
            onChange={(v) => set('wikidataQid', v)}
            validate={(v) => !v || /^Q\d+$/.test(v)}
            placeholder="Q12345"
            errorText="Must start with Q followed by digits"
          />
        </Field>
      </div>

      <RepeaterRecord
        label="Notable works"
        addLabel="Add notable work"
        items={authority.notableWorks}
        onChange={(v) => set('notableWorks', v)}
        empty={{ title: '', year: '', role: '' }}
        renderRow={(row, update) => (
          <>
            <TextInput
              placeholder="Title"
              value={row.title}
              onChange={(e) => update({ ...row, title: e.target.value })}
            />
            <TextInput
              placeholder="Year"
              value={row.year}
              onChange={(e) => update({ ...row, year: e.target.value })}
            />
            <TextInput
              placeholder="Role / capacity"
              value={row.role}
              onChange={(e) => update({ ...row, role: e.target.value })}
            />
          </>
        )}
        cols="grid-cols-1 sm:grid-cols-[1.4fr_120px_1.2fr_auto]"
      />

      <MultiTagInput
        label="Affiliations"
        hint="Teams, parties, organizations, networks"
        values={authority.affiliations}
        onChange={(v) => set('affiliations', v)}
        placeholder="Add an affiliation"
      />
    </div>
  );
}

/* --------------------------- ORGANIZATION --------------------------- */

function OrganizationFields({
  authority,
  set,
}: {
  authority: AuthorityFields;
  set: SetFn;
}) {
  const isLocal = authority.isLocalBusiness;
  return (
    <div className="space-y-5">
      <label className="flex items-center justify-between gap-3 rounded-xl border border-[#6EE7F5]/20 bg-[#6EE7F5]/[0.04] px-4 py-3 cursor-pointer hover:border-[#6EE7F5]/40 transition-all">
        <div>
          <div className="text-sm text-white">Local / physical business</div>
          <div className="text-[11px] text-white/50">
            Adds address, hours, Yelp, Google Business Profile, and price range
          </div>
        </div>
        <span
          className={`relative w-10 h-6 rounded-full transition-all ${
            isLocal ? 'bg-gradient-to-r from-[#0b3d84] to-[#6EE7F5] shadow-[0_0_12px_rgba(110,231,245,0.5)]' : 'bg-white/10'
          }`}
        >
          <input
            type="checkbox"
            className="sr-only"
            checked={isLocal}
            onChange={(e) => set('isLocalBusiness', e.target.checked)}
          />
          <span
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
              isLocal ? 'left-[1.125rem]' : 'left-0.5'
            }`}
          />
        </span>
      </label>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Legal name">
          <TextInput
            value={authority.legalName}
            onChange={(e) => set('legalName', e.target.value)}
          />
        </Field>
        <Field label="Founding date">
          <TextInput
            type="date"
            value={authority.orgFoundingDate}
            onChange={(e) => set('orgFoundingDate', e.target.value)}
          />
        </Field>
        <Field label="Founder">
          <TextInput
            value={authority.founderName}
            onChange={(e) => set('founderName', e.target.value)}
          />
        </Field>
        <Field label="CEO">
          <TextInput
            value={authority.ceoName}
            onChange={(e) => set('ceoName', e.target.value)}
          />
        </Field>
        <Field label="Employee count range">
          <Select
            value={authority.employeeCount}
            onChange={(e) => set('employeeCount', e.target.value)}
          >
            <option value="">Select…</option>
            <option>1–10</option>
            <option>11–50</option>
            <option>51–200</option>
            <option>201–500</option>
            <option>501–1,000</option>
            <option>1,001–5,000</option>
            <option>5,001–10,000</option>
            <option>10,000+</option>
          </Select>
        </Field>
        <Field label="Industry">
          <TextInput
            value={authority.industry}
            onChange={(e) => set('industry', e.target.value)}
          />
        </Field>
        <Field label="Crunchbase (Company)">
          <TextInput
            type="url"
            placeholder="https://crunchbase.com/organization/..."
            value={authority.crunchbaseCompany}
            onChange={(e) => set('crunchbaseCompany', e.target.value)}
          />
        </Field>
        <Field label="LinkedIn (Company)">
          <TextInput
            type="url"
            placeholder="https://linkedin.com/company/..."
            value={authority.linkedinCompany}
            onChange={(e) => set('linkedinCompany', e.target.value)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Parent / Subsidiary">
            <TextInput
              placeholder="Parent company or subsidiary brands"
              value={authority.parentOrg}
              onChange={(e) => set('parentOrg', e.target.value)}
            />
          </Field>
        </div>
      </div>

      {isLocal && <LocalBusinessExtras authority={authority} set={set} />}
    </div>
  );
}

function LocalBusinessExtras({ authority, set }: { authority: AuthorityFields; set: SetFn }) {
  const updateHours = (i: number, patch: Partial<AuthorityFields['hours'][number]>) => {
    const next = [...authority.hours];
    next[i] = { ...next[i], ...patch };
    set('hours', next);
  };

  return (
    <div className="space-y-5 pt-2 border-t border-white/5">
      <div className="flex items-center gap-2 uppercase tracking-[0.18em] text-[11px] text-[#6EE7F5]/90 pt-4">
        <span className="w-1 h-1 rounded-full bg-[#6EE7F5]" /> Local Business Details
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Field label="Street address">
            <TextInput
              value={authority.streetAddress}
              onChange={(e) => set('streetAddress', e.target.value)}
            />
          </Field>
        </div>
        <Field label="City">
          <TextInput
            value={authority.addressCity}
            onChange={(e) => set('addressCity', e.target.value)}
          />
        </Field>
        <Field label="State / Region">
          <TextInput
            value={authority.addressRegion}
            onChange={(e) => set('addressRegion', e.target.value)}
          />
        </Field>
        <Field label="Postal code">
          <TextInput
            value={authority.postalCode}
            onChange={(e) => set('postalCode', e.target.value)}
          />
        </Field>
        <Field label="Country">
          <TextInput
            value={authority.addressCountry}
            onChange={(e) => set('addressCountry', e.target.value)}
          />
        </Field>
        <Field label="Business phone">
          <TextInput
            value={authority.businessPhone}
            onChange={(e) => set('businessPhone', e.target.value)}
          />
        </Field>
        <Field label="Business category">
          <TextInput
            placeholder="Restaurant, Salon, Clinic…"
            value={authority.businessCategory}
            onChange={(e) => set('businessCategory', e.target.value)}
          />
        </Field>
        <Field label="Yelp URL">
          <TextInput
            type="url"
            placeholder="https://yelp.com/biz/..."
            value={authority.yelpUrl}
            onChange={(e) => set('yelpUrl', e.target.value)}
          />
        </Field>
        <Field label="Google Business Profile">
          <TextInput
            type="url"
            placeholder="https://g.page/..."
            value={authority.googleBusinessProfile}
            onChange={(e) => set('googleBusinessProfile', e.target.value)}
          />
        </Field>
        <Field label="Price range">
          <Select
            value={authority.priceRange}
            onChange={(e) => set('priceRange', e.target.value)}
          >
            <option value="">Select…</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
          </Select>
        </Field>
      </div>

      <div>
        <span className="block text-xs uppercase tracking-wider text-white/60 mb-3">
          Hours of operation
        </span>
        <div className="space-y-2">
          {authority.hours.map((h, i) => (
            <div
              key={h.day}
              className="grid grid-cols-[60px_1fr_1fr_auto] sm:grid-cols-[80px_1fr_1fr_120px] gap-2 items-center rounded-xl border border-white/5 bg-[#16181D] px-3 py-2"
            >
              <span className="text-white/80 text-sm">{h.day}</span>
              <TextInput
                type="time"
                value={h.open}
                disabled={h.closed}
                onChange={(e) => updateHours(i, { open: e.target.value })}
              />
              <TextInput
                type="time"
                value={h.close}
                disabled={h.closed}
                onChange={(e) => updateHours(i, { close: e.target.value })}
              />
              <label className="flex items-center gap-2 text-xs text-white/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={h.closed}
                  onChange={(e) => updateHours(i, { closed: e.target.checked })}
                  className="accent-[#6EE7F5]"
                />
                Closed
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================ Helpers ============================== */

function ValidatedInput({
  value,
  onChange,
  validate,
  placeholder,
  errorText,
}: {
  value: string;
  onChange: (v: string) => void;
  validate: (v: string) => boolean;
  placeholder?: string;
  errorText: string;
}) {
  const valid = validate(value);
  return (
    <div>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl bg-[#16181D] border px-4 py-3 text-white placeholder-white/30 outline-none focus:ring-2 transition-all ${
          valid
            ? 'border-white/5 focus:border-[#6EE7F5]/50 focus:ring-[#6EE7F5]/30'
            : 'border-red-500/60 focus:border-red-400 focus:ring-red-400/30'
        }`}
      />
      {!valid && (
        <span className="block mt-1.5 text-[11px] text-red-400">{errorText}</span>
      )}
    </div>
  );
}

function MultiTagInput({
  label,
  hint,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <span className="block text-xs uppercase tracking-wider text-white/60 mb-2">{label}</span>
      <div className="flex flex-wrap gap-2 rounded-xl bg-[#16181D] border border-white/5 px-3 py-2 focus-within:border-[#6EE7F5]/50 focus-within:ring-2 focus-within:ring-[#6EE7F5]/30 transition-all">
        {values.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#6EE7F5]/10 border border-[#6EE7F5]/30 text-[#6EE7F5] text-xs"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(values.filter((_, idx) => idx !== i))}
              className="hover:text-white"
            >
              ×
            </button>
          </span>
        ))}
        <input
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const v = (e.target as HTMLInputElement).value.trim();
              if (v && !values.includes(v)) onChange([...values, v]);
              (e.target as HTMLInputElement).value = '';
            }
          }}
          className="flex-1 min-w-[120px] bg-transparent text-white placeholder-white/30 text-sm outline-none py-1"
        />
      </div>
      {hint && <span className="block mt-1.5 text-[11px] text-white/40">{hint}</span>}
    </div>
  );
}

function RepeaterStrings({
  label,
  hint,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <span className="block text-xs uppercase tracking-wider text-white/60 mb-2">{label}</span>
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto] gap-2">
            <TextInput
              placeholder={placeholder}
              value={v}
              onChange={(e) => {
                const next = [...values];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, idx) => idx !== i))}
              className="w-10 h-10 rounded-lg border border-white/5 bg-[#16181D] text-white/50 hover:text-red-400 hover:border-red-400/30 transition-all flex items-center justify-center"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, ''])}
          className="inline-flex items-center gap-2 text-xs text-[#6EE7F5] hover:text-white transition-colors"
        >
          <Plus size={12} /> Add
        </button>
      </div>
      {hint && <span className="block mt-1.5 text-[11px] text-white/40">{hint}</span>}
    </div>
  );
}

function RepeaterRecord<T>({
  label,
  addLabel,
  items,
  onChange,
  empty,
  renderRow,
  cols,
}: {
  label: string;
  addLabel: string;
  items: T[];
  onChange: (v: T[]) => void;
  empty: T;
  renderRow: (row: T, update: (next: T) => void) => React.ReactNode;
  cols: string;
}) {
  return (
    <div>
      <span className="block text-xs uppercase tracking-wider text-white/60 mb-2">{label}</span>
      <div className="space-y-2">
        {items.length === 0 && (
          <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-white/50">
            None added yet.
          </div>
        )}
        {items.map((row, i) => (
          <div
            key={i}
            className={`grid ${cols} gap-2 items-center rounded-xl border border-white/5 bg-[#16181D] p-3`}
          >
            {renderRow(row, (next) => {
              const arr = [...items];
              arr[i] = next;
              onChange(arr);
            })}
            <button
              type="button"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="w-10 h-10 rounded-lg border border-white/5 bg-[#0B0D10] text-white/50 hover:text-red-400 hover:border-red-400/30 transition-all flex items-center justify-center justify-self-end sm:justify-self-auto"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, empty])}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#6EE7F5]/30 bg-[#6EE7F5]/[0.03] text-[#6EE7F5] py-3 hover:bg-[#6EE7F5]/[0.08] hover:border-[#6EE7F5]/60 transition-all text-sm"
        >
          <Plus size={14} /> {addLabel}
        </button>
      </div>
    </div>
  );
}

// Re-export OrganizationFields with isLocal flag for the LocalBusiness path
export function LocalBusinessFields(props: { authority: AuthorityFields; set: SetFn }) {
  return <OrganizationFields {...props} isLocal />;
}
