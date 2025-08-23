interface EmailTemplateProps {
  heading: string
  name: string;
  email: string;
  communicationConsent: boolean
  isPremium: boolean;
}

export const BasicContactEmail: React.FC<
  Readonly<EmailTemplateProps>
> = ({ heading, email, name, communicationConsent, isPremium }) => (
  
  <div>
    <h1>{heading}</h1>
    <p>Name: {name}</p>
    <p>Email: {email}</p>
    <p>Communication Consent: {communicationConsent ? "Yes" : "No"}</p>
    <p>Premium User: {isPremium ? "Yes" : "No"}</p>
  </div>
);
