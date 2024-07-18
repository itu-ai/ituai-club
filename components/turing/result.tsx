'use client';

interface Props {
  text: string;
}

const TuringResult: React.FC<Props> = ({ text }) => {
  if (text.length === 0) return <></>;
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-zinc-800 opacity-50 z-2"></div>
        <div className="flex items-center justify-center z-10">
          <div className="px-6 py-4 bg-zinc-800 flex items-center justify-center rounded-xl">
            <p className="text-center font-bold text-xl text-zinc-200">
              {text}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TuringResult;
