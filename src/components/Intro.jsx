import { Link } from "react-router-dom";

function Intro() {
  return (
    <div className="flex flex-col justify-center gap-4 tracking-widest">
      <h1 className="text-5xl md:text-7xl font-black">
        Dai<span className="text-emerald-700">ly</span>Do
      </h1>
      <p className="text-lg md:text-xl font-medium">
        Achieve your goals with clarity and focus. DailyDo helps you stay on top
        of your to-dos with ease. Simplify your day and get more done.
      </p>
      <p className="text-lg md:text-xl mt-8 font-semibold">
        Ready to boost your productivity?{" "}
        <Link to={"/login"} className="text-emerald-600">
          log in
        </Link>{" "}
        or
        <Link to={"/signup"} className="text-emerald-600">
          {" "}
          Sign up{" "}
        </Link>
        for a new account to get started!
      </p>
    </div>
  );
}

export default Intro;
