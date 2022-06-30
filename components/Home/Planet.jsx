import Mars from "../../public/pictures/planet/raw/Mars.png";
import Pluto from "../../public/pictures/planet/raw/Pluto.png";
import Jupiter from "../../public/pictures/planet/raw/Jupiter.png";
import Neptune from "../../public/pictures/planet/raw/Naptune.png";
import Saturn from "../../public/pictures/planet/raw/Saturn.png";
import Mercury from "../../public/pictures/planet/raw/Mercury.png";
import Star from "../../public/pictures/Star.png";
import Image from "next/image";
const Planet = () => {
  const stars = [
    { key: 1, alt: "Star1", className: "star01" },
    { key: 2, alt: "Star2", className: "star02" },
    { key: 3, alt: "Star3", className: "star03" },
    { key: 4, alt: "Star4", className: "star04" },
    { key: 5, alt: "Star5", className: "star05" },
    { key: 6, alt: "Star6", className: "star06" },
    { key: 7, alt: "Star7", className: "star07" },
    { key: 8, alt: "Star8", className: "star08" },
    { key: 9, alt: "Star9", className: "star09" },
    { key: 10, alt: "Star10", className: "star10" },
  ];
  return (
    <div className="relative">
      <div className="saturns">
        <Image src={Saturn} alt="Saturn" />
      </div>
      <div className="mercury">
        <Image src={Mercury} alt="Mercury" />
      </div>
      <div className="jupiter">
        <Image src={Jupiter} alt="Jupiter" />
      </div>
      <div className="mars">
        <Image src={Mars} alt="Mars" />
      </div>
      <div className="pluto">
        <Image src={Pluto} alt="Pluto" />
      </div>
      <div className="neptune">
        <Image src={Neptune} alt="Neptune" />
      </div>
      {stars.map((star) => {
        return (
          <div key={star.key} className={`star  ${star.className}`}>
            <Image src={Star} alt={star.alt} />
          </div>
        );
      })}
    </div>
  );
};

export default Planet;
