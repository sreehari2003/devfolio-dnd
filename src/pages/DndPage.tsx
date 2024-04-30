import { useEffect, useMemo, useState } from "react";
import { Skill, AddSkills } from "../components";
import "./dnd.css";

interface DragInfo {
  isDragging: boolean;
  dragIndex: number | null;
}

type Skils = {
  name: null | string;
  index: number;
};

const skillsTemp: Skils[] = [
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
];

export const DndPage = () => {
  const [skills, setSkills] = useState(skillsTemp);

  const [dragInfo, setDragInfo] = useState<DragInfo>({
    isDragging: false,
    dragIndex: null,
  });

  useEffect(() => {
    const skillSet = [...skills]; // Create a copy of the original skills array
    const desiredLength = 10; // Desired length of the array

    // Fill the array with objects having name set to null and index set to -1
    while (skillSet.length < desiredLength) {
      skillSet.push({ name: null, index: -1 });
    }

    console.log(skillSet);
    setSkills(skillSet); // Update the state with the new array
  }, []);

  const { sectionOne, sectionTwo } = useMemo(() => {
    const sectionOne = skills.slice(0, 5);
    const sectionTwo = skills.slice(5, 10);

    return { sectionOne, sectionTwo };
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
              {sectionOne.map(({ name, index }) => {
                if (name) {
                  return (
                    <Skill
                      text={name}
                      key={index}
                      index={index}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onDrop={handleOnDrop}
                    />
                  );
                } else {
                  return <AddSkills key={index} />;
                }
              })}
            </div>
            <div className="droppable">
              {sectionTwo.map(({ name, index }) => {
                if (name) {
                  return (
                    <Skill
                      text={name}
                      key={index}
                      index={index}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onDrop={handleOnDrop}
                    />
                  );
                } else {
                  return <AddSkills key={index} />;
                }
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
