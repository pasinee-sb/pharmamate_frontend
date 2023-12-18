import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Article.css";
import ArticleImage from "./Article.png";

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
          <div className="d-flex " key={index}>
            {chunk.map((article, articleIndex) => (
              <div
                class="card carousel-card flex-grow-1 me-1"
                key={articleIndex}
              >
                <div class="card-body">
                  {article.urlToImage ? (
                    <div
                      className="article-image"
                      style={{ backgroundImage: `url(${article.urlToImage})` }}
                      alt={article.title}
                    ></div>
                  ) : (
                    <div
                      className="article-image"
                      style={{ backgroundImage: `url(${ArticleImage})` }}
                      alt={article.title}
                    ></div>
                  )}
                  <h5 class="card-title">{article.title}</h5>

                  <p class="card-text">{article.description}</p>
                  <a
                    class="btn btn-primary"
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Articles;
