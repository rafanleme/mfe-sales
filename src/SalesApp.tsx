import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { CartApi, Product } from '@mfe/contracts';

function useRemoteCartApi() {
  const [api, setApi] = useState<CartApi | null>(null);
  useEffect(() => {
    let mounted = true;
    import('host/cartApi').then((m) => {
      if (mounted) setApi(m.default ?? (m as any).cartApi);
    });
    return () => { mounted = false; };
  }, []);
  return api;
}

const products: Product[] = [
  { id: 'p1', name: 'Teclado Mecânico', price: 299.9 },
  { id: 'p2', name: 'Mouse Gamer', price: 159.9 },
  { id: 'p3', name: 'Headset', price: 249.9 },
  { id: 'p4', name: 'Webcam Full HD', price: 199.9 },
];

function Catalog() {
  const api = useRemoteCartApi();

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>🧩 MFE Sales</h2>
      <p className="muted">Catálogo vindo do microfrontend <code>sales</code>.</p>
      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card" data-testid="product-card">
            <strong data-testid="product-title">{p.name}</strong>
            <div className="muted">R$ {p.price.toFixed(2)}</div>
            <button data-testid="add-to-cart" className="btn" style={{ marginTop:12 }} onClick={() => api?.addToCart(p)} disabled={!api}>
              {api ? 'Adicionar ao carrinho' : 'Carregando API...'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SalesApp() {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
    </Routes>
  );
}
