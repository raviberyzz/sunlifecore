class stockInformation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageLang: utag_data.page_language,
      result: ""
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
    var result={};
    $.ajax({
      type: "GET",
      url: "/philippines/stocktickery",
      success: (res) => {
        console.log(res);
        this.setState({
          result: res
        })
        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  render() {
    console.log(this.state.reult)
    return (
      <div class="stock-ticker-wrapper">
          <div class="mega-menu-col3">
            <div class="displayStockTicker advanced">
              <div class="mega-share hidden-sm hidden-xs">
                <div class="mega-share-body">
                  <div class="h4">{this.props.stockInformationHeadingText}</div>
                  <div dangerouslySetInnerHTML={{__html: this.state.result}} />
                      
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}
reactComponents["stock-information"] = stockInformation;