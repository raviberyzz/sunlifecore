class NewsArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLang: utag_data.page_language,
      articleDetail: {
        publishedDate: 1584037800000,
        to: "Sunlife & SLC management Employees Worldwide",
        from: "Dean Cornor,President & Cheif executive officer",
        details:
          "Event Services can assist you with planning and hosting events at a Sun Life location or an external venue." +
          "If you are considering holding an event at an external venue, contact Event Services first. We will work " +
          "closely with you to get the best rates and capitalize on our many company relationships with hotels and external venues. " +
          "<p><strong>Including Sunlife Radio</strong></p> " +
          "Event Services can assist you with planning and hosting events at a Sun Life location or an external venue." +
          "If you are considering holding an event at an external venue, contact Event Services first. We will work " +
          "closely with you to get the best rates and capitalize on our many company relationships with hotels and external venues.",
        "cq:tags": [
          "sunlife:source/business-groups/canada",
          "sunlife:source/business-groups/es",
          "sunlife:source/business-groups/corporate",
          "sunlife:source/business-groups/us",
          "sunlife:source/business-groups/slc",
          "sunlife:source/topics/my-pay",
          "sunlife:source/topics/my-career",
          "sunlife:source/topics/my-hr",
          "sunlife:source/topics/recognition",
        ],
      },
      filterTags: [],
      ratingComment: {},
    };
    this.tagSorting = this.tagSorting.bind(this);
    this.dateConvert = this.dateConvert.bind(this);
    this.getRatingComment = this.getRatingComment.bind(this);
    this.setRating = this.setRating.bind(this);
  }
  componentDidMount() {
    this.tagSorting();
    this.getRatingComment();
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
      ratingExist: true
    };
    this.setRating();
  }
  setRating() {
    this.state.noOfRatings = this.state.ratingComment.ratingCount;
    this.state.aveRatings = this.state.ratingComment.ratingAverage;
  }
  dateConvert(date) {
    var monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "Jun",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var d1 = new Date(date);
    var d = d1.getDate();
    var m = d1.getMonth();
    var y = d1.getFullYear();
    return monthName[m] + " " + d + ", " + y;
    // return moment(date).format('MMM DD');
  }
  tagSorting() {
    this.state.businessTag = [];
    this.state.topicsTag = [];
    if (this.state.articleDetail["cq:tags"].length > 0) {
      this.state.articleDetail["cq:tags"].forEach((element, index) => {
        if (element.includes("business-groups")) {
          this.state.businessTag.push(
            this.state.articleDetail["cq:tags"][index]
          );
        } else if (element.includes("topics")) {
          this.state.topicsTag.push(this.state.articleDetail["cq:tags"][index]);
        }
      });
      this.state.businessTag.sort();
      this.state.topicsTag.sort();
      this.state.businessTag.forEach((element, index) => {
        this.state.businessTag[index] = element.split("/")[2];
      });
      this.state.topicsTag.forEach((element, index) => {
        this.state.topicsTag[index] = element.split("/")[2];
      });
      this.state.filterTags = this.state.businessTag.concat(
        this.state.topicsTag
      );
      //console.log(this.state.filterTags);
    }
    this.setState({
      filterTags: this.state.filterTags,
    });
  }
  render() {
    return (
      <div class="col-xs-12 news-article-wrapper">
        {this.props.newsTags == "true" && (
          <div class="article-tags">
            {this.state.filterTags.map((value, index) => {
              return <span class="tag">{value}</span>;
            })}
          </div>
        )}
        <p class="article-date">
          {this.dateConvert(this.state.articleDetail.publishedDate)}
        </p>
        {this.props.toFrom == "true" && (
          <div class="mail-wrapper">
            <p>
              <strong>TO:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
              {this.state.articleDetail.to}
            </p>
            <p>
              <strong>FROM:&nbsp;</strong>
              {this.state.articleDetail.from}
            </p>
            <p class="border-bottom"></p>
          </div>
        )}
        <section
          class="article-body"
          dangerouslySetInnerHTML={{ __html: this.state.articleDetail.details }}
        ></section>
        {/* {this.state.ratingComment.ratingExist && (
          <div class="star-rating">
            <span class="fa fa-star" data-rating="1"></span>
            <span class="fa fa-star" data-rating="2"></span>
            <span class="fa fa-star" data-rating="3"></span>
            <span class="fa fa-star" data-rating="4"></span>
            <span class="fa fa-star" data-rating="5"></span>
            <input type="hidden" name="rating-value" class="rating-value" value={`${this.state.aveRatings}`} />
            <span class="no-of-rating">({this.state.noOfRatings})</span>
          </div>
        )} */}
      </div>
    );
  }
}
reactComponents["news-articles"] = NewsArticle;
