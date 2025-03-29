import Logo from "./Logo";

function IntroSection() {
  return (
    <div className="flex flex-col justify-center gap-2 tracking-widest">
      <h1 className="text-5xl md:text-7xl font-black mb-2">
        <Logo />
      </h1>
      <p className="max-w-xl">
        Achieve your goals with clarity and focus. Helping you stay on top of
        your to-dos with ease.
      </p>
    </div>
  );
}

export default IntroSection;
