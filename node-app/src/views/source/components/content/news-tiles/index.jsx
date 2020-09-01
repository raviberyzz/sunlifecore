class NewsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLang: utag_data.page_language,
      resultArr: {}
    };

    this.newsTiles = this.newsTiles.bind(this);

  }
  componentDidMount() {
    this.newsTiles();
  }
 
  newsTiles() {
    var data = {
      "filters": {
        "businessGroup": [
          "Canada",
          "Corporate",
          "Enterprise Services",
          "Hong Kong",
          "Indonesia",
          "International",
          "Philippines",
          "SLC Management",
          "Asia",
          "U.S.",
          "U.K.",
          "Vietnam"
        ],
        "topic": [
          "Business continuity",
          "Business critical",
          "Client stories",
          "Company performance",
          "Compliance",
          "Corporate Real Estate",
          "COVID-19",
          "Digital Enterprise",
          "Diversity & Inclusion",
          "Employee engagement",
          "General HR",
          "Innovation",
          "my Benefits and Wellness",
          "my Career",
          "my Learning",
          "my Pay",
          "Organization announcements",
          "Philanthropy/Sponsorship",
          "Recognition",
          "Sustainability",
          "Technology"
        ]
      }
    };
    // $.ajax({
    //   type: "GET",
    //   url: "/stockticker/getIndices",
    //   dataType: "json",
    //   success: (res) => {
       

    //     // console.log(this.state.resultArr);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });

    this.setState({
      resultArr: data
    })
  }
  render() {
    return (
      <div class="news-wrapper">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 " data-analytics="tab0">
            <div class="displayStockTicker news-widget" data-section="hp investor">
              <div class="row news-tool-bar">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 tool">
                  <p class="left-text pull-left">{this.props.toolbarLeftText}</p>
                  <a class="right-text pull-right" data-target="#preferenceModal" data-toggle="modal" id="preferenceModalLink" href="#preferenceModal">{this.props.toolbarRightText}<span class={`fa ${this.props.iconName}`}></span></a>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 horizontal-middle-align"></div>
              </div>

            </div>
          </div>
        </div>
        <div id="preferenceModal" class="modal fade preference-popup-wrapper horizontal-middle-align" role="dialog">
          <div class="modal-dialog preference-modaldialog">
            <div class="modal-content horizontal-middle-align">
              <div class="modal-header preference-modal-header">
                <button type="button" class="fa fa-remove collapse-x close-modal" aria-label="Close"
                  data-dismiss="modal">
                </button>
                <h5 class="heading-text">{this.props.preferenceModalHeading}</h5>
                <p>
                  <input type="checkbox" name="all" value="all" data-parsley-multiple="all" />
                  <span class="chk-lbl">Select all</span>
               </p>

              </div>
              <div class="modal-body preference-modal-body">
                <div class="row preference-list">
                  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <p class="heading-text">Business Group</p>
                    {Object.keys(this.state.resultArr).map((key, index) => {
                      return (
                        <ul class="prefernce-col-list">
                          {this.state.resultArr[key].businessGroup.map((value, index) => {
                            return (
                              <li key={index}>
                                <input type="checkbox" name={value} value={value} data-parsley-multiple={value} />
                                <span class="chk-lbl">{value}</span>
                              </li>
                            )
                          })}
                        </ul>
                      )
                    })}
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-8 col-lg-8">
                    <p class="heading-text">Topic</p>
                    {Object.keys(this.state.resultArr).map((key, index) => {
                      return (
                        <ul class="prefernce-col-list topic-col">
                          {this.state.resultArr[key].topic.map((value, index) => {
                            return (
                              <li key={index}>
                                <input type="checkbox" name={value} value={value} data-parsley-multiple={value} />
                                <span class="chk-lbl">{value}</span>
                              </li>
                            )
                          })}
                        </ul>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div class="modal-footer preference-modal-footer">
                <div class="row">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 button-wrapper primary-blue-button-form">
                    <button class="cmp-form-button pull-right">{this.props.preferenceModalHeadingbtn1}</button>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 button-wrapper secondary-button-form">
                    <button class="cmp-form-button sec-btn">{this.props.preferenceModalHeadingbtn2}</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    );
  }
}
reactComponents["news-component"] = NewsComponent;