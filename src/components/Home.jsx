import '../styles.css';
import Image1 from '../assets/img-2.png';
import BackImage from '../assets/img-bg.png';
import kk from './details.json';

function Home() {
  return (
    <section className="card overflow-hidden">
      {/* <img src={BackImage} alt="background" className="card__bg" />
      <div className="card__blur"></div> */}
      <div className="card__header">
        <h1>PROJECTS</h1>
      </div>
      <div className="card__container container">
        {kk.map((user, index) => (
            <article key={index} className="card__article card-yellow">
                    <img src={Image1} alt="profile" className="card__img" />
                    <div className="card__shadow"></div>

                    <div className="card__data">
                    <h2 className="card__name">{user.title}</h2>
                    <span className="card__profession">{user.profession}</span>
                    </div>

                    <div className="card__clip">
                    <i className="ri-menu-4-line"></i>
                    </div>

                    <div className="info">
                    <div className="info__data">
                        {/* <h2 className="info__name">{user.title}</h2> */}
                        <p className="info__description">{user.description}</p>
                    </div>

                    <div className="info__social">
                        <a href = {user.github} target="_blank" className="info__link" rel="noreferrer">
                        <i className="ri-github-line"></i>
                        </a>
                    </div>
                    </div>
            </article>
        ))}
      </div>
    </section>
  );
}

export default Home;
