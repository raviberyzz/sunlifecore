const GlobalFilter = ({ setFilter, filterData, callback, refreshData }) => {
    function search() {
        var filterValue = $('.search').val();
        callback();
        setFilter(filterValue);
    }
    function reset() {
        $('.search').val('');
        setFilter('');
        refreshData();
    }
    return (
        <div className="searchContainer">
            <span className="globalSearch">
                <input
                    //  value={filter || ''}
                    placeholder="Search"
                    className="search"
                // onChange={e => setFilter(e.target.value)}
                />
                <button onClick={search} className="searchIcon"><i className="fa fa-search" ></i></button>
                <button onClick={reset}><i className="fa fa-repeat"></i></button>
            </span>
        </div>

    )
}
function Table({ columns, data, sortyBy, searchCallBack, resetTableData, togglefilter, addFilterTxt, filtersData, addFilter, filterBtnTxt, selectedFilters, clearFilter, clearAll, clearAllTxt }) {
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
    function sort() {
        sortyBy();
    }
    function callBack() {
        searchCallBack()
    }
    function refreshTableData() {
        resetTableData()
    }
    return (
        <div className="tableContainer">

            <div className="filterSearchContainer">
                <div className="filter-container">
                    {data.length > 0 ? <div className="counter">{((pageIndex + 1) * pageSize) - (pageSize - 1)} - {pageSize != page.length ? ((pageIndex + 1) * (pageSize)) - (pageSize - page.length) : (pageIndex + 1) * pageSize} of {data.length}</div>
                        : <div className="counter">0 - 0 of 0</div>}
                    <button class="toggle-filter filter-buttons addFilter" onClick={togglefilter}>{addFilterTxt}</button>
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
                />
            </div>
            <table className="new-form-table" {...getTableProps()}>
                <thead className="table-header">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, index) => (
                                <th {...column.getHeaderProps()} id={index == 3 ? "sort" : ""} onClick={index == 3 ? sort : ""} className={index == 0 ? "col-sm-2" : (index == 2 ? "col-sm-2" : (index == 3 ? "col-sm-1" : ""))}>{column.render('Header')}
                                    {index == 3 ? <i className="fa fa-sort"></i> : ""}
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
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    }) : ""}
                </tbody>
            </table>
            {data.length < 1 && <div className="noData"> No Data available </div>}
            {/*  Pagination Component*/}
            {data.length > 15 && <div class="pagination-component">
                <nav role="navigation" aria-label="Pagination" class="text-center">
                    <ul className={`pagination pagination-list ${pageIndex + 1 < 2 ? 'first-page' : ''} ${pageIndex + 1 >= pageOptions.length ? 'last-page' : ''}`}>
                        {pageIndex + 1 != 1 && <li className={`previous ${(pageIndex + 1) < 2 ? 'disabled' : ''}`} onClick={() => previousPage()} disabled={!canPreviousPage}>
                            <a className="page-link"><span class="fa fa-angle-left" aria-hidden="true"></span>
                                <span class="">Previous</span></a>
                        </li>}
                        {pageOptions.length > 1 && <li className={`link-to-first ${pageIndex + 1 == 1 ? 'active' : ''}`} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            <a className="page-link">1</a>
                        </li>}
                        {pageIndex + 1 >= 5 && pageOptions.length > 6 &&
                            <li class="ellipsis"><a><span>&hellip;</span></a></li>
                        }
                        {pageOptions.map((page, index) => {
                            return (index > 1 && <li key={index} className={(pageIndex + 1 == index ? 'active' : index)}><a href="#news-wrapper-container" onClick={() => gotoPage(index - 1)}><span>{page}</span></a></li>)
                        })
                        }
                        {(pageOptions.length - pageIndex + 1) >= 4 && pageOptions.length > 6 &&
                            <li class="ellipsis"><a><span>&hellip;</span></a></li>
                        }
                        <li className={`lastPage ${pageIndex + 1 == pageOptions.length ? 'active' : ''}`}>
                            <a href="#news-wrapper-container" onClick={() => gotoPage(pageOptions.length - 1)}>
                                <span>{pageOptions.length}</span>
                            </a>
                        </li>
                        {pageIndex + 1 != pageOptions.length &&
                            <li className={`next ${pageIndex + 1 >= pageOptions.length ? 'disabled' : ''}`}>
                                <a href="#news-wrapper-container" onClick={() => gotoPage(pageIndex + 1)}>Next</a>
                            </li>
                        }

                    </ul>
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
            sorting: false

        };
        this.toggleFilter = this.toggleFilter.bind(this);
        this.addFilters = this.addFilters.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.sortColumn = this.sortColumn.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.getFilterData = this.getFilterData.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
        this.markFavorite = this.markFavorite.bind(this);
        this.SearchSort = this.SearchSort.bind(this);
        this.resetSearchData = this.resetSearchData.bind(this);
    }

    componentDidMount() {
        this.getTableData();
    }

    getTableData() {
        const favoriteData = [{ "formNumber": "IN1405003*" }, { "formNumber": "4900-E" }];
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
                    favorites: favoriteData
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
                return (row.tags && row.tags.some((val) => filterData.indexOf(val) > -1))
            })
            this.setState({
                data: filteredRows,
                filterResetData: filteredRows
            })
        }


        $('.filters').toggleClass('show-filters')
    }
    sortColumn() {
        var sortingData = this.state.data;
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
        })
    }
    clearAll() {
        $('input[type="checkbox"]').each(function () {
            $(this).prop("checked", false);
        })
        this.setState({
            selectedValues: [],
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
                return (row.tags && row.tags.some((val) => remainingFilters.indexOf(val) > -1))
            })
            this.setState({
                selectedFilters: selFilters,
                data: updatedFilterRows,
                filterResetData: updatedFilterRows
            })
        } else if (selFilters.length < 1) {
            this.setState({
                data: this.state.originalData
            })
        }

    }
    removeFavorite() {
        console.log('remove favorite');
    }
    markFavorite() {
        console.log('mark as favorite');
    }

    SearchSort() {
        var searchResultRows = [];
        var filter = $('.search').val();
        this.state.data.map((obj) => {
            if (obj.formNumber.indexOf(filter) > -1 || obj.formInformation.indexOf(filter) > -1) {
                searchResultRows.push(obj);
            }
        })
        this.setState({
            data: searchResultRows
        })
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
                        accessor: 'formInformation',
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
                                return <i class="fa fa-star star-selected" onClick={this.removeFavorite}></i>
                            } else {
                                return <i class="fa fa-star star-not-selected" onClick={this.markFavorite}></i>
                            }
                        }
                    },
                ],
            },
        ];
        $('.fa-star').on('click', function () {
            if ($(this).hasClass('star-selected')) {
                $(this).removeClass('star-selected');
                $(this).addClass('star-not-selected');
                console.log('ajax post call');
            } else {
                $(this).removeClass('star-not-selected');
                $(this).addClass('star-selected')
                console.log('ajax post call');
            }
        })
        /* $.ajax({
             type: "GET",
             url: `${this.props.filtersDataUrl}.tags.${this.state.lang}.json`,
             dataType: "json",
             success: (response) => {
                 this.setState({
                     filters: response
                 })
             },
             error: (err) => {
                 console.log(err);
             }
         }) */
        return (
            <React.Fragment>
                <Table columns={columns}
                    data={this.state.data}
                    sortyBy={this.sortColumn}
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
                ></Table>
            </React.Fragment>
        )
    }
}
reactComponents["new-form-experience"] = NewFormExperience;