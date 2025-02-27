"use client";

import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { getClimateNews } from "../../actions/notification";
import { Article } from "../../types/notification";

const WeatherNotification = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await getClimateNews();
      if (data) {
        setArticles(data.articles);
      } else {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (articles.length > 0) {
        const randomArticle =
          articles[Math.floor(Math.random() * articles.length)];
        toast(
          <div>
            <h4>{randomArticle.title}</h4>
            <p>{randomArticle.description}</p>
          </div>
        );
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [articles]);

  return <Toaster />;
};

export default WeatherNotification;
