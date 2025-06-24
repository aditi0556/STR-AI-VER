import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
export default function Footer(){
  const navigate = useNavigate();
    return (
      <div className="flex flex-col items-center h-lg text-sm  bg-black text-white">
        <div>Copyright &copy; 2025 STR-AI-VER</div>
        <div className="text-xl">
          <a href="#">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          &nbsp;
          <a href="#">
            <FontAwesomeIcon icon={faSquareXTwitter} />
          </a>
          &nbsp;
          <a href="#">
            <FontAwesomeIcon icon={faSquareGithub} />
          </a>
        </div>
        <div onClick={() => navigate("/terms")} className="cursor-pointer">
          Terms
        </div>
        <div onClick={() => navigate("/privacy")} className="cursor-pointer">
          Privacy Policy
        </div>
      </div>
    );
}
