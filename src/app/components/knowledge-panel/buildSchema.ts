import { AuthorityFields, EntityCategory, IntakeData } from './types';

export function buildSchema(data: IntakeData) {
  const a = data.authority;

  const sameAs = uniq([
    ...data.sameAs,
    ...data.socials.map((s) => s.url),
    a.wikipediaUrl,
    a.crunchbasePerson,
    a.crunchbaseCompany,
    a.linkedinPersonal,
    a.linkedinCompany,
    a.spotifyArtist,
    a.appleMusicArtist,
    a.bandsintown,
    a.allmusic,
    a.discogs,
    a.soundcloud,
    a.bandcamp,
    a.amazonAuthor,
    a.goodreadsAuthor,
    a.googleBooks,
    a.libraryThing,
    a.angellist,
    a.imdbUrl,
    a.yelpUrl,
    a.googleBusinessProfile,
    ...a.industryDirectories,
  ]);

  const schemaType = pickType(data.entityCategory, a.isLocalBusiness);
  const name = data.displayName || data.brandName || data.fullName || data.legalName;

  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: name || undefined,
    alternateName: data.tagline || undefined,
    description: data.bioMedium || data.bioLong || data.bioShort || data.description || undefined,
    url: data.url || undefined,
    image: data.photoUrl || data.imageUrl || undefined,
    logo: data.logoUrl || undefined,
    email: data.email || undefined,
    telephone: data.phone || a.businessPhone || undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    identifier: a.wikidataQid || undefined,
  };

  const categorySpecific = buildCategorySpecific(data.entityCategory, a, data);
  const merged = { ...base, ...categorySpecific };

  Object.keys(merged).forEach((k) => merged[k] === undefined && delete merged[k]);
  return merged;
}

function pickType(category: EntityCategory | null, isLocal: boolean): string {
  switch (category) {
    case 'organization':
      return isLocal ? 'LocalBusiness' : 'Organization';
    case 'musician':
      return 'MusicGroup';
    case 'author':
    case 'personal-brand':
    case 'founder':
    case 'public-figure':
      return 'Person';
    default:
      return 'Person';
  }
}

function buildCategorySpecific(
  category: EntityCategory | null,
  a: AuthorityFields,
  data: IntakeData
): Record<string, unknown> {
  switch (category) {
    case 'musician':
      return {
        genre: a.genres.length ? a.genres : undefined,
        recordLabel: a.recordLabel || undefined,
        album: a.discography
          .filter((d) => d.title)
          .map((d) => ({
            '@type': 'MusicAlbum',
            name: d.title,
            albumProductionType: d.type,
            datePublished: d.releaseDate || undefined,
          })),
      };
    case 'author':
      return {
        jobTitle: 'Author',
        publisher: a.publisher ? { '@type': 'Organization', name: a.publisher } : undefined,
        knowsAbout: a.authorGenres.length ? a.authorGenres : undefined,
        author: undefined,
        worksFor: undefined,
        hasOccupation: a.authorGenres.length
          ? { '@type': 'Occupation', name: 'Author', skills: a.authorGenres.join(', ') }
          : undefined,
        owns: a.books
          .filter((b) => b.title)
          .map((b) => ({
            '@type': 'Book',
            name: b.title,
            isbn: b.isbn || undefined,
            datePublished: b.publicationDate || undefined,
            bookFormat: b.format || undefined,
          })),
      };
    case 'founder':
      return {
        jobTitle: a.fundingStage ? `Founder · ${a.fundingStage}` : 'Founder',
        worksFor: a.companyName
          ? {
              '@type': 'Organization',
              name: a.companyName,
              url: a.companyWebsite || undefined,
              sameAs: uniq([a.crunchbaseCompany, a.linkedinCompany, a.angellist]),
            }
          : undefined,
        knowsAbout: a.industries.length ? a.industries : undefined,
      };
    case 'public-figure':
      return {
        knowsAbout: a.affiliations.length ? a.affiliations : undefined,
        performerIn: a.notableWorks
          .filter((w) => w.title)
          .map((w) => ({
            '@type': 'CreativeWork',
            name: w.title,
            datePublished: w.year || undefined,
            roleName: w.role || undefined,
          })),
      };
    case 'organization': {
      const org: Record<string, unknown> = {
        legalName: a.legalName || undefined,
        foundingDate: a.orgFoundingDate || undefined,
        founder: a.founderName ? { '@type': 'Person', name: a.founderName } : undefined,
        ceo: a.ceoName ? { '@type': 'Person', name: a.ceoName } : undefined,
        numberOfEmployees: a.employeeCount || undefined,
        industry: a.industry || undefined,
        parentOrganization: a.parentOrg || undefined,
      };
      if (a.isLocalBusiness) {
        org.address = {
          '@type': 'PostalAddress',
          streetAddress: a.streetAddress || undefined,
          addressLocality: a.addressCity || undefined,
          addressRegion: a.addressRegion || undefined,
          postalCode: a.postalCode || undefined,
          addressCountry: a.addressCountry || undefined,
        };
        const validHours = a.hours
          .filter((h) => !h.closed && h.open && h.close)
          .map(
            (h) =>
              `${h.day} ${h.open}-${h.close}` // OpeningHoursSpecification short form
          );
        if (validHours.length) org.openingHours = validHours;
        org.priceRange = a.priceRange || undefined;
        org.servesCuisine = undefined;
        org['@type'] = 'LocalBusiness';
      }
      return org;
    }
    case 'personal-brand':
      return {
        knowsAbout: undefined,
      };
    default:
      return {};
  }
}

function uniq(arr: (string | undefined | null)[]): string[] {
  return Array.from(
    new Set(arr.filter((s): s is string => typeof s === 'string' && s.trim().length > 0))
  );
}

export function schemaCompleteness(data: IntakeData) {
  const checks: boolean[] = [
    !!data.entityCategory,
    !!(data.fullName || data.brandName || data.displayName),
    !!data.bioMedium || !!data.bioLong,
    !!data.url,
    data.socials.some((s) => s.url),
    !!data.photoUrl || !!data.imageUrl,
    Object.values(data.authority).some((v) =>
      Array.isArray(v) ? v.length > 0 : typeof v === 'string' ? v.trim().length > 0 : false
    ),
    data.credentials.length > 0 || data.press.length > 0,
  ];
  const filled = checks.filter(Boolean).length;
  return Math.round((filled / checks.length) * 100);
}
