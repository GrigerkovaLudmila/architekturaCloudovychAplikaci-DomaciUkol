import Button from "./Button";

function PageHeader({ title, actionLabel, onAction }) {
  return (
    <header className="page-header">
      <h1>{title}</h1>

      {actionLabel && (
        <Button variant="ghost" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </header>
  );
}

export default PageHeader;
