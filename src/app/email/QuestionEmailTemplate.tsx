interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const QuestionEmailTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ email, name, message }) => (
  <div>
    <h1>New Question Asked</h1>
    <p>Name: {name}</p>
    <p>Email: {email}</p>
    <p>Message: {message}</p>
  </div>
);
