import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./Article.css";
import ArticleImage from "./Article.png";
import LoadingSpinner from "../common/LoadingSpinner";
import PharmamateAPI from "../api/api";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHomepage = async () => {
    setIsLoading(true);
    try {
      const data = await PharmamateAPI.getHomePage();
      const filteredArticles = (data.articles || []).filter(
        (article) => article.title !== "[Removed]"
      );
      setArticles(filteredArticles);
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
    return (
      <div>
        <LoadingSpinner />
        <i class="fa-solid fa-newspaper fa-2xl"></i>
      </div>
    );
  }

  //create array for carousel display with limit of 3 articles at a time
  const articleChunks = [];
  const displayLimit = 3;

  for (let i = 0; i < articles.length; i += displayLimit) {
    articleChunks.push(articles.slice(i, i + displayLimit));
  }

  return (
    <div>
      <h2 className="display-6">Today's health articles</h2>

      <Carousel showThumbs={false}>
        {articleChunks.map((chunk, index) => (
          <div className="row" key={index}>
            {chunk.map((article, articleIndex) => (
              <div className="col-12 col-md-6 col-lg-4" key={articleIndex}>
                <div className="card carousel-card custom-card-article mt-3 mb-3">
                  <div className="card-body flex-grow-1">
                    {article.urlToImage ? (
                      <div
                        className="article-image"
                        style={{
                          backgroundImage: `url(${article.urlToImage})`,
                        }}
                        alt={article.title}
                      ></div>
                    ) : (
                      <div
                        className="article-image"
                        style={{ backgroundImage: `url(${ArticleImage})` }}
                        alt={article.title}
                      ></div>
                    )}
                    <h5 className="card-title mt-3">{article.title}</h5>
                  </div>

                  <div className="card-footer mt-auto">
                    <p>{article.source.name}</p>
                    <a
                      className="btn btn-primary custom-tag align-self-end"
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-solid fa-up-right-from-square"></i>
                    </a>
                  </div>
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
