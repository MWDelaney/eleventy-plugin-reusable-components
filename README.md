# Universal Components for Eleventy Plugin

A configurable Eleventy plugin that enables a powerful component system for building dynamic, reusable UI components across your static site.

## Features

- 🧩 **Dynamic Component Rendering** - Render components based on content data
- 🎨 **Template Language Agnostic** - Works with Nunjucks, Liquid, Vento, and more
- 📦 **Asset Bundling** - Built-in CSS and JS bundling for components
- 🏗️ **Flexible Configuration** - Customizable directories and options
- 🚀 **Production Ready** - Excludes development components from production builds
- 🔧 **Developer Friendly** - Comprehensive error handling and debugging

## Installation

```bash
npm install eleventy-plugin-components
```

## Quick Start

### 1. Add the Plugin

<details open>
<summary>View configuration code</summary>

```javascript
// eleventy.config.js
import componentSystem from "eleventy-plugin-components";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(componentSystem);
}
```

</details>

### 2. Create a Component

Create a component file at `src/components/callout.njk`:

<details open>
<summary>View component template</summary>

```njk
---
title: Callout

# Default values
heading: Help organize the 11ty Meetup!
description: A callout component to highlight important information.
links:
  - linkUrl: https://11tymeetup.dev/
    linkText: Join the 11ty Meetup!
background: light
---
<div class="callout callout--{{ background }}">
  <h3 class="callout__heading">{{ heading }}</h3>
  <p class="callout__description">{{ description }}</p>
  {%- if links -%}
    <div class="callout__links">
      {%- for link in links -%}
        <a href="{{ link.linkUrl }}" class="callout__link">{{ link.linkText }}</a>
      {%- endfor -%}
    </div>
  {%- endif -%}
</div>
```

</details>

### 3. Use the Component

In any template, use the `renderComponent` filter:

<details open>
<summary>View usage example</summary>

```njk
{%- set myCallout = {
  type: "callout",
  heading: "Important Notice",
  description: "This is a callout example",
  links: [
    {
      linkUrl: "#",
      linkText: "Learn more"
    }
  ],
  background: "warning"
} -%}

{{ myCallout | renderComponent("njk") | safe }}
```

</details>

> **Note:** The `renderComponent` filter accepts a template language parameter (`"njk"`, `"liquid"`, `"vto"`, etc.) and can process both single components and arrays of components. If no template language is specified, it defaults to `"liquid"`.

## Configuration

### Default Options

<details open>
<summary>View default options</summary>

```javascript
const defaultOptions = {
  componentsDir: "src/components/*.njk",
  cssBundleDir: "./assets/styles/",
  jsBundleDir: "./assets/scripts/",
  collectionName: "components",
  enableRenderPlugin: true,
  enableBundles: true,
  excludeFromProduction: true
};
```

</details>

## Usage Examples

### Method 1: From Frontmatter

Define components directly in your page's frontmatter:

#### Liquid (Frontmatter)

<details open>
<summary>View Liquid frontmatter example</summary>

```liquid
---
title: My Page
components:
  - type: callout
    heading: Welcome!
    description: Thanks for visiting our site
    background: primary
  - type: text-and-image
    heading: About Us
    description: Learn more about our company
    image: /assets/images/about.jpg
    imageAlt: About our company
---

<main>
  {{ components | renderComponent: "liquid" }}
</main>
```

</details>

#### Nunjucks (Frontmatter)

<details>
<summary>View Nunjucks frontmatter example</summary>

```njk
---
title: My Page
components:
  - type: callout
    heading: Welcome!
    description: Thanks for visiting our site
    background: primary
  - type: text-and-image
    heading: About Us
    description: Learn more about our company
    image: /assets/images/about.jpg
    imageAlt: About our company
---

<main>
  {{ components | renderComponent("njk") | safe }}
</main>
```

</details>

#### Vento (Frontmatter)

<details>
<summary>View Vento frontmatter example</summary>

```vento
---
title: My Page
components:
  - type: callout
    heading: Welcome!
    description: Thanks for visiting our site
    background: primary
  - type: text-and-image
    heading: About Us
    description: Learn more about our company
    image: /assets/images/about.jpg
    imageAlt: About our company
---

<main>
  {{ components |> renderComponent("vto") |> safe }}
</main>
```

</details>

### Method 2: Inline Definition

Define components inline within your template:

#### Liquid (Inline Definition)

<details open>
<summary>View Liquid inline definition example</summary>

```liquid
{% assign heroComponent = site.data.hero %}
{% assign features = site.data.features %}

<main>
  {{ heroComponent | renderComponent: "liquid" }}
  
  <section class="features">
    {{ features | renderComponent: "liquid" }}
  </section>
</main>
```

</details>

#### Nunjucks (Inline Definition)

<details>
<summary>View Nunjucks inline definition example</summary>

```njk
{%- set heroComponent = {
  type: "hero",
  heading: "Build Amazing Sites",
  subheading: "With Eleventy and Components",
  image: "/assets/images/hero.jpg",
  ctaText: "Get Started",
  ctaUrl: "/docs/"
} -%}

{%- set features = [
  {
    type: "feature-card",
    icon: "⚡",
    title: "Fast",
    description: "Lightning-fast static sites"
  },
  {
    type: "feature-card",
    icon: "🧩",
    title: "Modular",
    description: "Reusable component system"
  },
  {
    type: "feature-card",
    icon: "🎨",
    title: "Flexible",
    description: "Works with any template language"
  }
] -%}

<main>
  {{ heroComponent | renderComponent("njk") | safe }}
  
  <section class="features">
    {{ features | renderComponent("njk") | safe }}
  </section>
</main>
```

</details>

#### Vento (Inline Definition)

<details>
<summary>View Vento inline definition example</summary>

```vento
{{ set heroComponent = {
  type: "hero",
  heading: "Build Amazing Sites",
  subheading: "With Eleventy and Components",
  image: "/assets/images/hero.jpg",
  ctaText: "Get Started",
  ctaUrl: "/docs/"
} }}

{{ set features = [
  {
    type: "feature-card",
    icon: "⚡",
    title: "Fast",
    description: "Lightning-fast static sites"
  },
  {
    type: "feature-card",
    icon: "🧩",
    title: "Modular",
    description: "Reusable component system"
  }
] }}

<main>
  {{ heroComponent |> renderComponent("vto") |> safe }}
  
  <section class="features">
    {{ features |> renderComponent("vto") |> safe }}
  </section>
</main>
```

</details>

### Method 3: From Data Files

Store component data in separate JSON files for better organization:

#### Data File: `src/_data/homepage.json`

<details open>
<summary>View data file example</summary>

```json
{
  "hero": {
    "type": "hero",
    "heading": "Welcome to Our Site",
    "subheading": "Building amazing experiences",
    "image": "/assets/images/hero-bg.jpg",
    "ctaText": "Learn More",
    "ctaUrl": "/about/"
  },
  "sections": [
    {
      "type": "text-and-image",
      "heading": "Our Mission",
      "description": "We strive to create exceptional digital experiences that make a difference.",
      "image": "/assets/images/mission.jpg",
      "imageAlt": "Our mission in action",
      "layout": "image-right"
    },
    {
      "type": "callout",
      "heading": "Ready to Get Started?",
      "description": "Join thousands of satisfied customers today.",
      "background": "primary",
      "links": [
        {
          "linkText": "Sign Up Now",
          "linkUrl": "/signup/"
        },
        {
          "linkText": "Learn More",
          "linkUrl": "/features/"
        }
      ]
    },
    {
      "type": "stats-grid",
      "stats": [
        { "number": "10k+", "label": "Happy Customers" },
        { "number": "99.9%", "label": "Uptime" },
        { "number": "24/7", "label": "Support" },
        { "number": "50+", "label": "Countries" }
      ]
    }
  ]
}
```

</details>

#### Template Usage

**Liquid (`index.liquid`):**

<details open>
<summary>View Liquid template usage</summary>

```liquid
---
title: Homepage
---

<main>
  {{ homepage.hero | renderComponent: "liquid" }}
  
  {{ homepage.sections | renderComponent: "liquid" }}
</main>
```

</details>

**Nunjucks (`index.njk`):**

<details>
<summary>View Nunjucks template usage</summary>

```njk
---
title: Homepage
---

<main>
  {{ homepage.hero | renderComponent("njk") | safe }}
  
  {{ homepage.sections | renderComponent("njk") | safe }}
</main>
```

</details>

**Vento (`index.vto`):**

<details>
<summary>View Vento template usage</summary>

```vento
---
title: Homepage
---

<main>
  {{ homepage.hero |> renderComponent("vto") |> safe }}
  
  {{ homepage.sections |> renderComponent("vto") |> safe }}
</main>
```

</details>

## Component Structure

Components should follow this structure:

<details open>
<summary>View component structure example</summary>

```njk
---
title: ComponentName
# Default values
heading: "default heading"
description: "default description"
---

<!-- Component template here -->
<div class="component-name">
  <h2>{{ heading }}</h2>
  <p>{{ description }}</p>
</div>
```

</details>

### Required Frontmatter

- `title`: Used for component matching (gets slugified)

### Component Matching

The plugin matches components by comparing:
- Component's `title` (from frontmatter) → slugified
- Content item's `type` property → slugified

**Examples:**
- Component: `title: "Text and Image"` → slug: `"text-and-image"`
- Content: `type: "text-and-image"` → **Match!** ✅
- Component: `title: "Callout"` → slug: `"callout"`  
- Content: `type: "callout"` → **Match!** ✅

## Asset Bundling

The plugin includes built-in CSS and JS bundling:

### CSS Bundling

<details>
<summary>View CSS bundling example</summary>

```njk
<!-- In your layout template -->
<link rel="stylesheet" href="{% getBundleFileUrl 'css' %}">
```

</details>

### JS Bundling

<details>
<summary>View JS bundling example</summary>

```njk
<!-- In your layout template -->
<script src="{% getBundleFileUrl 'js' %}"></script>
```

</details>

### Adding Assets to Bundles

<details>
<summary>View assets bundling examples</summary>

```njk
<!-- Add CSS -->
{% css %}
.callout { border: 1px solid #ccc; }
{% endcss %}

<!-- Add JS -->
{% js %}
document.addEventListener('DOMContentLoaded', function() {
  // Component JavaScript
});
{% endjs %}
```

</details>

## Advanced Usage

### Custom Collection Name

<details>
<summary>View custom collection configuration</summary>

```javascript
eleventyConfig.addPlugin(componentSystem, {
  collectionName: "widgets"
});
```

Then reference in templates:

```njk
<!-- Components now available in collections.widgets -->
```

</details>

### Conditional Component Loading

<details>
<summary>View conditional loading example</summary>

```njk
{%- if environment.NODE_ENV !== "production" -%}
  {%- set debugComponent = {
    type: "debug-panel",
    data: someData
  } -%}
  {{ debugComponent | renderComponent("njk") | safe }}
{%- endif -%}
```

</details>

### Nested Components

<details>
<summary>View nested components example</summary>

```njk
{%- set cardGrid = {
  type: "card-grid",
  cards: [
    {
      type: "feature-card",
      title: "Feature 1",
      description: "Amazing feature"
    },
    {
      type: "feature-card", 
      title: "Feature 2",
      description: "Another great feature"
    }
  ]
} -%}

{{ cardGrid | renderComponent("njk") | safe }}
```

</details>

## Error Handling

The plugin handles errors gracefully:

- **Missing component**: Returns empty string
- **Invalid data**: Returns empty string  
- **Missing collections**: Returns empty string
- **Template errors**: Logged to console, returns fallback

## Performance Considerations

- **Component Matching**: O(n) complexity where n = number of components
- **Caching**: Components are cached by Eleventy's collection system
- **Bundle Size**: Only used components' assets are included in bundles

## Troubleshooting

### Component Not Rendering

1. **Check component title matches type**:

<details open>
<summary>View component title matching example</summary>

```njk
<!-- Component file -->
title: "My Component"  <!-- becomes "my-component" -->

<!-- Usage -->
type: "my-component"  <!-- must match! -->
```

</details>

2. **Verify component collection**:

<details>
<summary>View component collection debug example</summary>

```njk
<!-- Debug: List all components -->
{%- for component in collections.components -%}
  <p>{{ component.data.title }} → {{ component.data.title | slugify }}</p>
{%- endfor -%}
```

</details>

3. **Check file location**:
   - Default: `src/components/*.njk`
   - Custom: Set via `componentsDir` option

### Template Language Issues

Make sure to specify the correct template language parameter for your template engine:

- **Liquid**: `{{ item | renderComponent: "liquid" }}` (auto-escaped by default)
- **Nunjucks**: `{{ item | renderComponent("njk") | safe }}`
- **Vento**: `{{ item |> renderComponent("vto") |> safe }}`

The template language parameter defaults to `"liquid"` if not specified.

## API Reference

### Plugin Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `componentsDir` | `string` | `"src/components/*.njk"` | Glob pattern for component files |
| `cssBundleDir` | `string` | `"./assets/styles/"` | CSS bundle output directory |
| `jsBundleDir` | `string` | `"./assets/scripts/"` | JS bundle output directory |
| `collectionName` | `string` | `"components"` | Name of components collection |
| `enableRenderPlugin` | `boolean` | `true` | Enable Eleventy Render Plugin |
| `enableBundles` | `boolean` | `true` | Enable CSS/JS bundling |
| `excludeFromProduction` | `boolean` | `true` | Exclude components from production |

### Filters

#### `renderComponent`

Matches content items to component templates and renders them.

**Parameters:**

- `item` (Object|Array): Content item(s) with `type` property
- `templateLang` (string): Optional. Template language ("njk", "liquid", "vto", etc.). Defaults to "liquid"

**Returns:**

- `string`: Fully rendered HTML content or empty string

**Usage:**

<details open>
<summary>View renderComponent filter usage</summary>

```njk
{{ item | renderComponent("njk") | safe }}
```

</details>

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
