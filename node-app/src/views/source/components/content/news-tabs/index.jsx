class NewsTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLang: utag_data.page_language,
      businessGroupList: [],
      topicsList: [],
      tabHeading: [],
      allChecked: false,
      selectedPreferenceList: ["sunlife:source/business-groups/canada"],
      newsList: [{
        "publishedDate": 1584037800000,
        "heading": "How to raise a Healthy family",
        "link": "/content/sunlife/internal/source/en/news/article1",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/topics/business-critical", "sunlife:source/topics/client-stories"],
        "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
      }, {
        "publishedDate": 1584037800000,
        "heading": "Insights from the DHS - A Customer Journey",
        "link": "/content/sunlife/internal/source/en/news/article2",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/business-groups/es", "sunlife:source/business-groups/corporate", "sunlife:source/business-groups/us", "sunlife:source/business-groups/slc", "sunlife:source/topics/my-pay", "sunlife:source/topics/my-career", "sunlife:source/topics/my-hr", "sunlife:source/topics/recognition"],
        "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
      }, {
        "publishedDate": 1583778600000,
        "heading": "Inclusive work spaces",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/topics/corporate-real-estate"],
        "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
      }, {
        "publishedDate": 1583778600000,
        "heading": "Dean's Message",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/topics/digital-enterprise"],
        "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
      }, {
        "publishedDate": 1583778600000,
        "heading": "5 ways to avoid burnout",
        "link": "/content/sunlife/internal/source/en/news/article1",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/topics/covid-19"],
        "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
      }, {
        "publishedDate": 1583778600000,
        "heading": "How to talk to your boss about your mental health",
        "link": "/content/sunlife/internal/source/en/news/article2",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/topics/general-HR"],
        "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
      }, {
        "publishedDate": 1583778600000,
        "heading": "What you need to know before you see a therapist",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/business-groups/corporate", "sunlife:source/business-groups/es", "sunlife:source/business-groups/slc", "sunlife:source/business-groups/us", "sunlife:source/topics/diversity-&-inclusion"],
        "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
      },
      {
        "publishedDate": 1583346600000,
        "heading": "News article 10",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/vietnam", "sunlife:source/business-groups/uk", "sunlife:source/topics/innovation"],
        "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
      }, {
        "publishedDate": 1583346600000,
        "heading": "News article 9",
        "link": "/content/sunlife/internal/source/en/news/article1",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/asia", "sunlife:source/business-groups/philippines", "sunlife:source/topics/general-HR", "sunlife:source/topics/my-learning"],
        "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
      }, {
        "publishedDate": 1583346600000,
        "heading": "News article 8",
        "link": "/content/sunlife/internal/source/en/news/article2",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/indonesia", "sunlife:source/business-groups/canada", "sunlife:source/business-groups/corporate", "sunlife:source/topics/general-HR", "sunlife:source/topics/company-performance", "sunlife:source/topics/business-continuity"],
        "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
      }, {
        "publishedDate": 1583346600000,
        "heading": "News article 1",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/business-groups/enterprise-services", "sunlife:source/topics/compliance"],
        "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
      }, {
        "publishedDate": 1583346600000,
        "heading": "News article 2",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/enterprise-services", "sunlife:source/business-groups/hong-kong", "sunlife:source/topics/digital-enterprise", "sunlife:source/topics/compliance"],
        "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
      }, {
        "publishedDate": 1583346600000,
        "heading": "News article 3",
        "link": "/content/sunlife/internal/source/en/news/article1",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/canada", "sunlife:source/business-groups/uk", "sunlife:source/topics/employee-engagement"],
        "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
      }, {
        "publishedDate": 1583346600000,
        "heading": "News article 4",
        "link": "/content/sunlife/internal/source/en/news/article2",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/international", "sunlife:source/topics/my-benefits-and-wellness"],
        "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
      }, {
        "publishedDate": 1569177000000,
        "heading": "News article 5",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/international", "sunlife:source/business-groups/canada", "sunlife:source/topics/philanthropy-sponsorship"],
        "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
      },
      {
        "publishedDate": 1537641000000,
        "heading": "News article 6",
        "link": "/content/sunlife/internal/source/en/news/article3",
        "imageLink": "https://cmsdev-auth.ca.sunlife/content/dam/sunlife/legacy/assets/com/Global/About%20us/Awards%20and%20recognition/getty-463028747-awards-and-recognition-rectangle-372x287.jpg",
        "cq:tags": ["sunlife:source/business-groups/slc-management", "sunlife:source/business-groups/corporate", "sunlife:source/topics/sustainability"],
        "content": "A recent Sun Life survey indicates that nearly half of all Canadians (45%) feel less financially secure since COVID-19 began. The survey also highlights the interconnectedness of health and..."
      }],
      filterNewsList: []
    };

    this.getTabsHeading = this.getTabsHeading.bind(this);
    this.newsTiles = this.newsTiles.bind(this);
    this.handleAllChecked = this.handleAllChecked.bind(this);
    this.handleCheckChildElement = this.handleCheckChildElement.bind(this);
    this.dateTransform = this.dateTransform.bind(this);
    this.bgBinding = this.bgBinding.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.filteringNewsList = this.filteringNewsList.bind(this);
  }

  componentDidMount() {
    this.newsTiles();
    this.getTabsHeading();
  }

  handleAllChecked(event) {
    this.state.businessGroupList.forEach(prefer => {
      if (prefer.name != 'Canada') {
        prefer.isChecked = event.target.checked
      }
    })
    this.state.topicsList.forEach(prefer => prefer.isChecked = event.target.checked)
    this.setState({
      allChecked: event.target.checked,
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList
    });
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
    this.setState({
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList
    });
  }
  
  filteringNewsList() {
    this.state.selectedPreferenceList = [];
    this.state.businessGroupList.forEach(prefer => {
      if (prefer.isChecked) {
        this.state.selectedPreferenceList.push(prefer.value);
      }
    })
    this.state.topicsList.forEach(prefer => {
      if (prefer.isChecked) {
        this.state.selectedPreferenceList.push(prefer.value);
      }
    })
    this.state.filterNewsList = [];
    if (this.state.selectedPreferenceList.length > 0){
      this.state.filterNewsList=this.state.newsList.filter((news)=> {
        return news["cq:tags"].some(val => this.state.selectedPreferenceList.includes(val));
      });
    } else{
      this.state.filterNewsList = this.state.newsList;
    }
    this.state.filterNewsList.sort(function(a, b) { 
      return - ( a.publishedDate - b.publishedDate || b.heading.localeCompare(a.heading));
    });
    this.getTabsHeading();
    this.setState({
      selectedPreferenceList: this.state.selectedPreferenceList,
      filterNewsList: this.state.filterNewsList
    });
    $("#preferenceModal").modal("hide");
  }

  clearAll() {
    this.state.businessGroupList.forEach(prefer => {
      if (prefer.name != 'Canada') {
        prefer.isChecked = false;
      }
    })
    this.state.topicsList.forEach(prefer => prefer.isChecked = false)
    this.setState({
      allChecked: false,
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList
    });
    this.filteringNewsList();
    this.getTabsHeading();
  }

  dateTransform(date) {
    var monthName = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    var d1 = new Date(date);
    var d = d1.getDate();
    var m = d1.getMonth();
    return monthName[m] + " " + d;
    // return moment(date).format('MMMM DD, YYYY');
  }

  bgBinding(bgList) {
    var bg = "";
    Object.keys(bgList).map((key, index) => {
      var bgarr = bgList[key].split('/');
      if (bgarr[1] == "business-groups") {
        bg += " | " + bgarr[bgarr.length - 1];
      }
    })
    return bg;
  }

  getTabsHeading() {
    let curyear = new Date().getFullYear();
    let i = 3;
    let yearList = [];
    while (i > 0) {
      const yearVal = curyear--;
      const yearObj = {
        year: yearVal,
        data: [],
      };
      this.state.filterNewsList.forEach((news) => {
        if (new Date(news.publishedDate).getFullYear() === yearVal) {
          yearObj.data.push(news);
        }
      });
      yearList.push(yearObj);
      i--;
    }
    this.setState({
      tabHeading: yearList
    })
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
    businessGroupObj.forEach((data)=> {
      data["isChecked"] = false;
      this.state.selectedPreferenceList.forEach(prefer => {
        if (prefer === data.value) {
          data["isChecked"] = true;
        }
      })
    });
    topicsObj.forEach((data)=> {
      data["isChecked"] = false;
      this.state.selectedPreferenceList.forEach(prefer => {
        if (prefer === data.value) {
          data["isChecked"] = true;
        }
      })
    });
    this.state.filterNewsList = [];
    if (this.state.selectedPreferenceList.length > 0){
      this.state.filterNewsList=this.state.newsList.filter((news)=> {
        return news["cq:tags"].some(val => this.state.selectedPreferenceList.includes(val));
      });
    } else{
      this.state.filterNewsList = this.state.newsList;
    }
    this.state.filterNewsList.sort(function(a, b) { 
      return - ( a.publishedDate - b.publishedDate || b.heading.localeCompare(a.heading));
    });
    this.setState({
      filterNewsList: this.state.filterNewsList,
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
                            <input type="checkbox" id="selectAll" onChange={this.handleAllChecked} name="selectAll" checked={this.state.allChecked} value="selectAll" />
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
                                      <input type="checkbox" name={value.value} value={value.value} onChange={this.handleCheckChildElement} checked={value.isChecked} disabled={value.isChecked && value.name === 'Canada'} />
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
                              <button class="cmp-form-button pull-right" onClick={this.filteringNewsList}>{this.props.preferenceModalHeadingbtn1}</button>
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
                    <div class="cmp-tabs" id="tabs-container">
                      <ol role="tablist" id="tabList" class="cmp-tabs__tablist" aria-multiselectable="false">
                        {Object.keys(this.state.tabHeading).map((value, index) => {
                          return (
                            <li role="presentation" key={index} class="cmp-tabs__tab" tabindex={index} data-cmp-hook-tabs="tab" aria-controls={this.state.tabHeading[value].year} aria-selected="true">{this.state.tabHeading[value].year}
                            </li>
                          )
                        })}
                      </ol>
                      {Object.keys(this.state.tabHeading).map((value, index) => {
                        return (
                          <div role="tabpanel" tabindex={index} class="cmp-tabs__tabpanel" data-cmp-hook-tabs="tabpanel">
                            <div class="tab-accordian-heading visible-xs hidden-sm hidden-md hidden-lg" aria-expanded="false" tabindex={index}>{this.state.tabHeading[value].year}</div>
                            <div class="responsivegrid">
                              <div class="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                                {Object.keys(this.state.tabHeading[value].data).map((key, index) => {
                                  return (
                                    <div class="news-list-box">
                                      <p>{this.dateTransform(this.state.tabHeading[value].data[key].publishedDate) + this.bgBinding(this.state.tabHeading[value].data[key]["cq:tags"])}</p>
                                      <p>
                                        <a href={this.state.tabHeading[value].data[key].link}>{this.state.tabHeading[value].data[key].heading}</a>
                                      </p>
                                      <p>{this.state.tabHeading[value].data[key].content}</p>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        )
                      })}
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