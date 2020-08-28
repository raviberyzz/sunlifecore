class NewsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLang: utag_data.page_language,
      resultArr: {}
    };

    this.getStockPrice = this.getStockPrice.bind(this);
    this.roundUp2 = this.roundUp2.bind(this);
    this.priceChange = this.priceChange.bind(this);
  }
  componentDidMount() {
    this.getStockPrice();
  }
  roundUp2(input1) {
    return Math.abs(Math.round(input1 * 100) / 100);
  }
  priceChange(val, lang) {
    var outputHtml = (val < 0) ? '-' : '+';
    if (lang == 'fr') {
      return outputHtml + Math.abs(val).toFixed(2).toString().replace('.', ',');
    }
    else {
      return outputHtml + Math.abs(val).toFixed(2);
    }
  }
  getStockPrice() {
    var resultArr = {};
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
    $.ajax({
      type: "GET",
      url: "/stockticker/getIndices",
      dataType: "json",
      success: (res) => {
        for (var i = 0; i < res.lookup_results.quote.length; i++) {
          if (res.lookup_results.quote[i].exch == "TSX" || res.lookup_results.quote[i].exch == "NYSE") {
            resultArr[res.lookup_results.quote[i].exch] = res.lookup_results.quote[i];
          }
        }
        Object.keys(resultArr).map((key, index) => {
          if (this.state.pageLang == "fr") {
            resultArr[key].last = this.roundUp2(resultArr[key].last).toFixed(2).replace('.', ',');
            resultArr[key].currency = resultArr[key].currency.replace("CAD", "CA").replace("USD", "US");
          }
          else {
            resultArr[key].last = this.roundUp2(resultArr[key].last).toFixed(2);
            resultArr[key].currency = resultArr[key].currency.replace("CAD", "C").replace("USD", "US");
          }
        })
        this.setState({
          resultArr: data
        })
        // console.log(this.state.resultArr);
      },
      error: (err) => {
        console.log(err);
      }
    });
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
              {/* <div class="stock-detail">
                {Object.keys(this.state.resultArr).map((key, index) => {
                  return (
                    <span>
                      <span>
                        <strong>{this.state.resultArr[key].symbol}({this.state.resultArr[key].exch})</strong>
                          &nbsp;{this.state.resultArr[key].currency}${this.state.resultArr[key].last}&nbsp;{this.priceChange(this.state.resultArr[key].change, this.state.pageLang)}
                      </span>
                      <span class="share-separator"></span>
                    </span>
                  )
                })}

              </div> */}
              {/* <div class="row news-list-container">
                <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 dynamic-news-tile">
                  <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8 tile">
                    <img class="news-image desktop-image" src="https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg" alt="" />
                    <h2 class="pad-bottom-10-xs">{this.props.stockTickerHeadingText}</h2>
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 tile">
                    <img class="news-image desktop-image" src="https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg" alt="" />
                    <h2 class="pad-bottom-10-xs">{this.props.stockTickerHeadingText}</h2>
                  </div>


                  <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 tile">
                    <img class="news-image desktop-image" src="https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg" alt="" />
                    <h2 class="pad-bottom-10-xs">{this.props.stockTickerHeadingText}</h2>
                  </div>

                  <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 tile">
                    <img class="news-image desktop-image" src="https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg" alt="" />
                    <h2 class="pad-bottom-10-xs">{this.props.stockTickerHeadingText}</h2>
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 tile">
                    <img class="news-image desktop-image" src="https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg" alt="" />
                    <h2 class="pad-bottom-10-xs">{this.props.stockTickerHeadingText}</h2>
                  </div>

                </div>
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 static-news-tile">
                  <div class="col-xs-12 col-sm-6 col-md-12 col-lg-12 tile workday-tile">

                    <p><a href="#"><img class="news-image" src="https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg" alt="" /></a></p>
                    <p>{this.props.stockTickerHeadingText}</p>
                    <p><a href="https://cmsdev-auth.ca.sunlife/content/sunlife/external.html"><span class="view-all-category white-font">{this.props.stockTickerHeadingText}</span></a>
                    </p>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-12 col-lg-12 tile workplace-tile">
                    <p><a href="#"><img class="news-image" src="https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg" alt="" /></a></p>
                    <p>{this.props.stockTickerHeadingText}</p>
                    <p><span class="blue-chevron-arrow"><span class="blue-font"><a href="https://sit-www.sunnet.sunlife.com/work/orgsearch/" target="_blank" data-original-title="">{this.props.stockTickerHeadingText}</a></span></span>
                    </p>
                  </div>
                </div>
              </div> */}
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