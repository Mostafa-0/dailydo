function Intro() {
  return (
    <div className="flex flex-col justify-center h-svh gap-3 tracking-widest">
      <h1 className="text-5xl md:text-7xl font-black">
        Dai<span className="text-emerald-700">ly</span>Do
      </h1>
      <p className="text-lg md:text-xl font-medium">
        Achieve your goals with clarity and focus. DailyDo helps you stay on top
        of your to-dos with ease. Simplify your day and get more done.
      </p>
      <p className="text-lg md:text-xl mt-8 font-semibold">
        Ready to boost your productivity?{" "}
        <span className="text-emerald-600">log in</span> or
        <span className="text-emerald-600"> Sign up </span>for a new account to
        get started!
      </p>
    </div>
  );
}

export default Intro;
