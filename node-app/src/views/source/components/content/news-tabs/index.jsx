class NewsTabs extends React.Component {
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
    this.clearAll = this.clearAll.bind(this);
  }

  componentDidMount() {
    this.newsTiles();
  }

  handleAllChecked(event) {
    let preference = this.state.resultArr
    preference.filters.businessGroup.forEach(prefer => {
      if (prefer.value != 'Canada') {
        prefer.isChecked = event.target.checked
      }
    })
    preference.filters.topic.forEach(prefer => prefer.isChecked = event.target.checked)
    this.setState({ resultArr: preference })
  }

  handleCheckChildElement(event) {
    let preference = this.state.resultArr
    preference.filters.businessGroup.forEach(prefer => {
      if (prefer.value === event.target.value)
        prefer.isChecked = event.target.checked
    })
    preference.filters.topic.forEach(prefer => {
      if (prefer.value === event.target.value)
        prefer.isChecked = event.target.checked
    })
    this.setState({ resultArr: preference })
  }

  clearAll() {
    let preference = this.state.resultArr
    preference.filters.businessGroup.forEach(prefer => {
      if (prefer.value != 'Canada') {
        prefer.isChecked = false;
      }
    })
    preference.filters.topic.forEach(prefer => prefer.isChecked = false)
    this.setState({ resultArr: preference })
    $("#preferenceModal").modal("hide");
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
                              {Object.keys(this.state.resultArr).map((key, index) => {
                                return (
                                  <ul class="prefernce-col-list">
                                    {this.state.resultArr[key].businessGroup.map((value, index) => {
                                      return (
                                        <li key={index}>
                                          <input type="checkbox" name={value.value} value={value.value} onChange={this.handleCheckChildElement} checked={value.isChecked} disabled={value.value === 'Canada'} />
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
              {this.props.newsTabsContainer == "true" &&
                <div class="news-tabs-container col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div class="we-tabs aem-GridColumn aem-GridColumn--default--12 tabs-wrapper">
                    <div class="cmp-tabs">
                      <ol role="tablist" class="cmp-tabs__tablist" aria-multiselectable="false">
                        <li role="presentation" class="cmp-tabs__tab cmp-tabs__tab--active" tabindex="0" data-cmp-hook-tabs="tab" aria-controls="familytab-content" aria-selected="true">2020
                            </li>
                        <li role="presentation" class="cmp-tabs__tab" tabindex="-1" data-cmp-hook-tabs="tab" aria-controls="coupletab-content" aria-selected="false">2019
                            </li>
                        <li role="presentation" class="cmp-tabs__tab" tabindex="-1" data-cmp-hook-tabs="tab" aria-controls="singletab-content" aria-selected="false">2018
                            </li>
                      </ol >
                      <div role="tabpanel" tabindex="0" class="cmp-tabs__tabpanel cmp-tabs__tabpanel--active" data-cmp-hook-tabs="tabpanel">
                        <div class="tab-accordian-heading visible-xs hidden-sm hidden-md hidden-lg" aria-expanded="false" tabindex="0">2020</div>
                        <div class="responsivegrid">
                          <div class="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                            <div class="news-list-box">
                              <p>
                                September 08, 2020</p>
                              <p>
                                <a href="/Global/Newsroom/News+releases/Announcement/Nearly+half+of+all+Canadians+feel+less+financially+secure+due+to+COVID-19?vgnLocale=en_CA&amp;id=123452">Nearly half of all Canadians feel less financially secure due to COVID-19</a>
                              </p>
                              <p>A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and...</p>
                            </div>
                            <div class="news-list-box">
                              <p>
                                September 08, 2020</p>
                              <p>
                                <a href="/Global/Newsroom/News+releases/Announcement/Nearly+half+of+all+Canadians+feel+less+financially+secure+due+to+COVID-19?vgnLocale=en_CA&amp;id=123452">Nearly half of all Canadians feel less financially secure due to COVID-19</a>
                              </p>
                              <p>A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and...</p>
                            </div>
                            <div class="news-list-box">
                              <p>
                                September 08, 2020</p>
                              <p>
                                <a href="/Global/Newsroom/News+releases/Announcement/Nearly+half+of+all+Canadians+feel+less+financially+secure+due+to+COVID-19?vgnLocale=en_CA&amp;id=123452">Nearly half of all Canadians feel less financially secure due to COVID-19</a>
                              </p>
                              <p>A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and...</p>
                            </div>
                            <div class="news-list-box">
                              <p>
                                September 08, 2020</p>
                              <p>
                                <a href="/Global/Newsroom/News+releases/Announcement/Nearly+half+of+all+Canadians+feel+less+financially+secure+due+to+COVID-19?vgnLocale=en_CA&amp;id=123452">Nearly half of all Canadians feel less financially secure due to COVID-19</a>
                              </p>
                              <p>A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and...</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div role="tabpanel" tabindex="0" class="cmp-tabs__tabpanel" data-cmp-hook-tabs="tabpanel" aria-hidden="true">
                        <div class="tab-accordian-heading visible-xs hidden-sm hidden-md hidden-lg" aria-expanded="false" tabindex="0">2019</div>
                        <div class="responsivegrid">
                          <div class="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                          <div class="news-list-box">
                              <p>
                                September 08, 2020</p>
                              <p>
                                <a href="/Global/Newsroom/News+releases/Announcement/Nearly+half+of+all+Canadians+feel+less+financially+secure+due+to+COVID-19?vgnLocale=en_CA&amp;id=123452">Nearly half of all Canadians feel less financially secure due to COVID-19</a>
                              </p>
                              <p>A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and...</p>
                            </div>
                            <div class="news-list-box">
                              <p>
                                September 08, 2020</p>
                              <p>
                                <a href="/Global/Newsroom/News+releases/Announcement/Nearly+half+of+all+Canadians+feel+less+financially+secure+due+to+COVID-19?vgnLocale=en_CA&amp;id=123452">Nearly half of all Canadians feel less financially secure due to COVID-19</a>
                              </p>
                              <p>A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and...</p>
                            </div>
                            <div class="news-list-box">
                              <p>
                                September 08, 2020</p>
                              <p>
                                <a href="/Global/Newsroom/News+releases/Announcement/Nearly+half+of+all+Canadians+feel+less+financially+secure+due+to+COVID-19?vgnLocale=en_CA&amp;id=123452">Nearly half of all Canadians feel less financially secure due to COVID-19</a>
                              </p>
                              <p>A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and...</p>
                            </div>
                            <div class="news-list-box">
                              <p>
                                September 08, 2020</p>
                              <p>
                                <a href="/Global/Newsroom/News+releases/Announcement/Nearly+half+of+all+Canadians+feel+less+financially+secure+due+to+COVID-19?vgnLocale=en_CA&amp;id=123452">Nearly half of all Canadians feel less financially secure due to COVID-19</a>
                              </p>
                              <p>A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and...</p>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                      <div role="tabpanel" tabindex="0" class="cmp-tabs__tabpanel" data-cmp-hook-tabs="tabpanel" aria-hidden="true">
                        <div class="tab-accordian-heading visible-xs hidden-sm hidden-md hidden-lg" aria-expanded="false" tabindex="0">2018</div>
                        <div class="responsivegrid">
                        <div class="news-list-box">
                              <p>
                                September 08, 2020</p>
                              <p>
                                <a href="/Global/Newsroom/News+releases/Announcement/Nearly+half+of+all+Canadians+feel+less+financially+secure+due+to+COVID-19?vgnLocale=en_CA&amp;id=123452">Nearly half of all Canadians feel less financially secure due to COVID-19</a>
                              </p>
                              <p>A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and...</p>
                            </div>
                            <div class="news-list-box">
                              <p>
                                September 08, 2020</p>
                              <p>
                                <a href="/Global/Newsroom/News+releases/Announcement/Nearly+half+of+all+Canadians+feel+less+financially+secure+due+to+COVID-19?vgnLocale=en_CA&amp;id=123452">Nearly half of all Canadians feel less financially secure due to COVID-19</a>
                              </p>
                              <p>A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and...</p>
                            </div>
                            <div class="news-list-box">
                              <p>
                                September 08, 2020</p>
                              <p>
                                <a href="/Global/Newsroom/News+releases/Announcement/Nearly+half+of+all+Canadians+feel+less+financially+secure+due+to+COVID-19?vgnLocale=en_CA&amp;id=123452">Nearly half of all Canadians feel less financially secure due to COVID-19</a>
                              </p>
                              <p>A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and...</p>
                            </div>
                            <div class="news-list-box">
                              <p>
                                September 08, 2020</p>
                              <p>
                                <a href="/Global/Newsroom/News+releases/Announcement/Nearly+half+of+all+Canadians+feel+less+financially+secure+due+to+COVID-19?vgnLocale=en_CA&amp;id=123452">Nearly half of all Canadians feel less financially secure due to COVID-19</a>
                              </p>
                              <p>A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and...</p>
                            </div>
                            
                        </div>
                      </div>
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
reactComponents["news-tabs"] = NewsTabs;