import "./about.css";
import dhaval from "../about/dhaval.png";
import neel from "../about/nil.jpg";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

const About = () => {
  return (
    <div className="about">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          We are dedicated to providing high quality online courses to help
          individuals learn and grow in their desired fields. Our experienced
          instruction ensures that each course is tailored for effective
          learning and practical application.
        </p>
      </div>

      <div className="row">
        <div className="col-md-6 team-member">
          <img src={neel} alt="Neel Desai" className="img-fluid" />
          <h5>Neel Desai</h5>
          <p>
            <strong>Founder & CEO</strong>
          </p>
          <div className="social-links">
            <a target="_blank" href="https://www.linkedin.com/in/neeldesaind/">
              <AiFillLinkedin />
            </a>
            <a target="_blank" href="https://github.com/neeldesaind">
              <AiFillGithub />
            </a>
          </div>
          <p>
            Neel Desai is a visionary leader with a passion for education and
            technology...
          </p>
        </div>

        <div className="col-md-6 team-member">
          <img src={dhaval} alt="Dhaval Chhayla" className="img-fluid" />
          <h5>Dhaval Chhayla</h5>
          <p>
            <strong>Founder & CEO</strong>
          </p>
          <div className="social-links">
            <a target="_blank" href="https://linkedin.com/in/dhaval-chhayla">
              <AiFillLinkedin />
            </a>
            <a target="_blank" href="https://github.com/DhavalChhaylaOfficial">
              <AiFillGithub />
            </a>
          </div>
          <p>
            Dhaval Chhayla brings extensive experience in educational content
            development...
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
