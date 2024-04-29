import { useMemo, useState } from "react";
import { Skill } from "../components";
import "./dnd.css";

interface DragInfo {
  isDragging: boolean;
  dragIndex: number | null;
}

const skillsTemp = [
  {
    name: "haskel",
    index: 1,
  },
  {
    name: "coffescript",
    index: 2,
  },
  {
    name: "fp",
    index: 3,
  },
  {
    name: "oop",
    index: 4,
  },
  {
    name: "js",
    index: 5,
  },
  {
    name: "React",
    index: 6,
  },
  {
    name: "ts",
    index: 7,
  },
  {
    name: "go",
    index: 8,
  },
];

export const DndPage = () => {
  const [skills, setSkills] = useState(skillsTemp);

  const [dragInfo, setDragInfo] = useState<DragInfo>({
    isDragging: false,
    dragIndex: null,
  });

  const [sectionOne, sectionTwo] = useMemo(() => {
    const sectionOne = skills.slice(0, 5);
    const sectionTwo = skills.slice(5, 10);

    return [sectionOne, sectionTwo];
  }, [skills]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.setData("text/plain", index.toString());
    e.currentTarget.classList.add("exclude-me");
    setDragInfo({
      isDragging: true,
      dragIndex: index,
    });
  };

  const handleDragEnd = () => {
    setDragInfo({
      isDragging: false,
      dragIndex: null,
    });

    document.querySelectorAll(".slide").forEach((item) => {
      item.classList.remove("exclude-me");
    });
  };

  const handleOnDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number
  ) => {
    e.preventDefault();

    if (dragInfo.dragIndex === dropIndex) return;

    const newSkills = [...skills];
    const draggedSkill = newSkills.splice(dragInfo.dragIndex!, 1)[0];
    newSkills.splice(dropIndex, 0, draggedSkill);

    console.log("Skills reordered:", newSkills);
    setSkills(newSkills);
  };

  return (
    <main className="dndhome">
      <div className="card-wrapper">
        <ul>
          <li>Things you're good at!</li>
        </ul>
        <div className="dnd-card">
          <p className="instructions">
            The skills you mention here will help hackathon organizers in
            assessing you as a potential participent
          </p>
          <section className="dnd-area">
            <div className="droppable">
              {sectionOne.map(({ name, index }) => (
                <Skill
                  text={name}
                  key={index}
                  index={index}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDrop={handleOnDrop}
                />
              ))}
            </div>
            <div className="droppable">
              {sectionTwo.map(({ name, index }) => (
                <Skill
                  text={name}
                  key={index}
                  index={index}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDrop={handleOnDrop}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
