import { Task } from "../components";
import "./home.css";

export const Home = () => {
  return (
    <main className="home">
      <Task title="Challenge 1" route="/dnd" />
      <Task title="Challenge 2" route="/layout" />
    </main>
  );
};
