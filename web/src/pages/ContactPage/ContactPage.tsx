import {
  CreateContactMutation,
  CreateContactMutationVariables,
} from 'types/graphql';

import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  SubmitHandler,
  TextAreaField,
  TextField,
  useForm,
} from '@redwoodjs/forms';
import { Metadata, useMutation } from '@redwoodjs/web';
import { Toaster, toast } from '@redwoodjs/web/toast';

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`;
interface FormValues {
  name: string;
  email: string;
  message: string;
}
const ContactPage = () => {
  const formMethods = useForm({ mode: 'onBlur' });

  const [create, { loading, error }] = useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Obrigado por enviar suas informações!');
      formMethods.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('onSubmit', data);
    create({ variables: { input: data } });
  };
  return (
    <>
      <Metadata title="Contact" description="Contact page" />
      <Toaster />
      <Form
        onSubmit={onSubmit}
        config={{ mode: 'onBlur' }}
        error={error}
        formMethods={formMethods}
      >
        <FormError error={error} wrapperClassName="form-error" />
        <Label name="name" errorClassName="error">
          Name
        </Label>

        <TextField
          name="name"
          errorClassName="error"
          validation={{ required: true }}
        ></TextField>

        <FieldError name="name" className="error" />

        <Label name="email" errorClassName="error">
          Email
        </Label>

        <TextField
          name="email"
          errorClassName="error"
          validation={{
            required: true,
            pattern: {
              value: /^[^@]+@[^.]+\..+$/,
              message: 'Por favor insira um e-mail válido',
            },
          }}
        ></TextField>

        <FieldError name="email" className="error" />

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          name="message"
          errorClassName="error"
          validation={{ required: true }}
        ></TextAreaField>
        <FieldError name="message" className="error" />

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </>
  );
};

export default ContactPage;
