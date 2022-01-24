import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";
import WeatherWidget from "../../src/features/weather/WeatherWidget";
import styles from "../../styles/Weather.module.css";

export default function Weather({ cityData, cities }) {
  const router = useRouter();

  useEffect(() => {
    console.log(cityData);
  }, [cityData]);

  return (
    <div className={styles.container}>
      {Boolean(cityData) && (
        <>
          <Select
            defaultValue={{ value: cityData.value, label: cityData.name }}
            //defaultInputValue={cityData.name}
            onChange={(e) => {
              console.log(e);
              router.push(`/weather/${e.value}`);
            }}
            options={cities}
            //autoFocus
            //hasValue={true}
          />
          <WeatherWidget
            cityName={cityData.name}
            coordinates={cityData.loc.coordinates}
          />
        </>
      )}
    </div>
  );
}

// This function gets called at build time
export const getStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch(`http://${process.env.LOCAL_DOMAIN}/api/cities`);
  const cities = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = cities.map((city) => ({
    params: { cityId: city.value.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This also gets called at build time
export const getStaticProps = async ({ params }) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `http://${process.env.LOCAL_DOMAIN}/api/cities/${params.cityId}`
  );
  const cityData = await res.json();

  if (!cityData) {
    return {
      notFound: true,
    };
  }

  const resCities = await fetch("http://localhost:3000/api/cities");
  const cities = await resCities.json();

  // Pass post data to the page via props
  return { props: { cityData, cities } };
};
