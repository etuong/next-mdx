import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <React.Fragment>
      <h1>About Ethan</h1>
      <p>Get to know a little bit about the man behind this site</p>

      <Image
        src="/images/about.jpg"
        width={650}
        height={340}
        className="featured-image img-fluid"
        alt=""
      />

      <h4>📜 Education </h4>
      <p>
        Ethan Thomas Uong is an Asian American engineer and residing in Los
        Angeles, CA. Uong graduated from the University of California, San Diego
        with a degree in Structural Engineering (emphasis on geotechnical design
        and computational analysis) and Carnegie Mellon in M.S Computational
        Mechanics. He is the recipient of the American Society of Civil
        Engineers award and scholar of the Leo Politi Foundation. Uong is
        perhaps best known for his natural curiosity, willingness and dedication
        for learning, and pragmatic approach on solving problems.
      </p>

      <h4>👨‍💻 Career </h4>
      <p>
        At a young age, Uong had a candid characteristic to break things apart
        and put them back together and this attitude brought out this true
        passion in Computational Mechanics where he is able to wander endlessly
        in the world of mathematics and science. He later discovered his true
        passion in computer science and is now pursuing it full time. This site
        contains a collection of his numerous projects that he is excited to
        share with you!
      </p>

      <h4>✈️ + ❤️ Cultural Diversity</h4>
      <p>
        With a great sense for cultural awareness, Uong has visited over 30
        countries. With no hesitation and fear, he stepped onto new territories
        and allowed his experiences to diversify his view of the world. Uong
        continues to believe that a worldly experience can lead to success and
        acceptance. For Uong, knowledge is power and with power, comes the
        ability to positively influence people&sbquo;s lives. Each time he traveld
        abroad, he obtained a vast knowledge of their culture and gained a
        better appreciation of his own.
      </p>

      <h4>🔭 Future </h4>
      <p>
        In his spare time, Uong likes to play his Rodriguez flamenco guitar,
        pick up a computer language, or go for a jog. His next big move in life
        is to earn an MBA to advance his career and save money to travel to the
        Mediterranean! :)
      </p>
    </React.Fragment>
  );
};

export default About;
