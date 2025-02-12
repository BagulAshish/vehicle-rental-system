import { useNavigate } from 'react-router-dom'
import '../css/Home.css'

function Home() {
  const navigate = useNavigate()

  
  const handlePageClick = () => {
    navigate('/login')
  }

  return (
    <div
      className='home-container d-flex justify-content-center align-items-center vh-100'
      onClick={handlePageClick} 
    >
      <div className='text-center'>
        <h1 className='mb-4 text-white'>Welcome to Wheels on Demand</h1>
      </div>
    </div>
  )
}

export default Home
