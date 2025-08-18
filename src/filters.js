/**
 * Add filters for the component system
 * @param {Object} eleventyConfig - Eleventy configuration object
 * @param {Object} options - Plugin options
 */
export function addFilters(eleventyConfig, options) {
  /**
   * Render Component Filter
   *
   * A component template resolver that matches content items to their corresponding
   * component templates based on type. This filter enables dynamic component rendering
   * by finding the appropriate template for a given content item.
   *
   * @filter renderComponent
   * @since 1.0.0
   *
   * @description
   * This filter takes a content item with a 'type' property and searches through
   * the components collection to find a matching component template. The matching
   * is performed by comparing the slugified version of the component's title
   * (from frontmatter) with the slugified version of the item's type.
   *
   * @param {Object} item - The content item to find a component template for
   * @param {string} item.type - Required. The component type identifier (e.g., "callout", "hero", "text-and-image")
   * @param {*} [...item.props] - Optional. Any additional properties that will be passed to the component when rendered
   *
   * @returns {string} The raw template content of the matching component, or empty string if no match found
   *
   * @example
   * // Component file: src/assets/components/callout.njk
   * // ---
   * // title: Callout
   * // ---
   * // <div class="callout">{{ heading }}</div>
   *
   * // Content item:
   * const item = {
   *   type: "callout",
   *   heading: "Important Notice",
   *   description: "This is important"
   * };
   *
   * // Template usage:
   * {{ item | renderComponent | renderContent("njk", item) | safe }}
   *
   * @example
   * // Template usage in a loop:
   * {%- for item in components -%}
   *   {{- item | renderComponent | renderContent("njk", item) | safe -}}
   * {%- endfor -%}
   *
   * @workflow
   * 1. Validates input item has required 'type' property
   * 2. Accesses the Eleventy components collection
   * 3. Loops through all available component templates
   * 4. Compares slugified component title with slugified item type
   * 5. Returns raw template content of first matching component
   * 6. Template then uses renderContent filter to render with item data
   *
   * @dependencies
   * - Requires components collection to be populated (handled by plugin)
   * - Requires Eleventy's built-in slugify filter
   * - Designed to work with EleventyRenderPlugin's renderContent filter
   *
   * @matching-logic
   * Component matching uses case-insensitive, URL-safe slug comparison:
   * - Component title "Text and Image" → slug "text-and-image"
   * - Item type "text-and-image" → slug "text-and-image"
   * - Match found ✅
   *
   * @error-handling
   * - Returns empty string for invalid/missing input
   * - Returns empty string if no matching component found
   * - Gracefully handles missing collections or component data
   * - No exceptions thrown, fails silently for template safety
   *
   * @performance-notes
   * - O(n) complexity where n = number of component templates
   * - First match wins, stops searching after finding match
   * - Consider component organization if using many templates
   *
   * @see {@link https://www.11ty.dev/docs/filters/} Eleventy Filters Documentation
   * @see {@link https://www.11ty.dev/docs/plugins/render/} Eleventy Render Plugin Documentation
   */
  eleventyConfig.addFilter("renderComponent", function (item) {
    if (!item || !item.type) {
      return '';
    }

    const collections = this.ctx.collections || this.collections;
    if (!collections || !collections.components) {
      return '';
    }

    const slugifyFilter = eleventyConfig.getFilter("slugify");

    // Find the matching component in the collections
    for (const component of collections.components) {
      if (component.data && component.data.title) {
        const componentSlug = slugifyFilter(component.data.title);
        const itemSlug = slugifyFilter(item.type);

        if (componentSlug === itemSlug) {
          // Return the component's rawInput - template will handle rendering with item data
          return component.rawInput;
        }
      }
    }

    return '';
  });
}
