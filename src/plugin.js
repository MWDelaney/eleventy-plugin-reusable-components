import { EleventyRenderPlugin } from "@11ty/eleventy";
import { defaultOptions } from "./config.js";
import { addCollections } from "./collections.js";
import { addBundles } from "./bundles.js";
import { addFilters } from "./filters.js";

/**
 * Universal Components for Eleventy Plugin
 *
 * A configurable plugin for adding universal components to your Eleventy project.
 *
 * @param {Object} options - Configuration options for the plugin
 * @param {string} [options.componentsDir="src/assets/components/*.njk"] - Glob pattern for component files
 * @param {string} [options.cssBundleDir="./assets/styles/"] - Directory for CSS bundle output
 * @param {string} [options.jsBundleDir="./assets/scripts/"] - Directory for JS bundle output
 * @param {string} [options.collectionName="components"] - Name of the components collection
 * @param {boolean} [options.enableRenderPlugin=true] - Whether to enable the Eleventy Render Plugin
 * @param {boolean} [options.enableBundles=true] - Whether to enable CSS and JS bundles
 * @param {boolean} [options.excludeFromProduction=true] - Whether to exclude components from production builds
 *
 * Collections:
 * - `components` (or custom name): A collection of components sourced from the components directory.
 *
 * Plugins:
 * - `EleventyRenderPlugin`: A plugin for advanced rendering capabilities in Eleventy.
 *
 * Bundling:
 * - CSS: Bundles CSS files into the configured CSS bundle directory.
 * - JS: Bundles JavaScript files into the configured JS bundle directory.
 */
export function eleventyComponentsPlugin(eleventyConfig, userOptions = {}) {
  // Merge user options with defaults
  const options = { ...defaultOptions, ...userOptions };

  /**
   * Add the Eleventy Render Plugin.
   * Check if the plugin is already enabled before enabling it.
   */
  if (options.enableRenderPlugin && (!eleventyConfig.plugins || !eleventyConfig.plugins.includes(EleventyRenderPlugin))) {
    eleventyConfig.addPlugin(EleventyRenderPlugin);
  }

  /**
   * Exclude components from production builds
   */
  if (options.excludeFromProduction && process.env.ELEVENTY_ENV === "production") {
    eleventyConfig.ignores.add(options.componentsDir);
  }

  // Add collections
  addCollections(eleventyConfig, options);

  // Add bundles
  addBundles(eleventyConfig, options);

  // Add filters
  addFilters(eleventyConfig, options);
}
