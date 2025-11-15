import React from "react";
import Card from "./components/TeamCard";
import HeadingWithLine from "@/components/HeadingWithLine";
import members from "@/data/members";

const TeamPage: React.FC = () => {
  return (
    <section className="py-12 px-4 flex flex-col gap-8 sm:px-8">

      <HeadingWithLine text="Nosso time" />

      {/* Container dos cards */}
      <div className="grid grid-cols-1 gap-12 justify-center max-w-fit mx-auto mt-6 sm:grid-cols-2">
        {members.map((member, index) => (
          <Card
            key={index}
            name={member.name}
            githubUrl={member.githubUrl}
            linkedinUrl={member.linkedinUrl}
            image={member.image}
            stack={member.stack}
            state={member.state}
          />
        ))}
      </div>
  </section>
  );
};

export default TeamPage;