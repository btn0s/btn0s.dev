import Spline from "@splinetool/react-spline/next";

import FadeBlurLoader from "@/components/FadeBlurLoader";

const MainScene = () => {
  return (
    <FadeBlurLoader
      className="fixed h-screen w-screen"
      options={{ duration: 2 }}
      style={{
        filter: "blur(40px)",
      }}
    >
      <div className="absolute inset-0 bg-black/50 bg-blend-multiply" />
      <Spline scene="https://prod.spline.design/sdg3BlGJuK3A2HEL/scene.splinecode" />
    </FadeBlurLoader>
  );
};

export default MainScene;
