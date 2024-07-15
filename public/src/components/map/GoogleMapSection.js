import map from '../../assets/gauteng.jpg'
const GoogleMapSection = () => {
  return (
    <div>
      {/* Replace the <h1> element with the image component */}
      <img
        src={map} // Replace "map" with the variable containing the path to your map image
        alt="Map" // Provide an appropriate alt text for accessibility
        className="w-full h-auto md:w-96 w-100 md:h-72" // Add classes for responsive sizing
      />
    </div>
  );
};

export default GoogleMapSection;
