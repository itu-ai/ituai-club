interface Props {
  className?: string;
}

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={`flex w-full items-center justify-center pb-6 ${className}`}>
      <p className="text-center text-zinc-500 text-xs lg:text-base">
        © 2024 ITU Artificial Intelligence Club. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
