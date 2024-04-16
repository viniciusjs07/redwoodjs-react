import type {
  QueryResolvers,
  MutationResolvers,
  PostRelationResolvers,
} from 'types/graphql';

import { ForbiddenError } from '@redwoodjs/graphql-server';

import { requireAuth } from 'src/lib/auth';
import { db } from 'src/lib/db';

export const adminPosts: QueryResolvers['adminPosts'] = () => {
  // return db.post.findMany();
  // Listar apenas os post do usuário admin que criou
  return db.post.findMany({ where: { userId: context.currentUser.id } });
};

export const adminPost: QueryResolvers['adminPost'] = ({ id }) => {
  // return db.post.findUnique({
  //   where: { id },
  // });
  return db.post.findFirst({
    where: { id, userId: context.currentUser.id },
  });
};

export const createPost: MutationResolvers['createPost'] = ({ input }) => {
  requireAuth({ roles: ['admin'] });
  return db.post.create({
    data: { ...input, userId: context.currentUser.id },
  });
};

export const updatePost: MutationResolvers['updatePost'] = async ({
  id,
  input,
}) => {
  requireAuth({ roles: ['admin'] });
  // Verifica se o usuário admin possui o post antes de atualizar
  await verifyOwnership({ id });
  return db.post.update({
    data: input,
    where: { id },
  });
};

export const deletePost: MutationResolvers['deletePost'] = async ({ id }) => {
  requireAuth({ roles: ['admin'] });
  await verifyOwnership({ id });
  return db.post.delete({
    where: { id },
  });
};

const verifyOwnership = async ({ id }) => {
  if (await adminPost({ id })) {
    return true;
  } else {
    throw new ForbiddenError('Você não tem permissão para acessar esse post!');
  }
};

export const Post: PostRelationResolvers = {
  user: (_obj, { root }) =>
    db.post.findFirst({ where: { id: root.id } }).user(),
};
