const GlobalFilter = ({ setFilter, filterData, callback, refreshData, searchText }) => {
    const [inputValue, setInputValue] = React.useState( '' );
    function search() {
        var filterValue = $('.search').val();
        callback();
        setFilter(filterValue);
    }
    function enterPressed(e){
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            search();
        } 
    }
    function reset() {
        $('.search').val('');
        setFilter('');
        refreshData();
    }
    function clearSearch(){
        $('.search').val('');
        setInputValue('');
    }
    return (
        <div className="searchContainer">
            <span className="globalSearch">
                <input
                    //  value={filter || ''}
                    placeholder={searchText}
                    className="search"
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={e => enterPressed(e)}
                />
                {inputValue!="" && <span onClick={clearSearch}><i className="fa fa-times"></i></span>}
                <button onClick={search} className="searchIcon"><i className="fa fa-search" ></i></button>
                <button onClick={reset} className="resetButton"><i className="fa fa-repeat"></i></button>
            </span>
        </div>

    )
}
function Table({ columns, data, sortyBy, searchCallBack, resetTableData, updateFavorite, togglefilter, addFilterTxt, filtersData, addFilter, filterBtnTxt, selectedFilters, clearFilter, clearAll, clearAllTxt, previousText, nextText, pageText, ofText, searchText, loadingState, loading, loadingText }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
        state: { pageIndex, pageSize },
        state
    } = ReactTable.useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 15 },
        },
        ReactTable.useGlobalFilter,
        ReactTable.usePagination
    )
    const { globalFilter } = state;
    var startPage, endPage;
    function sort() {
        sortyBy();
    }
    function enterPressed(e, index){
        var code = event.keyCode || event.which;
        if(code === 13 && index == 3) { //13 is the enter keycode
            sort();
        } 
    }
    function favourite(e) {
        updateFavorite(e["original"]["formNumber"], e["original"]["favorite"]);
    }
    function callBack() {
        searchCallBack()
    }
    function refreshTableData() {
        resetTableData()
    }
    function middlePage(){
        startPage = Math.max((pageIndex+1) - 2, 2);
        endPage = (pageIndex+1) + 2;
        if ((pageIndex+1) < 3) {
            endPage = Math.min(5, pageCount - 1);
        } else if (pageCount - (pageIndex+1) < 3) {
            startPage = Math.max(pageCount - 4, 2)
            endPage = pageCount - 1;
        }
        return true;
    }
    return (
        <div className="tableContainer" id="new-form-experience">

            <div className="filterSearchContainer">
                <div className="filter-container">
                    {data.length > 0 ? <div className="counter">{((pageIndex + 1) * pageSize) - (pageSize - 1)} - {pageSize != page.length ? ((pageIndex + 1) * (pageSize)) - (pageSize - page.length) : (pageIndex + 1) * pageSize} of {data.length}</div>
                        : <div className="counter">0 - 0 of 0</div>}
                    <div><button class="toggle-filter filter-buttons addFilter" onClick={togglefilter}>{addFilterTxt}</button></div>
                    <form className="filters">
                        {Object.keys(filtersData).map((key) => {
                            return <div className="filter"><input type="checkbox" name={filtersData[key].id} value={filtersData[key].title}></input><label for={filtersData[key].title}>{filtersData[key].title}</label></div>
                        })}
                        <button type="button" className="filterSubmit" onClick={addFilter}>{filterBtnTxt}</button>
                    </form>
                    {selectedFilters && <div className="selectedFilterContainer">{selectedFilters.map((value) => {
                        return <button className="selectedFilter filter-buttons" onClick={clearFilter}>{value}<i className="fa fa-times"></i></button>
                    })} {selectedFilters.length > 0 && <button className="filter-buttons" onClick={clearAll}>{clearAllTxt}</button>}</div>}
                </div>
                <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                    filteredData={data}
                    callback={callBack}
                    refreshData={refreshTableData}
                    searchText={searchText}
                />
            </div>
            <table className="new-form-table" {...getTableProps()}>
                <thead className="table-header">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, index) => (
                                <th {...column.getHeaderProps()} id={index == 3 ? "sort" : ""} onKeyPress={(e) => enterPressed(e, index)} tabindex={index == 3 ? 0 : ""} onClick={()=> sortyBy(column)} className={index == 0 ? "col-sm-2" : (index == 2 ? "col-sm-2" : (index == 3 ? "col-sm-1" : ""))}>{column.render('Header')}
                                    {(index == 3 || index == 2) ? <i className="fa fa-sort"></i> : ""}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {data.length > 0 ? page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} className="new-form-tr">
                                {row.cells.map((cell, index) => {
                                    return <td {...cell.getCellProps()} onClick={index == 4 ? () => favourite(row) : ""}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    }) : ""}
                </tbody>
            </table>
            {loadingState && (<div class="loaderForm">
                <i class="fa fa-spinner fa-pulse"></i>
                <div class="loaderText">
                    <p><strong>{loading}</strong></p>
                    <p>{loadingText}</p>
                </div>
            </div>)}
            {!loadingState && data.length < 1 && <div className="noData"> No Data available </div>}
            {/*  Pagination Component*/}
            {data.length > 15 && <div class="pagination-component">
                <nav role="navigation" aria-label="Pagination" class="text-center">
                    <ul className={`pagination pagination-list ${pageIndex + 1 < 2 ? 'first-page' : ''} ${pageIndex + 1 >= pageOptions.length ? 'last-page' : ''}`}>
                        {pageIndex + 1 != 1 && <li className={`previous ${(pageIndex + 1) < 2 ? 'disabled' : ''}`} onClick={() => previousPage()} disabled={!canPreviousPage}>
                            <a href="#new-form-experience" className="page-link"><span class="fa fa-angle-left" aria-hidden="true"></span>
                                <span class="">{previousText}</span></a>
                        </li>}
                        {pageOptions.length > 1 && <li className={`link-to-first ${pageIndex + 1 == 1 ? 'active' : ''}`} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            <a href="#new-form-experience" className="page-link" aria-label="First Page">
                                <span class="fa fa-angle-double-left" aria-hidden="true"></span>
                                <span>1</span>
                            </a>
                        </li>}
                        {pageIndex + 1 >= 5 && pageOptions.length > 6 &&
                            <li class="ellipsis"><a><span>&hellip;</span></a></li>
                        }
                        { middlePage() &&  pageOptions.slice(startPage, endPage+1).map((page, index) => {
                            return (<li key={index} className={(pageIndex + 1 == page ? 'active' : page)}><a href="#new-form-experience" onClick={() => gotoPage(page - 1)}><span>{page}</span></a></li>)
                        })
                        }
                        {(pageOptions.length - pageIndex + 1) >= 4 && pageOptions.length > 6 &&
                            <li class="ellipsis"><a><span>&hellip;</span></a></li>
                        }
                        <li className={`lastPage ${pageIndex + 1 == pageOptions.length ? 'active' : ''}`}>
                            <a href="#new-form-experience" onClick={() => gotoPage(pageOptions.length - 1)}>
                                <span>{pageOptions.length}</span>
                            </a>
                        </li>
                        {pageIndex + 1 != pageOptions.length &&
                            <li className={`next ${pageIndex + 1 >= pageOptions.length ? 'disabled' : ''}`}>
                                <a href="#new-form-experience" onClick={() => gotoPage(pageIndex + 1)}>{nextText}</a>
                            </li>
                        }

                    </ul>
                    <div class="pagination-indicator">{pageText} {pageIndex + 1} {ofText} {pageCount}</div>
                </nav>
            </div>}
        </div>
    )
}

class NewFormExperience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            selectedFilters: [],
            originalData: [],
            filteredRows: [],
            filterResetData: [],
            filters: {},
            favorites: [],
            selectedValues: [],
            lang: utag_data.page_language,
            sorting: false,
            loadingState: true,
            sortingOrder: "asc"
        };
        this.toggleFilter = this.toggleFilter.bind(this);
        this.addFilters = this.addFilters.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.sortColumn = this.sortColumn.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.getFilterData = this.getFilterData.bind(this);
        this.updateFavorite = this.updateFavorite.bind(this);
        this.SearchSort = this.SearchSort.bind(this);
        this.resetSearchData = this.resetSearchData.bind(this);
    }

    componentDidMount() {
        this.getTableData();
    }

    getTableData() {
        // const favoriteData = [{ "formNumber": "IN1405003*" }, { "formNumber": "4900-E" }];
        $.ajax({
            type: "GET",
            url: `${this.props.tableRowsDataUrl}.ugc.listFormFavourites.json`,
            dataType: "json",
            success: (res) => {
                var favoriteData = [];
                res.favourites.map((obj) => {
                    favoriteData.push({
                        "formNumber": obj
                    });
                })
                $.ajax({
                    type: "GET",
                    url: `${this.props.tableRowsDataUrl}.forms.${this.state.lang}.json`,
                    dataType: "json",
                    success: (response) => {
                        var tableData = [];
                        var favRows = [];
                        var notFavRows = [];
                        var originalresponseData = response
                        tableData = response;
                        tableData.map((obj) => {
                            favoriteData.map((favObj) => {
                                if (obj.formNumber == favObj.formNumber) {
                                    obj.favorite = true;
                                }
                            })
                            if (!obj.favorite) obj.favorite = false;
                        })
                        favRows = tableData.filter((obj) => {
                            return obj.favorite
                        })
                        notFavRows = tableData.filter((obj) => {
                            return !obj.favorite
                        })
                        favRows.sort((a, b) => {
                            return a.formNumber.localeCompare(b.formNumber, this.state.lang, { numeric: true })
                        });
                        notFavRows.sort((a, b) => {
                            return a.formNumber.localeCompare(b.formNumber, this.state.lang, { numeric: true })
                        })
                        tableData = [...favRows, ...notFavRows];
                        this.setState({
                            // data: tableData,
                            data: tableData,
                            // originalData: originalresponseData,
                            originalData: tableData,
                            favorites: favoriteData,
                            loadingState: false
                        }, () => {
                            // this.tagSorting();
                            this.getFilterData();
                        })
                    },
                    error: (err) => {
                        console.log(err);
                    }
                })
            },
            error: (err) => {
                console.log(err);
                var favoriteData = [];
                $.ajax({
                    type: "GET",
                    url: `${this.props.tableRowsDataUrl}.forms.${this.state.lang}.json`,
                    dataType: "json",
                    success: (response) => {
                        var tableData = [];
                        var favRows = [];
                        var notFavRows = [];
                        var originalresponseData = response
                        tableData = response;
                        tableData.map((obj) => {
                            favoriteData.map((favObj) => {
                                if (obj.formNumber == favObj.formNumber) {
                                    obj.favorite = true;
                                }
                            })
                            if (!obj.favorite) obj.favorite = false;
                        })
                        favRows = tableData.filter((obj) => {
                            return obj.favorite
                        })
                        notFavRows = tableData.filter((obj) => {
                            return !obj.favorite
                        })
                        favRows.sort((a, b) => {
                            return a.formNumber.localeCompare(b.formNumber, this.state.lang, { numeric: true })
                        });
                        notFavRows.sort((a, b) => {
                            return a.formNumber.localeCompare(b.formNumber, this.state.lang, { numeric: true })
                        })
                        tableData = [...favRows, ...notFavRows];
                        this.setState({
                            // data: tableData,
                            data: tableData,
                            // originalData: originalresponseData,
                            originalData: tableData,
                            favorites: favoriteData,
                            loadingState: false
                        }, () => {
                            // this.tagSorting();
                            this.getFilterData();
                        })
                    },
                    error: (err) => {
                        console.log(err);
                    }
                })
            }
        });
    }

    getFilterData() {
        $.ajax({
            type: "GET",
            url: `${this.props.filtersDataUrl}.tags.${this.state.lang}.json`,
            dataType: "json",
            success: (response) => {
                this.setState({
                    filters: response.forms.tags
                })
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
    toggleFilter() {
        $('.filters').toggleClass('show-filters')
    }

    addFilters() {
        var filterData = [];
        var filteredRows = [];
        var selectedFiltersValues = [];
        $("input[type='checkbox']:checked").each(function () {
            filterData.push($(this).attr('name'));
            selectedFiltersValues.push($(this).attr('value'));
        })
        this.setState({
            selectedFilters: filterData,
            selectedValues: selectedFiltersValues
        })
        if (filterData.length > 0) {
            filteredRows = this.state.originalData.filter((row) => {
                return (row.tags && filterData.every((val) => row.tags.includes(val)))
                // return (row.tags && row.tags.some((val) => filterData.indexOf(val) > -1))
            })
            this.setState({
                data: filteredRows,
                filterResetData: filteredRows
            });
            var filterAnalytics = "";
            for(var i=0;i<filterData.length;i++){
                if(i==0){
                    filterAnalytics = filterAnalytics + filterData[i].split("/")[2];
                }
                else{
                    filterAnalytics = filterAnalytics + "|" + filterData[i].split("/")[2];
                }
            }
            utag.link({
                ev_type: 'other',
                ev_action: 'clk',
                ev_title: "form search – client filter input",
                ev_data_one: filterAnalytics
            });
        }


        $('.filters').toggleClass('show-filters')
    }
    sortColumn(column) {
          var sortingData = JSON.parse(JSON.stringify(this.state.data));
    
    switch(column.id) {
       case "eSign": 
               var eSignFavorite = sortingData.filter((row) => {
            if (row.eSign == "true" && row.favorite == true) {
                return row
            }
        })
        var eSignnotFav = sortingData.filter((row) => {
            if (row.eSign == "true" && row.favorite == false) {
                return row
            }
        })
        var noneSingFav = sortingData.filter((row) => {
            if (row.eSign == "false" && row.favorite == true) {
                return row
            }
        })
        var noneSingnotFav = sortingData.filter((row) => {
            if (row.eSign == "false" && row.favorite == false) {
                return row
            }
        })
        if (this.state.sorting) {
            var sortedData = [...noneSingFav, ...noneSingnotFav, ...eSignFavorite, ...eSignnotFav];
            var sorting = false
        } else {
            var sortedData = [...eSignFavorite, ...eSignnotFav, ...noneSingFav, ...noneSingnotFav];
            var sorting = true
        }

        this.setState({
            data: sortedData,
            sorting: sorting
        });
        utag.link({
            ev_type: 'other',
            ev_action: 'clk',
            ev_title: "form search – sort client input"
        });
        break;
        case "Last Updated" : 
        sortingData.sort((a, b)=> {
        let aDate = "lastUpdated" in a ? new Date(a.lastUpdated) : "";
         let bDate =  "lastUpdated" in b ? new Date(b.lastUpdated) : "";
         return bDate - aDate
        })
        this.state.sortingOrder
        if(this.state.sortingOrder == "asc") {
        this.setState({
        data: sortingData,
        sortingOrder: "desc"
        }) 
        } else {
        let descendingData = JSON.parse(JSON.stringify(sortingData))
        this.setState({
        data: descendingData.reverse(),
        sortingOrder: "asc"
        })
        }
        break;
    }


    }
    clearAll() {
        $('input[type="checkbox"]').each(function () {
            $(this).prop("checked", false);
        })
        this.setState({
            selectedValues: [],
            selectedFilters: [],
            data: this.state.originalData
        })
    }

    clearFilter(event) {
        var deletFilter = event.currentTarget.textContent;
        var selFilters = this.state.selectedValues;
        var updatedFilterRows = [];
        selFilters.map((filter, i) => {
            if (filter == deletFilter) {
                $('input[type="checkbox"]:checked').each(function () {
                    if ($(this).attr("value") == deletFilter) {
                        $(this).prop("checked", false);
                    }
                })
                selFilters.splice(i, 1);
            }
        })
        if (selFilters.length > 0) {
            var remainingFilters = [];
            this.state.filters.map((obj) => {
                for (var i = 0; i <= selFilters.length; i++) {
                    if (selFilters[i] == obj.title) {
                        remainingFilters.push(obj.id)
                    }
                }
            })
            updatedFilterRows = this.state.originalData.filter((row) => {
                return (row.tags && remainingFilters.every((val) => row.tags.includes(val)))
                // return (row.tags && row.tags.some((val) => remainingFilters.indexOf(val) > -1))
            })
            this.setState({
                selectedFilters: selFilters,
                data: updatedFilterRows,
                filterResetData: updatedFilterRows
            })
        } else if (selFilters.length < 1) {
            this.setState({
                selectedFilters: selFilters,
                data: this.state.originalData
            })
        }

    }
    updateFavorite(formNumber, favourite) {
        // console.log(formNumber, favourite);
        var newFavourite = (favourite==true) ? false : true;
        var updatedData = [];
        var updatedOriginalData = [];
        var updatedFilterResetData = [];
        let reqData = {
            formNumber: formNumber,
            enabled: newFavourite
        };
        $.ajax({
            type: "POST",
            url: `${this.props.tableRowsDataUrl}.ugc.updateFormFavourite.json`,
            contentType: "application/json",
            data: JSON.stringify(reqData),
            dataType: "json",
            success: (response) => {
                this.state.data.map((obj) => {
                    if (obj.formNumber == formNumber){
                        obj.favorite = newFavourite;
                        updatedData.push(obj);
                    }
                    else{
                        updatedData.push(obj);
                    }
                });
                this.state.originalData.map((obj) => {
                    if (obj.formNumber == formNumber){
                        obj.favorite = newFavourite;
                        updatedOriginalData.push(obj);
                    }
                    else{
                        updatedOriginalData.push(obj);
                    }
                });
                this.state.filterResetData.map((obj) => {
                    if (obj.formNumber == formNumber){
                        obj.favorite = newFavourite;
                        updatedFilterResetData.push(obj);
                    }
                    else{
                        updatedFilterResetData.push(obj);
                    }
                });
                this.setState({
                    // data: updatedData,
                    originalData: updatedOriginalData,
                    filterResetData: updatedFilterResetData
                });
                var selection = "form search – ";
                if(newFavourite==true){
                    selection = selection + "favourite";
                }
                else{
                    selection = selection + "unfavourite";
                }
                utag.link({
                    ev_type: 'other',
                    ev_action: 'clk',
                    ev_title: selection,
                    ev_data_one: formNumber
                });
            },
            error: (err) => {
                console.log(err);
            }
        }); 
    }

    SearchSort() {
        var searchResultRows = [];
        var filter = $('.search').val().toUpperCase();
        if (this.state.selectedFilters.length > 0) {
            this.state.filterResetData.map((obj) => {
                var formValue = $($.parseHTML(obj.formInformation));
                
                if (obj.formNumber.toUpperCase().indexOf(filter) > -1 || formValue.text().toUpperCase().indexOf(filter) > -1) {
                    searchResultRows.push(obj);
                }
            })
       }
        else{
            this.state.originalData.map((obj) => {
                var formValue = $($.parseHTML(obj.formInformation));

                if (obj.formNumber.toUpperCase().indexOf(filter) > -1 || formValue.text().toUpperCase().indexOf(filter) > -1) {
                    searchResultRows.push(obj);
                }
            })
        }
        this.setState({
            data: searchResultRows
        });
        utag.link({
            ev_type: 'other',
            ev_action: 'clk',
            ev_title: "form search – search client input",
            ev_data_one: $('.search').val()
        });
    }
    resetSearchData() {
        if (this.state.selectedFilters.length > 0) {
            this.setState({
                data: this.state.filterResetData
            })
        } else {
            this.setState({
                data: this.state.originalData
            })
        }
    }
    render() {
        const columns = [
            {
                Header: 'New form experience table',
                columns: [
                    {
                        Header: `${this.props.tableHeaderCol1}`,
                        accessor: 'formNumber',
                    },
                    {
                        Header: `${this.props.tableHeaderCol2}`,
                        accessor: function formInformation(obj){
                            return <div dangerouslySetInnerHTML={{__html: obj.formInformation}} />
                        },
                    },
                    {
                        Header: `${this.props.tableHeaderCol3}`,
                        accessor: function lastUpdated(obj) {
                            var d = new Date(obj.lastUpdated),
                                month = '' + (d.getMonth() + 1),
                                day = '' + d.getDate(),
                                year = d.getFullYear();

                            if (month.length < 2)
                                month = '0' + month;
                            if (day.length < 2)
                                day = '0' + day;

                            return [year, month, day].join('/');
                        },
                    },
                    {
                        Header: `${this.props.tableHeaderCol4}`,
                        accessor: function eSign(obj) {
                            var check = obj.eSign;
                            if (check == "true") {
                                return <i class="fa fa-check"></i>
                            }
                        },

                    },
                    {
                        Header: `${this.props.tableHeaderCol5}`,
                        accessor: function favorite(obj) {
                            var fav = obj.favorite;
                            if (fav == true) {
                                return <i class="fa fa-star star-selected"></i>
                            } else {
                                return <i class="fa fa-star star-not-selected"></i>
                            }
                        }
                    },
                ],
            },
        ];
        return (
            <React.Fragment>
                <Table columns={columns}
                    data={this.state.data}
                    sortyBy={this.sortColumn}
                    updateFavorite={this.updateFavorite}
                    searchCallBack={this.SearchSort}
                    resetTableData={this.resetSearchData}
                    search={this.setFilteredData}
                    togglefilter={this.toggleFilter}
                    addFilterTxt={this.props.addFilterText}
                    filtersData={this.state.filters}
                    addFilter={this.addFilters}
                    filterBtnTxt={this.props.filterDoneText}
                    selectedFilters={this.state.selectedValues}
                    clearFilter={this.clearFilter}
                    clearAll={this.clearAll}
                    clearAllTxt={this.props.ClearAllText}
                    previousText={this.props.previousText}
                    nextText={this.props.nextText}
                    pageText={this.props.pageText}
                    ofText={this.props.ofText}
                    searchText={this.props.searchText}
                    loadingState={this.state.loadingState}
                    loading={this.props.loading}
                    loadingText={this.props.loadingText}
                ></Table>
            </React.Fragment>
        )
    }
}
reactComponents["new-form-experience"] = NewFormExperience;
