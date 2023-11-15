import 'firebase/firestore';
import 'firebase/auth';
import { useParams } from 'react-router-dom';

const CheckoutCreated = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Order Successfully Created</h2>
      <p>Your order ID is: {id}</p>
    </div>
  );
};

export default CheckoutCreated;