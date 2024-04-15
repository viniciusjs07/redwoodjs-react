import type { CommentsQuery, CommentsQueryVariables } from 'types/graphql';

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web';

import Comment from '../Comment/Comment';

export const QUERY: TypedDocumentNode<
  CommentsQuery,
  CommentsQueryVariables
> = gql`
  query CommentsQuery($postId: Int!) {
    comments(postId: $postId) {
      id
      name
      body
      createdAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => (
  <div className="text-center text-gray-500">Não há comentário no momento</div>
);

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

export const Success = ({ comments }: CellSuccessProps<CommentsQuery>) => {
  return (
    <>
      <div className="space-y-8">
        {comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      </div>
    </>
  );
};
