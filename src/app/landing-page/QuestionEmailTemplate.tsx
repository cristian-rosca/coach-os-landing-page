interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
  communicationConsent: boolean
}

export const QuestionEmailTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ email, name, message, communicationConsent }) => (
  <div>
    <h1>New Question Asked</h1>
    <p>Name: {name}</p>
    <p>Email: {email}</p>
    <p>Message: {message}</p>
    <p>Communication Consent: {communicationConsent ? "Yes" : "No"}</p>
  </div>
);
