class NewsTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLang: utag_data.page_language,
      businessGroupList: [],
      topicsList: [],
      selectedPreferenceList: [],
      newsList: [{
        "publishedDate": 1584037800000,
        "heading": "How to raise a Healthy family",
        "link": "/content/sunlife/internal/source/en/news/article1",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/topics/business-critical", "sunlife:source/topics/client-stories"]
      }, {
        "publishedDate": 1584037800000,
        "heading": "Insights from the DHS - A Customer Journey",
        "link": "/content/sunlife/internal/source/en/news/article2",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/business-groups/es", "sunlife:source/business-groups/corporate", "sunlife:source/business-groups/us", "sunlife:source/business-groups/slc", "sunlife:source/topics/my-pay", "sunlife:source/topics/my-career", "sunlife:source/topics/my-hr", "sunlife:source/topics/recognition"]
      }, {
        "publishedDate": 1583951400000,
        "heading": "Inclusive work spaces",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/topics/corporate-real-estate"]
      }, {
        "publishedDate": 1583778600000,
        "heading": "Dean's Message",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/topics/digital-enterprise"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "5 ways to avoid burnout",
        "link": "/content/sunlife/internal/source/en/news/article1",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/topics/covid-19"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "How to talk to your boss about your mental health",
        "link": "/content/sunlife/internal/source/en/news/article2",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/topics/general-HR"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "What you need to know before you see a therapist",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/business-groups/corporate", "sunlife:source/business-groups/es", "sunlife:source/business-groups/slc", "sunlife:source/business-groups/us", "sunlife:source/topics/diversity-&-inclusion"]
      },
      {
        "publishedDate": 1597935060000,
        "heading": "News article 10",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/vietnam", "sunlife:source/business-groups/uk", "sunlife:source/topics/innovation"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "News article 9",
        "link": "/content/sunlife/internal/source/en/news/article1",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/asia", "sunlife:source/business-groups/philippines", "sunlife:source/topics/general-HR", "sunlife:source/topics/my-learning"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "News article 8",
        "link": "/content/sunlife/internal/source/en/news/article2",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/indonesia", "sunlife:source/business-groups/canada", "sunlife:source/business-groups/corporate", "sunlife:source/topics/general-HR", "sunlife:source/topics/company-performance", "sunlife:source/topics/business-continuity"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "News article 1",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/business-groups/enterprise-services", "sunlife:source/topics/compliance"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "News article 2",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/enterprise-services", "sunlife:source/business-groups/hong-kong", "sunlife:source/topics/digital-enterprise", "sunlife:source/topics/compliance"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "News article 3",
        "link": "/content/sunlife/internal/source/en/news/article1",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/business-groups/uk", "sunlife:source/topics/employee-engagement"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "News article 4",
        "link": "/content/sunlife/internal/source/en/news/article2",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/international", "sunlife:source/topics/my-benefits-and-wellness"]
      }, {
        "publishedDate": 1597935060000,
        "heading": "News article 5",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/international", "sunlife:source/business-groups/canada", "sunlife:source/topics/philanthropy-sponsorship"]
      },
      {
        "publishedDate": 1597935060000,
        "heading": "News article 6",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/slc-management", "sunlife:source/business-groups/corporate", "sunlife:source/topics/sustainability"]
      }]
    };

    this.newsTiles = this.newsTiles.bind(this);
    this.handleAllChecked = this.handleAllChecked.bind(this);
    this.handleCheckChildElement = this.handleCheckChildElement.bind(this);
    this.bgBinding = this.bgBinding.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  componentDidMount() {
    this.newsTiles();
  }

  handleAllChecked(event) {
    this.state.businessGroupList.forEach(prefer => {
      if (prefer.name != 'Canada') {
        prefer.isChecked = event.target.checked
      }
    })
    this.state.topicsList.forEach(prefer => prefer.isChecked = event.target.checked)
    this.setState({ resultArr: preference })
  }

  handleCheckChildElement(event) {
    this.state.businessGroupList.forEach(prefer => {
      if (prefer.value === event.target.value)
        prefer.isChecked = event.target.checked
    })
    this.state.topicsList.forEach(prefer => {
      if (prefer.value === event.target.value)
        prefer.isChecked = event.target.checked
    })
    this.setState({ resultArr: preference })
  }

  clearAll() {
    let preference = this.state.resultArr
    preference.filters.businessGroup.forEach(prefer => {
      if (prefer.name != 'Canada') {
        prefer.isChecked = false;
      }
    })
    preference.filters.topic.forEach(prefer => prefer.isChecked = false)
    this.setState({ resultArr: preference })
    $("#preferenceModal").modal("hide");
  }

  bgBinding(bgList) {
    var bg = "";
    Object.keys(bgList).map((key, index) => {
      var bgarr = bgList[key].split('/');
      if (bgarr[1] == "business-groups") {
        if (bgList.length > 1) {
          bg += bgarr[bgarr.length - 1] + " | ";
        } else {
          bg = bgarr[bgarr.length - 1];
        }
      }
    })
    return bg;
  }
  newsTiles() {
    let businessGroupObj = [
      { name: "Canada", value: "sunlife:source/business-groups/canada" },
      { name: "Corporate", value: "sunlife:source/business-groups/corporate" },
      { name: "Enterprise Services", value: "sunlife:source/business-groups/enterprise-services" },
      { name: "Hong Kong", value: "sunlife:source/business-groups/hong-kong" },
      { name: "Indonesia", value: "sunlife:source/business-groups/indonesia" },
      { name: "International", value: "sunlife:source/business-groups/international" },
      { name: "Philippines", value: "sunlife:source/business-groups/philippines" },
      { name: "SLC Management", value: "sunlife:source/business-groups/slc-management" },
      { name: "Asia", value: "sunlife:source/business-groups/asia" },
      { name: "U.S.", value: "sunlife:source/business-groups/us" },
      { name: "U.K.", value: "sunlife:source/business-groups/uk" },
      { name: "Vietnam", value: "sunlife:source/business-groups/vietnam" }
    ];
    let topicsObj = [
      { name: "Business continuity", value: "sunlife:source/topics/business-continuity" },
      { name: "Business critical", value: "sunlife:source/topics/business-critical" },
      { name: "Client stories", value: "sunlife:source/topics/client-stories" },
      { name: "Company performance", value: "sunlife:source/topics/company-performance" },
      { name: "Compliance", value: "sunlife:source/topics/compliance" },
      { name: "Corporate Real Estate", value: "sunlife:source/topics/corporate-real-estate" },
      { name: "COVID-19", value: "sunlife:source/topics/covid-19" },
      { name: "Digital Enterprise", value: "sunlife:source/topics/digital-enterprise" },
      { name: "Diversity & Inclusion", value: "sunlife:source/topics/diversity-&-inclusion" },
      { name: "Employee engagement", value: "sunlife:source/topics/employee-engagement" },
      { name: "General HR", value: "sunlife:source/topics/general-HR" },
      { name: "Innovation", value: "sunlife:source/topics/innovation" },
      { name: "My Benefits and Wellness", value: "sunlife:source/topics/my-benefits-and-wellness" },
      { name: "My Career", value: "sunlife:source/topics/my-career" },
      { name: "My Learning", value: "sunlife:source/topics/my-learning" },
      { name: "My Pay", value: "sunlife:source/topics/my-pay" },
      { name: "Organization announcements", value: "sunlife:source/topics/organization-announcements" },
      { name: "Philanthropy/Sponsorship", value: "sunlife:source/topics/philanthropy-sponsorship" },
      { name: "Recognition", value: "sunlife:source/topics/recognition" },
      { name: "Sustainability", value: "sunlife:source/topics/sustainability" },
      { name: "Technology", value: "sunlife:source/topics/technology" }
    ];
    this.setState({
      businessGroupList: businessGroupObj,
      topicsList: topicsObj,
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
                      <div class="preference-tag-container">
                        <span class="tag">Philippines</span>
                        <span class="tag">my Benefits and Wellness</span>
                        <span class="more-tag">More - 4</span>
                      </div>
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
                            <input type="checkbox" id="selectAll" onChange={this.handleAllChecked} name="selectAll" value="selectAll" />
                            <span class="chk-lbl">Select all</span>
                          </p>
                        </div>
                        <div class="modal-body preference-modal-body">
                          <div class="row preference-list">
                            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                              <p class="heading-text">Business Group</p>
                              <ul class="prefernce-col-list">
                                {this.state.businessGroupList.map((value, index) => {
                                  return (
                                    <li key={index}>
                                      <input type="checkbox" name={value.value} value={value.value} onChange={this.handleCheckChildElement} checked={value.name === 'Canada'} disabled={value.name === 'Canada'} />
                                      <span class="chk-lbl">{value.name}</span>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-8 col-lg-8">
                              <p class="heading-text">Topic</p>
                              <ul class="prefernce-col-list topic-col">
                                {this.state.topicsList.map((value, index) => {
                                  return (
                                    <li key={index}>
                                      <input type="checkbox" name={value.value} value={value.value} onChange={this.handleCheckChildElement} checked={value.isChecked} />
                                      <span class="chk-lbl">{value.name}</span>
                                    </li>
                                  )
                                })}
                              </ul>
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
                                <span class="date pull-right">{moment(this.state.newsList[key].publishedDate).format('MMM DD')}</span>
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
                        {Object.keys(this.state.newsList).slice(4, 7).map((key, index) => {
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