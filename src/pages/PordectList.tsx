import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg">
          <img src={product.image} alt={product.title} className="h-40 object-contain mx-auto" />
          <h3 className="font-semibold mt-2">{product.title}</h3>
          <p className="text-gray-600">${product.price}</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            عرض التفاصيل
          </button>
        </div>
      ))}
    </div>
  );
}