class ReactDemo extends React.Component {
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
      <div class="stock-ticker-wrapper">
        {this.props.stockTickerType === "yellow" && 
          <div class="row">						
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 " data-analytics="tab0">
              <div class="displayStockTicker stock-widget new" data-section="hp investor">
                <div class="row share-performance new">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="row stock-row new">
                      <div class="col-md-1 visible-md visible-lg">
                        <div class="slf-icon-reg circle-gradient-blue stock-icon">
                          <span class={`icon-reg fa ${this.props.iconName} fa-inverse fa-stack-1x`}> </span>
                        </div>
                      </div>
                      <div class="col-sm-4 col-md-3 stock-label new">
                        <h2 class="pad-bottom-10-xs">{this.props.stockTickerHeadingText}</h2>
                      </div>
                      <div class="col-sm-8 col-md-8 stock-detail new">
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
                        <span>
                          <a href={this.props.viewAllLink}>{this.props.viewAllText}</a>
                        </span>
                      </div>
                    </div>
                    <div class="row disclaimer-section">
                      <div class="col-md-1 visible-md visible-lg"></div>
                      <div class="col-xs-12 col-sm-12 col-md-11">
                        <p class="stock-disclaimer new">
                          {this.props.dataDelayedText}  (
                          <a href={`javascript:WindowDisclaimer("${this.props.disclaimerLink}");`}>{this.props.disclaimerText}</a>
                          )
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>								
            </div>
          </div> 
        }
        {this.props.stockTickerType === "grey" && 
          <div class="mega-menu-col3">
            <div class="displayStockTicker advanced">
              <div class="mega-share hidden-sm hidden-xs">
                <div class="mega-share-body">
                  <div class="h4">{this.props.stockTickerHeadingText}</div>
                  {Object.keys(this.state.resultArr).map((key,index) => {
                    return(
                      <div class={`mega-${this.state.resultArr[key].exch.toLowerCase()}`}>
                        <p>{this.state.resultArr[key].symbol}&nbsp;({this.state.resultArr[key].exch})</p>
                        <p>
                          {this.state.resultArr[key].currency}$
                          <strong>{this.state.resultArr[key].last}</strong>
                          &nbsp;{this.priceChange(this.state.resultArr[key].change,this.state.pageLang)}
                        </p>
                      </div>
                    )
                  })}
                  <p class="mega-stock-disclaimer">{this.props.dataDelayedText}<br/> (
                    <a href={`javascript:WindowDisclaimer("${this.props.disclaimerLink}");`}>{this.props.disclaimerText}</a>)</p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
reactComponents["react-demo"] = ReactDemo;