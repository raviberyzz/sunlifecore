class NewsTabs extends React.Component {
  constructor(props) {
    super(props);
    let contextHubData = localStorage.getItem("ContextHubPersistence");
    let defaultBGValue = "";
    if (contextHubData) {
      let userProfile = JSON.parse(localStorage.getItem("ContextHubPersistence"));
      defaultBGValue = userProfile.store.profile.businessGroup;
    }
    
    this.state = {
      defaultBG:defaultBGValue,
      pageLang: utag_data.page_language,
      businessGroupList: {
        tags: []
      },
      topicsList: {
        tags: []
      },
      tabHeading: [],
      allChecked: false,
      selectedPreferenceList: [],
      filterNewsList: [],
      selectedPreferenceTags: [],
      userProfileArticles: []
    };

    this.getTabsHeading = this.getTabsHeading.bind(this);
   // this.newsTiles = this.newsTiles.bind(this);
    this.handleAllChecked = this.handleAllChecked.bind(this);
    this.handleCheckChildElement = this.handleCheckChildElement.bind(this);
    this.dateTransform = this.dateTransform.bind(this);
    this.bgBinding = this.bgBinding.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.filteringNewsTabList = this.filteringNewsTabList.bind(this);
    this.paginationDataBuild = this.paginationDataBuild.bind(this);
    this.tagSorting = this.tagSorting.bind(this);
    this.getTabsNewsList = this.getTabsNewsList.bind(this);
    this.getPreferenceList = this.getPreferenceList.bind(this);
    this.addSelectedPreference = this.addSelectedPreference.bind(this);
    this.retrieveSelectedPreference = this.retrieveSelectedPreference.bind(this);
  }

  componentDidMount() {
    this.retrieveSelectedPreference();
    this.getPreferenceList();
    this.getTabsNewsList();
    //this.newsTiles();
   /* setTimeout(()=>{
      this.getTabsHeading();
    },1000) */
    
    this.tagSorting();
  }

  // get the selected preferences on page load
  retrieveSelectedPreference() {
    $.ajax({
      type: "GET",
      url: `${this.props.retrieveSelectedPreferenceUrl}.ugc.retrievePreference.json`,
      dataType: "json",
      success: (res) => {
        this.state.selectedPreferenceList = res;
        this.setState({
          selectedPreferenceList: this.state.selectedPreferenceList,
        })
        //this.getPreferenceList();
        setTimeout(() => {
          this.tagSorting();
        }, 1000);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

 // get all the preference tags for preference pop up modal 
  getPreferenceList() {
    $.ajax({
      type: "GET",
      url: `${this.props.getPrefernceListUrl}.${this.state.pageLang}.json`,
      dataType: "json",
      success: (res) => {
        this.state.businessGroupList = res["business-group"];
        this.state.topicsList = res["topic"];
        this.state.businessGroupList.tags.forEach((data) => {
          data["isChecked"] = false;
          this.state.selectedPreferenceList.forEach(prefer => {
            if (prefer === data.id) {
              data["isChecked"] = true;
            }
          })
        });
        this.state.topicsList.tags.forEach((data) => {
          data["isChecked"] = false;
          this.state.selectedPreferenceList.forEach(prefer => {
            if (prefer === data.id) {
              data["isChecked"] = true;
            }
          })
        });
        this.setState({
          businessGroupList: this.state.businessGroupList,
          topicsList: this.state.topicsList,
        })
        //this.getTabsNewsList();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // get all the news articles on page load 
  getTabsNewsList() {
    $.ajax({
      type: "GET",
      url: `${this.props.getNewsTabListUrl}.news.${this.state.pageLang}.json`,
      dataType: "json",
      success: (res) => {
        this.state.newsList = res;
        this.state.filterNewsList = [];
        let preferedNewsList = [];
        // filter the response articles by user profile data if user profile data exists
        if (ContextHub.getItem('profile').businessGroup || ContextHub.getItem('profile').businessUnit || ContextHub.getItem('profile').buildingLocation || ContextHub.getItem('profile').jobLevel) {
          var businessGroup = ContextHub.getItem('profile').businessGroup;
          var businessUnit = ContextHub.getItem('profile').businessUnit;
          var buildingLocation = ContextHub.getItem('profile').buildingLocation;
          var jobLevel = ContextHub.getItem('profile').jobLevel;
          if (businessGroup != "" && businessGroup != undefined) {
            businessGroup = "sunlife:source/business-group/" + businessGroup.toLowerCase().replaceAll(" ", "-");
          }
          if (businessUnit != "" && businessUnit != undefined) {
            businessUnit = "sunlife:source/business-unit/" + businessUnit.toLowerCase().replaceAll(" ", "-");
          }
          if (buildingLocation != "" && buildingLocation != undefined) {
            buildingLocation = "sunlife:source/building-location/" + buildingLocation.toLowerCase().replaceAll(" ", "-");
          }
          // if(jobLevel!="" && jobLevel!=undefined){
          // }
          var userProfileFilters = [];
          userProfileFilters.push(businessGroup, businessUnit, buildingLocation, jobLevel);
          this.state.newsList.filter((news) => {
            news.tags.forEach((tag) => {
              // chekc if incomin tag is for job level
              if (tag.includes('job-level')) {
                tag = tag.split('/')
                tag = tag[tag.length - 1]
              }
              if (userProfileFilters.includes(tag)) {
                this.state.userProfileArticles.push(news);
              }
            })
          })
        }
        // filter the response articles if there are any selected preferences
        if (this.state.selectedPreferenceList.length > 0) {
          preferedNewsList = this.state.newsList.filter((news) => {
            return (
              !news.pinArticle &&
              news.tags &&
              news.tags.some(
                (val) => this.state.selectedPreferenceList.indexOf(val) > -1
              )
            );
          });
        }
        if (this.state.selectedPreferenceList.length > 0) {
          this.state.filterNewsList = this.state.newsList.filter((news) => {
            return news.tags && news.tags.some(val => this.state.selectedPreferenceList.indexOf(val) > -1);
          });
        } else {
          this.state.filterNewsList = this.state.newsList;
        }
        this.state.filterNewsList.sort(function (a, b) {
          return (b.publishedDate - a.publishedDate || a.heading.localeCompare(b.heading));
        });
        if ((ContextHub.getItem('profile').businessGroup || ContextHub.getItem('profile').businessUnit || ContextHub.getItem('profile').buildingLocation || ContextHub.getItem('profile').jobLevel) && (this.state.selectedPreferenceList.length == 0)) {
          //preferedNewsList = userProfileArticles;
          this.state.filterNewsList = userProfileArticles;
        } else if (this.state.selectedPreferenceList.length > 0) {
          //preferedNewsList = this.state.newsList;
          this.state.filterNewsList = preferedNewsList;
        }
        this.setState({
          newsList: this.state.newsList,
          filterNewsList: this.state.filterNewsList,
          userProfileArticles: this.state.userProfileArticles
        },()=>{
          this.getTabsHeading();
        })
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
    //this.getTabsHeading();
  }

  //Function to load the tab headings
  getTabsHeading() {
    let curyear = new Date().getFullYear();
    let i = 3;
    let yearList = [];
    while (i > 0) {
      const yearVal = curyear--;
      const yearObj = {
        year: yearVal,
        data: [],
        pageData: []
      };
      this.state.filterNewsList.forEach((news) => {
        if (new Date(news.publishedDate).getFullYear() === yearVal) {
          yearObj.data.push(news);
        }
      });
      yearObj.pageData = this.paginationDataBuild(yearObj.data, 1);
      yearList.push(yearObj);
      i--;
    }
    this.setState({
      tabHeading: yearList
    })
  }
  
  // sort the preferences
  tagSorting() {
    let businessTag = [];
    let topicsTag = [];
    if (this.state.selectedPreferenceList.length > 0) {
      this.state.selectedPreferenceList.forEach((element) => {
        if (element.split("/")[1] == "business-group") {
          businessTag.push(element);
        } else if (element.split("/")[1] == "topics") {
          topicsTag.push(element);
        }
      });
      businessTag.forEach((element, index) => {
        businessTag[index] = element.split("/")[2];
      });
      topicsTag.forEach((element, index) => {
        topicsTag[index] = element.split("/")[2];
      });
      businessTag.sort();
      topicsTag.sort();
      this.state.selectedPreferenceTags = businessTag.concat(topicsTag);
    }
    this.setState({
      selectedPreferenceTags: this.state.selectedPreferenceTags
    });
  }
  handleAllChecked(event) {
    this.state.businessGroupList.tags.forEach(prefer => {
      if (prefer.title != this.state.defaultBG) {
        prefer.isChecked = event.target.checked
      }
    })
    this.state.topicsList.tags.forEach(prefer => prefer.isChecked = event.target.checked)
    this.setState({
      allChecked: event.target.checked,
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList
    });
  }

  handleCheckChildElement(event) {
    this.state.businessGroupList.tags.forEach(prefer => {
      if (prefer.id === event.target.value)
        prefer.isChecked = event.target.checked
    })
    this.state.topicsList.tags.forEach(prefer => {
      if (prefer.id === event.target.value)
        prefer.isChecked = event.target.checked
    })
    this.setState({
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList
    });
  }

  filteringNewsTabList() {
    this.state.selectedPreferenceList = [];
    let businessTitle = [], topicsTitle = [];
    this.state.businessGroupList.tags.forEach(prefer => {
      if (prefer.isChecked) {
        this.state.selectedPreferenceList.push(prefer.id);
        if (prefer.title !== '') {
          businessTitle.push(prefer.title);
        }
      }
    })
    this.state.topicsList.tags.forEach(prefer => {
      if (prefer.isChecked) {
        this.state.selectedPreferenceList.push(prefer.id);
        if (prefer.title !== '') {
          topicsTitle.push(prefer.title);
        }
      }
    })
    this.state.filterNewsList = [];
    /* preferences apply analytics starts here */
    businessTitle = businessTitle.join();
    topicsTitle = topicsTitle.join();
    console.log(businessTitle, topicsTitle);
    utag.link({
      ev_type: 'other',
      ev_action: 'clk',
      ev_title: 'news-preferences',
      ev_data_one: businessTitle,
      ev_data_two: topicsTitle
    });
    /* preferences apply analytics ends here */
    if (this.state.selectedPreferenceList.length > 0) {
      this.state.filterNewsList = this.state.newsList.filter((news) => {
        return news.tags && news.tags.some(val => this.state.selectedPreferenceList.indexOf(val) > -1);
      });
    } else {
      this.state.filterNewsList = this.state.newsList;
    }
    this.state.filterNewsList.sort(function (a, b) {
      return (b.publishedDate - a.publishedDate || a.heading.localeCompare(b.heading));
    });
    this.getTabsHeading();
    this.setState({
      selectedPreferenceList: this.state.selectedPreferenceList,
      filterNewsList: this.state.filterNewsList
    });
    this.addSelectedPreference();
    this.tagSorting();
    $("#preferenceModal").modal("hide");
    window.location.reload();
  }

  clearAll() {
    this.state.businessGroupList.tags.forEach(prefer => {
      if (prefer.title != this.state.defaultBG) {
        prefer.isChecked = false;
      }
    })
    this.state.topicsList.tags.forEach(prefer => prefer.isChecked = false)
    this.setState({
      allChecked: false,
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList
    });
    this.filteringNewsTabList();
    this.getTabsHeading();
  }

  dateTransform(date) {
    let monthName = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    let d1 = new Date(date);
    let d = d1.getDate();
    let m = d1.getMonth();
    let y = d1.getFullYear();
    return `${monthName[m]} ${d}, ${y}`;
    // return moment(date).format('MMMM DD, YYYY');
  }

  bgBinding(bgList) {
    let bg = "";
    bgList.forEach((data) => {
      let bgarr = data.split('/');
      if (bgarr[1] == "business-group") {
        bg += " | " + bgarr[bgarr.length - 1];
      }
    })
    return bg;
  }

  paginationDataBuild(newsList, page) {
    const pageObj = {
      totalPage: Math.ceil(newsList.length / 10),
      currentPage: page,
      startIndex: (page - 1) * 10,
      endIndex: (page - 1) * 10 + 10,
      startPage: 1,
      endPage: 1,
      pages: []
    };
    pageObj.startPage = Math.max(page - 2, 2);
    pageObj.endPage = page + 2;
    if (page < 3) {
      pageObj.endPage = Math.min(5, pageObj.totalPage - 1);
    } else if (pageObj.totalPage - page < 3) {
      pageObj.startPage = Math.max(pageObj.totalPage - 4, 2);
      pageObj.endPage = pageObj.totalPage - 1;
    }
    for (let p = pageObj.startPage; p <= pageObj.endPage; p++) {
      pageObj.pages.push(p);
    }
    return pageObj;
  }

  setPage(selectedData, page) {
    this.state.tabHeading.forEach(yearData => {
      if (yearData.year == selectedData.year) {
        yearData.pageData = this.paginationDataBuild(yearData.data, page);
      }
    })
    this.setState({
      tabHeading: this.state.tabHeading
    })
  }

  addSelectedPreference() {
    let reqData = {
      "articlefilter": this.state.selectedPreferenceList
    };
    $.ajax({
      type: "POST",
      url: `${this.props.addSelectedPreference}.ugc.addPreference.json`,
      contentType: 'application/json',
      data: JSON.stringify(reqData),
      dataType: "json",
      success: (res) => {
        console.log(res);
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
            <div class="news-widget" data-section="hp investor">
              {this.props.newsToolBar == "true" &&
                <div>
                  <div class="row news-tool-bar">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 tool">
                      <p class="left-text pull-left">{this.props.toolbarLeftText}</p>
                      <div class="preference-tag-container hidden-sm hidden-xs">
                        {this.state.selectedPreferenceTags.slice(0, 4).map((value, index) => {
                          return (<span class="tag">{value}</span>)
                        })}
                        {this.state.selectedPreferenceTags.length > 4 &&
                          <span class="more-tag">{`${this.props.moreText} - ${this.state.selectedPreferenceTags.length - 4}`}</span>
                        }
                      </div>
                      <span class="pull-right">
                        {this.state.selectedPreferenceTags.length > 0 &&
                          <span class="hidden-md hidden-lg">({this.state.selectedPreferenceTags.length})</span>
                        }
                        <a class="right-text" data-target="#preferenceModal" data-toggle="modal" id="preferenceModalLink" href="#preferenceModal">{this.props.toolbarRightText}<span class={`fa ${this.props.iconName}`}></span></a>
                      </span>
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
                            <span class="chk-lbl">{this.props.selectAllText}</span>
                          </p>
                        </div>
                        <div class="modal-body preference-modal-body">
                          <div class="row preference-list">
                            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                              <p class="heading-text">{this.state.businessGroupList.title}</p>
                              <ul class="prefernce-col-list">
                                {this.state.businessGroupList.tags.map((value, index) => {
                                  return (
                                    <li key={index}>
                                      <input type="checkbox" name={value.id} value={value.id} onChange={this.handleCheckChildElement} checked={value.isChecked} disabled={value.isChecked && value.title === this.state.defaultBG} />
                                      <span class="chk-lbl">{value.title}</span>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-8 col-lg-8">
                              <p class="heading-text">{this.state.topicsList.title}</p>
                              <ul class="prefernce-col-list topic-col">
                                {this.state.topicsList.tags.map((value, index) => {
                                  return (
                                    <li key={index}>
                                      <input type="checkbox" name={value.id} value={value.id} onChange={this.handleCheckChildElement} checked={value.isChecked} />
                                      <span class="chk-lbl">{value.title}</span>
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
                              <button class="cmp-form-button pull-right" onClick={this.filteringNewsTabList}>{this.props.preferenceModalHeadingbtn1}</button>
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
                                {Object.keys(this.state.tabHeading[value].data).slice(this.state.tabHeading[value].pageData.startIndex, this.state.tabHeading[value].pageData.endIndex).map((key, index) => {
                                  return (
                                    <div class="news-list-box">
                                      <p>{this.dateTransform(this.state.tabHeading[value].data[key].publishedDate) + this.bgBinding(this.state.tabHeading[value].data[key].tags)}</p>
                                      <p>
                                        <a href={this.state.tabHeading[value].data[key].pagePath}>{this.state.tabHeading[value].data[key].heading}</a>
                                      </p>
                                      <p>{this.state.tabHeading[value].data[key].summary}</p>
                                    </div>
                                  )
                                })}
                                {this.state.tabHeading[value].pageData.totalPage > 1 &&
                                  <div class="pagination-component">
                                    <nav role="navigation" aria-label="Pagination" class="text-center">
                                      <ul className={`pagination pagination-list ${this.state.tabHeading[value].pageData.currentPage < 2 ? 'first-page' : ''} ${this.state.tabHeading[value].pageData.currentPage >= this.state.tabHeading[value].pageData.totalPage ? 'last-page' : ''}`}>
                                        {this.state.tabHeading[value].pageData.currentPage != 1 &&
                                          <li className={`previous ${this.state.tabHeading[value].pageData.currentPage < 2 ? 'disabled' : ''}`}>
                                            <a href="javascript:void(0)" onClick={() => this.setPage(this.state.tabHeading[value], this.state.tabHeading[value].pageData.currentPage - 1)}>
                                              <span class="fa fa-angle-left" aria-hidden="true"></span>
                                              <span>{this.props.previousText}</span>
                                            </a>
                                          </li>
                                        }
                                        <li className={`link-to-first ${this.state.tabHeading[value].pageData.currentPage == 1 ? 'active' : ''}`}>
                                          <a href="javascript:void(0)" aria-label="First Page" onClick={() => this.setPage(this.state.tabHeading[value], 1)}>
                                            <span class="fa fa-angle-double-left" aria-hidden="true"></span>
                                            <span>1</span>
                                          </a>
                                        </li>
                                        {this.state.tabHeading[value].pageData.currentPage >= 5 && this.state.tabHeading[value].pageData.totalPage > 6 &&
                                          <li class="ellipsis"><a><span>&hellip;</span></a></li>
                                        }
                                        {this.state.tabHeading[value].pageData.pages.map((page, index) => {
                                          return (<li key={index} className={(this.state.tabHeading[value].pageData.currentPage == page ? 'active' : '')}><a href="javascript:void(0)" onClick={() => this.setPage(this.state.tabHeading[value], page)}><span>{page}</span></a></li>)
                                        })
                                        }
                                        {(this.state.tabHeading[value].pageData.totalPage - this.state.tabHeading[value].pageData.currentPage) >= 4 && this.state.tabHeading[value].pageData.totalPage > 6 &&
                                          <li class="ellipsis"><a><span>&hellip;</span></a></li>
                                        }
                                        <li class="lastPage">
                                          <a href="javascript:void(0)" onClick={() => this.setPage(this.state.tabHeading[value], this.state.tabHeading[value].pageData.totalPage)}>
                                            <span>{this.state.tabHeading[value].pageData.totalPage}</span>
                                          </a>
                                        </li>
                                        {this.state.tabHeading[value].pageData.currentPage != this.state.tabHeading[value].pageData.totalPage &&
                                          <li className={`next ${this.state.tabHeading[value].pageData.currentPage >= this.state.tabHeading[value].pageData.totalPage ? 'disabled' : ''}`}>
                                            <a href="javascript:void(0)" onClick={() => this.setPage(this.state.tabHeading[value], this.state.tabHeading[value].pageData.currentPage + 1)}>{this.props.nextText}</a>
                                          </li>
                                        }
                                      </ul>
                                      <div class="pagination-indicator">
                                        {`${this.props.pageText} ${this.state.tabHeading[value].pageData.currentPage} ${this.props.ofText} ${this.state.tabHeading[value].pageData.totalPage}`}
                                      </div>
                                    </nav>
                                  </div>
                                }
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
