import { FaGithub, FaLinkedin } from "react-icons/fa";
import SocialIcon from "@/components/SocialIcon";

type MemberCard = {
  name: string;
  githubUrl: string;
  linkedinUrl: string;
  image: string;
  description: string;
  stage: string;
};

export default function Card({ image, linkedinUrl, githubUrl, name, description, stage }: MemberCard) {
  return (
    <article className="bg-white rounded-[5px] shadow-md p-5 w-[300px] flex flex-col font-raleway font-medium">
      <div className="relative flex items-center">
       
        <img className="size-[110px] rounded-full" src={image} alt={`Imagem de ${name}`} />
      
        
        <div className="flex gap-2 ml-auto">
         
         <SocialIcon icon={<FaLinkedin/>} url={linkedinUrl}/>
         
         <SocialIcon icon={<FaGithub />} url={githubUrl}/>
        
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <h2 className="font-bold text-xl">{name}</h2>
        <p>{description}</p>
        <p>{stage}</p>
      </div>
    </article>
  );
}