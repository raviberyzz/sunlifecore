class NewsComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageLang: utag_data.page_language,
      resultArr: {}
    };

    this.getStockPrice = this.getStockPrice.bind(this);
    this.roundUp2 = this.roundUp2.bind(this);
    this.priceChange = this.priceChange.bind(this);
  }
  componentDidMount(){
    this.getStockPrice();
  }
  roundUp2(input1){
		return  Math.abs(Math.round(input1*100)/100);
  }
  priceChange(val, lang){
		var outputHtml = (val< 0) ?'-':'+';
		if ( lang == 'fr' ){
			return outputHtml + Math.abs(val).toFixed(2).toString().replace('.',',');
		}
		else {
			return outputHtml + Math.abs(val).toFixed(2);
		}
	}
  getStockPrice(){
    var resultArr = {};
    $.ajax({
      type: "GET",
      url: "/stockticker/getIndices",
      dataType: "json",
      success: (res) => {
        for(var i=0; i<res.lookup_results.quote.length; i++){
          if(res.lookup_results.quote[i].exch == "TSX" || res.lookup_results.quote[i].exch == "NYSE"){
            resultArr[res.lookup_results.quote[i].exch] = res.lookup_results.quote[i];
          }
        }
        Object.keys(resultArr).map((key,index) => {
          if(this.state.pageLang == "fr"){
            resultArr[key].last = this.roundUp2(resultArr[key].last).toFixed(2).replace('.',',');
            resultArr[key].currency = resultArr[key].currency.replace("CAD", "CA").replace("USD", "US");
          }
          else{
            resultArr[key].last = this.roundUp2(resultArr[key].last).toFixed(2);
            resultArr[key].currency = resultArr[key].currency.replace("CAD", "C").replace("USD", "US");
          }
        })
        this.setState({
          resultArr: resultArr
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
              <div class="stock-detail">
                  {Object.keys(this.state.resultArr).map((key,index) => {
                    return(
                      <span>
                        <span>
                          <strong>{this.state.resultArr[key].symbol}({this.state.resultArr[key].exch})</strong>
                          &nbsp;{this.state.resultArr[key].currency}${this.state.resultArr[key].last}&nbsp;{this.priceChange(this.state.resultArr[key].change,this.state.pageLang)}
                        </span>
                        <span class="share-separator"></span>
                      </span>
                    )
                  }) }
                </div>
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
              <button type="button" class="close close-popup fa fa-remove collapse-x" data-dismiss="modal" aria-label="Close"></button>
              <div class="modal-body">
                <h4>{this.props.preferenceModalHeading}</h4>
              </div>
              <div class="row preference-list">
                <p class="cmp-form-options cmp-form-options--checkbox"><label class="cmp-form-options__field-label">
                  <input class="cmp-form-options__field cmp-form-options__field--checkbox" type="checkbox" name="apply" value="Apply" data-parsley-multiple="apply" />
                  <span class="cmp-form-options__field-description">Select all</span>
                </label></p>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <h5>Business Group</h5>
                  <ul>
                    <li class="cmp-form-options cmp-form-options--checkbox"><label class="cmp-form-options__field-label">
                      <input class="cmp-form-options__field cmp-form-options__field--checkbox" type="checkbox" name="apply" value="Apply" data-parsley-multiple="apply" />
                      <span class="cmp-form-options__field-description">Apply</span>
                    </label></li>
                    <li class="cmp-form-options cmp-form-options--checkbox"><label class="cmp-form-options__field-label">
                      <input class="cmp-form-options__field cmp-form-options__field--checkbox" type="checkbox" name="apply" value="Apply" data-parsley-multiple="apply" />
                      <span class="cmp-form-options__field-description">Apply</span>
                    </label></li>
                    <li class="cmp-form-options cmp-form-options--checkbox"><label class="cmp-form-options__field-label">
                      <input class="cmp-form-options__field cmp-form-options__field--checkbox" type="checkbox" name="apply" value="Apply" data-parsley-multiple="apply" />
                      <span class="cmp-form-options__field-description">Apply</span>
                    </label></li>
                    <li class="cmp-form-options cmp-form-options--checkbox"><label class="cmp-form-options__field-label">
                      <input class="cmp-form-options__field cmp-form-options__field--checkbox" type="checkbox" name="apply" value="Apply" data-parsley-multiple="apply" />
                      <span class="cmp-form-options__field-description">Apply</span>
                    </label></li>
                  </ul>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <h5>Topic</h5>
                  <ul>
                  <li class="cmp-form-options cmp-form-options--checkbox"><label class="cmp-form-options__field-label">
                      <input class="cmp-form-options__field cmp-form-options__field--checkbox" type="checkbox" name="apply" value="Apply" data-parsley-multiple="apply" />
                      <span class="cmp-form-options__field-description">Apply</span>
                    </label></li>
                    <li class="cmp-form-options cmp-form-options--checkbox"><label class="cmp-form-options__field-label">
                      <input class="cmp-form-options__field cmp-form-options__field--checkbox" type="checkbox" name="apply" value="Apply" data-parsley-multiple="apply" />
                      <span class="cmp-form-options__field-description">Apply</span>
                    </label></li>
                    <li class="cmp-form-options cmp-form-options--checkbox"><label class="cmp-form-options__field-label">
                      <input class="cmp-form-options__field cmp-form-options__field--checkbox" type="checkbox" name="apply" value="Apply" data-parsley-multiple="apply" />
                      <span class="cmp-form-options__field-description">Apply</span>
                    </label></li>
                    <li class="cmp-form-options cmp-form-options--checkbox"><label class="cmp-form-options__field-label">
                      <input class="cmp-form-options__field cmp-form-options__field--checkbox" type="checkbox" name="apply" value="Apply" data-parsley-multiple="apply" />
                      <span class="cmp-form-options__field-description">Apply</span>
                    </label></li>

                  </ul>
                </div>

              </div>

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

    );
  }
}
reactComponents["news-component"] = NewsComponent;