import './App.css';
import StarRating from './components/StarRating'


const App = () => {
  return (
    <div className='content'>
      <StarRating starCount={10}/>
    </div>
  )
}

export default App