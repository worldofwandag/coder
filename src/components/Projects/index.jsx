import { useState, useEffect } from "react";
import "./style.css";
import BackgroundLines from "../BackgroundLines";
import WorkCard from "../WorkCard";
import ScrambleText from "../ScrambleText";
import ParaWriting from "../ParaWriting";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";


import work1 from "../../assets/Images/summarist-mock.png";
import work2 from "../../assets/Images/skinstric-mock.png";
import work3 from "../../assets/Images/ultraverse-mockup.png";

export default function Projects() {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleComplete = () => {
    setHasAnimated(true);
  };

  useEffect(() => {
    // Start animation when the component is in view
    if (inView && !hasAnimated) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const works = [
    {
      client: "Summarist",
      year: "2025",
      img: work1,
      title: "Summarist Audio Book App",
      stack:
        "NextJS, React, Html, CSS, Tailwind CSS, Typescript, Redux Toolkit, Firebase, Stripe using Firebase extension, React Icons, Vercel",
      detail:
        "Great summaries of books for busy people. Key website features include Authentication using Firebase, Payment using Stripe, state management using Redux Toolkit, an Audio player with Narrarator for each individual book, a Favorites section for books that users mark as favorite, a dynamic predictable Search bar, a font size changer, and more. Depending on the subscription level through Stripe, the user will have access to different features.",
      link: "https://summarist-csr-wandag.vercel.app/",
      git: "https://github.com/worldofwandag/summarist-csr-wandag",
    },
    {
      client: "Skinstric",
      year: "2025",
      img: work2,
      title: "Skinstric: AI powered skincare",
      stack:
        "NextJS, React, Html, CSS, JavaScript, Tailwind CSS, Typescript, GSAP, Eslint, Vercel",
      detail:
        "Skinstric is an AI-powered skincare product that helps to reduce the appearance of fine lines and wrinkles. Key website features include forms that can be sent to an API with responses that are then displayed on the frontend for users to custsomize, an option to upload images through an upload button or taking a picture with their camera, server-side rendering for better performance and SEO while keeping interactivity on the client-side, smooth animations using GSAP, and a responsive design that works on all devices.",
      link: "https://skinstric-wandag.vercel.app/",
      git: "https://github.com/worldofwandag/skinstric-wandag/tree/master/src/app",
    },
    {
      client: "Ultraverse",
      year: "2024",
      img: work3,
      title: "Ultraverse: NFT marketplace App",
      stack: "React, Html, CSS, JavaScript, Tailwind CSS, AoS, React Slick, Vercel",
      detail:
        "Interactive marketplace for NFT purchases. Key features include React slick carousels, dyanmic API fetching, real-time countdown timer, sorting filter to specify organization of rendered results, a 'follow' button, a 'load more' button, and a responsive design that works on all devices.",
      link: "https://ultraverse-lilac.vercel.app/",
      git: "https://github.com/worldofwandag/Ultraverse",
    },
  ];

  const opacityVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section ref={ref} className="projects" id="projects">
      <BackgroundLines />
      <div className="background--glow"></div>

      <div className="projects--grid">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={opacityVariant}
          transition={{ duration: 1, delay: 0.5 }}
          className="projects--grid--title"
        >
          <h3 className="theme--text">
            <ScrambleText shuffle delay={0.5}>
              03
            </ScrambleText>{" "}
            <span className="hash">{"//"}</span>{" "}
            <ScrambleText shuffle delay={0.5}>
              Expertise
            </ScrambleText>
          </h3>
        </motion.div>

        <div className="projects--grid--content">
          <div className="projects--grid--content--heading">
            <h2>
              <ParaWriting stagger={0.08} text={"My "} sec={"Works"} />
            </h2>
            <p className="projects--tap">tap images for details</p>
          </div>
          <div className="projects--grid--content--works">
            {works.map((item, index) => {
              return (
                <WorkCard
                  item={item}
                  key={index}
                />
              );
            })}
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={opacityVariant}
          transition={{ duration: 1, delay: 1 }}
          onAnimationComplete={() => handleComplete()}
          className="projects--grid--detail"
        >
          <p className="theme--detail">
            <ScrambleText delay={1}>
              Discover a curated portfolio of projects where each line of code
              tells a story of problem-solving, creativity, and technical
              finesse.
            </ScrambleText>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
