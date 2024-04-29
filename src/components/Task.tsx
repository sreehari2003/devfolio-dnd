import { Link } from "react-router-dom";
import "./task.css";

interface Prop {
  title: string;
  route: string;
}

export const Task = ({ title, route }: Prop) => {
  return (
    <Link to={route} className="link">
      <section className="card task">
        <h1>{title}</h1>
      </section>
    </Link>
  );
};
