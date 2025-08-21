import { useParams } from 'react-router-dom';
import { getProductById } from '../api/products';
import { useCartStore } from '../store/cartStore';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>)
  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <img src={product.image} alt={product.title} className="w-full h-64 object-contain" />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600 my-2">${product.price}</p>
          <p className="my-4">{product.description}</p>
          <button
            onClick={() => addToCart({
              productId: product.id,
              title: product.title,
              price: product.price,
              image: product.image
            })}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}