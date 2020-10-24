class NewsTiles extends React.Component {
  constructor(props) {
    super(props);
    let contextHubData = localStorage.getItem("ContextHubPersistence");
    let defaultBGValue = "";
    if (contextHubData) {
      let userProfile = JSON.parse(
        localStorage.getItem("ContextHubPersistence")
      );
      defaultBGValue = userProfile.store.profile.businessGroup;
    }
    this.state = {
      defaultBG: defaultBGValue,
      pageLang: utag_data.page_language,
      businessGroupList: {
        tags: [],
      },
      topicsList: {
        tags: [],
      },
      allChecked: false,
      selectedPreferenceList: [],
      businessGroupIdTitle: [],
      newsList: [],
      filterNewsList: [],
      selectedPreferenceTags: [],
      userProfileArticles: []
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
    this.clearPreferences = this.clearPreferences.bind(this);
  }

  componentDidMount() {
    // this.getNewsTilesData();
    /**adding all the functions with in component did mount */
    this.retrieveSelectedPreference();
    this.getPreferenceList();
    this.getNewsList();

    /**adding all the functions with in component did mount */
    // this.tagSorting();
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
          this.tagSorting();
        });
        //this.getPreferenceList();
        console.log("Selected Preferences" + " " + res);
        /* setTimeout(() => {
           this.tagSorting();
         }, 1000); */
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // get Preferences tag for pop modal 
  getPreferenceList() {
    $.ajax({
      type: "GET",
      url: `${this.props.getPrefernceListUrl}.${this.state.pageLang}.json`,
      dataType: "json",
      success: (response) => {
        this.state.businessGroupList = response["business-group"];
        this.state.topicsList = response["topic"];
        this.state.businessGroupList.tags.forEach((data) => {
          var obj = {};
          obj[data.id] = data.title;
          this.state.businessGroupIdTitle.push(obj);
          data["isChecked"] = false;
          if (this.state.selectedPreferenceList.length > 0) {
            this.state.selectedPreferenceList.forEach((prefer) => {
              if (prefer === data.id) {
                data["isChecked"] = true;
              }
            });
          }
        });
        this.state.topicsList.tags.forEach((data) => {
          data["isChecked"] = false;
          this.state.selectedPreferenceList.forEach((prefer) => {
            if (prefer === data.id) {
              data["isChecked"] = true;
            }
          });
        });
        this.setState({
          businessGroupList: this.state.businessGroupList,
          topicsList: this.state.topicsList,
          businessGroupIdTitle: this.state.businessGroupIdTitle,
        });
        //this.getNewsList();
        //this.retrieveSelectedPreference();
        //console.log(res);
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
        let pinnedNewsList = [];
        let preferedNewsList = [];
        // filter the whole response articles for pinned articles, as pinned articles are global 
        pinnedNewsList = this.state.newsList.filter((news) => {
          return (
            news.pinArticle
          );
        });
        if (pinnedArticles.length > 0) {
          pinnedArticles.sort(function (a, b) {
            return (
              a.pinArticle - b.pinArticle ||
              new Date(b.publishedDate) - new Date(a.publishedDate) ||
              a.heading.localeCompare(b.heading)
            );
          });
        }
        // filter the response articles by user profile data if user profile data exists
        if (ContextHub.getItem('profile').businessGroup != "" && ContextHub.getItem('profile').businessUnit != "" && ContextHub.getItem('profile').buildingLocation != "" && ContextHub.getItem('profile').jobLevel != "") {
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

          var userProfileFilters = [];
          userProfileFilters.push(businessGroup, businessUnit, buildingLocation, jobLevel);
          // filter the news article if they match BG & BU & BL & JL
          this.state.newsList.forEach((news) => {
            news.tags.forEach((tag, index) => {
              if (tag.includes('job-level')) {
                var jL = tag.split('/');
                var jL = jL[jL.length - 1];
                news.tags[index] = jL;
              }
            })
            filterProfileArticles(userProfileFilters, news.tags);
            if (filterProfileArticles(userProfileFilters, news.tags)) {
              this.state.userProfileArticles.push(news);
            }
          })
          function filterProfileArticles(a, b) {
            return (a.every(el => b.includes(el)));
          }
        } else {
          //if no job profile filter the news articles by "all" tag. 
          this.state.userProfileArticles = this.state.newsList.filter((news) => {
            return (news.tags && news.tags.some((val) => val.includes("/all")))
          })
        }
        // if any selected preferences filter the articles from previously selected userProfile articles
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
        }
        preferedNewsList.sort(function (a, b) {
          // || a.heading.localeCompare(b.heading)
          return (new Date(b.publishedDate) - new Date(a.publishedDate));
        });
        this.state.filterNewsList = pinnedArticles.concat(preferedNewsList);
        this.setState({
          newsList: this.state.newsList,
          filterNewsList: this.state.filterNewsList,
          userProfileArticles: userProfileArticles
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleAllChecked(event) {
    this.state.businessGroupList.tags.forEach((prefer) => {
      if (prefer.title != this.state.defaultBG) {
        prefer.isChecked = event.target.checked;
      }
    });
    this.state.topicsList.tags.forEach(
      (prefer) => (prefer.isChecked = event.target.checked)
    );
    this.setState({
      allChecked: event.target.checked,
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList,
    });
  }

  handleCheckChildElement(event) {
    this.state.businessGroupList.tags.forEach((prefer) => {
      if (prefer.id === event.target.value)
        prefer.isChecked = event.target.checked;

    });
    this.state.topicsList.tags.forEach((prefer) => {
      if (prefer.id === event.target.value)
        prefer.isChecked = event.target.checked;
    });
    this.setState({
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList,
    });
  }

  // clear all preferences from pop up modal 
  clearAll() {
    this.state.businessGroupList.tags.forEach((prefer) => {
      if (prefer.title != this.state.defaultBG) {
        prefer.isChecked = false;
      }
    });
    this.state.topicsList.tags.forEach((prefer) => (prefer.isChecked = false));
    this.state.selectedPreferenceList = [];
    this.setState({
      allChecked: false,
      businessGroupList: this.state.businessGroupList,
      topicsList: this.state.topicsList,
      selectedPreferenceList: this.state.selectedPreferenceList
    });
    //this.filteringNewsList();
    this.addSelectedPreference();
    this.clearPreferences();
    this.tagSorting();
    $("#preferenceModal").modal("hide");
  }

  clearPreferences() {
    this.state.selectedPreferenceList = [];
    let pinnedNewsList = [];
    // filter the whole response articles for pinned articles, as pinned articles are global 
    pinnedNewsList = this.state.newsList.filter((news) => {
      return (
        news.pinArticle
      );
    });
    // Sort pinned articles 
    if (pinnedNewsList.length > 0) {
      pinnedNewsList.sort(function (a, b) {
        return (
          a.pinArticle - b.pinArticle ||
          b.publishedDate - a.publishedDate ||
          a.heading.localeCompare(b.heading)
        );
      });
    }
    if (this.state.userProfileArticles.length > 0) {
      this.state.userProfileArticles.sort(function (a, b) {
        return (
          b.publishedDate - a.publishedDate ||
          a.heading.localeCompare(b.heading)
        );
      });
    }
    //this.state.filterNewsList = this.mergeArray(pinnedNewsList, this.state.userProfileArticles);
    this.state.filterNewsList = pinnedNewsList.concat(this.state.userProfileArticles);
    this.setState({
      filterNewsList: this.state.filterNewsList
    })
  }

  filteringNewsList() {
    this.state.selectedPreferenceList = [];
    let businessTitle = [], topicsTitle = [];
    this.state.businessGroupList.tags.forEach((prefer) => {
      if (prefer.isChecked) {
        this.state.selectedPreferenceList.push(prefer.id);
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
    let pinnedNewsList = [];
    let preferedNewsList = [];
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
      preferedNewsList = this.state.newsList.filter((news) => {
        return (
          !news.pinArticle &&
          news.tags &&
          news.tags.some(
            (val) => this.state.selectedPreferenceList.indexOf(val) > -1
          )
        );
      });
      pinnedNewsList = this.state.newsList.filter((news) => {
        return (
          news.pinArticle &&
          news.tags &&
          news.tags.some(
            (val) => this.state.selectedPreferenceList.indexOf(val) > -1
          )
        );
      });
    } else {
      preferedNewsList = this.state.newsList;
    }
    pinnedNewsList.sort(function (a, b) {
      return (
        a.pinArticle - b.pinArticle ||
        b.publishedDate - a.publishedDate ||
        a.heading.localeCompare(b.heading)
      );
    });
    preferedNewsList.sort(function (a, b) {
      return (
        b.publishedDate - a.publishedDate || a.heading.localeCompare(b.heading)
      );
    });
    if (pinnedNewsList.length > 0) {
      this.state.filterNewsList = this.mergeArray(
        preferedNewsList,
        pinnedNewsList,
        pinnedNewsList[0].pinArticle - 1
      );
    }
    this.setState({
      selectedPreferenceList: this.state.selectedPreferenceList,
      filterNewsList: this.state.filterNewsList,
    });
    this.addSelectedPreference();
    this.tagSorting();
    $("#preferenceModal").modal("hide");
    //window.location.reload();
  }

  bgBinding(bgList) {
    /*let bg = "";
    bgList.forEach((data) => {
      let bgarr = data.split('/');
      if (bgarr[1] == "business-group") {
        bg += bgarr[bgarr.length - 1] + " | ";
      }
    })
    return bg.substring(0, bg.length - 3); */
    var title = "";
    bgList.filter((id, i) => {
      this.state.businessGroupIdTitle.forEach((obj) => {
        if (Object.keys(obj) == id) {
          if (i == bgList.length - 1) {
            title = title + obj[id];
          } else {
            title = title + obj[id] + " | ";
          }
          // return obj[id];
        }
      });
    });
    if (title.charAt(title.length - 2) == '|') {
      title = title.substring(0, title.length - 2) + title.charAt(title.length - 2).replace("|", "");
    }
    return title;
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
    let d1 = new Date(date);
    let d = d1.getDate();
    let m = d1.getMonth();
    return monthName[m] + " " + d;
    // return moment(date).format('MMM DD');
  }

  tagSorting() {
    let businessTag = [];
    let topicsTag = [];
    if (this.state.selectedPreferenceList.length > 0) {
      this.state.selectedPreferenceList.forEach((element) => {
        if (
          element.split("/")[1] == "business-group"
        ) {
          this.state.businessGroupIdTitle.forEach((obj) => {
            if (Object.keys(obj)[0] == element) {
              businessTag.push(obj[element.toString()]);
            }
          })

        } else if (element.split("/")[1] == "topics") {
          topicsTag.push(element);
        }
      });
      /*businessTag.forEach((element, index) => {
        businessTag[index] = element.split("/")[2];
      });*/
      topicsTag.forEach((element, index) => {
        topicsTag[index] = element.split("/")[2];
      });
      businessTag.sort();
      topicsTag.sort();
      this.state.selectedPreferenceTags = businessTag.concat(topicsTag);
    }
    this.setState({
      selectedPreferenceTags: this.state.selectedPreferenceTags,
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
        console.log("posting selected preferences" + " " + reqData);
        setTimeout(() => {
          this.retrieveSelectedPreference()
        }, 1000);
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
    location.href = this.state.filterNewsList[key].pagePath;
  }
  render() {
    return (
      <div class="news-wrapper">
        <div class="row">
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 "
            data-analytics="tab0"
          >
            <div class="news-widget" data-section="hp investor">
              {this.props.newsToolBar == "true" && (
                <div>
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
                          <span class="more-tag">{`${this.props.moreText} - ${this.state.selectedPreferenceTags.length - 4
                            }`}</span>
                        )}
                      </div>
                      <span class="pull-right">
                        {this.state.selectedPreferenceTags.length > 0 && (
                          <span class="hidden-md hidden-lg">
                            ({this.state.selectedPreferenceTags.length})
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
                  <div
                    id="preferenceModal"
                    class="modal fade preference-popup-wrapper horizontal-middle-align"
                    role="dialog"
                  >
                    <div class="modal-dialog preference-modaldialog">
                      <div class="modal-content horizontal-middle-align">
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
                                {this.state.businessGroupList.title}
                              </p>
                              <ul class="prefernce-col-list">
                                {this.state.businessGroupList.tags.map(
                                  (value, index) => {
                                    return (
                                      <li key={index}>
                                        <input
                                          type="checkbox"
                                          name={value.id}
                                          value={value.id}
                                          onChange={
                                            this.handleCheckChildElement
                                          }
                                          checked={value.isChecked}
                                          disabled={
                                            value.isChecked &&
                                            value.title === this.state.defaultBG
                                          }
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
                            <div class="col-xs-12 col-sm-6 col-md-8 col-lg-8">
                              <p class="heading-text">
                                {this.state.topicsList.title}
                              </p>
                              <ul class="prefernce-col-list topic-col">
                                {this.state.topicsList.tags.map(
                                  (value, index) => {
                                    return (
                                      <li key={index}>
                                        <input
                                          type="checkbox"
                                          name={value.id}
                                          value={value.id}
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
              )}
              {this.props.newsListContainer == "true" &&
                this.state.filterNewsList.length > 0 && (
                  <div class="row news-list-container">
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 dynamic-news-tile">
                      {Object.keys(this.state.filterNewsList)
                        .slice(0, 4)
                        .map((key, index) => {
                          return (
                            <div
                              class={`col-xs-12  tile clickable-tile ${index == 0
                                ? "col-sm-8 col-md-8"
                                : "col-sm-4 col-md-4"
                                }`}
                              onClick={this.newsTileClick.bind(
                                this,
                                key,
                                index + 1
                              )}
                            >
                              <div
                                class="tile-img"
                                style={{
                                  backgroundImage: `url(${index == 0 ? this.state.filterNewsList[key].thumbnailImageFeatured : this.state.filterNewsList[key].thumbnailImage})`,
                                }} data-section={"hp-news-position" + (index + 1)}
                              >
                                <div class="overlay-container">
                                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 detail-container">
                                    <span class="title pull-left">
                                      {this.state.filterNewsList[key].heading}
                                    </span>
                                    <span class="date pull-right">
                                      {this.dateTransform(
                                        this.state.filterNewsList[key]
                                          .publishedDate
                                      )}
                                    </span>
                                  </div>
                                  <span class="bg-name">
                                    {this.bgBinding(
                                      this.state.filterNewsList[key].tags
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 tile">
                        <div class="aggregate-tile">
                          <div class="circular-image">
                            <img class="icon" src={this.props.moreNewsImg} />
                          </div>
                          {Object.keys(this.state.filterNewsList)
                            .slice(4, 7)
                            .map((key, index) => {
                              return (
                                <div class="mar-btm">
                                  <a class="title" href="">
                                    {this.state.filterNewsList[key].heading}
                                  </a>
                                  <p class="bg-name">
                                    {this.bgBinding(
                                      this.state.filterNewsList[key].tags
                                    )}
                                  </p>
                                </div>
                              );
                            })}
                          <p>
                            <span class="blue-chevron-arrow">
                              <span class="blue-font">
                                <a href={this.props.moreNewsLink}>
                                  {this.props.moreNewsText}
                                </a>
                              </span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 static-news-tile">
                      <div class="col-xs-12 col-sm-6 col-md-12 col-lg-12 tile workday-tile">
                        <p>
                          <a href={this.props.workdayLink}>
                            <img src={this.props.workdayImg} alt="" />
                          </a>
                        </p>
                        <p>{this.props.workdayText}</p>
                        <p>
                          <a href={this.props.workdayLink} target="_blank">
                            <span class="view-all-category white-font">
                              {this.props.workdayLinkText}
                            </span>
                          </a>
                        </p>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-12 col-lg-12 tile workplace-tile">
                        <p>
                          <a href={this.props.workplaceLink}>
                            <img src={this.props.workplaceImg} alt="" />
                          </a>
                        </p>
                        <p class="m-top-bt">{this.props.workplaceText}</p>
                        <p>
                          <span class="blue-chevron-arrow">
                            <span class="blue-font">
                              <a
                                href={this.props.workplaceLink}
                                target="_blank"
                              >
                                {this.props.workplaceLinkText}
                              </a>
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
reactComponents["news-tiles"] = NewsTiles;
