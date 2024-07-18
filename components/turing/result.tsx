'use client';

interface Props {
  text: string;
}

const TuringResult: React.FC<Props> = ({ text }) => {
  if (text.length === 0) return <></>;
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-red-500 opacity-50"></div>
        <div className="absolute bottom-1/2 right-1/2 items-center justify-center">
          <div className="px-12 py-6 bg-zinc-800">
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
