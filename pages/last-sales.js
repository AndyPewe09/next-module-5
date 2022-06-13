import { useEffect, useState } from "react";
import useSWR from 'swr';



function LastSalesPage() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const [sales, setSales] = useState();
    // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    'https://nextjs-course-c54d2-default-rtdb.firebaseio.com/sales.json',fetcher
  )
  useEffect(() => {
    console.log(data)
    if(data){
      const transformedSales = []

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales)
    }
  }, [data])
    // useEffect(() => {
    //   setIsLoading(true)
    //   fetch('https://nextjs-course-c54d2-default-rtdb.firebaseio.com/sales.json')
    //     .then((response) => response.json())
    //     .then(data => {
    //       const transformedSales = [];

    //       for (const key in data) {
    //         transformedSales.push({
    //           id: key,
    //           username: data[key].username,
    //           volume: data[key].volume,
    //         });
    //       }

    //       setSales(transformedSales);
    //       setIsLoading(false);
    //     });
    // }, []);

  // if (error) {
  //   return <p>Failed to load</p>;
  // }

  if (error) {
    return <p>Failed load data</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export default LastSalesPage;
