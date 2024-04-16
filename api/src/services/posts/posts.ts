import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { requireAuth } from 'src/lib/auth';
import { db } from 'src/lib/db';

export const posts: QueryResolvers['posts'] = () => {
  return db.post.findMany();
};

export const post: QueryResolvers['post'] = ({ id }) => {
  return db.post.findUnique({
    where: { id },
  });
};

export const createPost: MutationResolvers['createPost'] = ({ input }) => {
  requireAuth({ roles: ['admin'] });
  return db.post.create({
    data: input,
  });
};

export const updatePost: MutationResolvers['updatePost'] = ({ id, input }) => {
  requireAuth({ roles: ['admin'] });
  return db.post.update({
    data: input,
    where: { id },
  });
};

export const deletePost: MutationResolvers['deletePost'] = ({ id }) => {
  requireAuth({ roles: ['admin'] });

  return db.post.delete({
    where: { id },
  });
};
