import {useState} from 'react';
import './quoteForm.css';

import axios from 'axios'
 
export default function QuoteForm(){
  const [warehouse, setWarehouse] = useState('');
  const [storageType, setStorageType] = useState('dry');
  const [pallets, setPallets] = useState(0);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState('');
  const [available,setAvailable]=useState('0')
  const [availablePallets,setAvailablePallets]=useState('false')


const  handleSubmit= async(e)=>{
    e.preventDefault();
    setError('')
    setQuote(null);
    setAvailable(false)
    setAvailablePallets('')
    
    
    try{
     const apiURL = process.env.REACT_APP_API_URL || "http://localhost:5000";
     const  res=await axios.post(`${apiURL}/api/customer/quote`,{
             warehouse,
        storageType,
        pallets: Number(pallets)

        } )
         
        const newQuote = res.data.quote;
       console.log(newQuote)
    setQuote(newQuote);
    setAvailablePallets(newQuote.availablePallets)
  if (newQuote.availablePallets>=pallets )setAvailable(true)
      
    
    
}
    
    catch(err){
        setError(err.response?.data?.error || 'Failed to calculate quote');

    }
}

return (
  <div className="quote-form-container">
    <form  onSubmit={handleSubmit}>
     <label>Warehouse:</label>
<select
  value={warehouse}
  onChange={(e) => {setWarehouse(e.target.value) ;}
  
  }
  required
 
>
  <option value="" >-select warehouse-</option>
  <option value="TYBA">TYBA</option>
  <option value="Tuwaiq">Tuwaiq</option>
  <option value="Modon 3B">Modon 3B</option>
  <option value="JUB 2">JUB 2</option>
  <option value="JUB 1">JUB 1</option>
  <option value="JEDDAH">JEDDAH</option>
  <option value="DMM PORT">DMM PORT</option>
</select>


      <label>Storage Type:</label>
      <select
        value={storageType}
        onChange={(e) => setStorageType(e.target.value)}
      >
        <option value="dry">Dry</option>
        <option value="temp-controlled">Temp-Controlled</option>
      </select>

      <label>Number of Pallets:</label>
      <input
        type="number"
        dir="ltr"
         min={0}
         
        value={pallets}
        onChange={(e) => setPallets(e.target.value)}
        required
      />

      <button type="submit">Get Quote</button>
    </form>
    
    { quote?(available?(
  <div style={{ marginTop: '20px' }}>
    <h3>Quote Result</h3>
    <p> Base Price: {quote.basePrice}</p>
    <p> Total Price: {quote.totalPrice}</p>
    
    
    {quote.surchargeApplied?(
      <p style={{ color: 'orange' }}>⚠️ Surcharge Applied (15%)</p>
    ):<p style={{ color: 'green' }}>No surcharge Applied!</p> }
  </div> ):
  (<p style={{ color: 'red' }} >Available Pallets is just {Math.max(availablePallets,0) }</p>)):<p></p>}
 
  

    
    
    {(error && <p className="error-message">{error}</p>)}
  </div>
);}
