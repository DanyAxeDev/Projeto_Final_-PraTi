// TeamPage.tsx
import React from "react";
import Card from "./components/TeamCard";
import HeadingWithLine from "@/components/HeadingWithLine";
import SocialIcon from "@/components/SocialIcon";


type Member = {
  name: string;
  githubUrl: string;
  linkedinUrl: string;
  image: string;
  description: string;
  stage: string;
};

const TeamPage: React.FC = () => {
  
  const members: Member[] = [
    {
      name: "Pessoa 1",
      githubUrl: "https://github.com/pessoa1",
      linkedinUrl: "https://linkedin.com/in/pessoa1",
      image: "https://via.placeholder.com/150",
      description: "Descrição da Pessoa 1",
      stage: "Função 1",
    },
    {
      name: "Pessoa 2",
      githubUrl: "https://github.com/pessoa2",
      linkedinUrl: "https://linkedin.com/in/pessoa2",
      image: "https://via.placeholder.com/150",
      description: "Descrição da Pessoa 2",
      stage: "Função 2",
    },
    {
      name: "Pessoa 3",
      githubUrl: "https://github.com/pessoa3",
      linkedinUrl: "https://linkedin.com/in/pessoa3",
      image: "https://via.placeholder.com/150",
      description: "Descrição da Pessoa 3",
      stage: "Função 3",
    },
    {
      name: "Pessoa 4",
      githubUrl: "https://github.com/pessoa3",
      linkedinUrl: "https://linkedin.com/in/pessoa3",
      image: "https://via.placeholder.com/150",
      description: "Descrição da Pessoa 3",
      stage: "Função 4",
    },
    {
      name: "Pessoa 5",
      githubUrl: "https://github.com/pessoa3",
      linkedinUrl: "https://linkedin.com/in/pessoa3",
      image: "https://via.placeholder.com/150",
      description: "Descrição da Pessoa 3",
      stage: "Função 5",
    },
    {
      name: "Pessoa 6",
      githubUrl: "https://github.com/pessoa3",
      linkedinUrl: "https://linkedin.com/in/pessoa3",
      image: "https://via.placeholder.com/150",
      description: "Descrição da Pessoa 3",
      stage: "Função 6",
    },
    {
      name: "Pessoa 7",
      githubUrl: "https://github.com/pessoa3",
      linkedinUrl: "https://linkedin.com/in/pessoa3",
      image: "https://via.placeholder.com/150",
      description: "Descrição da Pessoa 3",
      stage: "Função 7",
    },
    {
      name: "Pessoa 8",
      githubUrl: "https://github.com/pessoa3",
      linkedinUrl: "https://linkedin.com/in/pessoa3",
      image: "https://via.placeholder.com/150",
      description: "Descrição da Pessoa 3",
      stage: "Função 8",
    },
    {
      name: "Pessoa 9",
      githubUrl: "https://github.com/pessoa3",
      linkedinUrl: "https://linkedin.com/in/pessoa3",
      image: "https://via.placeholder.com/150",
      description: "Descrição da Pessoa 3",
      stage: "Função 9",
    },
    {
      name: "Pessoa 10",
      githubUrl: "https://github.com/pessoa3",
      linkedinUrl: "https://linkedin.com/in/pessoa3",
      image: "https://via.placeholder.com/150",
      description: "Descrição da Pessoa 3",
      stage: "Função 10",
    }

  ];

return (
  <section className="p-8 bg-[#F1ECE0] flex flex-col gap-8">

    <HeadingWithLine text="Nosso time" />

    {/* Container dos cards */}
    <div className="grid grid-cols-2 gap-4 justify-center max-w-fit mx-auto ">
      {members.map((member, index) => (
        <Card
          key={index}
          name={member.name}
          githubUrl={member.githubUrl}
          linkedinUrl={member.linkedinUrl}
          image={member.image}
          description={member.description}
          stage={member.stage}
          className="w-[300px] h-[263px] bg-white shadow rounded-xl flex flex-col items-center justify-center"
        />
      ))}
    </div>
  </section>
);
};

export default TeamPage;