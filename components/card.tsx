import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export const Card: React.FC<Props> = ({ className, children }) => {
	return (
		<div className={`overflow-hidden relative transition-colors duration-700 group border rounded-xl md:gap-8 border-zinc-600 hover:border-zinc-400/80 ${className}`}>
			{children}
		</div>
	);
};
