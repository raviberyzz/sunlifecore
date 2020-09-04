class NewsTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLang: utag_data.page_language,
      resultArr: {},
      newsList: [{
        "publishedDate": 1584037800000,
        "heading": "How to raise a Healthy family",
        "link": "/content/sunlife/internal/source/en/news/article1",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-units/canada"]
      }, {
        "publishedDate": 1584037800000,
        "heading": "Insights from the DHS - A Customer Journey",
        "link": "/content/sunlife/internal/source/en/news/article2",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-units/canada", "sunlife:source/business-units/es", "sunlife:source/business-units/corporate", "sunlife:source/business-units/us", "sunlife:source/business-units/slc"]
      }, {
        "publishedDate": 1583951400000,
        "heading": "Inclusive work spaces",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-units/canada"]
      }, {
        "publishedDate": 1583778600000,
        "heading": "Dean's Message",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-units/canada"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "5 ways to avoid burnout",
        "link": "/content/sunlife/internal/source/en/news/article1",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-units/canada"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "How to talk to your boss about your mental health",
        "link": "/content/sunlife/internal/source/en/news/article2",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-units/canada"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "What you need to know before you see a therapist",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-units/canada", "sunlife:source/business-units/corporate", "sunlife:source/business-units/es", "sunlife:source/business-units/slc", "sunlife:source/business-units/us"]
      },
      {
        "publishedDate": 1597935060000,
        "heading": "News article 3",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-units/bu1", "sunlife:source/business-units/bu3"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "News article 1",
        "link": "/content/sunlife/internal/source/en/news/article1",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-units/bu2", "sunlife:source/business-units/bu3"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "News article 2",
        "link": "/content/sunlife/internal/source/en/news/article2",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-units/bu1", "sunlife:source/business-units/bu2", "sunlife:source/business-units/bu3"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "News article 3",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-units/bu1", "sunlife:source/business-units/bu3"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "News article 3",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-units/bu1", "sunlife:source/business-units/bu3"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "News article 1",
        "link": "/content/sunlife/internal/source/en/news/article1",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-units/bu2", "sunlife:source/business-units/bu3"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "News article 2",
        "link": "/content/sunlife/internal/source/en/news/article2",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-units/bu1", "sunlife:source/business-units/bu2", "sunlife:source/business-units/bu3"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "News article 3",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-units/bu1", "sunlife:source/business-units/bu3"]
      },
      {
        "publishedDate": 1597935060000,
        "heading": "News article 3",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-units/bu1", "sunlife:source/business-units/bu3"]
      }]
    };

    this.newsTiles = this.newsTiles.bind(this);
    this.handleAllChecked = this.handleAllChecked.bind(this);
    this.handleCheckChildElement = this.handleCheckChildElement.bind(this);
    this.dateTransform = this.dateTransform.bind(this);
    this.bgBinding = this.bgBinding.bind(this);
  }

  componentDidMount() {
    this.newsTiles();
  }

  handleAllChecked(event) {
    let preference = this.state.resultArr
    preference.filters.businessGroup.forEach(fruite => {
      if(fruite.value != 'Canada'){
        fruite.isChecked = event.target.checked
      }
      })
    preference.filters.topic.forEach(fruite => fruite.isChecked = event.target.checked)
    this.setState({ resultArr: preference })
  }

  handleCheckChildElement(event) {
    let preference = this.state.resultArr
    preference.filters.businessGroup.forEach(fruite => {
      if (fruite.value === event.target.value)
        fruite.isChecked = event.target.checked
    })
    preference.filters.topic.forEach(fruite => {
      if (fruite.value === event.target.value)
        fruite.isChecked = event.target.checked
    })
    this.setState({ resultArr: preference })
  }

  clearAll() {
    let preference = this.state.resultArr
    preference.filters.businessGroup.forEach(fruite => {
      if(fruite.value != 'Canada'){
        fruite.isChecked = false;
      }
      })
    preference.filters.topic.forEach(fruite => fruite.isChecked = false)
    this.setState({ resultArr: preference })
  }

  dateTransform(date) {
    var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var d1 = new Date(date);
    var d = d1.getDate();
    var m = d1.getMonth();
    return monthName[m] + " " + d;
  }
  bgBinding(bgList) {
    var bg = "";
    Object.keys(bgList).map((key, index) => {
      var bgarr = bgList[key].split('/');
      if (bgList.length > 1) {
        bg += bgarr[bgarr.length - 1] + " | ";
      } else {
        bg = bgarr[bgarr.length - 1];
      }
    })
    return bg;
  }
  newsTiles() {
    var data = {
      "filters": {
        "businessGroup": [
          { id: 1, value: "Canada", isChecked: true },
          { id: 2, value: "Corporate", isChecked: false },
          { id: 3, value: "Enterprise Services", isChecked: false },
          { id: 4, value: "Hong Kong", isChecked: false },
          { id: 5, value: "Indonesia", isChecked: false },
          { id: 6, value: "International", isChecked: false },
          { id: 7, value: "Philippines", isChecked: false },
          { id: 8, value: "SLC Management", isChecked: false },
          { id: 9, value: "Asia", isChecked: false },
          { id: 10, value: "U.S.", isChecked: false },
          { id: 11, value: "U.K.", isChecked: false },
          { id: 12, value: "Vietnam", isChecked: false }
        ],
        "topic": [
          { id: 1, value: "Business continuity", isChecked: false },
          { id: 2, value: "Business critical", isChecked: false },
          { id: 3, value: "Client stories", isChecked: false },
          { id: 4, value: "Company performance", isChecked: false },
          { id: 5, value: "Compliance", isChecked: false },
          { id: 6, value: "Corporate Real Estate", isChecked: false },
          { id: 7, value: "COVID-19", isChecked: false },
          { id: 8, value: "Digital Enterprise", isChecked: false },
          { id: 9, value: "Diversity & Inclusion", isChecked: false },
          { id: 10, value: "Employee engagement", isChecked: false },
          { id: 11, value: "General HR", isChecked: false },
          { id: 12, value: "Innovation", isChecked: false },
          { id: 13, value: "my Benefits and Wellness", isChecked: false },
          { id: 14, value: "my Career", isChecked: false },
          { id: 15, value: "my Learning", isChecked: false },
          { id: 16, value: "my Pay", isChecked: false },
          { id: 17, value: "Organization announcements", isChecked: false },
          { id: 18, value: "Philanthropy/Sponsorship", isChecked: false },
          { id: 19, value: "Recognition", isChecked: false },
          { id: 20, value: "Sustainability", isChecked: false },
          { id: 21, value: "Technology", isChecked: false }
        ]
      }
    };
    this.setState({
      resultArr: data,
    })
  }

  render() {
    return (
      <div class="news-wrapper">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 " data-analytics="tab0">
            <div class="displayStockTicker news-widget" data-section="hp investor">
              {this.props.newsToolBar == "true" &&
                <div>
                  <div class="row news-tool-bar">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 tool">
                      <p class="left-text pull-left">{this.props.toolbarLeftText}</p>
                      <a class="right-text pull-right" data-target="#preferenceModal" data-toggle="modal" id="preferenceModalLink" href="#preferenceModal">{this.props.toolbarRightText}<span class={`fa ${this.props.iconName}`}></span></a>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 horizontal-middle-align"></div>
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
                            <input type="checkbox" onChange={this.handleAllChecked} name="selectAll" value="selectAll" />
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
                                          <input type="checkbox" name={value.value} value={value.value} onChange={this.handleCheckChildElement} checked={value.isChecked} disabled={value.value === 'Canada'}/>
                                          <span class="chk-lbl">{value.value}</span>
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
                                          <input type="checkbox" name={value.value} value={value.value} onChange={this.handleCheckChildElement} checked={value.isChecked} />
                                          <span class="chk-lbl">{value.value}</span>
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
                              <button class="cmp-form-button sec-btn" onClick={this.clearAll}>{this.props.preferenceModalHeadingbtn2}</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {this.props.newsListContainer == "true" &&
                <div class="row news-list-container">
                  <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 dynamic-news-tile">
                    {Object.keys(this.state.newsList).slice(0, 4).map((key, index) => {
                      return (
                        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 tile">
                          <div class="tile-img" style={{ backgroundImage: `url(${this.state.newsList[key].imageLink})` }}>
                            <div class="overlay-container">
                              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 detail-container">
                                <span class="title pull-left">{this.state.newsList[key].heading}</span>
                                <span class="date pull-right">{this.dateTransform(this.state.newsList[key].publishedDate)}</span>
                              </div>
                              <span class="bg-name">{this.bgBinding(this.state.newsList[key]["cq:tags"])}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 tile">
                      <div class="aggregate-tile">
                        <div class="circular-image">
                          <img class="icon" src="https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg" />
                        </div>
                        {Object.keys(this.state.newsList).slice(4,7).map((key, index) => {
                          return (
                            <div class="mar-btm">
                              <a class="title" href="">{this.state.newsList[key].heading}</a>
                              <p class="bg-name">{this.bgBinding(this.state.newsList[key]["cq:tags"])}</p>
                            </div>
                          )
                        })}
                        <p><span class="blue-chevron-arrow"><span class="blue-font"><a href="#">More News</a></span></span></p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 static-news-tile">
                    <div class="col-xs-12 col-sm-6 col-md-12 col-lg-12 tile workday-tile">
                      <p><a href="#"><img src="https://cmsdev-auth.ca.sunlife/content/dam/sunlife/internal/source/images/workday.jpg" alt="" /></a></p>
                      <p>{this.props.workdayText}</p>
                      <p><a href="https://cmsdev-auth.ca.sunlife/content/sunlife/external.html" target="_blank"><span class="view-all-category white-font">{this.props.workdayLinkText}</span></a>
                      </p>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-12 col-lg-12 tile workplace-tile">
                      <p><a href="#"><img src="https://cmsdev-auth.ca.sunlife/content/dam/sunlife/internal/source/images/workplace.png" alt="" /></a></p>
                      <p><strong><span class="blue-font">by Facebook</span></strong></p>
                      <p class="m-top-bt">{this.props.workplaceText}</p>
                      <p><span class="blue-chevron-arrow"><span class="blue-font"><a href="https://sunlife.workplace.com" target="_blank">{this.props.workplaceLinkText}</a></span></span>
                      </p>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

    );
  }
}
reactComponents["news-tiles"] = NewsTiles;