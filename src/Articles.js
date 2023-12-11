import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const displayLimit = 3;
  const fetchHomepage = async (url = "http://localhost:3001/") => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHomepage();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const articleChunks = [];
  for (let i = 0; i < articles.length; i += displayLimit) {
    articleChunks.push(articles.slice(i, i + displayLimit));
  }

  return (
    <div>
      <h2>Today's health articles</h2>
      <Carousel showThumbs={false}>
        {articleChunks.map((chunk, index) => (
          <div key={index}>
            {chunk.map((article, articleIndex) => (
              <div key={articleIndex}>
                <h3>{article.title}</h3>
                {article.urlToImage && (
                  <img src={article.urlToImage} alt={article.title} />
                )}
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Articles;
