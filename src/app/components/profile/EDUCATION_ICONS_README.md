# Education Credential Icon System

A comprehensive icon system for displaying educational credentials with professional design standards.

## Design Specifications

- **Grid:** 24×24 pixels
- **Stroke:** 1.8px
- **Corner Radius:** 2–3px
- **Variants:** Outline and Filled
- **Color:** `currentColor` (no gradients)
- **Legibility:** Designed for 16px minimum size
- **Contrast:** 3:1 minimum contrast ratio
- **Format:** Auto-layout frames with pixel-fit paths, centered, exportable SVG

## Icon Metaphors

| Credential Level | Icon Metaphor | Component Names |
|-----------------|---------------|-----------------|
| Certificate/Bootcamp | Rosette with ribbon | `CertificateOutline`, `CertificateFilled` |
| Associate Degree | Certificate + small laurel sprig | `AssociateOutline`, `AssociateFilled` |
| Bachelor's Degree | Diploma with ribbon | `BachelorOutline`, `BachelorFilled` |
| Master's Degree | Graduation cap | `MasterOutline`, `MasterFilled` |
| Doctorate | Cap + laurel wreath | `DoctorateOutline`, `DoctorateFilled` |
| Professional License | Shield + check mark | `LicenseOutline`, `LicenseFilled` |

## Badge Overlays

Badges are 8–10px and positioned at top-right corner:

| Badge Type | Use Case | Component |
|-----------|----------|-----------|
| ✓ Check (Green) | Verified credential | `VerifiedBadge` |
| ★ Star (Yellow) | Honors/Distinction | `HonorsBadge` |
| ⚡ Bolt (Blue) | In Progress | `InProgressBadge` |
| 🔒 Lock (Gray) | Restricted access | `RestrictedBadge` |

## Component Usage

### Basic Usage

```tsx
import { CredentialIcon } from './components/profile/EducationIcons';

// Simple outline icon
<CredentialIcon level="bachelor" variant="outline" />

// Filled icon with honors badge
<CredentialIcon 
  level="master" 
  variant="filled" 
  badge="honors"
  className="text-blue-600"
/>
```

### Individual Icons

```tsx
import { BachelorFilled, MasterOutline } from './components/profile/EducationIcons';

<BachelorFilled className="text-blue-600 w-6 h-6" />
<MasterOutline className="text-gray-700 w-6 h-6" />
```

### With Badges

```tsx
import { CredentialIcon } from './components/profile/EducationIcons';

// In-progress doctorate
<CredentialIcon 
  level="doctorate" 
  variant="filled"
  badge="inProgress"
/>

// Verified professional license
<CredentialIcon 
  level="license" 
  variant="filled"
  badge="verified"
/>
```

## Degree Mapping

The system includes a comprehensive JSON mapping for automatic icon selection:

```typescript
import { degreeMapping } from './components/profile/EducationIcons';

// Example usage
const degree = "Master's Degree";
const mapping = degreeMapping[degree];
// Returns: { icon: "master", badge: null }

<CredentialIcon 
  level={mapping.icon}
  variant="filled"
/>
```

### Supported Degrees

**Certificates:**
- High School Diploma
- Certificate
- Bootcamp

**Associate:**
- Associate Degree
- Associate of Arts (A.A.)
- Associate of Science (A.S.)

**Bachelor's:**
- Bachelor's Degree
- Bachelor of Arts (B.A.)
- Bachelor of Science (B.S.)

**Master's:**
- Master's Degree
- Master of Arts (M.A.)
- Master of Science (M.S.)
- MBA

**Doctorate:**
- Doctorate
- Ph.D.
- M.D.
- J.D.

**Professional Licenses:**
- Professional License
- CPA (Certified Public Accountant)
- PE (Professional Engineer)
- Bar License

## Naming Convention

Components follow the pattern: `icon/[level]/[state]`

- **Levels:** certificate, associate, bachelor, master, doctorate, license
- **States:** outline, filled
- **Badges:** verified, honors, inProgress, restricted

Examples:
- `icon/bachelor/outline` → `BachelorOutline`
- `icon/master/filled` → `MasterFilled`
- `icon/doctorate/filled` + `badge/honors` → `<CredentialIcon level="doctorate" variant="filled" badge="honors" />`

## Accessibility

- All icons use `currentColor` for easy theming
- Maintain 3:1 minimum contrast ratio
- Include descriptive `alt` text when used as images
- Ensure 16px minimum size for legibility
- Support high contrast mode

## Integration with ProfileContent

The icons are automatically integrated into the ProfileContent component:

1. **Edit View:** Users can add education entries with degree selection
2. **Preview View:** Icons are displayed with appropriate badges based on:
   - Current enrollment status (bolt badge for in-progress)
   - Honors/Distinction flag (star badge)
   - Degree type (automatic icon selection from mapping)

## Technical Notes

- SVG paths use `stroke="currentColor"` for flexible theming
- Centered alignment within 24×24 grid
- Pixel-fit paths for crisp rendering
- Exportable as standalone SVG files
- Compatible with all modern browsers
- No external dependencies (pure React/SVG)

## Example Implementation

```tsx
// In ProfileContent.tsx
{education.map((edu) => {
  const mapping = degreeMapping[edu.degree];
  if (!mapping) return null;
  
  const badge = edu.current 
    ? 'inProgress' 
    : edu.honors 
    ? 'honors' 
    : undefined;
  
  return (
    <div key={edu.id} className="flex items-center gap-3">
      <CredentialIcon 
        level={mapping.icon}
        variant="filled"
        badge={badge}
        className="text-blue-600"
      />
      <div>
        <p>{edu.degree}</p>
        <p>{edu.institution}</p>
      </div>
    </div>
  );
})}
```

## Design Philosophy

The icon system prioritizes:
1. **Clarity:** Each credential level has a distinct visual metaphor
2. **Scalability:** Works at various sizes (16px minimum)
3. **Consistency:** Uniform stroke weight and optical balance
4. **Flexibility:** Supports theming through `currentColor`
5. **Accessibility:** High contrast and clear visual hierarchy

## Future Enhancements

Potential additions:
- Animated variants for interactive states
- Additional badge types (expiring, pending review)
- International credential standards
- Certificate authority logos
- Blockchain verification indicators
