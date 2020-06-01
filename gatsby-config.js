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
        path: `${__dirname}/content/blog`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/content/pages`
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            // Copy the files linked to from the MDX files to the `public` directory
            // By default these file extensions are ignored: png, jpg, jpeg, bmp, tiff
            // because the images handled by `gatsby-remark-images`
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'blog-content'
            }
          },
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
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.name,
        short_name: siteMetadata.name,
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#2f4f4f',
        display: 'standalone',
        icon: 'src/images/icon.png',
        include_favicon: true,
        // Use cache busting by file name instead of URL query
        cache_busting_mode: 'name',
        theme_color_in_head: true
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap.xml',
        createLinkInHead: false
      }
    }
  ]
};
