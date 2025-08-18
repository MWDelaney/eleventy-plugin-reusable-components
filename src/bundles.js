/**
 * Add CSS and JS bundles to Eleventy
 * @param {Object} eleventyConfig - Eleventy configuration object
 * @param {Object} options - Plugin options
 */
export function addBundles(eleventyConfig, options) {
  /**
   * Add handy bundles for CSS and JS
   * Change the bundle directories via options to match your project structure.
   *
   * To use these bundles, add following syntax to your templates:
   *   <!-- CSS Bundle -->
   *   <link rel="stylesheet" href="{% getBundleFileUrl "css" %}">
   *
   *   <!-- JS Bundle -->
   *   <script src="{% getBundleFileUrl "js" %}"></script>
   */
  if (options.enableBundles) {
    eleventyConfig.addBundle("componentCss", {
      toFileDirectory: options.cssBundleDir,
    });

    eleventyConfig.addBundle("componentJs", {
      toFileDirectory: options.jsBundleDir,
    });
  }
}
