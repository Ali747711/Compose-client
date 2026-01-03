import { Button } from "./components/ui/button";

export function Card() {
  return (
    // <div className="w-50 h-70 bg-gray-500 text-white rounded-2xl z-30 hover:-translate-x-3 hover:-translate-y-3 transition-all duration-400 ease-out">
    //   <h1>Azamat</h1>
    //   <p>he is a student</p>
    //   <input type="text" name="" id="" />
    //   <input type="text" name="" id="" />
    //   <button>Click</button>
    // </div>
    <div
      className="w-80 h-96  from-gray-500 to-gray-700 text-white 
                rounded-2xl z-30 shadow-lg 
                hover:-translate-x-3 hover:-translate-y-3 hover:shadow-2xl 
                transition-all duration-300 ease-out p-6 flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold">Azamat</h1>
      <p className="text-gray-200">Full Stack Developer & Student</p>

      <div className="space-y-3 flex-1">
        <input
          className="w-full p-3 rounded-xl bg-gray-600/50 border border-gray-400 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 
                      transition-all"
          type="text"
          placeholder="Email"
        />
        <input
          className="w-full p-3 rounded-xl bg-gray-600/50 border border-gray-400 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 
                      transition-all"
          type="text"
          placeholder="Password"
        />
      </div>

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl 
                     font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 
                     transition-all duration-200"
      >
        Get Started
      </button>
      <Button>Show</Button>
    </div>
  );
}
