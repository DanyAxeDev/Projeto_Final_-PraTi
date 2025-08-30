import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

type SocialLoginButtonProps = {
  icon: ReactNode;  
  onClick: () => void; 
};

function SocialLoginButton({ icon, onClick }: SocialLoginButtonProps) {
  return (
    <Button onClick={onClick} variant="outline" size="icon">
      {icon}
    </Button>
  );
}

export default SocialLoginButton;