import Button from "./Button";
import { formatDate } from "../utils/date";

function ConfirmDialog({ item, onConfirm, onCancel }) {
  if (!item) return null;

  return (
    <div className="modal-backdrop">
      <section className="confirm-dialog" role="dialog" aria-modal="true">
        <p>
          Do you really want to delete {item.name} with expiration {" "}
          {formatDate(item.expirationDate)}?
        </p>

        <div className="confirm-actions">
          <Button onClick={onConfirm}>YES</Button>
          <Button variant="danger" onClick={onCancel}>NO</Button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmDialog;
