/* Rating starts here */
class ArticleRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentCount: 0,
      commentDetails: [],
      ratingAverage: 0,
      ratingCount: 0,
      ratingExist: false,
      artcilePath:"/en/ca/home",
      siteName: "ca",
      userACF2Id: "yq12",
      apiCall:{}
    };
    this.getRatingComment = this.getRatingComment.bind(this);
    this.submitRating = this.submitRating.bind(this);
    this.getRatingComment();
  }
  componentDidMount() {
    //this.submitRating();
  }
  getRatingComment() {
    let data1 = {
      articlePath: this.state.artcilePath,
      siteName: this.state.siteName,
      userACF2Id: this.state.userACF2Id,
    };
    $.ajax({
      type: "GET",
      url: "/source-services/selectAll",
      dataType: "json",
      data: data1,
      success: (res) => {
        this.setState({
          commentCount: res.commentCount,
          commentDetails: res.commentDetails,
          ratingAverage: res.ratingAverage,
          ratingCount: res.ratingCount,
          ratingExist: res.ratingExist,
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  submitRating(i, event) {
    let data1={
        articlePath: this.state.artcilePath,
        siteName: this.state.siteName,
        userACF2Id: this.state.userACF2Id,
        rating: i
    }
    $.ajax({
      type: "POST",
      url: "/source-services/addRating",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(data1),
      success: (res) => {
        console.log(res);
        this.setState({
          ratingAverage: res.ratingAverage,
          ratingCount: this.state.ratingCount+1
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
    $(".rating-value").val(this.state.ratingAverage);
    $(".no-of-rating .val").text(this.state.ratingCount);
  }
  render() {
    return (
      <div class="rating-check">
        {this.state.ratingExist == true && (
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
                value={`${this.state.ratingAverage}`}
              />
              <span class="no-of-rating">
                (<span class="val">{this.state.ratingCount}</span>)
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
      commentCount: 0,
      commentDetails: [
        {
          commentId: 1,
          commentText:
            "This is the first comment ever set. You can add more comments as per your wish.",
          email: "string",
          updatedDate: "2020-08-17T14:14:16.018Z",
          userName: "John Patel",
        }
      ],
      ratingAverage: 0,
      ratingCount: 0,
      ratingExist: false,
      artcilePath:"/en/ca/home",
      siteName: "ca",
      userACF2Id: "yq12",
      userName: "David jackson",
      email: "john@gmail.com",
      apiCall:{}
    };
    this.getRatingComment = this.getRatingComment.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.dateChange=this.dateChange.bind(this);
    this.dateLoad=this.dateLoad.bind(this);
    this.deleteComment=this.deleteComment.bind(this);
    this.getRatingComment();
  }
  componentDidMount(){
    //this.dateLoad();
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
    let data1 = {
      articlePath: this.state.artcilePath,
      siteName: this.state.siteName,
      userACF2Id: this.state.userACF2Id,
    };
    $.ajax({
      type: "GET",
      url: "/source-services/selectAll",
      dataType: "json",
      data: data1,
      success: (res) => {
        console.log(res.commentDetails);
        this.setState({
          commentCount: res.commentCount,
          commentDetails: res.commentDetails,
          ratingAverage: res.ratingAverage,
          ratingCount: res.ratingCount,
          ratingExist: res.ratingExist,
        });
        this.dateLoad();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  dateLoad(){
    let commentArray=this.state.commentDetails;
    commentArray.map((value, index) => {
      if(value){
        let cdate = value.updatedDate.split("T")[0];
        cdate = this.dateChange(cdate);
        //console.log(cdate);
        commentArray[index].updatedDate=cdate;        
      }
    });
    this.setState({
      commentDetails:commentArray
    });
  }
  submitComment(event) {
    let newCommentVal = $("#commentText").val();
    let newComment = {
      articlePath: this.state.artcilePath,
      siteName: this.state.siteName,
      commentText: newCommentVal,
      userName: this.state.userName,
      userACF2Id: this.state.userACF2Id,
      email: this.state.email
    };
    $.ajax({
      type: "POST",
      url: "/source-services/addComment",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(newComment),
      success: (res) => {
        this.setState({
          commentCount:res.commentCount,
          commentDetails:res.commentDetails
        });
        this.dateLoad();
      },
      error: (err) => {
        console.error(err);
      },
    });
  //   let html =
  //     `<section class="old-comments">
  //   <p class="name-time">
  //     <span class="name">` +
  //     newComment.userName +
  //     `</span>
  //     <span class="time">` +
  //     newComment.updatedDate +
  //     `</span>
  //   </p>
  //   <p class="desc">` +
  //     newComment.commentText +
  //     `</p>
  // </section>`;
  }
  deleteComment(){
    let removeComment = {
      articlePath: this.state.artcilePath,
      siteName: this.state.siteName,
      commentId: 17,
      reasonText: "testing",
      deleter_user_acf2_id: this.state.userACF2Id
    };
    $.ajax({
      type: "DELETE",
      url: "/source-services/deleteComment",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(removeComment),
      success: (res) => {
        this.setState({
          commentCount:res.commentCount,
          commentDetails:res.commentDetails
        });
        this.dateLoad();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  render() {
    return (
      <div class="comment-check">
        {this.props.showComment == "true" && (
          <div class="comment-wrapper">
            <p class="comment-count">
              Comments(
              <span class="val">{this.state.commentCount}</span>)
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
            {this.state.commentDetails.map((value, index) => {
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
