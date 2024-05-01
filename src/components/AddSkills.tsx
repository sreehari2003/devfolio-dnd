import Select from "react-select";
import "./skill.css";
import { useMemo } from "react";

interface Props {
  index: number;
  isActive: boolean;
  skills: string[];
  updateSkills: (index: number, val: string | null) => void;
}

export const AddSkills = ({ index, isActive, updateSkills, skills }: Props) => {
  const options = useMemo(() => {
    return skills.map((value) => ({
      label: value,
      value: value,
    }));
  }, [skills]);

  return (
    <Select
      options={options}
      className="select"
      isDisabled={isActive}
      placeholder={`${index}.Add Skill`}
      styles={{
        control: (baseStyle, state) => ({
          ...baseStyle,
          borderColor: state.isFocused ? "#73eacc" : "grey",
          height: "60px",
        }),
      }}
      onChange={(e) => updateSkills(index, e?.value || null)}
    />
  );
};
