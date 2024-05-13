import { useEffect, useState } from 'react';
import './App.css';
import LoaderPage from './LoaderPage';
import Nutrition from './Nutrition';
import Swal from 'sweetalert2';

function App() {
  const [stateLoader, setStateLoader] = useState(false);
  const [mySearch, setMySearch] = useState('');
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [name, setName] = useState('');
  
  const fetchData = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=758eb2d5&app_key=bf9b2d7d44c9253af9814752446a4d7e%09`, {
       method: 'POST',
       headers: {
         'accept': 'application/json',
         'Content-Type': 'application/json;charset=UTF-8 '
      },
        body: JSON.stringify({ ingr: ingr })
})
    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);    
      setName(wordSubmitted);
    }
    else {
      setStateLoader(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingredients entered incorrectly!"
      });
      setName('')
    }      
  }  

  const myRecipeSeach = (e) => {
    setMySearch(e.target.value);

  }

  const finalSearch = (e) => {
    e.preventDefault();
    if(mySearch === '') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter ingredients!"
      });
       
    }
    else (
      setWordSubmitted(mySearch)
      
    )  
    setMySearch('');
    setMyNutrition()
  }
  
  useEffect(() => {
    if(wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])

  return (    
    <div className='box'>
      {stateLoader && <LoaderPage />}
      <div className='container'>
          <h1> Nutrition Analysis</h1>
      </div>
      <form className='container' onSubmit={finalSearch}>
        <input placeholder='Search' type="text" value={mySearch}
        onChange={myRecipeSeach}/>
        
        <button className='btn' onClick={finalSearch}>Search</button>
      </form>
      <div className='container'>
          <h2>{name}</h2>
      </div>
      <div className='container'>
        {
          myNutrition && <p>{myNutrition.calories} kcal</p>
        }
        </div>
        <div className='nutrients'>
        {
          myNutrition && Object.values(myNutrition.totalNutrients).map(({label, quantity, unit}, index) => 
        <Nutrition key={index}
        label={label}
        quantity={quantity}
        unit={unit}
        />)
        }
      </div>
    </div>
  );
}

export default App;
