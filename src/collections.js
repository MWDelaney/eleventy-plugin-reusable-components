/**
 * Add components collection to Eleventy
 * @param {Object} eleventyConfig - Eleventy configuration object
 * @param {Object} options - Plugin options
 */
export function addCollections(eleventyConfig, options) {
  /**
   * Components Collection
   * This collection includes all components from the configured components directory.
   */
  eleventyConfig.addCollection(options.collectionName, function(collectionApi) {
    return collectionApi.getFilteredByGlob(options.componentsDir);
  });
}
