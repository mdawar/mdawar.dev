const path = require('path');
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
      value: `/blog${slug}`
    });
  }
};

// Dynamic pages
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogTemplate = path.resolve('./src/templates/blog.js');
  const postTemplate = path.resolve('./src/templates/blog-post.js');
  const tagTemplate = path.resolve('./src/templates/tag.js');

  const result = await graphql(`
    query {
      posts: allMdx(
        filter: { frontmatter: { published: { eq: true } } }
        sort: { fields: frontmatter___date, order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }

      tags: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          name: fieldValue
          totalCount
        }
      }
    }
  `);

  const posts = result.data.posts.edges;
  const tags = result.data.tags.group;

  // Create the posts pages
  posts.forEach(({ node }, index) => {
    // Previous and next posts
    const previous = index === 0 ? null : posts[index - 1].node;
    const next = index === posts.length - 1 ? null : posts[index + 1].node;

    createPage({
      path: node.fields.slug,
      component: postTemplate,
      context: {
        slug: node.fields.slug,
        previous,
        next
      }
    });
  });

  // Create the tags pages
  tags.forEach((tag) => {
    createPage({
      path: `/tags/${tag.name.toLowerCase()}`,
      component: tagTemplate,
      context: {
        tag: tag.name
      }
    });
  });

  // Create the blog list pages
  const postsPerPage = 5;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  for (let i = 0; i < totalPages; i++) {
    const currentPage = i + 1;

    createPage({
      path: i === 0 ? '/blog' : `/blog/${currentPage}`,
      component: blogTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        currentPage,
        totalPages
      }
    });
  }
};
