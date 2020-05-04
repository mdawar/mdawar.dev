const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Create a `slug` field for the MDX nodes
  if (node.internal.type === 'Mdx') {
    // Create a path to be used as the slug from the file’s path on the file system
    const slug = createFilePath({ node, getNode, trailingSlash: false });

    // The new field is placed under the `fields` key on the extended node object
    // accessible at `node.fields.slug`
    createNodeField({
      node,
      name: 'slug',
      value: `blog${slug}`
    });
  }
};
