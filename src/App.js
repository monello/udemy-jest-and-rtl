import { Container } from 'react-bootstrap';
import { OrderDetailsProvider } from './contexts/OrderDetails.jsx';
import OrderEntry from './pages/entry/OrderEntry.jsx';

const App = () => {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry pages nee provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* confirmation page does not nee provider */}
    </Container>
  );
};

export default App;
