interface Props {
  className?: string;
  textColor?: string;
}

const Footer: React.FC<Props> = ({ className, textColor = "zinc-500" }) => {
  return (
    <footer className={`flex w-full items-center justify-center pb-6 ${className}`}>
      <p className={`text-center text-${textColor} text-xs lg:text-base`}>
        © 2024 ITU Artificial Intelligence Club. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
