export default function ImageSlotPlaceholder({ label }: { label: string }) {
  return (
    <div className="image-slot-placeholder">
      <span className="image-slot-placeholder__label">{label}</span>
    </div>
  );
}
