interface EmailTemplateProps {
  heading: string
  name: string;
  email: string;
  clientVolume: string;
}

export const BasicContactEmail: React.FC<
  Readonly<EmailTemplateProps>
> = ({ heading, email, name, clientVolume }) => (
  
  <div>
    <h1>{heading}</h1>
    <p>Name: {name}</p>
    <p>Email: {email}</p>
    <p>Client Volume: {clientVolume}</p>
  </div>
);
