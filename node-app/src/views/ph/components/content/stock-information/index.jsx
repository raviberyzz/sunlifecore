class stockInformation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageLang: utag_data.page_language,
      result: ""
    };
    this.getStockPrice = this.getStockPrice.bind(this);
  }
  componentDidMount(){
    this.getStockPrice();
  }

  getStockPrice(){
    var result={};
    $.ajax({
      type: "GET",
      url: "/philippines/stockticker",
      success: (res) => {
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