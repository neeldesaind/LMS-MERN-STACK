import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testmonials/testimonials";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Welcome to EduVerse E-learning Platform</h1>
          <p>Empowering you with knowledge and skills</p>
          <button
            onClick={() => navigate("/courses")}
            className="common-btn-white"
          >
            Get Started
          </button>
        </div>
      </div>

      <Testimonials />
    </div>
  );
};

export default Home;
