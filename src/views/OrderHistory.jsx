import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Suponiendo que tienes un endpoint para obtener el historial de pedidos
    fetch('/api/orders', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => setOrders(data.orders));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Historial de Pedidos</h2>
      {orders.length === 0 ? (
        <p>No tienes pedidos en tu historial.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              Pedido #{order.id} - Total: ${order.total}
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>{item.name} - {item.quantity}x</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
