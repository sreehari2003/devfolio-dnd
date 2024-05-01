import "./skill.css";

interface Prop {
  text: string;
  index: number;
  id: number;
  deleteTag: (index: number) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  activeIndex: number;
}

export const Skill = ({
  text,
  index,
  onDragStart,
  onDragEnd,
  onDrop,
  deleteTag,
  id,
  activeIndex,
}: Prop) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (activeIndex > index) {
      e.currentTarget.classList.add("margin-from-bottom");
    } else {
      e.currentTarget.classList.add("margin-from-top");
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("margin-from-bottom");
    e.currentTarget.classList.remove("margin-from-top");
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
        onDragLeave={handleDragLeave}
      >
        {index}.{text}
        <img src="/close.svg" alt="" onClick={() => deleteTag(id)} />
      </div>
    </>
  );
};
