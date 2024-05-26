import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  CapitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    // console.log("Hello I am a constructor from News Component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.CapitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async UpdateNews() {
    try {
      this.setState({ loading: true });
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f17145a04d384c05b60def42cff70973&page=${this.state.page}&pageSize=${this.props.pageSize}`
      );
      //now data ke json a convert korbo
      const data = await res.json();
      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
        loading: false,
      });
    } catch (e) {
      console.log("something is not working");
    }
  }

  // componentDidMount akta life cycle method, ata nicher randar run hobar pore run hobe
  async componentDidMount() {
    this.UpdateNews();
  }

  // //&pageSize=20 means every page a 20 ta kore content show korbe(news api theke)
  // handlePrevClick = async () => {
  //   console.log("Previous");

  //   this.setState({ page: this.state.page - 1 });
  //   this.UpdateNews();
  // };

  // handleNextClick = async () => {
  //   console.log("Next");

  //   this.setState({ page: this.state.page + 1 });
  //   this.UpdateNews();
  // };

  fetchMoreData = async() => {
     
    this.setState({page: this.state.page + 1})
    try {
      // this.setState({ loading: true });
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f17145a04d384c05b60def42cff70973&page=${this.state.page}&pageSize=${this.props.pageSize}`
      );
      //now data ke json a convert korbo
      const data = await res.json();
      this.setState({
        articles: this.state.articles.concat(data.articles),
        totalResults: data.totalResults,
        loading: false,
      });
    } catch (e) {
      console.log("something is not working");
    }

  };



  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey - Top {this.CapitalizeFirstLetter(this.props.category)}{" "}
          Headline
        </h1>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          {/* if this.state.loading is true then show the loading */}
          {/* {this.state.loading && <Spinner/>} */}

          <div className="container">
          <div className="row">
            {/* !this.state.loading && aita niche theke kete dilam karon akhn infinity scroll banabo */}
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>

        






        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Prev
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}


      </div>
    );
  }
}

export default News;
