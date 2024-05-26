import React, { Component } from 'react'



export class NewsItem extends Component{
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1', color:'white'}}> {source}</span>
            <img src={imageUrl} className="card-img-top" alt="This link isn't Found.!"/>
            <div className="card-body">
                <h5 className="card-title">{title} </h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary">By {author? author: "Unknown"} at {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                {/* a er vitore target="_black" korle new tab a link open hobe */}
            </div>
        </div>
      </div>
    )
  }
}


export default NewsItem