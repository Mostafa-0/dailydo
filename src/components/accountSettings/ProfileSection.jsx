function ProfileSection({ title, description, children, className = "" }) {
  return (
    <div className={`border border-border rounded-lg p-4 my-4 ${className}`}>
      <h2 className="text-sm font-medium text-foreground">{title}</h2>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default ProfileSection;
