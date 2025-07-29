import './home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-box">
        <img src="/hala-company.jpg" alt="hala" className="home-image" />
        <div className="home-text">
          <img src="/logo.png" alt="hala logo" className="hala-logo" />
          <h1>شركة هلا لخدمات الإمدادات المساندة</h1>
          <h1>Hala Supply Chain Services</h1>
          <p>
            Calculate quotes for storage space across Saudi warehouse locations.
          </p>
        </div>
      </div>
    </div>
  );
}
