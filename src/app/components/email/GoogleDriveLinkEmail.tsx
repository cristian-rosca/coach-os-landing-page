interface GoogleDriveAccessEmailProps {
  name: string;
  variant: "free" | "premium";
}

const GoogleDriveAccessEmail: React.FC<
  Readonly<GoogleDriveAccessEmailProps>
> = ({ name, variant }) => (
  <div>
    <h1>Welcome to CoachPal, {name}!</h1>
    <p>Thank you for registering for CoachPal {variant === "premium" ? "Premium" : "Free"} tier.</p>
    <p>Your coaching tools and systems are ready!</p>
    
    {variant === "premium" ? (
      <div>
        <p>As a Premium member, you have access to:</p>
        <ul>
          <li>Advanced coaching templates</li>
          <li>Premium Google Sheets tools</li>
          <li>Priority support</li>
        </ul>
      </div>
    ) : (
      <div>
        <p>As a Free member, you have access to:</p>
        <ul>
          <li>Basic coaching templates</li>
          <li>Essential Google Sheets tools</li>
          <li>Community support</li>
        </ul>
      </div>
    )}
    
    <p>Access your tools: [Google Drive link will be provided here]</p>
    <p>Best regards,<br/>The CoachPal Team</p>
  </div>
);

export default GoogleDriveAccessEmail;