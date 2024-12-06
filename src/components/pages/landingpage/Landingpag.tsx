import Navbar from "../../landingpage/Navbar.tsx";
import { Button, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Marquee from "@/components/ui/marquee.tsx";
import { cn } from "@/lib/utils";
import bullish from "../../../assets/bullish.png";
import testimonial from "../../../assets/testimonial-image.jpg";
import { AiOutlineStock } from "react-icons/ai";
import { FaLightbulb } from "react-icons/fa6";
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import SessionLayout from "@/components/landingpage/session/SessionLayout.tsx";
import Footer from "@/components/landingpage/Footer.tsx";
// import OrbitingCircles from "@/components/ui/orbiting-circles";

const reviews = [
  {
    name: "Anitha",
    username: "Funded Trader at BullsCatch",
    body: "BullsCatch has elevated my trading in the Indian market. With their tools, capital, and mentorship, I’ve refined my strategies and improved my performance. They provide everything a trader needs to succeed.”",
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

const firstRow = reviews.slice(0, reviews.length);
const secondRow = reviews.slice(0, reviews.length);

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
        "relative h-45 w-70 cursor-pointer overflow-hidden rounded-xl border p-4",
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
    <div style={{ height: "100svh" }}>
      <Navbar index={1}/>
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
              <Button
                startIcon={<PersonIcon />}
                variant="outlined"
                className="contactbtn"
              >
                Contact Us
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
          <SessionLayout heading=" Our Areas of" spanHeader="Expertise">
            <div className="area-of-content">
              <div className="flex flex-col justify-center items-center content-container">
                <AiOutlineStock className="imagediv content1" />
                <Typography variant="subtitle1">
                  Proprietary Day Trader
                </Typography>
                <Typography variant="subtitle2">
                  At BullsCatch, our traders use firm capital to execute
                  high-frequency, intraday trades, leveraging advanced
                  technology and data to maximize market opportunities.
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-center content-container">
                <FaLightbulb className="imagediv content2" />
                <Typography variant="subtitle1">MFT/HFT Trading</Typography>
                <Typography variant="subtitle2">
                  Utilizing advanced algorithms to execute trades in
                  milliseconds, capitalizing on micro-market inefficiencies.
                  With ultra-low-latency execution and real-time data, our
                  strategies ensure precision and scalability. BullsCatch
                  empowers traders to stay ahead in the fast-paced Indian
                  markets.
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-center content-container">
                <FaMagnifyingGlassChart className="imagediv content3" />
                <Typography variant="subtitle1">
                  Tick-by-Tick Analysis
                </Typography>
                <Typography variant="subtitle2">
                  At BullsCatch, our Advanced Backtesting Engine delivers
                  accurate tick-by-tick data analysis, enabling traders to
                  fine-tune strategies with real market precision. This ensures
                  robust performance before live trading.
                </Typography>
              </div>
            </div>
          </SessionLayout>
        </section>
        <section className="about-section section-2">
          <SessionLayout>
            <div className="section2-image">
              <img alt="bulls image" src={bullish} />
            </div>
            <div className="flex flex-col ">
              <Typography variant="h4" className="header">
                Potential Market Access …
              </Typography>
              <Typography variant="subtitle1" className="subtitlesection2">
                At BullsCatch, we offer access to India’s financial markets,
                enabling our traders to capitalize on opportunities in major
                exchanges like NSE and BSE. Our platform allows traders to
                engage in high-volume, liquid markets, taking advantage of
                market-moving news, economic developments, and sector-specific
                trends. Whether trading in equities, derivatives, or options,
                our traders navigate the Indian market with precision and
                agility, leveraging real-time data and advanced strategies to
                stay ahead.
              </Typography>
            </div>
          </SessionLayout>
        </section>
        <section className="about-section section-3 flex relative justify-center items-center gap-[15%]">
          <div className="w-[100%] section3">
            <Typography variant="h4" className="header">
              Financial Freedom could be just one phonecall away…
            </Typography>
            <Typography
              variant="subtitle1"
              className="text-left .subtitlesection3"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              magna ligula, rutrum in venenatis aliquet, congue gravida lorem.
              Aliquam convallis orci a odio imperdiet, nec pharetra odio porta.
              Aenean quis tincidunt elit. Donec feugiat, justo interdum
              tincidunt efficitur, tortor diam volutpat libero, sed accumsan
              erat mauris ac elit. Donec ultricies nisi quis leo aliquam
              faucibus quis et metus. Donec eget viverra arcu. Duis feugiat diam
              dolor, sed placerat nibh condimentum ac. Aliquam in rutrum ante.
            </Typography>
          </div>
          <div>
            <div className="imagecircular">
              <img alt="section3img" src={testimonial} />
            </div>
          </div>
        </section>
        <section>
          <Footer/>
        </section>
      </div>
    </div>
  );
};

export default Landingpag;
