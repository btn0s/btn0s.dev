import PodWidget from "@/app/sketches/personal-pods/components/pod-widget";
import Mermaid from "@/components/mermaid";
import Prose from "@/components/prose";

const PodPage = () => {
  return (
    <>
      <Prose>
        <h1>Pod</h1>
        <p>
          I keep what I call a "curiosity backlog". Usually it takes the form of
          a list of tabs, wikis, and other content that I want to explore. I
          usually burn through this in my downtime, but I've always felt it'd be
          neat if I could have a tool that would allow me to explore this
          backlog in a more structured way.
        </p>
        <p>
          Pod is a small exploration of what a small tool for this purpose might
          look like.
        </p>
        <p className="text-white">"For the curious"</p>
      </Prose>
      <PodWidget />
      {/*<Prose>*/}
      {/*  /!*1. Me just living my life, with all of its various inputs (conversations, movies, shows, radio, etc)*!/*/}
      {/*  /!*2. Something sparks my curiosity*!/*/}
      {/*  /!*3. I quickly google search for the topic, and usually open it's wikipedia page if available*!/*/}
      {/*  /!*4. Back to normal*!/*/}
      {/*  /!*5. I have downtime and I come back to my "curiosity backlog", and pick something to read through -- sometimes diving deeper into the topic, other times just getting what I needed from Wikipedia*!/*/}
      {/*  <Mermaid*/}
      {/*    id="mermaid-24"*/}
      {/*    title="existing workflow"*/}
      {/*    source={`*/}
      {/*      graph TD*/}
      {/*          A[Something sparks my curiosity] --> B[I open a tab on the topic - e.g. Wikipedia, YouTube, etc]*/}
      {/*          B --> C[Time passes]*/}
      {/*          C --> D[I come back and read through the content]*/}
      {/*    `}*/}
      {/*  />*/}
      {/*  <h2>Existing user journey</h2>*/}
      {/*  <p>*/}
      {/*    This flow is something I use very often, and have been using for a*/}
      {/*    long time. Honestly, I've never really considered that it could use*/}
      {/*    improvement.*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    One day I tried out{" "}*/}
      {/*    <a href="https://notebooklm.google.com/">NotebookLM</a>, and fell in*/}
      {/*    love with the potential of their "audio overview" feature. If you*/}
      {/*    haven't tried it out yet, I highly recommend it.*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    This sparked a new idea for me: What if I could feed my existing*/}
      {/*    curiosity backlog into an AI model, and get audio overviews of the*/}
      {/*    topics I'm interested in?*/}
      {/*  </p>*/}
      {/*  <Mermaid*/}
      {/*    id="mermaid-25"*/}
      {/*    title="new workflow"*/}
      {/*    source={`*/}
      {/*      graph TD*/}
      {/*          A[Something sparks my curiosity] --> B[I ask an AI about it]*/}
      {/*          B --> C[AI gathers context]*/}
      {/*          C --> D[I get an audio summary of the topic]*/}
      {/*    `}*/}
      {/*  />*/}
      {/*</Prose>*/}
    </>
  );
};

export default PodPage;
