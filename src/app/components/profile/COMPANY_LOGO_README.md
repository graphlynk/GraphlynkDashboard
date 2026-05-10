# Automatic Company Logo System

An intelligent system that automatically fetches company logos online without requiring manual uploads.

## How It Works

The system uses **Clearbit Logo API** to automatically fetch high-quality company logos based on the company's website domain. This eliminates the need for manual logo uploads and ensures consistent, professional branding.

## Features

✅ **Automatic Logo Fetching** - Just enter a company website or name  
✅ **Smart Domain Resolution** - Recognizes 50+ major companies by name  
✅ **Live Preview** - See the logo as you type  
✅ **Intelligent Fallback** - Shows company initial if logo isn't found  
✅ **No API Key Required** - Free tier of Clearbit works perfectly  

## Usage

### Simple Usage

Users can enter either:

1. **Full Domain**: `google.com`, `microsoft.com`
2. **URL**: `https://www.apple.com`
3. **Company Name**: `Google`, `Microsoft`, `Apple`

The system automatically:
- Cleans and normalizes the input
- Resolves company names to domains
- Fetches the logo from Clearbit
- Shows a fallback if logo isn't available

### Examples

```typescript
// In ProfileContent.tsx
<img 
  src={getCompanyLogo(resolveCompanyDomain(emp.website))} 
  alt={emp.company}
  onError={(e) => {
    (e.target as HTMLImageElement).src = getFallbackLogoSVG(emp.company);
  }}
/>
```

## Supported Company Name Recognition

The system automatically recognizes these companies by name:

**Tech Giants:**
- Google, Microsoft, Apple, Amazon, Meta, Facebook
- Netflix, Tesla, Twitter/X, LinkedIn, Salesforce
- Oracle, IBM, Adobe, Intel, Nvidia
- Airbnb, Uber, Spotify, Slack, Zoom
- Dropbox, GitHub

**Finance:**
- Goldman Sachs, JPMorgan, Morgan Stanley
- Bank of America, Wells Fargo, Citigroup

**Consulting:**
- McKinsey, Bain, BCG
- Deloitte, PwC, EY, KPMG, Accenture

**Retail:**
- Walmart, Target, Costco, Home Depot

**And many more...** (50+ companies total)

## How the API Works

### Clearbit Logo API

```
https://logo.clearbit.com/{domain}
```

**Benefits:**
- Free tier available (no API key needed)
- High-quality logos (typically 128x128px or better)
- Consistent formatting
- Fast CDN delivery
- Automatically updated when companies rebrand

**Limitations:**
- Requires valid domain
- May not have logos for very small companies
- Rate limits on free tier (generous for typical use)

## Fallback Strategy

When a logo can't be fetched, the system shows a professional fallback:

1. **Primary**: Clearbit Logo API
2. **Fallback**: SVG with company's first letter on brand color background

```typescript
// Automatic fallback SVG generation
getFallbackLogoSVG('Google') 
// Returns: Blue square with white "G"
```

## Smart Domain Resolution

The `resolveCompanyDomain()` function intelligently handles various inputs:

```typescript
resolveCompanyDomain('google')        // → google.com
resolveCompanyDomain('Google')        // → google.com
resolveCompanyDomain('google.com')    // → google.com
resolveCompanyDomain('www.google.com') // → google.com
resolveCompanyDomain('https://google.com/careers') // → google.com
```

## Integration

The system is fully integrated into ProfileContent:

### Edit View
- Users enter company website or name
- Live logo preview appears as they type
- Shows fallback if logo unavailable
- Helpful placeholder text guides users

### Preview View
- Company logos display under profile photo
- Only shows current employers
- Hover effects for interactivity
- Tooltip shows position and company name

## Alternative Logo APIs

If Clearbit doesn't meet your needs, here are alternatives:

### Google Favicon API
```typescript
`https://www.google.com/s2/favicons?domain=${domain}&sz=128`
```
- ✅ Always works
- ❌ Lower quality (favicon, not logo)

### Brandfetch
```typescript
`https://api.brandfetch.io/v1/logo/${domain}`
```
- ✅ High quality brand assets
- ❌ Requires API key
- ❌ Rate limits on free tier

### Logo.dev
```typescript
`https://img.logo.dev/${domain}?token=YOUR_TOKEN`
```
- ✅ High quality
- ❌ Requires API key

## Error Handling

The system gracefully handles errors:

```typescript
<img 
  src={getCompanyLogo(domain)}
  onError={(e) => {
    // Fallback to SVG with company initial
    (e.target as HTMLImageElement).src = getFallbackLogoSVG(companyName);
  }}
/>
```

## Performance

**Pros:**
- Logos are cached by CDN
- No database storage needed
- Always up-to-date
- Fast loading (< 100ms typically)

**Cons:**
- Requires internet connection
- Initial load may be slower
- Subject to API rate limits

## Best Practices

1. **Always provide fallback**: Use `onError` handler with `getFallbackLogoSVG()`
2. **Validate domains**: Use `resolveCompanyDomain()` to clean inputs
3. **Cache results**: Browser automatically caches logo images
4. **Show loading state**: Consider skeleton loaders for better UX
5. **Alt text**: Always provide meaningful alt text for accessibility

## Future Enhancements

Potential improvements:
- Local caching of fetched logos
- Multiple logo API fallbacks
- Logo size selection (small/medium/large)
- Manual override option
- Custom logo upload as last resort
- Logo color extraction for theming

## Troubleshooting

**Logo not appearing?**
1. Check if domain is correct (should be like `company.com`)
2. Try entering full company name instead
3. Check browser console for CORS errors
4. Verify internet connection

**Wrong logo appearing?**
1. Be more specific with domain (e.g., `ibm.com` not `ibm`)
2. Use company's official website domain
3. Check if company has rebranded

**Logo quality poor?**
- Clearbit typically provides high-quality logos
- If quality is poor, the company may not have provided a good logo to Clearbit
- Consider adding to the `companyDomainMapping` for better results
