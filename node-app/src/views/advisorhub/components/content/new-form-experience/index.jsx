class NewFormExperience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: []
        }
        this.getTableData = this.getTableData.bind(this);
    }
    componentDidMount() {
        this.getTableData();
    }
    getTableData() {
        $.ajax({
            type: "GET",
            url: "https://cmsdev-auth.ca.sunlife/content/sunlife/external/advisorhub/en/form-page/jcr:content/root/layout_container/container1/generic.forms.en.json",
            dataType: "json",
            success: (response) => {
                this.state.tableData = response;
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
    render() {
        return (<div>
            <table>
                <thead></thead>
                <tbody>{this.state.tableData.map(data => { return (<tr>{Object.keys(data).map((key, index) => { return (<td>{data[key]}</td>) })}</tr>) })}</tbody>
            </table>
        </div>)
    }
}
reactComponents["new-form-experience"] = NewFormExperience;