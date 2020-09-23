/* Rating starts here */
class ArticleRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingComment: {},
    };
    this.getRatingComment = this.getRatingComment.bind(this);
    this.setRating = this.setRating.bind(this);
    this.submitRating = this.submitRating.bind(this);
    this.getRatingComment();
    this.setRating();
  }
  componentDidMount() {
    //this.submitRating();
  }
  getRatingComment() {
    // $.ajax({
    //   type: "GET",
    //   url: hb_base_url + "consumer",
    //   contentType: "application/json",
    //   dataType: "json",
    //   success: function (response) {
    //     console.log(response);
    //   },
    //   error: function (response) {
    //     console.log(response);
    //   },
    // });
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
      ratingExist: "true",
    };
  }
  setRating() {
    this.state.noOfRatings = this.state.ratingComment.ratingCount;
    this.state.aveRatings = this.state.ratingComment.ratingAverage;
  }
  submitRating(i, event) {
    this.state.noOfRatings = this.state.noOfRatings + 1;
    this.state.aveRatings = Math.round(
      (this.state.aveRatings + i) / this.state.noOfRatings
    );
    $(".rating-value").val(this.state.aveRatings);
    $(".no-of-rating .val").text(this.state.noOfRatings);
  }
  render() {
    return (
      <div class="rating-check">
        {this.state.ratingComment.ratingExist == "true" && (
          <div class="rating-wrapper">
            <p class="rate-this">Rate this story</p>
            <div class="star-rating">
              <span
                class="fa fa-star"
                data-rating="1"
                onClick={this.submitRating.bind(this, 1)}
              ></span>
              <span
                class="fa fa-star"
                data-rating="2"
                onClick={this.submitRating.bind(this, 2)}
              ></span>
              <span
                class="fa fa-star"
                data-rating="3"
                onClick={this.submitRating.bind(this, 3)}
              ></span>
              <span
                class="fa fa-star"
                data-rating="4"
                onClick={this.submitRating.bind(this, 4)}
              ></span>
              <span
                class="fa fa-star"
                data-rating="5"
                onClick={this.submitRating.bind(this, 5)}
              ></span>
              <input
                type="hidden"
                name="rating-value"
                class="rating-value"
                value={`${this.state.aveRatings}`}
              />
              <span class="no-of-rating">
                (<span class="val">{this.state.noOfRatings}</span>)
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}
/* Rating ends here */
/* Comments starts here */
class ArticleComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingComment: {},
    };
    this.getRatingComment = this.getRatingComment.bind(this);
    this.setComments = this.setComments.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.getRatingComment();
    this.setComments();
  }
  dateChange(date) {
    let monthName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let d1 = new Date(date);
    let d = d1.getDate();
    let m = d1.getMonth();
    let y = d1.getFullYear();
    return monthName[m] + " " + d + ", " + y;
    // return moment(date).format('MMM DD');
  }
  getRatingComment() {
    this.state.ratingComment = {
      commentCount: 3,
      commentDetails: [
        {
          commentId: 1,
          commentText:
            "This is the first comment ever set. You can add more comments as per your wish.",
          email: "string",
          updatedDate: "2020-08-17T14:14:16.018Z",
          userName: "John Patel",
        },
        {
          commentId: 2,
          commentText: "This is the second comment ever set.Just for testing.",
          email: "string",
          updatedDate: "2020-09-26T14:14:16.018Z",
          userName: "David De",
        },
        {
          commentId: 3,
          commentText: "This is the Third comment ever set.Just for testing.",
          email: "string",
          updatedDate: "2020-07-10T14:14:16.018Z",
          userName: "Karan Breaker",
        },
      ],
      ratingAverage: 3,
      ratingCount: 1,
      ratingExist: "true",
    };
  }
  setComments() {
    this.state.ratingComment.commentDetails.map((value, index) => {
      let cdate = value.updatedDate.split("T")[0];
      cdate = this.dateChange(cdate);
      //console.log(cdate);
      this.state.ratingComment.commentDetails[index].updatedDate = cdate;
    });
  }
  submitComment(i, event) {
    let newCommentVal = $("#commentText").val();
    let newComment = {
      commentId: 4,
      commentText: newCommentVal,
      email: "string",
      updatedDate: "2020-07-10T14:14:16.018Z",
      userName: "Karan Breaker",
    };
    let html =
      `<section class="old-comments">
    <p class="name-time">
      <span class="name">` +
      newComment.userName +
      `</span>
      <span class="time">` +
      newComment.updatedDate +
      `</span>
    </p>
    <p class="desc">` +
      newComment.commentText +
      `</p>
  </section>`;
    this.state.ratingComment.commentDetails.push(newCommentVal);
    $("#commentText").val("");
    $(".comment-count .val").text(4);
    //$('.comment-wrapper')[0].;
    // this.state.noOfRatings=this.state.noOfRatings+1;
    // this.state.aveRatings=Math.round((this.state.aveRatings+i)/this.state.noOfRatings);
    // console.log(this.state.noOfRatings,this.state.aveRatings);
    // $('.rating-value').val(this.state.aveRatings);
    // $('.no-of-rating .val').text(this.state.noOfRatings);
  }
  render() {
    return (
      <div class="comment-check">
        {this.props.showComment == "true" && (
          <div class="comment-wrapper">
            <p class="comment-count">
              Comments(
              <span class="val">{this.state.ratingComment.commentCount}</span>)
            </p>
            <p class="info">
              (When you add a comment your name will be automatically displayed)
            </p>
            <div class="add-comment row col-xs-12">
              <div class="col-sm-7">
                <textarea
                  id="commentText"
                  placeholder="Write your comment"
                ></textarea>
              </div>
              <div class="col-sm-3">
                <button
                  class="submit-comment vertical-middle-align"
                  onClick={this.submitComment.bind(this)}
                >
                  Add comment
                </button>
              </div>
            </div>
            {this.state.ratingComment.commentDetails.map((value, index) => {
              return (
                <section class="old-comments">
                  <p class="name-time">
                    <span class="name">{value.userName}</span>
                    <span class="time">{value.updatedDate}</span>
                  </p>
                  <p class="desc">{value.commentText}</p>
                </section>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
/* Comments end here */
reactComponents["article-ratings"] = ArticleRatings;
reactComponents["article-comments"] = ArticleComments;
