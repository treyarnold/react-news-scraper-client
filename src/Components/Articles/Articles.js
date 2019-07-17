import React, { useState, useEffect, } from "react";
import axios from "axios";

import Article from "./Article/Article";
import classes from "./Articles.module.css";

const db = process.env.REACT_APP_DB;
const scrape = process.env.REACT_APP_SCRAPE;

const Articles = (props) => {
  const [articles, setArticles] = useState({
    articleData: [],
    hasArticles: false,
    clear: props.clear,
    loading: true
  });

  if (articles.clear) {
    axios.delete(db).then(() => {
      axios.get(scrape).then((response) => {
        getArticles();
      });
    })
  }

  const getArticles = () => {
    axios.get(db).then((result) => {
      if (result.data.length) {
        setArticles({
          articleData: result.data,
          hasArticles: true,
          clear: false,
          loading: false,
        })
      }
    })
  }

  useEffect(() => {
    if (!articles.hasArticles && !articles.clear) {
      getArticles();
    }
  }, [articles])

  let content = <div className={classes.loader}>Loading...</div>;
  if (articles.hasArticles) {
    content = articles.articleData.map((article) => (
      <Article key={article._id} data={article} />
    ))
  }

  return (
    <main className={classes.main}>
      {content}
    </main>
  )
}

export default Articles;