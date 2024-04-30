import Select from "react-select";
import "./skill.css";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export const AddSkills = () => {
  return (
    <div className="dnd-option skill-provider">
      <Select options={options} className="select" />
    </div>
  );
};
