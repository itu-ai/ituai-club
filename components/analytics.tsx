import { GoogleAnalytics } from '@next/third-parties/google'

export const Analytics: React.FC = () => {
  const id = process.env.NEXT_PUBLIC_G_ID;
  if (!id) {
    // TODO: can implement a error to be sent to developers here
    console.warn("Google Analytics ID is not provided");
  }
  return (
    <>
      {id && <GoogleAnalytics gaId={id} />}
    </>
  );
};
