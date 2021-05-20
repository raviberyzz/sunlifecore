class NewsTabs extends React.Component {
  constructor(props) {
    super(props);
    var defaultUserBL = "";
	var defaultUserCountry = "";
	defaultUserCountry = profileData.country.replace(/[^a-zA-Z0-9]/g, "-");
    defaultUserBL = "sunlife:source/building-location/" + defaultUserCountry.toLowerCase() + "/all";
    this.state = {
      defaultBL: defaultUserBL,
      pageLang: utag_data.page_language,
      businessLocationList: {
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
      userProfileArticles: [],
      buildingLocationIdTitle: [],
      loading: true,
      buildingLocationIdTitle: []
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
    this.tabClick = this.tabClick.bind(this);
    this.accordionClick = this.accordionClick.bind(this);
  }

  componentDidMount() {
    this.retrieveSelectedPreference();
    //this.getPreferenceList();
    //this.getTabsNewsList();
    //this.tagSorting();
  }

  componentDidUpdate() {
    this.state.filterNewsList.forEach((newsItem) => {
      if (newsItem.linkOption == "lightbox" && newsItem.pagePath) {
        const vidyardEmbedCode = newsItem.pagePath.replace('fn_vidyard_','');
        if (!document.getElementById(`vidyard_embed_code_${vidyardEmbedCode}`)) {
          const script = document.createElement("script");
          script.id=`vidyard_embed_code_${vidyardEmbedCode}`;
          script.src = `//play.vidyard.com/${vidyardEmbedCode}.js?v=3.1.1&type=lightbox`;
          script.async = true;
          document.head.appendChild(script);
        }
      }
    })
  }
  // get the selected preferences on page load
  retrieveSelectedPreference() {
    $.ajax({
      type: "GET",
      url: `${this.props.resourcePath}.ugc.retrievePreference.json`,
      dataType: "json",
      success: (res) => {
        this.state.selectedPreferenceList = res;
        this.setState({
          selectedPreferenceList: this.state.selectedPreferenceList,
        }, () => {
          //this.tagSorting();
          this.getPreferenceList();
        })
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
      url: `${this.props.getPrefernceListUrl}.tags.${this.state.pageLang}.json`,
      dataType: "json",
      success: (res) => {
        this.state.buildingLocationIdTitle = [];
        this.state.businessLocationList = res["building-location"];
        this.state.topicsList = res["topic"];
        this.state.businessLocationList.tags.forEach((data, index) => {
		  var dataId = data.id+"/all";
          if (data.id == "sunlife:source/building-location/all" || data.id == "sunlife:source/building-location/na") {
			dataId = data.id;
            this.state.businessLocationList.tags.splice(index, 1);
          }
          var obj = {};
          obj[dataId] = data.title;
          this.state.buildingLocationIdTitle.push(obj);
          data["isChecked"] = false;
          if (this.state.defaultBL != "" && this.state.defaultBL != undefined) {
            if (dataId == this.state.defaultBL) {
              data["isChecked"] = true;
            }
          }
          this.state.selectedPreferenceList.forEach(prefer => {
            if (prefer === dataId) {
              data["isChecked"] = true;
            }
          })
        });
        this.state.businessLocationList.tags.forEach((data, index) => {
          if (data.id == "sunlife:source/building-location/na") {
            this.state.businessLocationList.tags.splice(index, 1);
          }
        });
		this.state.businessLocationList.tags.forEach((data, index) => {
          if (data.id == "sunlife:source/building-location/china") {
            this.state.businessLocationList.tags.splice(index, 1);
          }
        });
		this.state.businessLocationList.tags.forEach((data, index) => {
          if (data.id == "sunlife:source/building-location/malaysia") {
            this.state.businessLocationList.tags.splice(index, 1);
          }
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
          businessLocationList: this.state.businessLocationList,
          topicsList: this.state.topicsList,
          buildingLocationIdTitle: this.state.buildingLocationIdTitle,
        }, () => {
          this.tagSorting();
          setTimeout(() => {
            this.getTabsNewsList();
          }, 1000)
        })
        //this.getTabsNewsList();
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
      url: `${this.props.resourcePath}.news.${this.state.pageLang}.json`,
      dataType: "json",
      success: (response) => {
        this.state.newsList = response;
        let preferedNewsList = [];
        //Sort all the article by date
        var sortArticle;
        this.state.newsList.sort(function (a, b) {
          sortArticle = new Date(b.publishedDate) - new Date(a.publishedDate)
          if (sortArticle == 0) {
            sortArticle = a.heading.localeCompare(b.heading)
          }
          return sortArticle
        });
        // filter the response articles by user profile data if user profile data exists
        if (profileData.businessGroup !== undefined && profileData.businessUnit !== undefined && profileData.buildingLocation !== undefined && profileData.jobLevel !== undefined) {
          if (profileData.businessGroup !== "" || profileData.businessUnit !== "" || profileData.buildingLocation !== "" || profileData.jobLevel !== "") {
            var businessGroup = profileData.businessGroup.replace(/[^a-zA-Z0-9]/g, "-");
            var businessUnit = profileData.businessUnit.replace(/[^a-zA-Z0-9]/g, "-");
            var buildingLocation = profileData.buildingLocation.replace(/[^a-zA-Z0-9]/g, "-");
			var country = profileData.country.replace(/[^a-zA-Z0-9]/g, "-");
            var jobLevel = "/" + profileData.jobLevel.replace(/[^a-zA-Z0-9]/g, "-");
            if (businessGroup != "" && businessGroup != undefined) {
              businessGroup = "sunlife:source/business-group/" + businessGroup.toLowerCase();
            }
            if (businessUnit != "" && businessUnit != undefined) {
              businessUnit = "sunlife:source/business-unit/" + businessUnit.toLowerCase();
            }
            if (buildingLocation != "" && buildingLocation != undefined) {
              buildingLocation = "/" + buildingLocation.toLowerCase();
            }
            var userProfileFilters = [];
            var userBUFilters = [];
            var userBLFilters = [];
            var userJobLevelFilters = []
            //userProfileFilters.push(businessGroup, businessUnit, buildingLocation, jobLevel, "sunlife:source/business-group/all", "sunlife:source/job-level/all/all");
            businessGroup !== "sunlife:source/business-group/na" ? userProfileFilters.push(businessGroup, "sunlife:source/business-group/all", "sunlife:source/business-group/na") : userProfileFilters.push(businessGroup, "sunlife:source/business-group/all");
            /*userProfileFilters.forEach((val) => {
              this.state.selectedPreferenceList.forEach((prefer) => {
                if (val !== prefer) {
                  userProfileFilters.push(prefer);
                }
              })
            })*/
            let userBGFilters = userProfileFilters.filter((c, index) => {
              return userProfileFilters.indexOf(c) === index;
            });
            businessUnit !== "sunlife:source/business-unit/na" ? userBUFilters.push(businessUnit, "sunlife:source/business-unit/all", "sunlife:source/business-unit/na") : userBUFilters.push(businessUnit, "sunlife:source/business-unit/all");
            buildingLocation !== "NA" ? userBLFilters.push(buildingLocation, "sunlife:source/building-location/"+country.toLowerCase()+"/all", "sunlife:source/building-location/all", "sunlife:source/building-location/na") : userBLFilters.push(buildingLocation, "sunlife:source/building-location/"+country.toLowerCase()+"/all", "sunlife:source/building-location/all");
            jobLevel !== "NA" ? userJobLevelFilters.push(jobLevel, "/all", "/na") : userJobLevelFilters.push(jobLevel, "/all");
            // filter the articles by BG first and then the result by BU and result by BL and result by JL
            var BGArticles, BUArticles;
            var BLArticles = [];
            var JLArticles = [];
            BGArticles = this.state.newsList.filter((news) => {
              //Articles filtered by business Group
              return (news.tags && news.tags.some((val) => userBGFilters.indexOf(val) > -1))
            })
            BUArticles = BGArticles.filter((news) => {
              return (news.tags && news.tags.some((val) => userBUFilters.indexOf(val) > -1));
            })
			userBLFilters.forEach((val) => {
              this.state.selectedPreferenceList.forEach((prefer) => {
                if (val !== prefer) {
                  userBLFilters.push(prefer);
                }
              })
            })
			
			let userBLFiltersVar = userBLFilters.filter((c, index) => {
              return userBLFilters.indexOf(c) === index;
            });
            BUArticles.forEach((news) => {
              news.tags && news.tags.forEach((val) => {
                if (val.indexOf('/building-location') > -1) {
                  userBLFiltersVar.forEach((filter) => {
                    //if (val.substring(val.lastIndexOf("/")) === filter) {
					if ("sunlife:source/building-location/all" === filter && val === filter) {
						BLArticles.push(news);
						return;
					} else if (val === filter) {
						BLArticles.push(news);
						return;
					} else {
						if(val.substring(val.lastIndexOf("/")) === filter) {
							BLArticles.push(news);
							return;
						}							
                    }
                  })
                }
              })
            });
			let userBLArticlesArr = BLArticles.filter((c, index) => {
              return BLArticles.indexOf(c) === index;
            });
            userBLArticlesArr.forEach((news) => {
              news.tags && news.tags.forEach((val) => {
                if (val.indexOf('/job-level') != -1) {
                  /* val = val.split('/');
                   val = val[val.length - 1];*/
                  // val = val.replace(/-/g, ".");
                  userJobLevelFilters.forEach((filter) => {
                    if (val.substring(val.lastIndexOf("/")) === filter) {
                      JLArticles.push(news);
                      return
                    }
                  })
                }
              });
            })
            JLArticles.forEach((news, index) => {
              if (!(news.tags.indexOf(businessGroup) > -1)) {
                news.tags.forEach((val) => {
                  if (val.indexOf('/job-level')) {
                    if (val.substring(val.lastIndexOf("/")) === jobLevel) {
                      JLArticles.splice(index, 1);
                    }
                  }

                })
              }
            })
            //Sort result Articles for pinned Articles.
            var sortedArticle;
            JLArticles.sort(function (a, b) {
              sortedArticle = new Date(b.publishedDate) - new Date(a.publishedDate)
              if (sortedArticle == 0) {
                sortedArticle = a.heading.localeCompare(b.heading)
              }
              return sortedArticle
            });
            //this.state.userProfileArticles = JLArticles;
            this.setState({
              newsList: this.state.newsList,
              //filterNewsList: this.state.filterNewsList,
              filterNewsList: JLArticles,
              userProfileArticles: JLArticles,
              pinnedNewsList: this.state.pinnedNewsList,
              loading: false
            }, () => {
              this.getTabsHeading();
            });
          }
        }
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
        if (element.split("/")[1] == "building-location") {
          this.state.buildingLocationIdTitle.forEach((obj) => {
            if (Object.keys(obj)[0] == element) {
              if(element !== this.state.defaultBL){
                businessTag.push(obj[element.toString()]);
              }
            }
          })
        } else if (element.split("/")[1] == "topic") {
          this.state.topicsList.tags.forEach((data) => {
            if (data.id == element) {
              topicsTag.push(data.title);
            }
          })
          // topicsTag.push(element);
        }
      });
      /*businessTag.forEach((element, index) => {
        businessTag[index] = element.split("/")[2];
      });*/
      /*topicsTag.forEach((element, index) => {
        topicsTag[index] = element.split("/")[2];
      });*/
      businessTag.sort();
      topicsTag.sort();
      this.state.selectedPreferenceTags = businessTag.concat(topicsTag);
    }
    this.setState({
      selectedPreferenceTags: this.state.selectedPreferenceTags
    });
  }
  handleAllChecked(event) {
    this.state.businessLocationList.tags.forEach(prefer => {
      if (prefer.id != this.state.defaultBL) {
        prefer.isChecked = event.target.checked
      }
    })
    this.state.topicsList.tags.forEach(prefer => prefer.isChecked = event.target.checked)
    this.setState({
      allChecked: event.target.checked,
      businessLocationList: this.state.businessLocationList,
      topicsList: this.state.topicsList
    });
  }

  handleCheckChildElement(event) {
    this.state.businessLocationList.tags.forEach(prefer => {
      if (prefer.id + "/all" === event.target.value)
        prefer.isChecked = event.target.checked
    })
    this.state.topicsList.tags.forEach(prefer => {
      if (prefer.id === event.target.value)
        prefer.isChecked = event.target.checked
    })
    this.setState({
      businessLocationList: this.state.businessLocationList,
      topicsList: this.state.topicsList
    });
  }

  filteringNewsTabList() {
    this.state.selectedPreferenceList = [];
    let businessTitle = [], topicsTitle = [];
    this.state.businessLocationList.tags.forEach(prefer => {
      if (prefer.isChecked && prefer.id + "/all" !== this.state.defaultBL) {
        this.state.selectedPreferenceList.push(prefer.id + "/all");
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
    utag.link({
      ev_type: 'other',
      ev_action: 'clk',
      ev_title: 'news-preferences',
      ev_data_one: businessTitle,
      ev_data_two: topicsTitle
    });
    /* preferences apply analytics ends here */
    if (this.state.selectedPreferenceList.length > 0) {
      this.state.filterNewsList = this.state.userProfileArticles.filter((news) => {
        return news.tags && news.tags.some(val => this.state.selectedPreferenceList.indexOf(val) > -1);
      });
    } else {
      this.state.filterNewsList = this.state.userProfileArticles;
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
    this.state.businessLocationList.tags.forEach(prefer => {
      if (prefer.id != this.state.defaultBL) {
        prefer.isChecked = false;
      }
    })
    this.state.topicsList.tags.forEach(prefer => prefer.isChecked = false)
    this.state.selectedPreferenceList = [];
    this.setState({
      allChecked: false,
      businessLocationList: this.state.businessLocationList,
      topicsList: this.state.topicsList,
      selectedPreferenceList: this.state.selectedPreferenceList
    });
    this.addSelectedPreference()
    this.filteringNewsTabList();
    this.getTabsHeading();
  }

  dateTransform(date) {
    let monthName = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const EnTofr = {
      "January": "janvier",
      "February": "février",
      "March": "mars",
      "April": "avril",
      "May": "mai",
      "June": "juin",
      "July": "juillet",
      "August": "août",
      "September": "septembre",
      "October": "octobre",
      "November": "novembre",
      "December": "décembre"
    }
    let d1 = new Date(date);
    let d = d1.getDate();
    let m = d1.getMonth();
	let y = d1.getFullYear();
    let month = monthName[m]
    if ($('html').attr('lang') == "fr-CA") {
      month = EnTofr[month];
	  var dispDate = `${d} ${month} ${y}`;
	  return dispDate.toLowerCase();
    }else {
	  return `${month} ${d}, ${y}`;
	}
    // return moment(date).format('MMMM DD, YYYY');
  }

  bgBinding(bgList) {
	var titleSet = new Set();
    bgList.filter((id, i) => {
		if(id.indexOf('building-location') > 1){
		  id = id.indexOf('/all') > 1 ? id : id.replace(id.replace(/.*building-location\/.*?\//gi,''),'all');
		  this.state.buildingLocationIdTitle.forEach((obj) => {
			if (Object.keys(obj) == id) {
			  titleSet.add(obj[id]);
			}
		  });
		}
    });
    var titleArr = [];
	titleSet.forEach(function(v){titleArr.push(v)});
    return titleArr.join(' | ');
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
      url: `${this.props.resourcePath}.ugc.addPreference.json`,
      contentType: 'application/json',
      data: JSON.stringify(reqData),
      dataType: "json",
      success: (res) => {

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  tabClick() {
    var selectedTab = event.target;
    var selectedTabID = selectedTab['id'];
    var selectedTabIndex = selectedTabID.split('cmp-tabs__tab').pop();
    selectedTab.classList.add('cmp-tabs__tab--active');
    var tabContentId = "cmp-tabs__tabpanel" + selectedTabIndex;
    var container = document.getElementById(tabContentId);
    var classElems = document.getElementsByClassName('cmp-tabs__tabpanel');
    var tabs = document.getElementsByClassName('cmp-tabs__tab');
    container.classList.add('cmp-tabs__tabpanel--active');
    for (var i = 0; i < classElems.length; i++) {
      if (i == selectedTabIndex) {
        for (var k = i - 1; k >= 0; k--) {
          classElems[k].classList.remove('cmp-tabs__tabpanel--active');
          tabs[k].classList.remove('cmp-tabs__tab--active');
        }
        for (var j = i + 1; j <= classElems.length - 1; j++) {
          classElems[j].classList.remove('cmp-tabs__tabpanel--active');
          tabs[j].classList.remove('cmp-tabs__tab--active');
        }
      }
    }
  }
  accordionClick() {
    if (window.innerWidth < 768) {
      var selectedAccordian = event.target;
      var selectedAccordianID = selectedAccordian['id'];
      var selectedAccordianIndex = selectedAccordianID.split('tab-accordian-heading').pop();
      //
      if (selectedAccordian.getAttribute('aria-expanded') == "true") {
        var item = "responsivegrid" + selectedAccordianIndex;
        var accContItem = "tab-accordian-heading" + selectedAccordianIndex;
        document.getElementById(item).classList.remove("accordian-container-active");
        document.getElementById(accContItem).setAttribute('aria-expanded', 'false');
      } else {
        selectedAccordian.setAttribute('aria-expanded', 'true');
        var accordianContentId = "responsivegrid" + selectedAccordianIndex;
        var activeAccordianContainer = document.getElementById(accordianContentId);
        activeAccordianContainer.classList.add('accordian-container-active');
        var accordianContainer = document.getElementsByClassName('accordianContainer');
        for (var i = 0; i < accordianContainer.length; i++) {
          if (i != selectedAccordianIndex) {
            accordianContainer[i].classList.remove('accordian-container-active');
            document.getElementById("tab-accordian-heading" + i).setAttribute('aria-expanded', 'false');
          }
        }
      }
    }
  }

  newsLinkClick(linkOption, pagePath) {
    if (linkOption == "lightbox") {
        window[pagePath]();
    }
  }
  render() {
    return (
      <div>
        { this.state.loading && (<div class="loaderContainer"><i class="fa fa-spinner fa-pulse"></i><div class="loaderText"><p><strong>{this.props.loading}</strong></p><p>{this.props.loadingText}</p></div></div>)}
        {!this.state.loading && (
          <div class="news-wrapper" id="news-wrapper-container">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 " data-analytics="tab0">
                <div class="news-widget" data-section="hp-news">
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
                              <span class="more-tag" data-target="#preferenceModal" data-toggle="modal">{`${this.props.moreText} - ${this.state.selectedPreferenceTags.length - 4}`}</span>
                            }
                          </div>
                          <span class="pull-right">
                            {this.state.selectedPreferenceTags.length > 0 &&
                              <span>({this.state.selectedPreferenceTags.length}){" "}</span>
                            }
                            <a class="right-text" data-target="#preferenceModal" data-toggle="modal" id="preferenceModalLink" href="#preferenceModal">{this.props.toolbarRightText}<span class={`fa ${this.props.iconName}`}></span></a>
                          </span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 horizontal-middle-align"></div>
                      </div>
                      <div id="preferenceModal" class="modal fade preference-popup-wrapper horizontal-middle-align col-xs-12" role="dialog">
                        <div class="modal-dialog preference-modaldialog">
                          <div class="modal-content horizontal-middle-align col-sm-12">
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
                                  <p class="heading-text">{this.state.businessLocationList.title}</p>
                                  <ul class="prefernce-col-list">
                                    {this.state.businessLocationList.tags.map((value, index) => {
                                      return (
                                        <li key={index}>
                                          <input type="checkbox" name={`${value.id}/all`} value={`${value.id}/all`} onChange={this.handleCheckChildElement} checked={value.isChecked} class={`${value.id}/all` == this.state.defaultBL ? "disableCB" : ""} disabled={value.isChecked && `${value.id}/all` === this.state.defaultBL} />
                                          <span class={`chk-lbl ${value.id+'/all' == this.state.defaultBL ? "disableCB" : ""}`}>{value.title}</span>
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
                                        <li key={index} class="preference-listItems">
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
                                <li role="presentation" key={index} id={"cmp-tabs__tab" + index} class={`cmp-tabs__tab ${index == 0 ? "cmp-tabs__tab--active" : ""}`} tabindex={index} data-cmp-hook-tabs="tab" aria-controls={this.state.tabHeading[value].year} aria-selected={index == 0 ? "true" : "false"} onClick={this.tabClick} >{this.state.tabHeading[value].year}
                                </li>
                              )
                            })}
                          </ol>
                          {Object.keys(this.state.tabHeading).map((value, index) => {
                            return (
                              <div role="tabpanel" tabindex={index} id={"cmp-tabs__tabpanel" + index} class={`cmp-tabs__tabpanel ${index == 0 ? "cmp-tabs__tabpanel--active" : ""}`} data-cmp-hook-tabs="tabpanel" ref={this.tabContent}>
                                <div class="tab-accordian-heading visible-xs hidden-sm hidden-md hidden-lg" id={"tab-accordian-heading" + index} aria-expanded={`${index == 0 ? "true" : "false"}`} tabindex={index} onClick={this.accordionClick}>{this.state.tabHeading[value].year}</div>
                                <div class={`accordianContainer ${index == 0 ? 'accordian-container-active' : ""}`} id={"responsivegrid" + index}>
                                  <div class="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                                    {Object.keys(this.state.tabHeading[value].data).slice(this.state.tabHeading[value].pageData.startIndex, this.state.tabHeading[value].pageData.endIndex).map((key, index) => {
                                      return (
                                        <div class="news-list-box">
                                          <p>{this.dateTransform(this.state.tabHeading[value].data[key].publishedDate) + " | " + this.bgBinding(this.state.tabHeading[value].data[key].tags)}
                                          </p>
                                          <p>                                  
                                            {this.state.tabHeading[value].data[key].linkOption == "lightbox" && 
                                            <i class="fa fa-play-circle" aria-hidden="true">&nbsp;</i> } 
                                            {this.state.tabHeading[value].data[key].linkOption == "newWindow" && 
                                            <i class="fa fa-external-link" aria-hidden="true">&nbsp;</i> }
                                            <a 
                                              href= {this.state.tabHeading[value].data[key].linkOption == "lightbox"?null:this.state.tabHeading[value].data[key].pagePath}
                                              tabindex={this.state.tabHeading[value].data[key].linkOption == "lightbox"?"0":null}
                                              target={this.state.tabHeading[value].data[key].linkOption == "newWindow"?"_blank":null}
                                              rel={this.state.tabHeading[value].data[key].linkOption == "newWindow"?"noreferrer noopener":null}
                                              aria-label={(this.state.tabHeading[value].data[key].linkOption == "lightbox"?("Play video, " + this.state.tabHeading[value].data[key].heading + " Opens in a modal"):null)}
                                              onKeyDown={event => {
                                                if (event.key === "Enter" && this.state.tabHeading[value].data[key].linkOption == "lightbox") {
                                                    window[this.state.tabHeading[value].data[key].pagePath]();                                    
                                                  } 
                                              }}
                                            onClick={ (e) => this.newsLinkClick(this.state.tabHeading[value].data[key].linkOption, this.state.tabHeading[value].data[key].pagePath)}
                                            >{this.state.tabHeading[value].data[key].heading}</a>
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
                                                <a href="#news-wrapper-container" onClick={() => this.setPage(this.state.tabHeading[value], this.state.tabHeading[value].pageData.currentPage - 1)}>
                                                  <span class="fa fa-angle-left" aria-hidden="true"></span>
                                                  <span class="">{this.props.previousText}</span>
                                                </a>
                                              </li>
                                            }
                                            <li className={`link-to-first ${this.state.tabHeading[value].pageData.currentPage == 1 ? 'active' : ''}`}>
                                              <a href="#news-wrapper-container" aria-label="First Page" onClick={() => this.setPage(this.state.tabHeading[value], 1)}>
                                                <span class="fa fa-angle-double-left" aria-hidden="true"></span>
                                                <span>1</span>
                                              </a>
                                            </li>
                                            {this.state.tabHeading[value].pageData.currentPage >= 5 && this.state.tabHeading[value].pageData.totalPage > 6 &&
                                              <li class="ellipsis"><a><span>&hellip;</span></a></li>
                                            }
                                            {this.state.tabHeading[value].pageData.pages.map((page, index) => {
                                              return (<li key={index} className={(this.state.tabHeading[value].pageData.currentPage == page ? 'active' : '')}><a href="#news-wrapper-container" onClick={() => this.setPage(this.state.tabHeading[value], page)}><span>{page}</span></a></li>)
                                            })
                                            }
                                            {(this.state.tabHeading[value].pageData.totalPage - this.state.tabHeading[value].pageData.currentPage) >= 4 && this.state.tabHeading[value].pageData.totalPage > 6 &&
                                              <li class="ellipsis"><a><span>&hellip;</span></a></li>
                                            }
                                            <li className={`lastPage ${this.state.tabHeading[value].pageData.currentPage == this.state.tabHeading[value].pageData.totalPage ? 'active' : ''}`}>
                                              <a href="#news-wrapper-container" onClick={() => this.setPage(this.state.tabHeading[value], this.state.tabHeading[value].pageData.totalPage)}>
                                                <span>{this.state.tabHeading[value].pageData.totalPage}</span>
                                              </a>
                                            </li>
                                            {this.state.tabHeading[value].pageData.currentPage != this.state.tabHeading[value].pageData.totalPage &&
                                              <li className={`next ${this.state.tabHeading[value].pageData.currentPage >= this.state.tabHeading[value].pageData.totalPage ? 'disabled' : ''}`}>
                                                <a href="#news-wrapper-container" onClick={() => this.setPage(this.state.tabHeading[value], this.state.tabHeading[value].pageData.currentPage + 1)}>{this.props.nextText}</a>
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
        )}
      </div>
    );
  }
}
reactComponents["news-tabs"] = NewsTabs;
