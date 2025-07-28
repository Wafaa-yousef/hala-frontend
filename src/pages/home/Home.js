import './home.css'

export default function Home() {
  return (
    <>
      <div className="home-container">
        <img src="/hala-company.jpg" className="image" alt="hala"/>
       <h1 style={{color:"#1b8dc2ff"}} >شركة هلا لخدمات الإمدادات المساندة  </h1>
        <img src="/logo.png" alt="hala-logo" className="hala-logo"/>
        <h1 style={{color:"#1b8dc2ff"}} >Hala supply Chain Services</h1>
        <p style={{color:"#0a368fff"}}>Calculate quotes for storage space across Saudi warehouse locations.</p>
      </div>
    </>
  );
}
