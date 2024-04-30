import Select from "react-select";
import "./skill.css";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

interface Props {
  index: number;
  isActive: boolean;
  updateSkills: (index: number, val: string | undefined) => void;
}

export const AddSkills = ({ index, isActive, updateSkills }: Props) => {
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
      onChange={(e) => updateSkills(index, e?.value)}
    />
  );
};
