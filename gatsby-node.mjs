import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import { slugify } from './src/utils';

function getPageItems(items, page, itemsPerPage) {
  // Page numbers start at 1
  return items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
}

function createMultiplePages({
  createPage,
  path,
  template,
  items,
  itemsPerPage = 10
}) {
  const totalPages = Math.ceil(items.length / itemsPerPage);

  for (let i = 0; i < totalPages; i++) {
    const currentPage = i + 1;

    createPage({
      path: i === 0 ? path : `${path}/${currentPage}`,
      component: template,
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        currentPage,
        totalPages,
        pageItems: getPageItems(items, currentPage, itemsPerPage)
      }
    });
  }
}

export const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Create a `slug` field for the MDX nodes
  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent);
    // `sourceInstanceName` is the `name` option set on the `gatsby-source-filesystem` plugin
    const collection = parent.sourceInstanceName;

    // Create a path to be used as the slug from the file’s path on the file system
    const slug = createFilePath({ node, getNode, trailingSlash: false });

    // The new fields are placed under the `fields` key on the extended node object
    // accessible at `node.fields.slug` and `node.fields.collection`
    createNodeField({
      node,
      name: 'slug',
      value: collection === 'posts' ? `/blog${slug}` : slug
    });

    // Add a collection field to be able to query by type (posts, pages)
    createNodeField({
      node,
      name: 'collection',
      value: collection
    });
  }
};

// Dynamic pages
export const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const templates = {
    blog: path.resolve('./src/templates/blog.js'),
    post: path.resolve('./src/templates/post.js'),
    tags: path.resolve('./src/templates/tags.js'),
    tag: path.resolve('./src/templates/tag.js'),
    page: path.resolve('./src/templates/page.js')
  };

  const result = await graphql(`
    query {
      posts: allMdx(
        filter: {
          fields: { collection: { eq: "posts" } }
          frontmatter: { published: { eq: true } }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              description
              tags
              date(formatString: "MMMM DD, YYYY")
            }
            id
            excerpt
            fields {
              slug
            }
          }
        }
      }

      tags: allMdx(filter: { fields: { collection: { eq: "posts" } } }) {
        group(field: frontmatter___tags) {
          name: fieldValue
          totalCount
        }
      }

      pages: allMdx(filter: { fields: { collection: { eq: "pages" } } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const posts = result.data.posts.edges;

  // Create the posts pages
  posts.forEach(({ node }, index) => {
    // Previous and next posts
    const prev = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: node.fields.slug,
      component: templates.post,
      context: {
        slug: node.fields.slug,
        prev,
        next
      }
    });
  });

  // Create the blog list pages
  createMultiplePages({
    createPage,
    path: '/blog',
    template: templates.blog,
    items: posts,
    itemsPerPage: 5
  });

  const tags = result.data.tags.group;

  // Create the tags pages
  tags.forEach((tag) => {
    const path = `/blog/tags/${slugify(tag.name)}`;

    createPage({
      path: path,
      component: templates.tag,
      context: {
        tag: tag.name,
        slug: path
      }
    });
  });

  // Create the tags list pages
  createMultiplePages({
    createPage,
    path: '/blog/tags',
    template: templates.tags,
    items: tags,
    itemsPerPage: 100
  });

  const pages = result.data.pages.edges;

  // Create the pages
  pages.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: templates.page,
      context: {
        slug: node.fields.slug
      }
    });
  });
};
