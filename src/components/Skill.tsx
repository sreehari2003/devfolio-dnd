import "./skill.css";

interface Prop {
  text: string;
  index: number;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
}

export const Skill = ({
  text,
  index,
  onDragStart,
  onDragEnd,
  onDrop,
}: Prop) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <div
        draggable
        className="dnd-option slide"
        onDragStart={(e) => onDragStart(e, index)}
        onDragEnd={onDragEnd}
        onDrop={(e) => onDrop(e, index)}
        onDragOver={handleDragOver}
      >
        {index}.{text}
        <img src="/close.svg" alt="" />
      </div>
    </>
  );
};
