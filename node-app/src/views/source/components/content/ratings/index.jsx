class ArticleRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingComment: {}
    };
    this.getRatingComment = this.getRatingComment.bind(this);
    this.setRating = this.setRating.bind(this);
    this.submitRating = this.submitRating.bind(this);
    this.getRatingComment();
    this.setRating();
  }
  componentDidMount(){
    //this.submitRating();
  }
  getRatingComment() {
    this.state.ratingComment = {
      commentCount: 1,
      commentDetails: [
        {
          commentId: 2,
          commentText: "string",
          email: "string",
          updatedDate: "2020-08-17T14:14:16.018Z",
          userName: "string",
        },
      ],
      ratingAverage: 3,
      ratingCount: 1,
      ratingExist: "true"
    };
  }
  setRating() {
    this.state.noOfRatings = this.state.ratingComment.ratingCount;
    this.state.aveRatings = this.state.ratingComment.ratingAverage;
  }
  submitRating(i,event){
    this.state.noOfRatings=this.state.noOfRatings+1;
    this.state.aveRatings=Math.round((this.state.aveRatings+i)/this.state.noOfRatings);
    console.log(this.state.noOfRatings,this.state.aveRatings);
    $('.rating-value').val(this.state.aveRatings);
    $('.no-of-rating .val').text(this.state.noOfRatings);
  }
  render() {
    return (
      <div class="rating-check">
        {this.state.ratingComment.ratingExist=='true' && (
          <div class="rating-wrapper">
            <p class="rate-this"></p>
            <div class="star-rating">
              <span class="fa fa-star" data-rating="1" onClick={this.submitRating.bind(this,1)}></span>
              <span class="fa fa-star" data-rating="2" onClick={this.submitRating.bind(this,2)}></span>
              <span class="fa fa-star" data-rating="3" onClick={this.submitRating.bind(this,3)}></span>
              <span class="fa fa-star" data-rating="4" onClick={this.submitRating.bind(this,4)}></span>
              <span class="fa fa-star" data-rating="5" onClick={this.submitRating.bind(this,5)}></span>
              <input type="hidden" name="rating-value" class="rating-value" value={`${this.state.aveRatings}`} />
              <span class="no-of-rating">(<span class="val">{this.state.noOfRatings}</span>)</span>
            </div>
          </div>
        )}
        </div>
    );
  }
}
reactComponents["article-ratings"] = ArticleRatings;
