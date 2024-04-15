import { useState } from 'react';

import {
  Form,
  Label,
  Submit,
  TextAreaField,
  TextField,
  SubmitHandler,
  FormError,
} from '@redwoodjs/forms';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY as CommentsQuery } from 'src/components/CommentsCell';

const CREATE = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      name
      body
      createdAt
    }
  }
`;

interface FormValues {
  name: string;
  comment: string;
}

interface Props {
  postId: number;
}

const CommentForm = ({ postId }: Props) => {
  const [hasPosted, setHasPosted] = useState<boolean>(false);

  const [createComment, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      setHasPosted(true);
      toast.success('Obrigado pelo seu comentário!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // após criar um comentário no form, o apolloCliente executa a query de listar os comentários criados na tela.
    refetchQueries: [{ query: CommentsQuery, variables: { postId } }],
  });

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    createComment({ variables: { input: { postId, ...input } } });
  };
  return (
    <div className={hasPosted ? 'hidden' : ''}>
      <h3 className="text-lg font-light text-gray-600">Leave a Comment</h3>
      <Form className="mt-4 w-full" onSubmit={onSubmit}>
        <FormError
          error={error}
          titleClassName="font-semibold"
          wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
        />
        <Label name="name" className="block text-sm uppercase text-gray-600">
          Name
        </Label>
        <TextField
          name="name"
          className="block w-full rounded border p-1 text-xs"
          validation={{ required: true }}
        />

        <Label
          name="body"
          className="mt-4 block text-sm uppercase text-gray-600"
        >
          Comment
        </Label>
        <TextAreaField
          name="body"
          className="block h-24 w-full rounded border p-1 text-xs"
          validation={{ required: true }}
        />

        <Submit
          disabled={loading}
          className="mt-4 block rounded bg-blue-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white disabled:opacity-50"
        >
          Enviar
        </Submit>
      </Form>
    </div>
  );
};

export default CommentForm;
