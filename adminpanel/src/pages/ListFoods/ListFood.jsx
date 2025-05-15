import React,{useEffect,useState} from 'react';
import { toast } from 'react-toastify';
import './ListFood.css';
import { getFoodList } from '../../services/foodService';
import { deleteFood } from '../../services/foodService';
import { assets } from '../../assets/assets';
const ListFood = () => {
  const [list,setList] = useState([]);
  const fetchList = async()=> {
    try{
      const data = await getFoodList();
      setList(data);
    }catch{
      toast.error("Error while fetching the food list");
    }
  }
  const removeFood = async(id) => {
    try {
      const success = await deleteFood(id);
      if(success) {
        toast.success("Food item deleted successfully");
        await fetchList();
      }else{
        toast.error("Error occured while deleting the food item");
      }
    } catch{
      toast.error("Error occured while deleting the food item");
    }
  }
  useEffect(() => {
    fetchList();
  },[]);
  return (
    <div
    className="addfood-bg container-fluid py-5"
          style={{
            backgroundImage: `url(${assets.listfoodbackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh'
          }}>
      <div className="container py-5 justify-content-center">
        <div className="col-11 card mx-auto p-4 shadow">
          <h1 className="text-center">List of Foods</h1>
          <table className="table table-bordered table-striped table-hover mt-4">
            <thead className="bg-dark text-white">
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
              list.map((food,index) => {
                return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{food.name}</td>
                  <td>{food.price}.00</td>
                  <td>{food.category}</td>
                  <td>{food.description}</td>
                  <td><img src={food.imageUrl} alt={food.name} style={{width: '100px', height: '100px'}}/></td>
                  <td className="text-danger">
                    <i className="bi bi-x-circle-fill" style={{color: 'red', cursor: 'pointer'}} onClick={() => removeFood(food.id)}></i>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListFood;