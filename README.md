# Reusable Components for Eleventy Plugin

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
npm install --save-dev eleventy-plugin-reusable-components
```

## Quick Start

### 1. Add the Plugin

<details open>
<summary>View configuration code</summary>

```javascript
// eleventy.config.js
import componentSystem from "eleventy-plugin-reusable-components";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(componentSystem);
}
```

</details>

### 2. Create a Component

Create a component file at `src/components/callout.liquid`:

<details open>
<summary>View component template</summary>

```liquid
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
  {% if links %}
    <div class="callout__links">
      {% for link in links %}
        <a href="{{ link.linkUrl }}" class="callout__link">{{ link.linkText }}</a>
      {% endfor %}
    </div>
  {% endif %}
</div>
```

</details>

### 3. Use the Component

In any template, use the `renderComponent` filter:

<details open>
<summary>View usage example</summary>

```liquid
---
title: My Page
callout:
  type: callout
  heading: Important Notice
  description: This is a callout example
  links:
    - linkUrl: "#"
      linkText: Learn more
  background: warning
---

{{ callout | renderComponent: "liquid" }}
```

</details>

> **Note:** The `renderComponent` filter accepts a template language parameter (`"njk"`, `"liquid"`, `"vto"`, etc.) and can process both single components and arrays of components. If no template language is specified, it defaults to `"liquid"`. The filter automatically merges component default values with your provided data - any missing fields will use the defaults from the component file.

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
{% assign heroComponent = {
  type: "hero",
  heading: "Welcome to Our Site",
  description: "Thanks for visiting! We're excited to share our content with you.",
  background: "primary"
} %}

{% assign features = [
  {
    type: "callout",
    heading: "Fast Performance",
    description: "Built for speed and efficiency.",
    background: "success"
  },
  {
    type: "callout", 
    heading: "Easy to Use",
    description: "Simple and intuitive interface.",
    background: "info"
  }
] %}

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
  heading: "Welcome to Our Site",
  description: "Thanks for visiting! We're excited to share our content with you.",
  background: "primary"
} -%}

{%- set features = [
  {
    type: "callout",
    heading: "Fast Performance",
    description: "Built for speed and efficiency.",
    background: "success"
  },
  {
    type: "callout",
    heading: "Easy to Use", 
    description: "Simple and intuitive interface.",
    background: "info"
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
  heading: "Welcome to Our Site",
  description: "Thanks for visiting! We're excited to share our content with you.",
  background: "primary"
} }}

{{ set features = [
  {
    type: "callout",
    heading: "Fast Performance",
    description: "Built for speed and efficiency.",
    background: "success"
  },
  {
    type: "callout",
    heading: "Easy to Use",
    description: "Simple and intuitive interface.",
    background: "info"
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

```liquid
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

### Components with Bundled Assets

Create components with their own CSS and JS that get automatically bundled:

<details open>
<summary>View component with bundled assets example</summary>

**Component file: `src/components/text-and-image.liquid`**

```liquid
---
title: Text and Image

# Default values
heading: Text and image component
description: A component that combines text and an image.
image: /assets/images/possums.jpg
imageAlt: A cute possum
imagePosition: left
background: warning
---

<!-- Component HTML, using the default values above -->
<section class="block block-text-and-image background-{{ background }} text-bg-{{ background }} py-5">
  <div class="container px-5">
    <div class="row row-cols-2 align-items-center">
      <article class="col">
        <h2>{{ heading }}</h2>
        {{ description }}
      </article>
      <figure class="col">
        <img src="{{ image }}" class="img-fluid rounded shadow" alt="{{ imageAlt }}" />
      </figure>
    </div>
  </div>
</section>

<!-- Component CSS -->
{% css %}
.block-text-and-image {
  figure img {
    --bs-border-radius: 1rem;
    transform: rotate(6deg);
  }
}
{% endcss %}

<!-- Component JS -->
{% js %}
console.log('🪐');
{% endjs %}
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

### Default Values & Data Merging

Components automatically merge their default values with the data you provide. This means you only need to specify the fields you want to override - any missing fields will use the defaults from the component file.

**Example:**

If your component has these defaults:
```yaml
---
title: Callout
heading: "Default Heading"
description: "Default description"
background: "light"
links:
  - linkUrl: "#"
    linkText: "Default Link"
---
```

And you use it with partial data:
```liquid
{% assign myCallout = {
  type: "callout",
  heading: "Custom Heading"
} %}

{{ myCallout | renderComponent: "liquid" }}
```

The component will render with:
- `heading`: "Custom Heading" *(from your data)*
- `description`: "Default description" *(from component default)*
- `background`: "light" *(from component default)*  
- `links`: Default links array *(from component default)*

This ensures components always have complete data to work with, even when you only provide a subset of the required fields.

## Asset Bundling

The plugin includes built-in CSS and JS bundling:

### CSS Bundling

<details open>
<summary>View CSS bundling example</summary>

```liquid
<!-- In your layout template -->
<link rel="stylesheet" href="{% getBundleFileUrl 'componentCss' %}">
```

</details>

### JS Bundling

<details open>
<summary>View JS bundling example</summary>

```liquid
<!-- In your layout template -->
<script src="{% getBundleFileUrl 'componentJs' %}"></script>
```

</details>

## Error Handling

The plugin handles errors gracefully:

- **Missing component**: Returns empty string
- **Invalid data**: Returns empty string  
- **Missing collections**: Returns empty string
- **Template errors**: Logged to console, returns fallback

## Troubleshooting

### Component Not Rendering

1. **Check component title matches type**:

<details open>
<summary>View component title matching example</summary>

```liquid
<!-- Component file -->
title: "My Component"  <!-- becomes "my-component" -->

<!-- Usage -->
type: "my-component"  <!-- must match! -->
```

</details>

2. **Verify component collection**:

<details>
<summary>View component collection debug example</summary>

```liquid
<!-- Debug: List all components -->
{% for component in collections.components %}
  <p>{{ component.data.title }} → {{ component.data.title | slugify }}</p>
{% endfor %}
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

Matches content items to component templates and renders them with automatic default value merging.

**Parameters:**

- `item` (Object|Array): Content item(s) with `type` property
- `templateLang` (string): Optional. Template language ("njk", "liquid", "vto", etc.). Defaults to "liquid"

**Returns:**

- `string`: Fully rendered HTML content or empty string

**Behavior:**

The filter automatically merges component default values with your provided data. Any fields not specified in your data will use the default values from the component's frontmatter. This ensures components always have complete data to render properly.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
