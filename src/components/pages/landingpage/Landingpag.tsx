import Navbar from "../../landingpage/Navbar.tsx";
import { Button, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Marquee from "@/components/ui/marquee.tsx";
import { cn } from "@/lib/utils";
// import bullish from "../../../assets/stock.png";
import { AiOutlineStock } from "react-icons/ai";
import { FaLightbulb } from "react-icons/fa6";
import { FaMagnifyingGlassChart } from "react-icons/fa6";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-40 w-36 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const Landingpag = () => {
  return (
    <div>
      <Navbar />
      <div className="main-landingpage">
        <section className="banner-section">
          <div className="text-container">
            <p className="header">
              <span className="highlighter">BullsCatch</span> Trading Floor
            </p>
            <Typography variant="subtitle2" className="secondary-text">
              learning And earning without risk to personal capital
            </Typography>
            <div className="banner-button">
              <Button variant="contained" className="explore-btn">
                Lets's Explore
              </Button>
              <Button startIcon={<PersonIcon />} className="contactbtn">
                Contact
              </Button>
            </div>
          </div>
          {/* <img src="" alt="banner-image"/> */}
          <div className="marqueediv">
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
          </div>
        </section>
        <section className="about-section">
          <Typography variant="h5" className="sectionHeader">
            Our Areas of <span className="subcardheading">Expertise</span>
          </Typography>
          <div className="area-of-content">
            <div className="flex flex-col justify-center items-center content-container">
              {/* <img alt="area-image" src={bullish} className="imagediv content1" /> */}
              <AiOutlineStock className="imagediv content1" />
              <Typography variant="subtitle1">Lorem ipsum dolor</Typography>
              <Typography variant="subtitle2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                facilisi. Sed auctor neque vel lectus auctor, ac ultricies felis
                ullamcorper. Nulla facilisi.
              </Typography>
            </div>
            <div className="flex flex-col justify-center items-center content-container">
              {/* <img alt="area-image" src={bullish} className="imagediv content2" /> */}
              <FaLightbulb className="imagediv content2" />
              <Typography variant="subtitle1">Lorem ipsum dolor</Typography>
              <Typography variant="subtitle2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                facilisi. Sed auctor neque vel lectus auctor, ac ultricies felis
                ullamcorper. Nulla facilisi.
              </Typography>
            </div>
            <div className="flex flex-col justify-center items-center content-container">
              {/* <img alt="area-image" src={bullish} className="imagediv content3" /> */}
              <FaMagnifyingGlassChart className="imagediv content3" />
              <Typography variant="subtitle1">Lorem ipsum dolor</Typography>
              <Typography variant="subtitle2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                facilisi. Sed auctor neque vel lectus auctor, ac ultricies felis
                ullamcorper. Nulla facilisi.
              </Typography>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landingpag;
