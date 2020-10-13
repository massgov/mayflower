// eslint-disable-next-line import/no-extraneous-dependencies
import { createFilePath } from 'gatsby-source-filesystem';

// eslint-disable-next-line import/prefer-default-export
export const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'DataJson') {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
};
