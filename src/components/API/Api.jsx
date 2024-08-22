import { useEffect, useState } from "react";

const API_KEY = "kYWjEghcdP1iCB4luxa0RkV3I5lcYu6-lpsu8GP1ReM";
const url = `https://api.unsplash.com/photos/?client_id=${API_KEY}`;

const UnsplashGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchPhotos, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <p>
        <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
          <circle
            className="pl__ring pl__ring--a"
            cx="120"
            cy="120"
            r="105"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 660"
            strokeDashoffset="-330"
            strokeLinecap="round"
          ></circle>
          <circle
            className="pl__ring pl__ring--b"
            cx="120"
            cy="120"
            r="35"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 220"
            strokeDashoffset="-110"
            strokeLinecap="round"
          ></circle>
          <circle
            className="pl__ring pl__ring--c"
            cx="85"
            cy="120"
            r="70"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 440"
            strokeLinecap="round"
          ></circle>
          <circle
            className="pl__ring pl__ring--d"
            cx="155"
            cy="120"
            r="70"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 440"
            strokeLinecap="round"
          ></circle>
        </svg>
        .
      </p>
    );
  if (error) return <p>Error: {error.message}</p>;
  if (photos.length === 0) return <p>No photos available</p>;

  return (
    <div>
      <h1>Unsplash Gallery</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.urls.small}
            alt={photo.alt_description}
            style={{
              margin: "10px",
              width: "200px",
              height: "200px",
              objectFit: "cover",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default UnsplashGallery;
