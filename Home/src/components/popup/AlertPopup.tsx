type AlertPopupProps = {
  open: boolean;
  message: string;
  onConfirm: () => void;
};

export const AlertPopup = ({ open, message, onConfirm }: AlertPopupProps) => {
  if (!open) return null;

  return (
    <div className="popup-backdrop">
      <div className="popup-box">
        <p>{message}</p>
        <button onClick={onConfirm}>확인</button>
      </div>
    </div>
  );
};
