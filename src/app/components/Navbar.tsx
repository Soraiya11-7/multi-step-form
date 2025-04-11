
import { SiProgress } from "react-icons/si";
import ThemeToggle from "./theme-toggle";


export default function Navbar() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold flex text-purple-800 dark:text-purple-400">
        <SiProgress className="mr-0.5" />FormFlow
      </h1>

      <ThemeToggle />
    </div>
  );
}