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
    <article className="bg-white rounded-lg shadow-md p-4 w-64">
      <div className="relative flex items-center">
       
        <img className="w-16 h-16 rounded-full" src={image} alt={`Imagem de ${name}`} />
      
        
        <div className="flex gap-2 ml-auto">
         
         <SocialIcon icon={<FaLinkedin/>} url={linkedinUrl}/>
         
         <SocialIcon icon={<FaGithub />} url={githubUrl}/>
        
        </div>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold text-lg">{name}</h2>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-400">{stage}</p>
      </div>
    </article>
  );
}