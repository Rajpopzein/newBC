import Footer from "@/components/landingpage/Footer";
import Navbar from "@/components/landingpage/Navbar";
import { Card, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = "lRdPPDC8shhIzfXeiot0b2ikwmou2I3rJ78xLiX-nwM"; // Replace with your API key

const BASE_URL = "https://api.unsplash.com/search/photos";

const GalleryPage: React.FC = () => {
  const [galleryData, setGalleryData] = useState<any[]>([]);

  useEffect(() => {
    const fetchImages = async (query: string) => {
      try {
        const response = await axios.get(
          `${BASE_URL}?query=${query}&client_id=${API_KEY}`
        );
        setGalleryData(response.data.results);
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    fetchImages("nature");
  }, []);

  return (
    <div>
      <Navbar index={2} />
      <div className="Gallary-main">
        <Typography variant="h4" className="font-bold header">
          Photo Gallery
        </Typography>
        <div className="galleryImages">
          {galleryData &&
            galleryData.map((data, index) => (
              <Card className="galleryItem">
                <img
                  src={data.urls.small}
                  key={index}
                  alt={data.alt_description}
                  className="galleryImage"
                />
              </Card>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPage;
