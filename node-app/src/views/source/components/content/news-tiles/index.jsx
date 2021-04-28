class NewsTiles extends React.Component {
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
        tags: [],
      },
      topicsList: {
        tags: [],
      },
      allChecked: false,
      selectedPreferenceList: [],
      buildingLocationIdTitle: [],
      newsList: [],
      filterNewsList: [],
      selectedPreferenceTags: [],
      pinnedNewsList: [],
      userProfileArticles: [],
      loading: true
    };

    //this.getNewsTilesData = this.getNewsTilesData.bind(this);
    this.handleAllChecked = this.handleAllChecked.bind(this);
    this.handleCheckChildElement = this.handleCheckChildElement.bind(this);
    this.bgBinding = this.bgBinding.bind(this);
    this.dateTransform = this.dateTransform.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.filteringNewsList = this.filteringNewsList.bind(this);
    this.tagSorting = this.tagSorting.bind(this);
    this.getNewsList = this.getNewsList.bind(this);
    this.getPreferenceList = this.getPreferenceList.bind(this);
    this.addSelectedPreference = this.addSelectedPreference.bind(this);
    this.retrieveSelectedPreference = this.retrieveSelectedPreference.bind(
      this
    );
    this.mergeArray = this.mergeArray.bind(this);
    this.newsTileClick = this.newsTileClick.bind(this);
    //this.clearPreferences = this.clearPreferences.bind(this);
  }

  componentDidMount() {
    this.retrieveSelectedPreference();
    //this.getPreferenceList();
    //this.getNewsList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedPreferenceList !== this.state.selectedPreferenceList) {
      this.tagSorting();
    }
    if (prevState.selectedPreferenceTags !== this.state.selectedPreferenceTags) {
      this.tagSorting();
    }
  }
  // get the Selected Preferences 
  retrieveSelectedPreference() {
    $.ajax({
      type: "GET",
      url:
        `${this.props.resourcePath}.ugc.retrievePreference.json`,
      dataType: "json",
      success: (res) => {
        this.state.selectedPreferenceList = res;
        this.setState({
          selectedPreferenceList: this.state.selectedPreferenceList,
        }, () => {
          // this.tagSorting();
          this.getPreferenceList();
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    /*fetch(`${this.props.resourcePath}.ugc.retrievePreference.json`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then((response) => {
        this.state.selectedPreferenceList = response;
        this.setState({
          selectedPreferenceList: this.state.selectedPreferenceList,
        }, () => {
          // this.tagSorting();
          this.getPreferenceList();
        });
      })
      .catch((error) => {
        console.log(error);
      })*/
  }

  // get Preferences tag for pop modal 
  getPreferenceList() {
    $.ajax({
      type: "GET",
      url: `${this.props.getPrefernceListUrl}.tags.${this.state.pageLang}.json`,
      dataType: "json",
      success: (response) => {
        this.state.buildingLocationIdTitle = [];
        this.state.businessLocationList = response["building-location"];
        this.state.topicsList = response["topic"];
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
          if (this.state.selectedPreferenceList.length > 0) {
            this.state.selectedPreferenceList.forEach((prefer) => {
              if (prefer === dataId) {
                data["isChecked"] = true;
              }
            });
          }
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
        // remvoe global and and na tags from preference modal
        this.state.topicsList.tags.forEach((data) => {
          data["isChecked"] = false;
          this.state.selectedPreferenceList.forEach((prefer) => {
            if (prefer === data.id) {
              data["isChecked"] = true;
            }
          });
        });
        this.setState({
          businessLocationList: this.state.businessLocationList,
          topicsList: this.state.topicsList,
          buildingLocationIdTitle: this.state.buildingLocationIdTitle,
        }, () => {
          this.tagSorting();
          setTimeout(() => {
            this.getNewsList();
          }, 30)
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Get all the news Articles 
  getNewsList() {
    $.ajax({
      type: "GET",
      url: `${this.props.resourcePath}.news.${this.state.pageLang}.json`,
      dataType: "json",
      success: (response) => {
        this.state.newsList = response;
        let userProfileArticles = [];
        let preferedNewsList = [];
        //Sort all the article by date
        var articleByDate;
        this.state.newsList.sort(function (a, b) {
          articleByDate = new Date(b.publishedDate) - new Date(a.publishedDate);
          if (articleByDate == 0) {
            articleByDate = a.heading.localeCompare(b.heading)
          }
          return articleByDate
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
            //  filter from the BUArticles for Building Location articles
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
			
            // filter from Building Location Articles for JobLevel articles 
            userBLArticlesArr.forEach((news) => {
              news.tags && news.tags.forEach((val) => {
                if (val.indexOf('/job-level') != -1) {
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
            var pinnedArticles = JLArticles.filter((news) => {
              return news.pinArticle;
            })
            var nonPinnedArticles = JLArticles.filter((news) => {
              return !news.pinArticle;
            })
            var sortedPinArticles;
            pinnedArticles.sort(function (a, b) {
              sortedPinArticles = a.pinArticle - b.pinArticle;
              if (sortedPinArticles == 0) {
                sortedPinArticles = new Date(b.publishedDate) - new Date(a.publishedDate)
              }
              return sortedPinArticles
            })
            var publishedDateArticles;
            nonPinnedArticles.sort(function (a, b) {
              publishedDateArticles = new Date(b.publishedDate) - new Date(a.publishedDate);
              if (publishedDateArticles == 0) {
                publishedDateArticles = a.heading.localeCompare(b.heading);
              }
              return publishedDateArticles
            })
            JLArticles = pinnedArticles.concat(nonPinnedArticles);
            //this.state.userProfileArticles = JLArticles;
            this.setState({
              newsList: this.state.newsList,
              //filterNewsList: this.state.filterNewsList,
              filterNewsList: JLArticles,
              userProfileArticles: JLArticles,
              pinnedNewsList: pinnedArticles,
              loading: false
            }, () => {
              this.tagSorting();
            });
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleAllChecked(event) {
    this.state.businessLocationList.tags.forEach((prefer) => {
      if (prefer.id + "/all" != this.state.defaultBL) {
        prefer.isChecked = event.target.checked;
      }
    });
    this.state.topicsList.tags.forEach(
      (prefer) => (prefer.isChecked = event.target.checked)
    );
    this.setState({
      allChecked: event.target.checked,
      businessLocationList: this.state.businessLocationList,
      topicsList: this.state.topicsList,
    });
  }

  handleCheckChildElement(event) {
    this.state.businessLocationList.tags.forEach((prefer) => {
      if (prefer.id + "/all" === event.target.value)
        prefer.isChecked = event.target.checked;
    });
    this.state.topicsList.tags.forEach((prefer) => {
      if (prefer.id === event.target.value)
        prefer.isChecked = event.target.checked;
    });
    this.setState({
      businessLocationList: this.state.businessLocationList,
      topicsList: this.state.topicsList,
    });
  }

  // clear all preferences from pop up modal 
  clearAll() {
    this.setState({
      loading: true
    });
    this.state.businessLocationList.tags.forEach((prefer) => {
      if (prefer.id + "/all" != this.state.defaultBL) {
        prefer.isChecked = false;
      }
    });
    this.state.topicsList.tags.forEach((prefer) => (prefer.isChecked = false));
    this.state.selectedPreferenceList = [];
    this.setState({
      allChecked: false,
      businessLocationList: this.state.businessLocationList,
      topicsList: this.state.topicsList,
      selectedPreferenceList: this.state.selectedPreferenceList
    });
    //this.filteringNewsList();
    this.addSelectedPreference();
    //this.clearPreferences();
    this.tagSorting();
    $("#preferenceModal").modal("hide");
  }

  /*clearPreferences() {
    this.state.selectedPreferenceList = [];
  }*/

  filteringNewsList() {
    this.setState({
      loading: true
    });
    this.state.selectedPreferenceList = [];
    let businessTitle = [], topicsTitle = [];
    this.state.businessLocationList.tags.forEach((prefer) => {
      if (prefer.isChecked) {
        this.state.selectedPreferenceList.push(prefer.id + "/all");
        if (prefer.title !== '') {
          businessTitle.push(prefer.title);
        }

      }
    });
    this.state.topicsList.tags.forEach((prefer) => {
      if (prefer.isChecked) {
        this.state.selectedPreferenceList.push(prefer.id);
        if (prefer.title !== '') {
          topicsTitle.push(prefer.title);
        }
      }
    });
    //let pinnedNewsList = [];
    let preferedNewsList = [];
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
      preferedNewsList = this.state.userProfileArticles.filter((news) => {
        return (
          !news.pinArticle &&
          news.tags &&
          news.tags.some(
            (val) => this.state.selectedPreferenceList.indexOf(val) > -1
          )
        );
      });
    } else {
      preferedNewsList = this.state.userProfileArticles;
    }
    var sortedArticles;
    preferedNewsList.sort(function (a, b) {
      sortedArticles = new Date(b.publishedDate) - new Date(a.publishedDate)
      if (sortedArticles == 0) {
        sortedArticles = a.heading.localeCompare(b.heading)
      }
      return sortedArticles
    });
    if (this.state.pinnedNewsList.length > 0) {
      this.state.filterNewsList = this.mergeArray(
        preferedNewsList,
        this.state.pinnedNewsList,
        this.state.pinnedNewsList[0].pinArticle - 1
      );
    }
    this.setState({
      selectedPreferenceList: this.state.selectedPreferenceList,
      filterNewsList: this.state.filterNewsList,
    });
    this.addSelectedPreference();
    this.tagSorting();
    $("#preferenceModal").modal("hide");
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

  dateTransform(date) {
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
    const EnToFr = {
      "Jan": "janv.",
      "Feb": "févr.",
      "Mar": "mars",
      "Apr": "avril",
      "may": "mai",
      "Jun": "juin",
      "july": "juil.",
      "Aug": "août",
      "Sep": "sept.",
      "Oct": "oct.",
      "Nov": "nov.",
      "Dec": "déc."
    }
    let d1 = new Date(date);
    let d = d1.getDate();
    let m = d1.getMonth();
    var month = monthName[m];
    if ($('html').attr('lang') == "fr-CA") {
      month = EnToFr[month];
	  return d + " " + month;
    }else {
	  return month + " " + d;
	}
    //return monthName[m] + " " + d;
    // return moment(date).format('MMM DD');
  }

  tagSorting() {
    let businessTag = [];
    let topicsTag = [];
    if (this.state.selectedPreferenceList.length > 0) {
      this.state.selectedPreferenceList.forEach((element) => {
        if (
          element.split("/")[1] == "building-location"
        ) {
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
          //topicsTag.push(element);
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
      selectedPreferenceTags: this.state.selectedPreferenceTags,
      //loading: false
    });
  }

  addSelectedPreference() {
    let reqData = {
      articlefilter: this.state.selectedPreferenceList,
    };
    $.ajax({
      type: "POST",
      url:
        `${this.props.resourcePath}.ugc.addPreference.json`,
      contentType: "application/json",
      data: JSON.stringify(reqData),
      dataType: "json",
      success: (res) => {
        setTimeout(() => {
          this.retrieveSelectedPreference()
        }, 100);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  /* getNewsTilesData() {
     this.retrieveSelectedPreference();
   } */

  mergeArray(a, b, i) {
    return a.slice(0, i).concat(b, a.slice(i));
  }
  newsTileClick(key, index, event) {
    //console.log(this.state.filterNewsList);
    /* homepage analytics starts here */
    utag.link({
      ev_type: "other",
      ev_action: "clk",
      ev_title: this.state.filterNewsList[key].heading,
      ev_data_one: "hp-news-" + index,
    });
    /* homepage analytics ends here */
if (this.state.filterNewsList[key].linkOption == "lightbox") {
      window[this.state.filterNewsList[key].pagePath]();
    } 
  }


  render() {
    return (
      <div>

        <div class="news-wrapper">
          <div class="row">
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 "
              data-analytics="tab0"
            >
              <div class="news-widget" data-section="hp-news">
                <div class="row news-tool-bar">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 tool">
                    <p class="left-text pull-left">
                      {this.props.toolbarLeftText}
                    </p>
                    <div class="preference-tag-container hidden-sm hidden-xs">
                      {this.state.selectedPreferenceTags
                        .slice(0, 4)
                        .map((value, index) => {
                          return <span class="tag">{value}</span>;
                        })}
                      {this.state.selectedPreferenceTags.length > 4 && (
                        <span class="more-tag" data-target="#preferenceModal" data-toggle="modal">{`${this.props.moreText} - ${this.state.selectedPreferenceTags.length - 4
                          }`}</span>
                      )}
                    </div>
                    <span class="pull-right">
                      {this.state.selectedPreferenceTags.length > 0 && (
                        <span>
                          ({this.state.selectedPreferenceTags.length}){" "}
                        </span>
                      )}
                      <a
                        class="right-text"
                        data-target="#preferenceModal"
                        data-toggle="modal"
                        id="preferenceModalLink"
                        href="#preferenceModal"
                      >
                        {this.props.toolbarRightText}
                        <span class={`fa ${this.props.iconName}`}></span>
                      </a>
                    </span>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 horizontal-middle-align"></div>
                </div>

                <div class="row news-list-container">
                  {this.state.loading && (<div class="loaderNewsTiles col-md-9 col-lg-9"><i class="fa fa-spinner fa-pulse"></i><div class="loaderText"><p><strong>{this.props.loading}</strong></p><p>{this.props.loadingText}</p></div></div>)}
                  {!this.state.loading && this.state.filterNewsList.length > 0 && (
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 dynamic-news-tile">
                      {Object.keys(this.state.filterNewsList)
                        .slice(0, 4)
                        .map((key, index) => {
                          return (
                            
                            <a
                              class={`col-xs-12  tile clickable-tile ${index == 0
                                ? "col-sm-8 col-md-8"
                                : "col-sm-4 col-md-4"
                                }`}
                                href= {this.state.filterNewsList[key].linkOption == "lightbox"?null:this.state.filterNewsList[key].pagePath}
                                target={this.state.filterNewsList[key].linkOption == "newWindow"?"_blank":null}
                                rel={this.state.filterNewsList[key].linkOption == "newWindow"?"noreferrer noopener":null}
                                aria-hidden={this.state.filterNewsList[key].linkOption == "lightbox"?"true":null}
                                onKeyDown={event => {
                                  if (event.key === "Enter" && this.state.filterNewsList[key].linkOption == "lightbox") {
                                      window[this.state.filterNewsList[key].pagePath]();                                    
                                    }
                                  
                                }
                                }

                              onClick={this.newsTileClick.bind(
                                this,
                                key,
                                index + 1
                              )}
                            >
                              <div
                                class="tile-img"
                                style={{
                                  backgroundImage: `url(${index == 0 ? (window.innerWidth < 768 ? this.state.filterNewsList[key].thumbnailImageFeatured : this.state.filterNewsList[key].thumbnailImageFeatured) : (!this.state.filterNewsList[key].thumbnailImage ? this.props.genericImage : (window.innerWidth < 768 ? this.state.filterNewsList[key].thumbnailImageFeatured : this.state.filterNewsList[key].thumbnailImage))})`,
                                }} data-section={"hp-news-position" + (index + 1)}
                              >
			      {this.state.filterNewsList[key].linkOption == "lightbox" && 
                                (<div class="vidyard_wrapper">
                                <button 
                                class="play-btn" 
                                title="Play video" 
                                aria-label={(this.state.filterNewsList[key].linkOption == "lightbox"?("Play video, " + this.state.filterNewsList[key].heading + " " + this.bgBinding(this.state.filterNewsList[key].tags) + " " + this.dateTransform(this.state.filterNewsList[key].publishedDate) + " Opens in a modal"):null)}        
                                >
                                <div class="play-btn-size"></div>
                                <div class="arrow-size">
                                <div class="arrow-size-ratio"></div>
                                <div class="arrow">
                                  </div>
                                  </div>
                                  </button>
                                  </div>
                                )}
                                <div class="overlay-container">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 detail-container">
                                    <span class="title pull-left">
                                      {this.state.filterNewsList[key].heading}
                                    </span>
				  </div>
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 detail-container">
                                  <span class="bg-name">
                                  {this.state.filterNewsList[key].linkOption == "newWindow"?(
                                        <i class="fa fa-external-link"></i>
                                       ):(
                                         null
                                       )
                                      }
                                    {' '}
                                    {this.bgBinding(
                                      this.state.filterNewsList[key].tags
                                    )}
                                  </span>
                                    <span class="date pull-right">
                                      {this.dateTransform(
                                        this.state.filterNewsList[key]
                                          .publishedDate
                                      )}
                                    </span>
                                  </div>
                                  
                                </div>
                              </div>
                            </a>
                          );
                        })}
                      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 tile">
                        <div class="aggregate-tile" data-section="hp-news-position5">
                        <div class="text">
                          <h3 class="cmp-text">
                            <span class="heading-6"><strong>{this.props.moreNewsHeadingText}</strong>
                            </span>                          
                          </h3>
                        </div>
                          {Object.keys(this.state.filterNewsList)
                            .slice(4, 7)
                            .map((key, index) => {
                              return (
                                <div class="mar-btm">
<a class="title" 
                                  href= {this.state.filterNewsList[key].linkOption == "lightbox"?null:this.state.filterNewsList[key].pagePath}
                                  target={this.state.filterNewsList[key].linkOption == "newWindow"?"_blank":null}
                                  rel={this.state.filterNewsList[key].linkOption == "newWindow"?"noreferrer noopener":null}
                                  tabindex={this.state.filterNewsList[key].linkOption == "lightbox"?"0":null}
                                  onKeyDown={event => {
                                    if (event.key === "Enter" && this.state.filterNewsList[key].linkOption == "lightbox") {
                                        window[this.state.filterNewsList[key].pagePath]();                                    
                                      }
                                    
                                  }
                                  }
                                onClick={this.newsTileClick.bind(
                                  this,
                                  key,
                                  index + 1
                                )}
                                  >
                                    {this.state.filterNewsList[key].heading}
                                  </a>
                                  <p class="bg-name">
					{this.state.filterNewsList[key].linkOption == "lightbox"?(
                                        <i class="fa fa-play-circle"></i>
                                       ):(
                                         null
                                       )
                                      }
                                      {this.state.filterNewsList[key].linkOption == "newWindow"?(
                                        <i class="fa fa-external-link"></i>
                                       ):(
                                         null
                                       )
                                      }
                                    {' '}
                                    {this.bgBinding(
                                      this.state.filterNewsList[key].tags
                                    )}
                                  </p>
                                </div>
                              );
                            })}
                          <p>
                            <a href={this.props.moreNewsButtonLink}>
                              <span class="button-class primary-blue-button-rte">{this.props.moreNewsButtonText}</span>
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 static-news-tile">
                    <div class="col-xs-12 col-sm-6 col-md-12 col-lg-12 tile workday-tile" data-section="hp-news-position6">
                      <p>
                        <a href={this.props.workdayLink} >
                          <img src={this.props.workdayImg} alt="workday tile image" />
                        </a>
                      </p>
                      <p class="m-top-bt">{this.props.workdayText}</p>
                      <p>
                        <a href={this.props.workdayLink} target="_blank" data-title={this.props.workdayDataTitle}>
                          <span class="view-all-category white-font">
                            {this.props.workdayLinkText}
                          </span>
                        </a>
                      </p>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-12 col-lg-12 tile workplace-tile" data-section="hp-news-position7">
                      <p>
                        <a href={this.props.workplaceLink} >
                          <img src={this.props.workplaceImg} alt="workplace tile image" />
                        </a>
                      </p>
                      <p class="m-top-bt">{this.props.workplaceText}</p>
                      <p>
                        <span class="blue-chevron-arrow">
                          <span class="blue-font">
                            <a
                              href={this.props.workplaceLink}
                              target="_blank"
                              data-title={this.props.workplaceDataTitle}
                            >
                              {this.props.workplaceLinkText}
                            </a>
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  id="preferenceModal"
                  class="modal fade preference-popup-wrapper horizontal-middle-align  col-xs-12"
                  role="dialog"
                >
                  <div class="modal-dialog preference-modaldialog">
                    <div class="modal-content horizontal-middle-align  col-sm-12">
                      <div class="modal-header preference-modal-header">
                        <button
                          type="button"
                          class="fa fa-remove collapse-x close-modal"
                          aria-label="Close"
                          data-dismiss="modal"
                        ></button>
                        <h5 class="heading-text">
                          {this.props.preferenceModalHeading}
                        </h5>
                        <p>
                          <input
                            type="checkbox"
                            id="selectAll"
                            aria-label="Select All"
                            onChange={this.handleAllChecked}
                            name="selectAll"
                            checked={this.state.allChecked}
                            value="selectAll"
                          />
                          <span class="chk-lbl">
                            {this.props.selectAllText}
                          </span>
                        </p>
                      </div>
                      <div class="modal-body preference-modal-body">
                        <div class="row preference-list">
                          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                            <p class="heading-text">
                              {this.state.businessLocationList.title}
                            </p>
                            <ul class="prefernce-col-list">
                              {this.state.businessLocationList.tags.map(
                                (value, index) => {
                                  return (
                                    <li key={index}>
                                      <input
                                        type="checkbox"
                                        name={`${value.id}/all`}
                                        value={`${value.id}/all`}
                                        class={`${value.id}/all` == this.state.defaultBL ? "disableCB" : ""}
                                        aria-label={value.title}
                                        onChange={
                                          this.handleCheckChildElement
                                        }
                                        checked={value.isChecked}
                                        disabled={
                                          value.isChecked &&
                                          `${value.id}/all` === this.state.defaultBL
                                        }
                                      />
                                      <span class={`chk-lbl ${value.id+'/all' == this.state.defaultBL ? "disableCB" : ""}`}>
                                        {value.title}
                                      </span>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-8 col-lg-8">
                            <p class="heading-text">
                              {this.state.topicsList.title}
                            </p>
                            <ul class="prefernce-col-list topic-col">
                              {this.state.topicsList.tags.map(
                                (value, index) => {
                                  return (
                                    <li key={index} class="preference-listItems">
                                      <input
                                        type="checkbox"
                                        name={value.id}
                                        value={value.id}
                                        aria-label={value.title}
                                        onChange={
                                          this.handleCheckChildElement
                                        }
                                        checked={value.isChecked}
                                      />
                                      <span class="chk-lbl">
                                        {value.title}
                                      </span>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer preference-modal-footer">
                        <div class="row">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 button-wrapper primary-blue-button-form">
                            <button
                              class="cmp-form-button pull-right"
                              onClick={this.filteringNewsList}
                            >
                              {this.props.preferenceModalHeadingbtn1}
                            </button>
                          </div>
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 button-wrapper secondary-button-form">
                            <button
                              class="cmp-form-button sec-btn"
                              onClick={this.clearAll}
                            >
                              {this.props.preferenceModalHeadingbtn2}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
reactComponents["news-tiles"] = NewsTiles;
