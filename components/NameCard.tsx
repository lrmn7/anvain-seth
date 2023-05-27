import Bridge from "./Icons/Bridge";
import Logo from "./Icons/Logo";

const NameCard = ({ className = "" }) => {
  return (
    <div
      className={`${className} after:content relative mb-5 flex h-[629px] w-[600px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0`}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <span className="flex max-h-full max-w-full items-center justify-center">
          <Bridge />
        </span>
        <span className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
      </div>

      <div className="hidden lg:block">
        <Logo />
      </div>
      <div className="mb-15 block text-3xl font-bold text-slate-300	 lg:hidden">
        ANVAIN SETH
      </div>
      <p className="text-white/75 ">Bogor, Indonesia</p>

      <h1 className="mb-4 mt-8 text-2xl font-bold uppercase tracking-widest">
        Gallery
      </h1>
      <p className="text-white/75 ">#Made by Tragic</p>
    </div>
  );
};

export default NameCard;
