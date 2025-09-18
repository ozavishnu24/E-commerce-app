import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

// Retry logic function
const fetchWithRetry = async (requestFn, retries = 2, delay = 1000) => {
  try {
    return await requestFn();
  } catch (error) {
    if (retries > 0 && (error.code === 'ECONNABORTED' || error.code === 'ECONNRESET')) {
      console.log(`Retrying... attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(requestFn, retries - 1, delay * 1.5); // Exponential backoff
    }
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await fetchWithRetry(() => api.get('/products'));
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return fallback data if API fails
    return getFallbackProducts();
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetchWithRetry(() => api.get(`/products/${id}`));
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetchWithRetry(() => api.get('/products/categories'));
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return fallback categories if API fails
    return getFallbackCategories();
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetchWithRetry(() => api.get(`/products/category/${category}`));
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    // Return fallback products filtered by category if API fails
    const fallbackProducts = getFallbackProducts();
    return fallbackProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }
};

export default api;

// Fallback data for development/demo purposes
export const getFallbackProducts = () => {
  return [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
        rate: 3.9,
        count: 120
      }
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: 22.3,
      description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: {
        rate: 4.1,
        count: 259
      }
    },
    {
      id: 3,
      title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695,
      description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      rating: {
        rate: 4.5,
        count: 400
      }
    },
    {
      id: 4,
      title: "Solid Gold Petite Micropave",
      price: 168,
      description: "Sleek and sophisticated, these petite micropave earrings are perfect for everyday wear. Crafted in solid 14k gold, they feature delicate diamonds that add a touch of sparkle.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
      rating: {
        rate: 4.0,
        count: 100
      }
    },
    {
      id: 5,
      title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
      price: 64,
      description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user's hardware configuration and operating system",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      rating: {
        rate: 3.8,
        count: 200
      }
    },
    {
      id: 6,
      title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
      price: 109,
      description: "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5\" hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (based on internal testing; performance may vary depending upon drive capacity, host device, OS and application.)",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
      rating: {
        rate: 4.5,
        count: 300
      }
    },
    {
      id: 7,
      title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
      price: 56.99,
      description: "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Suitable for camping, hiking, skiing, snowboarding and winter sports.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
      rating: {
        rate: 3.5,
        count: 150
      }
    },
    {
      id: 8,
      title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
      price: 29.95,
      description: "100% POLYURETHANE(shell) 100% POLYESTER(lining) 100% POLYESTER(hood) Faux leather jacket with removable hood. Front zipper closure. Side zipper pockets. Adjustable belt with buckle. Notched collar. Ribbed cuffs and hem. Solid color.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
      rating: {
        rate: 3.0,
        count: 100
      }
    }
  ];
};

export const getFallbackCategories = () => {
  return ["electronics", "jewelery", "men's clothing", "women's clothing"];
};