import { useMemo, useState } from "react";
import { Skill, AddSkills } from "../components";
import "./dnd.css";
import { useTags } from "../hooks/useTags";
import { useUserTags } from "../hooks/useUserTag";

interface DragInfo {
  isDragging: boolean;
  dragIndex: number | null;
}

export const DndPage = () => {
  const { isLoading, tags } = useTags();

  const {
    isLoading: isUserTagsLoading,
    userTags,
    updateUserTags,
  } = useUserTags();

  const [dragInfo, setDragInfo] = useState<DragInfo>({
    isDragging: false,
    dragIndex: null,
  });

  const activeSkillsSize = useMemo(
    () => userTags.filter(({ name }) => name !== null).length,
    [userTags]
  );

  console.log(activeSkillsSize);

  const updateSkills = (index: number, val: string | null) => {
    if (!val) return;

    const updatedSkills = userTags.map((skill) => {
      if (skill.index === index) {
        return { ...skill, name: val };
      }
      return skill;
    });

    updateUserTags(updatedSkills);
  };

  const { sectionOne, sectionTwo } = useMemo(() => {
    const sectionOne = userTags.slice(0, 5);
    const sectionTwo = userTags.slice(5, 10);

    return { sectionOne, sectionTwo };
  }, [userTags]);

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

    // const newSkills = [...skills];
    // const draggedSkill = newSkills.splice(dragInfo.dragIndex!, 1)[0];
    // newSkills.splice(dropIndex, 0, draggedSkill);

    // console.log("Skills reordered:", newSkills);
    // setSkills(newSkills);
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
          {isLoading || isUserTagsLoading ? (
            <div className="loader">
              <h5>Loading...</h5>
            </div>
          ) : (
            <section className="dnd-area">
              <div className="droppable">
                {sectionOne.map(({ name, index }) => {
                  const isActive = index === activeSkillsSize + 1;
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
                    return (
                      <AddSkills
                        key={index}
                        index={index}
                        isActive={!isActive}
                        updateSkills={updateSkills}
                        skills={tags}
                      />
                    );
                  }
                })}
              </div>
              <div className="droppable">
                {sectionTwo.map(({ name, index }) => {
                  const isActive = index === activeSkillsSize + 1;
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
                    return (
                      <AddSkills
                        key={index}
                        index={index}
                        isActive={!isActive}
                        updateSkills={updateSkills}
                        skills={tags}
                      />
                    );
                  }
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};
