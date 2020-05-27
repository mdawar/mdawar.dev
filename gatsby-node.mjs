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
export const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const templates = {
    blog: path.resolve('./src/templates/blog.js'),
    post: path.resolve('./src/templates/post.js'),
    tags: path.resolve('./src/templates/tags.js'),
    tag: path.resolve('./src/templates/tag.js')
  };

  const result = await graphql(`
    query {
      posts: allMdx(
        filter: { frontmatter: { published: { eq: true } } }
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

      tags: allMdx {
        group(field: frontmatter___tags) {
          name: fieldValue
          totalCount
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
    createPage({
      path: `/blog/tags/${slugify(tag.name)}`,
      component: templates.tag,
      context: {
        tag: tag.name
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
};
