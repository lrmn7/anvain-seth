import { useState } from "react";
import Image from "next/image";
import Port from "../public/anvain.png";
import Link from "next/link";

import Instagram from "../components/Icons/Instagram";
import Email from "../components/Icons/Email"

const About = ({ className = "" }) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div
      className={`${className} container col-span-1 hidden h-[629px] flex-col overflow-y-auto rounded-lg  bg-white/10 px-6 text-white shadow-highlight md:block`}
    >
      {!showContact && (
        <div className="flex justify-center">
          <Image
            src={Port}
            alt="Serg"
            width={300}
            height={300}
            className="mb-5 mt-10 rounded-full"
          />
        </div>
      )}
      {!showContact ? (
        <>
          <h1 className="mb-5 text-center text-2xl font-bold uppercase tracking-widest">
            About Me
          </h1>
          <p className="mx-auto px-4 text-center text-lg text-white/75 lg:hidden">
          Hi, I'm ANVAIN, and I have a deep passion for the dark art of photography.
          I freeze moments in time and preserve memories that tell unique stories.
          </p>
          <p className="mx-auto hidden px-4 text-center text-lg text-white/75 lg:block">
          Hi, I'm ANVAIN, and I have a deep passion for the dark art of photography. 
          With each click of my finger, I freeze moments in time and preserve memories that tell unique stories. 
          I strive to create an immersive experience where each image transports you to a different place and evokes a myriad of emotions.
          </p>
          <button
            className="mx-auto mt-4 flex rounded border px-4 py-2 font-bold text-white hover:border-green-400"
            onClick={() => setShowContact(true)}
          >
            Get In Touch
          </button>
        </>
      ) : (
        <>
          <h1 className="mb-5 mt-10 text-center text-2xl font-bold uppercase tracking-widest">
              Let's Create Together
          </h1>
          <p className="m-4 mx-auto p-4 text-center text-lg text-white/75">
              If you are interested in my art and would like to collaborate, please email me below:
          </p>
          <p className="m-4 mx-auto p-4 text-center text-lg text-white/75">
              Got any unique requests or queries?
          <br className="mx-auto mb-8 text-center text-lg text-white/75" />
              Don't hesitate to DM me on
              Instagram or drop me an email. I'm here to answer any and all your questions.
          </p>

          <div className="mb-8 flex flex-row justify-center">
            <Link href="https://instagram.com/powerranjar/" target="_blank">
              <button className="flex items-center rounded px-4 py-2">
                <Instagram />
              </button>
            </Link>
            <Link href="mailto:anjarprasetio7@gmail.com">
              <button className="flex items-center rounded px-4 py-2">
                <Email />
              </button>
            </Link>
          </div>
          <button
            className="mx-auto mt-4 flex rounded border px-4 py-2 font-bold text-white hover:border-green-400"
            onClick={() => setShowContact(false)}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
};

export default About;

// // Engaging Approach:

// Let's Create Together

// Ready to bring your vision to life? Email me to discuss your next shoot!

// We'll iron out the details about the time, location, and the pricing over email as soon as possible. I'm excited to deliver stunning shots that meet your expectations.

// Got any unique requests or queries? Don't hesitate to DM me on Instagram or drop me an email. I'm here to answer all your questions.

// Professional Approach:

// Get in Touch for Your Next Shoot

// Interested in scheduling a photoshoot? Please contact me via email at your earliest convenience.

// I will respond promptly to discuss specifics such as timing, location, and pricing. I'm committed to delivering high-quality images tailored to your needs.

// If you have any additional requirements or questions, feel free to reach out to me on Instagram or via email. Your satisfaction is my top priority.

// Friendly Approach:

// Let's Capture Some Amazing Memories

// Looking forward to an amazing shoot? Just hit me up with an email and we'll get the ball rolling!

// I'll get back to you as quickly as I can to sort out all the nitty-gritty details - like when and where we're shooting, and what it'll cost. I can't wait to help you capture the perfect shots!

// Got any special ideas or questions? Feel free to slide into my DMs on Instagram or shoot me an email. I'm all ears!

// Artistic Approach:

// Let's Paint with Light Together

// Are you ready to create a masterpiece? Send me an email and we can start planning your perfect photoshoot.

// We will work out the details such as time, location, and cost as soon as possible. I am eager to help you create beautiful images that tell your unique story.

// Have a special request or question? Feel free to reach out on Instagram or email me. I'm here to make your vision come to life.

// Casual Approach:

// Let's Shoot Some Great Pics

// Wanna create some cool snaps? Just drop me an email and we'll start sorting out the details.

// We'll chat about the best time and place for your shoot, and how much it'll cost. I'm stoked to help you get the perfect shots!

// Got a special idea or a question? Hit me up on Instagram or send me an email. Can't wait to hear from you!

// Energetic Approach:

// Ready, Set, Shoot!

// Excited for an amazing photoshoot? Shoot me an email and let's get the planning started!

// We'll quickly sort out all the details including the time, location, and pricing. I'm thrilled to capture the best shots for you!

// If you have any unique requests or queries, just message me on Instagram or reach me via email. Let's make your photoshoot a memorable one!

