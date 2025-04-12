
import { SiProgress } from "react-icons/si";
import ThemeToggle from "../theme/theme-toggle";


export default function Navbar() {
  return (
    <div className=" bg-white shadow-md dark:bg-gray-800 py-3 ">
      <div className=" flex justify-between items-center container w-[90%] mx-auto ">
      <h1 className="flex justify-center items-center  font-bold text-purple-700  dark:text-purple-600 text-xl sm:text-2xl md:text-3xl">
        <SiProgress className="mr-0.5" />FormFlow
      </h1>
      <ThemeToggle />
      </div>
     

      
    </div>
  );
}