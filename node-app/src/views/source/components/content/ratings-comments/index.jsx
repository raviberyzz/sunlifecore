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
      articlePath: "",
      siteName: "ca",
      userACF2Id: "",
      apiCall: {},
      canSubmit: true
    };
    this.articlePathFun = this.articlePathFun.bind(this);
    this.getRatingComment = this.getRatingComment.bind(this);
    this.submitRating = this.submitRating.bind(this);
    this.articlePathFun();
    this.getRatingComment();
  }
  componentDidMount() {
    //this.getRatingComment();
  }
  articlePathFun() {
    // let articlePath1 = window.location.pathname;
    // articlePath1 = articlePath1.trim();
    // if (articlePath1.indexOf(".html") > -1) {
    //   articlePath1 = articlePath1.replace(".html", "");
    // }
    // if (articlePath1) {
    //   if (articlePath1[articlePath1.length - 1] == "/") {
    //     articlePath1 = articlePath1.substring(0, articlePath1.length - 1);
    //   }
    // }
    let articlePath1 = "";
    if (utag_data != undefined) {
      articlePath1 = utag_data["page_canonical_url_default"];
      let pathArr = articlePath1.split("/");
      articlePath1 = "/";
      for (let i = 3; i < pathArr.length - 1; i++) {
        articlePath1 += pathArr[i] + "/";
      }
    }
    this.state.articlePath = articlePath1;
    return articlePath1;
  }
  getRatingComment() {
    console.log(this.state.articlePath);
    let data1 = {
      articlePath: this.state.articlePath,
      // siteName: this.state.siteName,
      // userACF2Id: this.state.userACF2Id,
    };
    $.ajax({
      type: "GET",
      url: this.props.apiPath + ".ugc.selectAll.json",
      dataType: "json",
      data: data1,
      success: (res) => {
        this.setState({
          commentCount: res.commentCount,
          commentDetails: res.commentDetails,
          ratingAverage: res.ratingAverage,
          ratingCount: res.ratingCount,
          ratingExist: res.ratingExist,
          canSubmit: !res.ratingExist,
        });
      },
      error: (err) => {
        console.error("error from rating ugc" + err);
      },
    });
  }
  submitRating(i, event) {
    if (this.state.canSubmit == true) {
      let data1 = {
        articlePath: this.state.articlePath,
        // siteName: this.state.siteName,
        // userACF2Id: this.state.userACF2Id,
        rating: i,
      };
      $.ajax({
        type: "POST",
        url: this.props.apiPath + ".ugc.addRating.json",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data1),
        success: (res) => {
          console.log(res);
          this.setState({
            ratingAverage: res.ratingAverage,
            ratingCount: this.state.ratingCount + 1,
            ratingExist: res.ratingExist,
            canSubmit: false,
          });
        },
        error: (err) => {
          console.error(err);
        },
      });
      /* news rating analytics starts here */
      let ratingGiven = i;
      utag.link({
        ev_type: "other",
        ev_action: "clk",
        ev_title: "news-rating-" + ratingGiven,
      });
      /* news rating analytics ends here */
      $(".rating-value").val(this.state.ratingAverage);
      $(".no-of-rating .val").text(this.state.ratingCount);
    }
  }
  render() {
    return (
      <div class="rating-wrapper">
        <p class="rate-this">{this.props.rateStory}</p>
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
      commentDetails: [],
      ratingAverage: 0,
      ratingCount: 0,
      ratingExist: false,
      articlePath: "",
      siteName: "",
      userACF2Id: "",
      userName: "",
      email: "",
      apiCall: {},
      userEmail: ""
    };
    this.articlePathFun = this.articlePathFun.bind(this);
    this.getRatingComment = this.getRatingComment.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.dateLoad = this.dateLoad.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.selectUserComment = this.selectUserComment.bind(this);
    this.articlePathFun();
    this.getRatingComment();
  }
  componentDidMount() {
    //this.dateLoad();
  }
  articlePathFun() {
    let articlePath1 = "";
    if (utag_data != undefined) {
      articlePath1 = utag_data["page_canonical_url_default"];
      let pathArr = articlePath1.split("/");
      articlePath1 = "/";
      for (let i = 3; i < pathArr.length - 1; i++) {
        articlePath1 += pathArr[i] + "/";
      }
    }
    this.state.articlePath = articlePath1;
    return articlePath1;
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
  selectUserComment() {
    if (ContextHub !== undefined) {
      let userDetails = ContextHub.getItem("profile");
      if (userDetails.email) {
        console.log(userDetails.email);
        this.setState({
          userEmail: userDetails.email,
        });
      }
    }
  }
  getRatingComment() {
    let data1 = {
      articlePath: this.state.articlePath,
      // siteName: this.state.siteName,
      // userACF2Id: this.state.userACF2Id,
    };
    $.ajax({
      type: "GET",
      url: this.props.apiPath + ".ugc.selectAll.json",
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
        this.dateLoad();
        this.selectUserComment();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  dateLoad() {
    let commentArray = "";
    commentArray = this.state.commentDetails;
    if (commentArray) {
      commentArray.map((value, index) => {
        if (value) {
          let cdate = value.updatedDate.split("T")[0];
          cdate = this.dateChange(cdate);
          commentArray[index].updatedDate = cdate;
        }
      });
    }
    this.setState({
      commentDetails: commentArray,
    });
  }
  submitComment(event) {
    let newCommentVal = $("#commentText").val();
     if (newCommentVal.trim() == "") {
       console.log('no comment given');
       return false;
     } else {
      let newComment = {
        articlePath: this.state.articlePath,
        commentText: newCommentVal
      };
      $.ajax({
        type: "POST",
        url: this.props.apiPath + ".ugc.addComment.json",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(newComment),
        success: (res) => {
          this.setState({
            commentCount: res.commentCount,
            commentDetails: res.commentDetails,
          });
          this.dateLoad();
          this.selectUserComment();
        },
        error: (err) => {
          console.error(err);
        },
      });
      /* news comment submit analytics starts here */
      utag.link({
        ev_type: "other",
        ev_action: "clk",
        ev_title: "news-comment",
      });
      /* news comment submit analytics ends here */
      $("#commentText").val("write your comment");
    }
  }
  deleteComment(commentId, event) {
    let removeComment = {
      articlePath: this.state.articlePath,
      commentId: commentId,
      // reasonText: "testing",
    };
    $.ajax({
      type: "DELETE",
      url: this.props.apiPath + ".ugc.deleteComment.json",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(removeComment),
      success: (res) => {
        this.setState({
          commentCount: res.commentCount,
          commentDetails: res.commentDetails,
        });
        this.dateLoad();
      },
      error: (err) => {
        console.error(err);
      },
    });
    $(".comment-option").removeClass("show");
  }
  render() {
    return (
      <div class="comment-wrapper">
        <p class="comment-count">
          {this.props.comments} (
          <span class="val">{this.state.commentCount}</span>)
        </p>
        <p class="info">({this.props.commentsToolTip})</p>
        <div class="add-comment col-xs-12">
          <input
            type="text"
            class="col-xs-12 textarea"
            id="commentText"
            placeholder={this.props.writeComment}
          />
          <div class="col-xs-12 add-button">
            <div class="primary-yellow-button" onClick={this.submitComment}>
              <a href="javascript:void(0)" role="button" class="CTA-wrapper">
                <span class="button-class">
                  <span class="icon-class fa fa-user"></span>
                  {this.props.addComment}
                </span>
              </a>
            </div>
          </div>
        </div>
        {this.state.commentDetails &&
          this.state.commentDetails.map((value, index) => {
            let a = "";
            // if (index == 0) {
            //   a = "first";
            // }
            if (index == this.state.commentDetails.length - 1) {
              a = "last";
            }
            return (
              <div class={`old-comments ${a}`}>
                <section class="" id={`${value.commentId}`}>
                  <p class="name-time">
                    <span class="name">{value.userName}</span>
                    <span class="time">{value.updatedDate}</span>
                    <div
                      class={`three-dots ${
                        value.email == this.state.userEmail || hasUserGroups
                          ? "show"
                          : ""
                      }`}
                    >
                      <p class="dots">...</p>
                      <div class="comment-option" value={`${value.commentId}`}>
                        <div class="edit-popup">
                          <a href="javascript:void(0)">{this.props.edit}</a>
                          <br />
                          <a
                            class="delete-option"
                            data-toggle="modal"
                            data-target={"#deleteModal" + value.commentId}
                          >
                            {this.props.delete}
                          </a>
                        </div>
                      </div>
                    </div>
                  </p>
                  <p class="desc">{value.commentText}</p>
                  <div
                    class="modal fade popup-modal-wrapper delete-modal horizontal-middle-align"
                    role="dialog"
                    data-backdrop="static"
                    data-keyboard="false"
                    id={"deleteModal" + value.commentId}
                  >
                    <div class="modal-content horizontal-middle-align">
                      <div class="modal-header">
                        <div class="modal-title">
                          <h3 class="modal-heading" tabindex="0">
                            {this.props.deleteComment}
                          </h3>
                          <button
                            type="button"
                            class="close close-popup fa fa-remove collapse-x"
                            data-dismiss="modal"
                          >
                            <label class="sr-only">Close</label>
                          </button>
                        </div>
                      </div>
                      <div class="modal-body" tabindex="0">
                        {this.props.deleteCommentConfirm}
                      </div>
                      <div class="modal-footer">
                        <div class="button-wrapper secondary-button-form">
                          <button
                            type="button"
                            class="cancel cmp-form-button sec-btn"
                            data-dismiss="modal"
                          >
                            {this.props.cancel}
                          </button>
                        </div>
                        <div class="button-wrapper primary-blue-button-form">
                          <button
                            type="button"
                            class="cmp-form-button"
                            onClick={this.deleteComment.bind(
                              this,
                              value.commentId
                            )}
                            data-dismiss="modal"
                          >
                            {this.props.delete}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            );
          })}
      </div>
    );
  }
}
/* Comments end here */
reactComponents["article-ratings"] = ArticleRatings;
reactComponents["article-comments"] = ArticleComments;
