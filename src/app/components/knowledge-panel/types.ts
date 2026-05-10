export type EntityCategory =
  | 'personal-brand'
  | 'musician'
  | 'author'
  | 'founder'
  | 'public-figure'
  | 'organization';

export type IntakeData = {
  // Step 1 — Entity Type
  entityCategory: EntityCategory | null;
  // Step 2 — Basics
  entityType: 'Organization' | 'Person' | 'LocalBusiness' | 'Product';
  legalName: string;
  displayName: string;
  tagline: string;
  description: string;

  // Step 2 — Identity
  foundingDate: string;
  founders: string;
  industry: string;
  location: string;

  // Step 3 — Web & Profiles
  url: string;
  sameAs: string[];

  // Step 4 — Media & Contact
  logoUrl: string;
  imageUrl: string;
  email: string;
  phone: string;

  // Extended intake
  photoUrl: string;
  fullName: string;
  brandName: string;
  bioShort: string;
  bioMedium: string;
  bioLong: string;
  country: string;
  state: string;
  city: string;
  locationDisplay: 'full' | 'city-state' | 'country' | 'hidden';
  username: string;
  socials: { platform: SocialPlatform; url: string }[];
  credentials: { type: 'education' | 'award' | 'certification'; title: string; issuer: string; year: string }[];
  press: { outlet: string; url: string; date: string }[];
  headshots: string[];
  pressKit: string;

  authority: AuthorityFields;
};

export type AuthorityFields = {
  // Shared
  wikipediaUrl: string;
  wikidataQid: string;
  crunchbasePerson: string;
  crunchbaseCompany: string;
  linkedinPersonal: string;
  linkedinCompany: string;

  // Musician
  spotifyArtist: string;
  appleMusicArtist: string;
  musicbrainzId: string;
  bandsintown: string;
  allmusic: string;
  discogs: string;
  soundcloud: string;
  bandcamp: string;
  recordLabel: string;
  genres: string[];
  discography: { title: string; type: string; releaseDate: string }[];

  // Author
  amazonAuthor: string;
  goodreadsAuthor: string;
  googleBooks: string;
  libraryThing: string;
  publisher: string;
  books: { title: string; isbn: string; publicationDate: string; format: string }[];
  authorGenres: string[];

  // Founder
  companyName: string;
  companyWebsite: string;
  angellist: string;
  fundingStage: string;
  industries: string[];

  // Public Figure
  imdbUrl: string;
  notableWorks: { title: string; year: string; role: string }[];
  affiliations: string[];

  // Organization
  legalName: string;
  orgFoundingDate: string;
  founderName: string;
  ceoName: string;
  employeeCount: string;
  industry: string;
  parentOrg: string;

  // Local Business
  streetAddress: string;
  addressCity: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  hours: { day: string; open: string; close: string; closed: boolean }[];
  businessPhone: string;
  yelpUrl: string;
  googleBusinessProfile: string;
  businessCategory: string;
  priceRange: string;

  // Personal Brand
  industryDirectories: string[];

  // Toggle within Organization
  isLocalBusiness: boolean;
};

export const emptyAuthority: AuthorityFields = {
  wikipediaUrl: '',
  wikidataQid: '',
  crunchbasePerson: '',
  crunchbaseCompany: '',
  linkedinPersonal: '',
  linkedinCompany: '',
  spotifyArtist: '',
  appleMusicArtist: '',
  musicbrainzId: '',
  bandsintown: '',
  allmusic: '',
  discogs: '',
  soundcloud: '',
  bandcamp: '',
  recordLabel: '',
  genres: [],
  discography: [],
  amazonAuthor: '',
  goodreadsAuthor: '',
  googleBooks: '',
  libraryThing: '',
  publisher: '',
  books: [],
  authorGenres: [],
  companyName: '',
  companyWebsite: '',
  angellist: '',
  fundingStage: '',
  industries: [],
  imdbUrl: '',
  notableWorks: [],
  affiliations: [],
  legalName: '',
  orgFoundingDate: '',
  founderName: '',
  ceoName: '',
  employeeCount: '',
  industry: '',
  parentOrg: '',
  streetAddress: '',
  addressCity: '',
  addressRegion: '',
  postalCode: '',
  addressCountry: '',
  hours: [
    { day: 'Mon', open: '09:00', close: '17:00', closed: false },
    { day: 'Tue', open: '09:00', close: '17:00', closed: false },
    { day: 'Wed', open: '09:00', close: '17:00', closed: false },
    { day: 'Thu', open: '09:00', close: '17:00', closed: false },
    { day: 'Fri', open: '09:00', close: '17:00', closed: false },
    { day: 'Sat', open: '10:00', close: '14:00', closed: false },
    { day: 'Sun', open: '00:00', close: '00:00', closed: true },
  ],
  businessPhone: '',
  yelpUrl: '',
  googleBusinessProfile: '',
  businessCategory: '',
  priceRange: '',
  industryDirectories: [],
  isLocalBusiness: false,
};

export type SocialPlatform =
  | 'linkedin'
  | 'twitter'
  | 'instagram'
  | 'youtube'
  | 'tiktok'
  | 'facebook'
  | 'github'
  | 'spotify'
  | 'website';

export const emptyIntake: IntakeData = {
  entityCategory: null,
  entityType: 'Organization',
  legalName: '',
  displayName: '',
  tagline: '',
  description: '',
  foundingDate: '',
  founders: '',
  industry: '',
  location: '',
  url: '',
  sameAs: ['', '', ''],
  logoUrl: '',
  imageUrl: '',
  email: '',
  phone: '',
  photoUrl: '',
  fullName: '',
  brandName: '',
  bioShort: '',
  bioMedium: '',
  bioLong: '',
  country: '',
  state: '',
  city: '',
  locationDisplay: 'city-state',
  username: '',
  socials: [{ platform: 'linkedin', url: '' }],
  credentials: [],
  press: [],
  headshots: [],
  pressKit: '',
  authority: emptyAuthority,
};

export type FlowStage = 'checkout' | 'intake' | 'success';
