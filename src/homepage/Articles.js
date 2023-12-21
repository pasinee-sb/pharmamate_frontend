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
      </div>
    );
  }
  // non -responsive carousel
  //create array for carousel display with limit of 3 articles at a time
  const articleChunks = [];
  const displayLimit = 3;

  for (let i = 0; i < articles.length; i += displayLimit) {
    articleChunks.push(
      articles
        // .filter((article) => article.title !== "[Removed]") //filter out removed articles
        .slice(i, i + displayLimit)
    );
  }

  // function BootstrapCarousel({ articles }) {
  //   return (
  //     <div
  //       id="articleCarousel"
  //       className="carousel slide"
  //       data-bs-ride="carousel"
  //     >
  //       <div className="carousel-inner">
  //         {articleChunks.map((chunk, index) => (
  //           <div
  //             className={`carousel-item ${index === 0 ? "active" : ""}`}
  //             key={index}
  //           >
  //             <div className="row">
  //               {chunk.map((article, articleIndex) => (
  //                 <div className="col-lg-4 " key={articleIndex}>
  //                   {" "}
  //                   {/* 3 cards per row on large screens */}
  //                   <div className="card  h-100 custom-card-article ">
  //                     <div className="card-body">
  //                       <div
  //                         style={{
  //                           backgroundImage: `url(${article.urlToImage})`,
  //                           backgroundSize: "cover",
  //                           backgroundPosition: "center",
  //                           height: "200px", // Set a fixed height or use '100%' for full card height
  //                         }}
  //                       ></div>
  //                       <h5 className="card-title">{article.title}</h5>
  //                       <p className="card-text">{article.description}</p>
  //                       <div className="card-footer ">
  //                         <p>{article.source.name}</p>
  //                         <a
  //                           className="btn btn-primary custom-tag align-self-end"
  //                           href={article.url}
  //                           target="_blank"
  //                           rel="noopener noreferrer"
  //                         >
  //                           <i class="fa-solid fa-up-right-from-square"></i>
  //                         </a>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //       <button
  //         className="carousel-control-prev"
  //         type="button"
  //         data-bs-target="#articleCarousel"
  //         data-bs-slide="prev"
  //       >
  //         <span
  //           className="carousel-control-prev-icon"
  //           aria-hidden="true"
  //         ></span>
  //         <span className="visually-hidden">Previous</span>
  //       </button>
  //       <button
  //         className="carousel-control-next"
  //         type="button"
  //         data-bs-target="#articleCarousel"
  //         data-bs-slide="next"
  //       >
  //         <span
  //           className="carousel-control-next-icon"
  //           aria-hidden="true"
  //         ></span>
  //         <span className="visually-hidden">Next</span>
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div>
      <h2 className="display-6">Today's health articles</h2>
      {/* <BootstrapCarousel articles={articles} /> */}
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
      {/* // non-responsive carousel  */}
      {/* <Carousel showThumbs={false}>
        {articleChunks.map((chunk, index) => (
          <div className="d-flex " key={index}>
            {chunk.map((article, articleIndex) => (
              <div
                className="card carousel-card flex-grow-1 me-2 custom-card-article"
                key={articleIndex}
              >
                <div className="card-body flex-grow-1">
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
                  <h5 className="card-title mt-3">{article.title}</h5>
                </div>
                <div className="card-footer ">
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
            ))}
          </div>
        ))}
      </Carousel> */}
    </div>
  );
}

export default Articles;
