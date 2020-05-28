const siteMetadata = require('./siteMetadata');

module.exports = {
  siteMetadata,

  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/blog`
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            // Process images in the MDX files using sharp (only JPEG and PNG)
            // GIFs and SVGs are not supported
            resolve: 'gatsby-remark-images',
            options: {
              // Max width in pixels of the content container
              // Used by the plugin as the base for generating the images
              maxWidth: 800,
              quality: 50,
              loading: 'lazy',
              linkImagesToOriginal: true,
              showCaptions: false
            },
          },
        ]
      }
    }
  ]
};
